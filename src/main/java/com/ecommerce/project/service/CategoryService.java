package com.ecommerce.project.service;

import com.ecommerce.project.payload.CategoryDTO;
import com.ecommerce.project.payload.CategoryResponse;

public interface CategoryService {

    CategoryDTO createCategory(CategoryDTO category);
    CategoryResponse getAllCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
    CategoryDTO deleteCategory(long categoryId);
    CategoryDTO updateCategory(CategoryDTO updatedCategory, long categoryId);
}
