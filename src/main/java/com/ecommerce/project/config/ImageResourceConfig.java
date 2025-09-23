package com.ecommerce.project.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ImageResourceConfig implements WebMvcConfigurer {

    // ייקח מ-.env דרך Docker, עם ברירת מחדל בטוחה לריצה מקומית
    @Value("${PROJECT_IMAGE_PATH:/app/images}")
    private String imagePath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // כל בקשה ל-/images/** תוגש מקבצים על הדיסק (בתוך הקונטיינר) לפי PROJECT_IMAGE_PATH
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:" + imagePath + "/");
    }
}
