//package com.ecommerce.project.controller;
//
//import com.ecommerce.project.config.AppConstants;
//import com.ecommerce.project.payload.CategoryDTO;
//import com.ecommerce.project.payload.CategoryResponse;
//import com.ecommerce.project.service.CategoryService;
//import jakarta.validation.Valid;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//
//@RestController
//@RequestMapping("/api")
//public class CategoryController {
//
//    private final CategoryService categoryService;
//
//    public CategoryController(CategoryService categoryService) {
//        this.categoryService = categoryService;
//    }
//
//    @GetMapping("/public/categories")
//    public ResponseEntity<CategoryResponse> getAllCategories(
//            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER) Integer pageNumber,
//            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE) Integer pageSize,
//            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_CATEGORY_BY) String sortBy,
//            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR) String sortOrder)
//    {
//        CategoryResponse categories = categoryService.getAllCategories(pageNumber, pageSize, sortBy, sortOrder);
//        return new ResponseEntity<>(categories, HttpStatus.OK);
//    }
//
//    @PostMapping("/admin/categories")
//    public ResponseEntity<CategoryDTO> addCategory(@Valid  @RequestBody CategoryDTO category) {
//        CategoryDTO savedCategoryDTO = categoryService.createCategory(category);
//        return new ResponseEntity<>(savedCategoryDTO, HttpStatus.CREATED);
//    }
//
//    @DeleteMapping("/admin/categories/{categoryId}")
//    public ResponseEntity<CategoryDTO> deleteCategory(@PathVariable int categoryId) {
//        CategoryDTO categoryDTO = categoryService.deleteCategory(categoryId);
//        return new ResponseEntity<>(categoryDTO, HttpStatus.OK);
//    }
//
//    @PutMapping("/admin/categories/{categoryId}")
//    public ResponseEntity<CategoryDTO> updateCategory(@Valid @PathVariable long categoryId, @RequestBody CategoryDTO toBeUpdatedCategory) {
//        CategoryDTO savedCategoryDTO = categoryService.updateCategory(toBeUpdatedCategory, categoryId);
//        return new ResponseEntity<>(savedCategoryDTO, HttpStatus.OK);
//    }
//}

package com.ecommerce.project.controller;

import com.ecommerce.project.config.AppConstants;
import com.ecommerce.project.payload.CategoryDTO;
import com.ecommerce.project.payload.CategoryResponse;
import com.ecommerce.project.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Categories", description = "Browse & manage product categories")
@RestController
@RequestMapping("/api")
public class CategoryController {

    private final CategoryService categoryService;
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Operation(
            summary = "List categories",
            description = "Public endpoint. Supports pagination and sorting."
    )
    @GetMapping("/public/categories")
    public ResponseEntity<CategoryResponse> getAllCategories(
            @Parameter(description = "Zero-based page index", example = "0")
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER) Integer pageNumber,
            @Parameter(description = "Page size", example = "10")
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE) Integer pageSize,
            @Parameter(description = "Sort field", example = "categoryId")
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_CATEGORY_BY) String sortBy,
            @Parameter(description = "Sort direction", example = "asc")
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR) String sortOrder
    ) {
        CategoryResponse categories = categoryService.getAllCategories(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @Operation(
            summary = "Create category",
            description = "Admin endpoint to add a new category.",
            requestBody = @RequestBody(description = "Category data", required = true)
    )
    @ApiResponse(responseCode = "201", description = "Category created")
    @PostMapping("/admin/categories")
    public ResponseEntity<CategoryDTO> addCategory(
            @Valid @org.springframework.web.bind.annotation.RequestBody CategoryDTO category
    ) {
        CategoryDTO savedCategoryDTO = categoryService.createCategory(category);
        return new ResponseEntity<>(savedCategoryDTO, HttpStatus.CREATED);
    }

    @Operation(
            summary = "Delete category",
            description = "Admin endpoint to delete a category by ID."
    )
    @DeleteMapping("/admin/categories/{categoryId}")
    public ResponseEntity<CategoryDTO> deleteCategory(
            @Parameter(description = "Category ID", required = true, example = "12")
            @PathVariable int categoryId
    ) {
        CategoryDTO categoryDTO = categoryService.deleteCategory(categoryId);
        return new ResponseEntity<>(categoryDTO, HttpStatus.OK);
    }

    @Operation(
            summary = "Update category",
            description = "Admin endpoint to update an existing category.",
            requestBody = @RequestBody(description = "Updated category data", required = true)
    )
    @PutMapping("/admin/categories/{categoryId}")
    public ResponseEntity<CategoryDTO> updateCategory(
            @Parameter(description = "Category ID", required = true, example = "12")
            @Valid @PathVariable long categoryId,
            @org.springframework.web.bind.annotation.RequestBody CategoryDTO toBeUpdatedCategory
    ) {
        CategoryDTO savedCategoryDTO = categoryService.updateCategory(toBeUpdatedCategory, categoryId);
        return new ResponseEntity<>(savedCategoryDTO, HttpStatus.OK);
    }
}
