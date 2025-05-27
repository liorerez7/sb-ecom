package com.ecommerce.project.service;

import com.ecommerce.project.model.Category;
import com.ecommerce.project.payload.CategoryResponse;

import java.util.List;
import java.util.Set;

public interface CategoryService {

    void createCategory(Category categoryName);
    CategoryResponse getAllCategories();
    String deleteCategory(long categoryId);
    Category updateCategory(Category newCategory, long categoryId);
}
