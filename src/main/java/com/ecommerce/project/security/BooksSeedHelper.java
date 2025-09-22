package com.ecommerce.project.security;

import com.ecommerce.project.model.Category;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.model.User;
import com.ecommerce.project.reposetories.CategoryRepository;
import com.ecommerce.project.reposetories.ProductRepository;
import com.ecommerce.project.reposetories.UserRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class BooksSeedHelper {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public BooksSeedHelper(CategoryRepository categoryRepository,
                           ProductRepository productRepository,
                           UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    private static final String CATEGORY_NAME = "Books";
    private static final String IMG_PREFIX = "book_image_";
    private static final String IMG_EXT = ".jpg"; // אם הקבצים אצלך png, החלף ל-.png

    // כותרות + מחברים (מחבר בתוך התיאור – אין שדה "author" במודל המוצר)
    private static final String[] TITLES = new String[]{
            "The Lord of the Rings",
            "Harry Potter and the Sorcerer's Stone",
            "Pride and Prejudice",
            "To Kill a Mockingbird",
            "1984",
            "The Great Gatsby",
            "Moby-Dick",
            "The Catcher in the Rye",
            "The Hobbit",
            "War and Peace"
    };

    private static final String[] AUTHORS = new String[]{
            "J.R.R. Tolkien",
            "J.K. Rowling",
            "Jane Austen",
            "Harper Lee",
            "George Orwell",
            "F. Scott Fitzgerald",
            "Herman Melville",
            "J.D. Salinger",
            "J.R.R. Tolkien",
            "Leo Tolstoy"
    };

    public void seedBooks() {
        // ודא שקיים משתמש admin
        User admin = userRepository.findByUsername("admin")
                .orElseThrow(() -> new IllegalStateException("Admin user not found. Make sure initData creates it first."));

        // ודא שקיימת קטגוריה "Books"
        Category books = categoryRepository.findByCategoryName(CATEGORY_NAME);
        if (books == null) {
            books = new Category();
            books.setCategoryName(CATEGORY_NAME);
            books = categoryRepository.save(books);
        }

        ThreadLocalRandom rnd = ThreadLocalRandom.current();

        for (int i = 0; i < TITLES.length; i++) {
            String title = TITLES[i];

            // למנוע כפילויות בהרצות נוספות
            Optional<Product> existing = productRepository.findByCategoryAndProductNameIgnoreCase(books, title);
            if (existing.isPresent()) {
                continue;
            }

            String author = AUTHORS[i];

            // מספרים ריאליים אך מגוונים
            int quantity = rnd.nextInt(6, 25);                  // 6–24
            double price = round2(rnd.nextDouble(59.0, 249.0)); // ₪59–₪249
            double discountPercent = round2(rnd.nextDouble(0.0, 28.0)); // 0%–28%
            double specialPrice = round2(price - (discountPercent / 100.0) * price);
            int year = rnd.nextInt(1996, 2024);                // שנה ריאלית
            int pages = rnd.nextInt(250, 920);                 // עמודים ריאלי

            Product p = new Product();
            p.setProductName(title);
            p.setDescription(author + " · " + year + " · " + pages + " pages");
            p.setQuantity(quantity);
            p.setPrice(price);
            p.setDiscount(discountPercent);
            p.setSpecialPrice(specialPrice);
            p.setImage(IMG_PREFIX + (i + 1) + IMG_EXT); // book_image_1.jpg ... book_image_10.jpg
            p.setCategory(books);
            p.setUser(admin);

            productRepository.save(p);
        }
    }

    private static double round2(double v) {
        return Math.round(v * 100.0) / 100.0;
    }
}
