package com.ecommerce.project.service;

import com.ecommerce.project.model.Category;
import java.util.List;
import java.util.Set;

public interface CategoryService {

    void createCategory(Category categoryName);
    List<Category> getAllCategories();
    String deleteCategory(long categoryId);
    Category updateCategory(Category newCategory, long categoryId);
}
