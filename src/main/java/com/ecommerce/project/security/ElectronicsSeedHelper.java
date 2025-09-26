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
public class ElectronicsSeedHelper {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ElectronicsSeedHelper(CategoryRepository categoryRepository,
                                 ProductRepository productRepository,
                                 UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    private static final String CATEGORY_NAME = "Electronics";
    private static final String IMG_PREFIX = "electronics_image_";
    private static final String IMG_EXT = ".jpg"; // אם תוריד תמונות בפורמט אחר תעדכן כאן

    private static final String[] NAMES = new String[]{
            "iPhone 11 Pro",
            "Samsung Galaxy S23",
            "Google Pixel 7",
            "Xiaomi Redmi Note 12",
            "OnePlus 11",
            "iPhone 14",
            "Samsung Galaxy Z Flip 5",
            "Oppo Find X6",
            "Sony Xperia 5 V",
            "Nothing Phone 2"
    };

    public void seedElectronics() {
        // ודא שיש משתמש admin
        User admin = userRepository.findByUsername("admin")
                .orElseThrow(() -> new IllegalStateException("Admin user not found. Make sure initData creates it first."));

        // ודא שקיימת קטגוריה "Electronics"
        Category electronics = categoryRepository.findByCategoryName(CATEGORY_NAME);
        if (electronics == null) {
            electronics = new Category();
            electronics.setCategoryName(CATEGORY_NAME);
            electronics = categoryRepository.save(electronics);
        }

        ThreadLocalRandom rnd = ThreadLocalRandom.current();

        for (int i = 0; i < NAMES.length; i++) {
            String name = NAMES[i];

            // בדיקה אם קיים כבר מוצר כזה בקטגוריה
            Optional<Product> existing = productRepository.findByCategoryAndProductNameIgnoreCase(electronics, name);
            if (existing.isPresent()) {
                continue;
            }

            int quantity = rnd.nextInt(3, 15);
            double price = round2(rnd.nextDouble(999.0, 4999.0));
            double discountPercent = round2(rnd.nextDouble(0.0, 20.0));
            double specialPrice = round2(price - (discountPercent / 100.0) * price);

            Product p = new Product();
            p.setProductName(name);
            p.setDescription("Latest model " + name + " with high-end features");
            p.setQuantity(quantity);
            p.setPrice(price);
            p.setDiscount(discountPercent);
            p.setSpecialPrice(specialPrice);
            p.setImage(IMG_PREFIX + (i + 1) + IMG_EXT); // electronics_image_1.jpg ...
            p.setCategory(electronics);
            p.setUser(admin);

            productRepository.save(p);
        }
    }

    private static double round2(double v) {
        return Math.round(v * 100.0) / 100.0;
    }
}
