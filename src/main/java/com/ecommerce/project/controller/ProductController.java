package com.ecommerce.project.controller;

import com.ecommerce.project.config.AppConstants;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/admin/categories/{categoryId}/product")
    public ResponseEntity<ProductDTO> addProduct(@Valid  @RequestBody ProductDTO productDTO,
                                                 @PathVariable Long categoryId) {

        ProductDTO addedProduct = productService.addProduct(categoryId, productDTO);
        return new ResponseEntity<>(addedProduct, HttpStatus.CREATED);
    }

    @PostMapping("/seller/categories/{categoryId}/product")
    public ResponseEntity<ProductDTO> addProductSeller(@Valid  @RequestBody ProductDTO productDTO,
                                                 @PathVariable Long categoryId) {

        ProductDTO addedProduct = productService.addProduct(categoryId, productDTO);
        return new ResponseEntity<>(addedProduct, HttpStatus.CREATED);
    }


    @GetMapping("/public/products")
    public ResponseEntity<ProductResponse> getAllProducts(@RequestParam(name = "keyword", required = false) String keyword,
                                                          @RequestParam(name = "category", required = false) String category,
                                                          @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER) Integer pageNumber,
                                                          @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE) Integer pageSize,
                                                          @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PRODUCT_BY) String sortBy,
                                                          @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR) String sortOrder) {

        ProductResponse productResponse = productService.getAllProducts(pageNumber, pageSize, sortBy, sortOrder, keyword, category);
        System.out.println("product response: " + productResponse);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }



    @GetMapping("/public/categories/{categoryId}/products")
    public ResponseEntity<ProductResponse> getProductByCategory(@PathVariable Long categoryId, @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER) Integer pageNumber,
                                                                @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE) Integer pageSize,
                                                                @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PRODUCT_BY) String sortBy,
                                                                @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR) String sortOrder){

        ProductResponse productResponse = productService.searchByCategory(categoryId, pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    @GetMapping("/public/products/keyword/{keyword}")
    public ResponseEntity<ProductResponse> getProductByKeyword(@PathVariable String keyword, @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER) Integer pageNumber,
                                                               @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE) Integer pageSize,
                                                               @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PRODUCT_BY) String sortBy,
                                                               @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR) String sortOrder) {

        ProductResponse productResponse = productService.searchProductByKeyword('%' + keyword + '%', pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(productResponse,  HttpStatus.OK);
    }

    @PutMapping("/admin/products/{productId}")
    public ResponseEntity<ProductDTO> updateProduct(@Valid @PathVariable Long productId, @RequestBody ProductDTO productDTO) {
        ProductDTO updatedProduct = productService.updateProduct(productId, productDTO);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping("/admin/products/{productId}")
    public ResponseEntity<ProductDTO> deleteProduct(@PathVariable Long productId) {
        //debug:PutMapping("/seller/products/{produ
        System.out.println("delete product with id: " + productId);
        ProductDTO productDTO = productService.deleteProduct(productId);
        return new ResponseEntity<>(productDTO, HttpStatus.OK);
    }

    @PutMapping("/admin/products/{productId}/image")
    public ResponseEntity<ProductDTO> updateProductImage(@PathVariable Long productId,
                                                         @RequestParam("image") MultipartFile image) throws IOException {
        ProductDTO updatedProduct = productService.updateProductImage(productId, image);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);

    }

    @GetMapping("/admin/products")
    public ResponseEntity<ProductResponse> getAllProductsForAdmin(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PRODUCT_BY, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder
    ){
        ProductResponse productResponse = productService.getAllProductsForAdmin(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(productResponse,HttpStatus.OK);
    }

    @GetMapping("/seller/products")
    public ResponseEntity<ProductResponse> getAllProductsForSeller(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_PRODUCT_BY, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder
    ){
        ProductResponse productResponse = productService.getAllProductsForSeller(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(productResponse,HttpStatus.OK);
    }

    @PutMapping("/seller/products/{productId}")
    public ResponseEntity<ProductDTO> updateProductSeller(@Valid @RequestBody ProductDTO productDTO,
                                                          @PathVariable Long productId){
        ProductDTO updatedProductDTO = productService.updateProduct(productId, productDTO);
        return new ResponseEntity<>(updatedProductDTO, HttpStatus.OK);
    }

    @DeleteMapping("/seller/products/{productId}")
    public ResponseEntity<ProductDTO> deleteProductSeller(@PathVariable Long productId){
        ProductDTO deletedProduct = productService.deleteProduct(productId);
        return new ResponseEntity<>(deletedProduct, HttpStatus.OK);
    }

    @PutMapping("/seller/products/{productId}/image")
    public ResponseEntity<ProductDTO> updateProductImageSeller(@PathVariable Long productId,
                                                               @RequestParam("image")MultipartFile image) throws IOException {
        ProductDTO updatedProduct = productService.updateProductImage(productId, image);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }


}
