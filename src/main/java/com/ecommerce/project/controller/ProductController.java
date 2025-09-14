package com.ecommerce.project.controller;

import com.ecommerce.project.config.AppConstants;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Tag(name = "Products", description = "Browse & manage products")
@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private final ProductService productService;

    public ProductController(ProductService productService) { this.productService = productService; }

    @Operation(summary = "Create product (admin)", description = "Creates a new product under a category.")
    @ApiResponse(responseCode = "201", description = "Product created")
    @PostMapping("/admin/categories/{categoryId}/product")
    public ResponseEntity<ProductDTO> addProduct(
            @Valid
            @RequestBody(description = "Product payload", required = true)
            @org.springframework.web.bind.annotation.RequestBody ProductDTO productDTO,
            @Parameter(description = "Category ID", example = "7", required = true)
            @PathVariable Long categoryId
    ) {
        ProductDTO addedProduct = productService.addProduct(categoryId, productDTO);
        return new ResponseEntity<>(addedProduct, HttpStatus.CREATED);
    }

    @Operation(summary = "Create product (seller)", description = "Creates a new product under a category (seller scope).")
    @ApiResponse(responseCode = "201", description = "Product created")
    @PostMapping("/seller/categories/{categoryId}/product")
    public ResponseEntity<ProductDTO> addProductSeller(
            @Valid
            @RequestBody(description = "Product payload", required = true)
            @org.springframework.web.bind.annotation.RequestBody ProductDTO productDTO,
            @Parameter(description = "Category ID", example = "7", required = true)
            @PathVariable Long categoryId
    ) {
        ProductDTO addedProduct = productService.addProduct(categoryId, productDTO);
        return new ResponseEntity<>(addedProduct, HttpStatus.CREATED);
    }

    @Operation(summary = "List products (public)", description = "Optional keyword/category filters with pagination & sorting.")
    @GetMapping("/public/products")
    public ResponseEntity<ProductResponse> getAllProducts(
            @Parameter(description = "Keyword filter", example = "iphone")
            @RequestParam(name = "keyword", required = false) String keyword,
            @Parameter(description = "Category name filter", example = "Phones")
            @RequestParam(name = "category", required = false) String category,
            @Parameter(description = "Zero-based page index", example = "0")
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER) Integer pageNumber,
            @Parameter(description = "Page size", example = "12")
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE) Integer pageSize,
            @Parameter(description = "Sort field", example = "productId")
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PRODUCT_BY) String sortBy,
            @Parameter(description = "Sort direction", example = "asc")
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR) String sortOrder
    ) {
        ProductResponse productResponse =
                productService.getAllProducts(pageNumber, pageSize, sortBy, sortOrder, keyword, category);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    @Operation(summary = "List products by category (public)")
    @GetMapping("/public/categories/{categoryId}/products")
    public ResponseEntity<ProductResponse> getProductByCategory(
            @Parameter(description = "Category ID", example = "7", required = true)
            @PathVariable Long categoryId,
            @Parameter(description = "Zero-based page index", example = "0")
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER) Integer pageNumber,
            @Parameter(description = "Page size", example = "12")
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE) Integer pageSize,
            @Parameter(description = "Sort field", example = "productId")
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PRODUCT_BY) String sortBy,
            @Parameter(description = "Sort direction", example = "asc")
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR) String sortOrder
    ){
        ProductResponse productResponse =
                productService.searchByCategory(categoryId, pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    @Operation(summary = "Search products by keyword (public)")
    @GetMapping("/public/products/keyword/{keyword}")
    public ResponseEntity<ProductResponse> getProductByKeyword(
            @Parameter(description = "Search keyword", example = "iphone", required = true)
            @PathVariable String keyword,
            @Parameter(description = "Zero-based page index", example = "0")
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER) Integer pageNumber,
            @Parameter(description = "Page size", example = "12")
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE) Integer pageSize,
            @Parameter(description = "Sort field", example = "productId")
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PRODUCT_BY) String sortBy,
            @Parameter(description = "Sort direction", example = "asc")
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR) String sortOrder
    ) {
        ProductResponse productResponse =
                productService.searchProductByKeyword('%' + keyword + '%', pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(productResponse,  HttpStatus.OK);
    }

    @Operation(summary = "Update product (admin)")
    @PutMapping("/admin/products/{productId}")
    public ResponseEntity<ProductDTO> updateProduct(
            @Parameter(description = "Product ID", example = "101", required = true)
            @Valid @PathVariable Long productId,
            @RequestBody(description = "Product payload (fields to update)", required = true)
            @org.springframework.web.bind.annotation.RequestBody ProductDTO productDTO
    ) {
        ProductDTO updatedProduct = productService.updateProduct(productId, productDTO);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @Operation(summary = "Delete product (admin)")
    @DeleteMapping("/admin/products/{productId}")
    public ResponseEntity<ProductDTO> deleteProduct(
            @Parameter(description = "Product ID", example = "101", required = true)
            @PathVariable Long productId
    ) {
        ProductDTO productDTO = productService.deleteProduct(productId);
        return new ResponseEntity<>(productDTO, HttpStatus.OK);
    }

    @Operation(summary = "Update product image (admin)", description = "Accepts multipart/form-data with an image file.")
    @PutMapping("/admin/products/{productId}/image")
    public ResponseEntity<ProductDTO> updateProductImage(
            @Parameter(description = "Product ID", example = "101", required = true)
            @PathVariable Long productId,
            @Parameter(description = "Image file (multipart/form-data)")
            @RequestParam("image") MultipartFile image
    ) throws IOException {
        ProductDTO updatedProduct = productService.updateProductImage(productId, image);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @Operation(summary = "List products (admin)")
    @GetMapping("/admin/products")
    public ResponseEntity<ProductResponse> getAllProductsForAdmin(
            @Parameter(description = "Zero-based page index", example = "0")
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @Parameter(description = "Page size", example = "12")
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @Parameter(description = "Sort field", example = "productId")
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PRODUCT_BY, required = false) String sortBy,
            @Parameter(description = "Sort direction", example = "asc")
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder
    ){
        ProductResponse productResponse = productService.getAllProductsForAdmin(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(productResponse,HttpStatus.OK);
    }

    @Operation(summary = "List products (seller)")
    @GetMapping("/seller/products")
    public ResponseEntity<ProductResponse> getAllProductsForSeller(
            @Parameter(description = "Zero-based page index", example = "0")
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @Parameter(description = "Page size", example = "12")
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @Parameter(description = "Sort field", example = "productId")
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PRODUCT_BY, required = false) String sortBy,
            @Parameter(description = "Sort direction", example = "asc")
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder
    ){
        ProductResponse productResponse = productService.getAllProductsForSeller(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(productResponse,HttpStatus.OK);
    }

    @Operation(summary = "Update product (seller)")
    @PutMapping("/seller/products/{productId}")
    public ResponseEntity<ProductDTO> updateProductSeller(
            @RequestBody(description = "Product payload (fields to update)", required = true)
            @Valid @org.springframework.web.bind.annotation.RequestBody ProductDTO productDTO,
            @Parameter(description = "Product ID", example = "101", required = true)
            @PathVariable Long productId
    ){
        ProductDTO updatedProductDTO = productService.updateProduct(productId, productDTO);
        return new ResponseEntity<>(updatedProductDTO, HttpStatus.OK);
    }

    @Operation(summary = "Delete product (seller)")
    @DeleteMapping("/seller/products/{productId}")
    public ResponseEntity<ProductDTO> deleteProductSeller(
            @Parameter(description = "Product ID", example = "101", required = true)
            @PathVariable Long productId
    ){
        ProductDTO deletedProduct = productService.deleteProduct(productId);
        return new ResponseEntity<>(deletedProduct, HttpStatus.OK);
    }

    @Operation(summary = "Update product image (seller)", description = "Accepts multipart/form-data with an image file.")
    @PutMapping("/seller/products/{productId}/image")
    public ResponseEntity<ProductDTO> updateProductImageSeller(
            @Parameter(description = "Product ID", example = "101", required = true)
            @PathVariable Long productId,
            @Parameter(description = "Image file (multipart/form-data)")
            @RequestParam("image") MultipartFile image
    ) throws IOException {
        ProductDTO updatedProduct = productService.updateProductImage(productId, image);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
}
