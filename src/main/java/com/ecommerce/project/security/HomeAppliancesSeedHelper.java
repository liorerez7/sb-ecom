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
public class HomeAppliancesSeedHelper {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public HomeAppliancesSeedHelper(CategoryRepository categoryRepository,
                                    ProductRepository productRepository,
                                    UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    private static final String CATEGORY_NAME = "Home Appliances";
    private static final String IMG_PREFIX = "appliance_image_";
    private static final String IMG_EXT = ".jpg";

    private static final String[] NAMES = new String[]{
            "Electric Kettle",
            "Toaster",
            "Microwave Oven",
            "Blender",
            "Coffee Maker",
            "Air Fryer"
    };

    public void seedHomeAppliances() {
        User admin = userRepository.findByUsername("admin")
                .orElseThrow(() -> new IllegalStateException("Admin user not found."));

        Category appliances = categoryRepository.findByCategoryName(CATEGORY_NAME);
        if (appliances == null) {
            appliances = new Category();
            appliances.setCategoryName(CATEGORY_NAME);
            appliances = categoryRepository.save(appliances);
        }

        ThreadLocalRandom rnd = ThreadLocalRandom.current();

        for (int i = 0; i < NAMES.length; i++) {
            String name = NAMES[i];

            Optional<Product> existing = productRepository.findByCategoryAndProductNameIgnoreCase(appliances, name);
            if (existing.isPresent()) continue;

            int quantity = rnd.nextInt(4, 18);
            double price = round2(rnd.nextDouble(99.0, 699.0));
            double discountPercent = round2(rnd.nextDouble(0.0, 25.0));
            double specialPrice = round2(price - (discountPercent / 100.0) * price);

            Product p = new Product();
            p.setProductName(name);
            p.setDescription("High quality " + name + " for your home");
            p.setQuantity(quantity);
            p.setPrice(price);
            p.setDiscount(discountPercent);
            p.setSpecialPrice(specialPrice);
            p.setImage(IMG_PREFIX + (i + 1) + IMG_EXT); // appliance_image_1.jpg ...
            p.setCategory(appliances);
            p.setUser(admin);

            productRepository.save(p);
        }
    }

    private static double round2(double v) {
        return Math.round(v * 100.0) / 100.0;
    }
}
