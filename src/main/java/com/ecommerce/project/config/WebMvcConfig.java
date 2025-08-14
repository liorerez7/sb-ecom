package com.ecommerce.project.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:images/")
                .setCachePeriod(3600); // Cache for 1 hour
    }

    // This class can be used to configure various aspects of Spring MVC, such as view resolvers, message converters, etc.
    // Currently, it is empty but can be extended in the future as needed.
}
