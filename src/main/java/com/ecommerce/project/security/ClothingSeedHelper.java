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
public class ClothingSeedHelper {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ClothingSeedHelper(CategoryRepository categoryRepository,
                              ProductRepository productRepository,
                              UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    private static final String CATEGORY_NAME = "Clothing";
    private static final String IMG_PREFIX = "clothing_image_";
    private static final String IMG_EXT = ".jpg";

    private static final String[] NAMES = new String[]{
            "Classic White T-Shirt",
            "Black Cotton T-Shirt",
            "Blue Denim Jacket",
            "Red Hoodie",
            "Formal White Shirt",
            "Casual Polo Shirt"
    };

    public void seedClothing() {
        User admin = userRepository.findByUsername("admin")
                .orElseThrow(() -> new IllegalStateException("Admin user not found."));

        Category clothing = categoryRepository.findByCategoryName(CATEGORY_NAME);
        if (clothing == null) {
            clothing = new Category();
            clothing.setCategoryName(CATEGORY_NAME);
            clothing = categoryRepository.save(clothing);
        }

        ThreadLocalRandom rnd = ThreadLocalRandom.current();

        for (int i = 0; i < NAMES.length; i++) {
            String name = NAMES[i];

            Optional<Product> existing = productRepository.findByCategoryAndProductNameIgnoreCase(clothing, name);
            if (existing.isPresent()) continue;

            int quantity = rnd.nextInt(50, 250);
            double price = round2(rnd.nextDouble(49.0, 199.0));
            double discountPercent = round2(rnd.nextDouble(0.0, 15.0));
            double specialPrice = round2(price - (discountPercent / 100.0) * price);

            Product p = new Product();
            p.setProductName(name);
            p.setDescription("Trendy " + name + " for everyday wear");
            p.setQuantity(quantity);
            p.setPrice(price);
            p.setDiscount(discountPercent);
            p.setSpecialPrice(specialPrice);
            p.setImage(IMG_PREFIX + (i + 1) + IMG_EXT); // clothing_image_1.jpg ...
            p.setCategory(clothing);
            p.setUser(admin);

            productRepository.save(p);
        }
    }

    private static double round2(double v) {
        return Math.round(v * 100.0) / 100.0;
    }
}
