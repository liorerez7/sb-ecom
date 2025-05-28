package com.ecommerce.project.service;

import com.ecommerce.project.execptions.APIException;
import com.ecommerce.project.execptions.ResourceNotFoundException;
import com.ecommerce.project.model.Category;
import com.ecommerce.project.payload.CategoryDTO;
import com.ecommerce.project.payload.CategoryResponse;
import com.ecommerce.project.reposetories.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category inDataBaseCategory = categoryRepository.findByCategoryName(categoryDTO.getCategoryName());

        if(inDataBaseCategory != null){
            throw new APIException("Category with the name " + categoryDTO.getCategoryName() + " already exists");
        }

        Category newCategory = modelMapper.map(categoryDTO, Category.class);
        Category savedCategory = categoryRepository.save(newCategory);

        return modelMapper.map(savedCategory, CategoryDTO.class);
    }

    @Override
    public CategoryResponse getAllCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder){

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ?
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Category> pageCategories = categoryRepository.findAll(pageDetails);

        List<Category> categories = pageCategories.getContent();

        if(categories.isEmpty()){
            throw new APIException("No categories found");
        }

        List<CategoryDTO> categoryDTOS = categories.stream().map(category -> modelMapper.map(
                category, CategoryDTO.class)).toList();

        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setContent(categoryDTOS);
        categoryResponse.setPageNumber(pageDetails.getPageNumber());
        categoryResponse.setPageSize(pageCategories.getSize());
        categoryResponse.setTotalElements(pageCategories.getTotalElements());
        categoryResponse.setTotalPages(pageCategories.getTotalPages());
        categoryResponse.setLastPage(pageCategories.isLast());
        return categoryResponse;
    }

    @Override
    public CategoryDTO deleteCategory(long categoryId) {
        Optional<Category> savedOptionalCategory = categoryRepository.findById(categoryId);
        Category savedCategory = savedOptionalCategory
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        CategoryDTO deletedCategoryDTO = modelMapper.map(savedCategory, CategoryDTO.class);
        categoryRepository.delete(savedCategory);

        return deletedCategoryDTO;

    }

    @Override
    public CategoryDTO updateCategory(CategoryDTO updatedCategoryDTO, long categoryId) {
        Optional<Category> savedCategoryOptional = categoryRepository.findById(categoryId);

        Category savedCategory = savedCategoryOptional
                .orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

        savedCategory.setCategoryName(updatedCategoryDTO.getCategoryName());
        Category updatedCategory = categoryRepository.save(savedCategory);

        return modelMapper.map(updatedCategory, CategoryDTO.class);
    }
}
