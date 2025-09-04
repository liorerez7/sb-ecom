package com.ecommerce.project.service;

import com.ecommerce.project.execptions.APIException;
import com.ecommerce.project.execptions.ResourceNotFoundException;
import com.ecommerce.project.model.Cart;
import com.ecommerce.project.model.Category;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.reposetories.CartRepository;
import com.ecommerce.project.reposetories.CategoryRepository;
import com.ecommerce.project.reposetories.ProductRepository;
import com.ecommerce.project.util.AuthUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private FileService fileService;

    @Value("${project.image.path}")
    private String path;

    @Value("${image.base.url}")
    private String imageBaseUrl;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private AuthUtil authUtil;


    @Override
    public ProductResponse searchProductByKeyword(String keyword, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> pageProducts = productRepository.findByProductNameLikeIgnoreCase(keyword, pageDetails);
        return getProductResponse(pageProducts);
    }

    @Override
    public ProductDTO addProduct(Long categoryId, ProductDTO productDTO) {

        Category category = categoryRepository.findById(categoryId).
                orElseThrow(() ->
                        new ResourceNotFoundException("Category", "categoryId", categoryId));

        List<Product> products = category.getProducts();
        boolean isProductExists = false;
        for (Product value : products) {
            if (value.getProductName().equalsIgnoreCase(productDTO.getProductName())) {
                isProductExists = true;
                break;
            }
        }

        if (isProductExists){
            throw new APIException("Product already exists in this category");
        }
        else {
            Product product = modelMapper.map(productDTO, Product.class);
            product.setCategory(category);
            product.setImage("default.png");
            product.setUser(authUtil.getLoggedInUser());

            // After discount
            //product.setSpecialPrice(product.getPrice() - (product.getDiscount() / 100) * product.getPrice());
            Double specialPrice = productDTO.getSpecialPrice();
            if (specialPrice == null) {
                specialPrice = product.getPrice() - (product.getDiscount() / 100.0) * product.getPrice();
            }
            product.setSpecialPrice(specialPrice);


            Product savedProduct = productRepository.save(product);

            return modelMapper.map(savedProduct, ProductDTO.class);
        }
    }

    @Override
    public ProductResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String keyword, String category) {

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Specification<Product> spec = Specification.where(null);

        if(keyword != null && !keyword.isEmpty()){
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("productName")), "%" + keyword.toLowerCase() + "%"));
        }

        if(category != null && !category.isEmpty()){
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("category").get("categoryName"), category));
        }

        Page<Product> pageProducts = productRepository.findAll(spec, pageDetails);


        List<Product> products = pageProducts.getContent();

        List<ProductDTO> productDTOList = products.stream().map(product -> {
            ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
            productDTO.setImage(constructImageUrl(product.getImage()));
            return productDTO;
        }).toList();


        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOList);
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setLastPage(pageProducts.isLast());

        return productResponse;
    }

    private String constructImageUrl(String imageName) {
        return imageBaseUrl.endsWith("/") ? imageBaseUrl + imageName : imageBaseUrl + "/" + imageName;
    }

    @Override
    public ProductResponse searchByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {



        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        categoryOptional.orElseThrow(() ->
                new ResourceNotFoundException("Category", "categoryId", categoryId));

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        Page<Product> pageProducts = productRepository.findByCategoryOrderByPriceAsc(categoryOptional.get(), pageDetails);
        return getProductResponse(pageProducts);
    }

    @Override
    public ProductDTO updateProduct(Long productId, ProductDTO productDTO) {
        Product productFromDB = productRepository.findById(productId).orElseThrow(() ->
                new ResourceNotFoundException("Product", "productId", productId));

//        Product product = modelMapper.map(productDTO, Product.class);
//        productFromDB.setPrice(product.getPrice());
//        productFromDB.setProductName(product.getProductName());
//        productFromDB.setDescription(product.getDescription());
//        productFromDB.setQuantity(product.getQuantity());
//        productFromDB.setDiscount(product.getDiscount());
//        productFromDB.setSpecialPrice(product.getPrice() - (product.getDiscount()/100) * product.getPrice());
//        productFromDB.setImage(product.getImage());
//        productFromDB.setCategory(product.getCategory());
        Product product = modelMapper.map(productDTO, Product.class);
        productFromDB.setPrice(product.getPrice());
        productFromDB.setProductName(product.getProductName());
        productFromDB.setDescription(product.getDescription());
        productFromDB.setQuantity(product.getQuantity());
        productFromDB.setDiscount(product.getDiscount());

//        productFromDB.setSpecialPrice(
//                product.getPrice() - (product.getDiscount() / 100.0) * product.getPrice()
//        );

        Double specialPrice = product.getSpecialPrice();
        if (specialPrice == null) {
            specialPrice = product.getPrice() - (product.getDiscount() / 100.0) * product.getPrice();
        }
        productFromDB.setSpecialPrice(specialPrice);


        productFromDB.setImage(product.getImage());
// קטגוריה תעודכן רק אם נשלחה ב־DTO
        if (product.getCategory() != null) {
            productFromDB.setCategory(product.getCategory());

        }

        if (product.getImage() != null) {
            productFromDB.setImage(product.getImage());
        }




        Product savedProduct = productRepository.save(productFromDB);

        // carts holds all the carts that have this product
        List<Cart> carts = cartRepository.findCartsByProductId(productId);

        List<CartDTO> cartDTOList = carts.stream().map(cart -> {
            CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
            List<ProductDTO> products = cart.getCartItems().stream()
                    .map(cartItem ->
                            modelMapper.map(cartItem.getProduct(), ProductDTO.class)).toList();


            cartDTO.setProducts(products);
            return cartDTO;
        }).toList();


        cartDTOList.forEach(cartDTO -> cartService.UpdateProductInCart(cartDTO.getCartId(), productId));

        return modelMapper.map(savedProduct, ProductDTO.class);
    }


    @Override
    @Transactional
    public ProductDTO deleteProduct(Long productId) {
        System.out.println("Starting deleteProduct for productId: " + productId);

        Product productFromDB = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        System.out.println("Found product: " + productFromDB.getProductName());

        // Delete from all carts that contain this product
        List<Cart> carts = cartRepository.findCartsByProductId(productId);
        System.out.println("Found " + carts.size() + " carts containing this product");

        carts.forEach(cart -> {
            System.out.println("Deleting product from cartId: " + cart.getCartId());
            cartService.deleteProductFromCart(cart.getCartId(), productId);
        });

        // Refresh the product entity to get updated relationships
        productFromDB = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

        System.out.println("After cart cleanup, product has " + productFromDB.getProducts().size() + " cart items");

        // Now delete the product
        productRepository.delete(productFromDB);
        System.out.println("Product deleted successfully");

        return modelMapper.map(productFromDB, ProductDTO.class);
    }


    @Override
    public ProductDTO updateProductImage(Long productId, MultipartFile image) throws IOException {
        Product productFromDB = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product", "productId", productId));


        String fileName = fileService.uploadImage(path, image);
        productFromDB.setImage(fileName);
        Product savedProduct = productRepository.save(productFromDB);
        return modelMapper.map(savedProduct, ProductDTO.class);
    }

    @Override
    public ProductResponse getAllProductsForAdmin(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Product> pageProducts = productRepository.findAll(pageDetails);

        List<Product> products = pageProducts.getContent();

        List<ProductDTO> productDTOS = products.stream()
                .map(product -> {
                    ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
                    productDTO.setImage(constructImageUrl(product.getImage()));
                    return productDTO;
                })
                .toList();

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOS);
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setLastPage(pageProducts.isLast());
        return productResponse;
    }

