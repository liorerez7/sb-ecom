package com.ecommerce.project.service;

import com.ecommerce.project.execptions.APIException;
import com.ecommerce.project.execptions.ResourceNotFoundException;
import com.ecommerce.project.model.Category;
import com.ecommerce.project.reposetories.CategoryRepository;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public void createCategory(Category category) {
        Category savedCategory = categoryRepository.findByCategoryName(category.getCategoryName());

        if(savedCategory != null){
            throw new APIException("Category with the name " + category.getCategoryName() + " already exists");
        }

        categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        if(categories.isEmpty()){
            throw new APIException("No categories found");
        }

        return categories;
    }

    @Override
    public String deleteCategory(long categoryId) {
        Optional<Category> savedOptionalCategory = categoryRepository.findById(categoryId);
        Category savedCategory = savedOptionalCategory
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        categoryRepository.delete(savedCategory);

        return "Category deleted successfully: " + categoryId;

    }

    @Override
    public Category updateCategory(Category newCategory, long categoryId) {
        Optional<Category> savedCategoryOptional = categoryRepository.findById(categoryId);

        Category savedCategory = savedCategoryOptional
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        savedCategory.setCategoryName(newCategory.getCategoryName());

        return categoryRepository.save(savedCategory);
    }
}