//    @Override
//    public ProductResponse getAllProductsForSeller(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
//        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
//                ? Sort.by(sortBy).ascending()
//                : Sort.by(sortBy).descending();
//
//        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
//
//        User user = authUtil.getLoggedInUser();
//        Page<Product> pageProducts = productRepository.findByUser(user, pageDetails);
//
//        List<Product> products = pageProducts.getContent();
//
//        List<ProductDTO> productDTOS = products.stream()
//                .map(product -> {
//                    ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
//                    productDTO.setImage(constructImageUrl(product.getImage()));
//                    return productDTO;
//                })
//                .toList();
//
//        ProductResponse productResponse = new ProductResponse();
//        productResponse.setContent(productDTOS);
//        productResponse.setPageNumber(pageProducts.getNumber());
//        productResponse.setPageSize(pageProducts.getSize());
//        productResponse.setTotalElements(pageProducts.getTotalElements());
//        productResponse.setTotalPages(pageProducts.getTotalPages());
//        productResponse.setLastPage(pageProducts.isLast());
//        return productResponse;
//    }
    @Override
    public ProductResponse getAllProductsForSeller(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        System.out.println("getAllProductsForSeller called with pageNumber: " + pageNumber + ", pageSize: " + pageSize + ", sortBy: " + sortBy + ", sortOrder: " + sortOrder);

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        System.out.println("Sort object created: " + sortByAndOrder);

        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        System.out.println("Pageable created: " + pageDetails);

        User user = authUtil.getLoggedInUser();
        System.out.println("Logged in user: " + (user != null ? user.getUsername() : "null"));

        Page<Product> pageProducts = productRepository.findByUser(user, pageDetails);
        System.out.println("Fetched products page: totalElements=" + pageProducts.getTotalElements() + ", totalPages=" + pageProducts.getTotalPages());

        List<Product> products = pageProducts.getContent();
        System.out.println("Products list size: " + products.size());

        List<ProductDTO> productDTOS = products.stream()
                .map(product -> {
                    System.out.println("Mapping product: " + product.getProductName() + ", id: " + product.getProductId());
                    ProductDTO productDTO = modelMapper.map(product, ProductDTO.class);
                    productDTO.setImage(constructImageUrl(product.getImage()));
                    System.out.println("Mapped ProductDTO: " + productDTO.getProductName() + ", image: " + productDTO.getImage());
                    return productDTO;
                })
                .toList();

        System.out.println("ProductDTO list size: " + productDTOS.size());

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOS);
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setLastPage(pageProducts.isLast());

        System.out.println("ProductResponse created: pageNumber=" + productResponse.getPageNumber() + ", pageSize=" + productResponse.getPageSize() + ", totalElements=" + productResponse.getTotalElements() + ", totalPages=" + productResponse.getTotalPages() + ", lastPage=" + productResponse.isLastPage());

        return productResponse;
    }

    private ProductResponse getProductResponse(Page<Product> pageProducts) {
        List<Product> products = pageProducts.getContent();

        List<ProductDTO> productDTOList = products.stream().map(product ->
                modelMapper.map(product, ProductDTO.class)).toList();

        ProductResponse productResponse = new ProductResponse();
        productResponse.setContent(productDTOList);
        productResponse.setPageNumber(pageProducts.getNumber());
        productResponse.setPageSize(pageProducts.getSize());
        productResponse.setTotalElements(pageProducts.getTotalElements());
        productResponse.setTotalPages(pageProducts.getTotalPages());
        productResponse.setLastPage(pageProducts.isLast());
        return productResponse;
    }
}
