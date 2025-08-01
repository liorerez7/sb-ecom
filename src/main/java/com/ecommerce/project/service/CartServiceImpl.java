package com.ecommerce.project.service;

import com.ecommerce.project.execptions.APIException;
import com.ecommerce.project.execptions.ResourceNotFoundException;
import com.ecommerce.project.model.Cart;
import com.ecommerce.project.model.CartItem;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.reposetories.CartItemRepository;
import com.ecommerce.project.reposetories.CartRepository;
import com.ecommerce.project.reposetories.ProductRepository;
import com.ecommerce.project.util.AuthUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Stream;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CartItemRepository cartItemRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    AuthUtil authUtil;

    @Override
    public CartDTO addProductToCart(Long productId, Integer quantity) {
        Cart cart = createCart();

        Product product = productRepository.findById(productId).orElseThrow(
                () -> new ResourceNotFoundException("Product", "productId", productId)
        );

        validationChecks(product, cart, productId, quantity);


        CartItem newCartItem = new CartItem();
        newCartItem.setProduct(product);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(quantity);
        newCartItem.setDiscount(product.getDiscount());
        newCartItem.setProductPrice(product.getSpecialPrice());

        cartItemRepository.save(newCartItem);

        // just for the first product that is being added, when cart is empty
        cart.getCartItems().add(newCartItem);


        //TODO: only for development purpose, maybe later product quantity = product.getQuantity() - quantity;
        product.setQuantity(product.getQuantity());

        cart.setTotalPrice(cart.getTotalPrice() + (product.getSpecialPrice() * quantity));
        cartRepository.save(cart);

        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        List<CartItem> cartItems = cart.getCartItems();

        Stream<ProductDTO> productDTOStream = cartItems.stream().map(cartItem ->
            {
                ProductDTO map = modelMapper.map(cartItem.getProduct(), ProductDTO.class);
                map.setQuantity(cartItem.getQuantity());
                return map;
            });

        cartDTO.setProducts(productDTOStream.toList());

        return cartDTO;
    }

    @Override
    public List<CartDTO> getAllCarts() {
        List<Cart> carts = cartRepository.findAll();
        if(carts.isEmpty()) {
            throw new APIException("No carts found");
        }

        List<CartDTO> dtoCarts = carts.stream().map(cart -> {
            CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
            List<CartItem> cartItems = cart.getCartItems();

            cart.getCartItems().forEach(cartItem -> {cartItem.getProduct().setQuantity(cartItem.getQuantity());});



            Stream<ProductDTO> productDTOStream = cartItems.stream().map(cartItem ->
            {
                ProductDTO map = modelMapper.map(cartItem.getProduct(), ProductDTO.class);
                map.setQuantity(cartItem.getQuantity());
                return map;
            });

            cartDTO.setProducts(productDTOStream.toList());
            return cartDTO;
        }).toList();

        return dtoCarts;
    }


    @Override
    public CartDTO getCart(String emailId, Long cartId) {
        Cart cart = cartRepository.findCartByEmailAndCartId(emailId, cartId);
        if(cart == null) {
            throw new ResourceNotFoundException("Cart", "cartId", cartId);
        }
        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        cart.getCartItems().forEach(cartItem -> {cartItem.getProduct().setQuantity(cartItem.getQuantity());});
        List<ProductDTO> products = cart.getCartItems().stream()
                .map(p -> modelMapper.map(p.getProduct(), ProductDTO.class))
                .toList();

        cartDTO.setProducts(products);
        return cartDTO;
    }

    @Transactional
    @Override
    public CartDTO updateProductQuantityInCart(Long productId, Integer quantity) {
        String emailId = authUtil.loggedInEmail();
        Cart userCart = cartRepository.findCartByEmail(emailId);
        Long cartId = userCart.getCartId();

        Cart cart = cartRepository.findById(cartId).orElseThrow(
                () -> new ResourceNotFoundException("Cart", "cartId", cartId)
        );

        Product product = productRepository.findById(productId).orElseThrow(
                () -> new ResourceNotFoundException("Product", "productId", productId)
        );

        if(product.getQuantity() == 0) {
            throw new APIException("Product " + product.getProductName() + " is out of stock");
        }

        if(quantity > product.getQuantity()) {
            throw new APIException("Requested quantity for product " + product.getProductName() + " exceeds available stock");
        }

        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cartId, productId);

        if(cartItem == null) {
            throw new APIException("Product " + product.getProductName() + " not found in cart");
        }

        int newQuantity = cartItem.getQuantity() + quantity;
        if(newQuantity < 0) {
            throw new APIException("Cannot reduce quantity below zero for product " + product.getProductName());
        }

        if(newQuantity == 0) {
            deleteProductFromCart(cartId, productId);
        }
        else{
            cartItem.setProductPrice(product.getSpecialPrice());
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItem.setDiscount(product.getDiscount());
            cart.setTotalPrice(cart.getTotalPrice() + (cartItem.getProductPrice() * quantity));
            cartRepository.save(cart);
        }

        CartItem updatedItem = cartItemRepository.save(cartItem);
        if(updatedItem.getQuantity() == 0) {
            cartItemRepository.deleteById(updatedItem.getCartItemId());
        }

        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        List<CartItem> cartItems = cart.getCartItems();
        Stream<ProductDTO> productDTOStream = cartItems.stream().map(cartItem1 -> {
            ProductDTO map = modelMapper.map(cartItem1.getProduct(), ProductDTO.class);
            map.setQuantity(cartItem1.getQuantity());
            return map;
        });

        cartDTO.setProducts(productDTOStream.toList());
        return cartDTO;
    }

    @Transactional
    @Override
    public String deleteProductFromCart(Long cartId, Long productId) {

        Cart cart = cartRepository.findById(cartId).orElseThrow(
                () -> new ResourceNotFoundException("Cart", "cartId", cartId)
        );

        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cartId, productId);
        if (cartItem == null) {
            throw new APIException("Product with ID " + productId + " not found in cart with ID " + cartId);
        }

        cart.setTotalPrice(cart.getTotalPrice() - cartItem.getProductPrice() * cartItem.getQuantity());

        cartItemRepository.deleteCartItemByProductIdAndCartId(cartId, productId);

        return "Product with ID " + productId + " deleted from cart with ID " + cartId;

    }

    @Override
    public void UpdateProductInCart(Long cartId, Long productId) {

        Cart cart = cartRepository.findById(cartId).orElseThrow(
                () -> new ResourceNotFoundException("Cart", "cartId", cartId)
        );

        Product product = productRepository.findById(productId).orElseThrow(
                () -> new ResourceNotFoundException("Product", "productId", productId)
        );

        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cartId, productId);

        if(cartItem == null) {
            throw new APIException("Product with ID " + productId + " not found in cart with ID " + cartId);
        }

        // e.g. 1000 - 100*2 = 800. (meaning the old product price was 100 and quantity was 2)
        double cartPrice = cart.getTotalPrice() -
                cartItem.getProductPrice() * cartItem.getQuantity();

        // new price = 200 for example
        cartItem.setProductPrice(product.getSpecialPrice());

        // e.g. 800 + 200*2 = 1200. (meaning the new product price is 200 and quantity is still 2)
        cart.setTotalPrice(cartPrice + cartItem.getProductPrice() * cartItem.getQuantity());

        cartItemRepository.save(cartItem);
    }

    private Cart createCart(){
        Cart userCart = cartRepository.findCartByEmail(authUtil.loggedInEmail());
        if(userCart != null){
            return userCart;
        }
        Cart Cart = new Cart();
        Cart.setUser(authUtil.getLoggedInUser());
        Cart.setTotalPrice(0.0);
        return cartRepository.save(Cart);
    }

    private void validationChecks(Product product, Cart cart, Long productId, Integer quantity) throws APIException {
        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(
                cart.getCartId(),
                productId
        );

        if(cartItem != null) {
            throw new APIException("Product " + product.getProductName() + " already exists in the cart");
        }

        if(product.getQuantity() == 0) {
            throw new APIException("Product " + product.getProductName() + " is out of stock");
        }

        if(quantity > product.getQuantity()) {
            throw new APIException("Requested quantity for product " + product.getProductName() + " exceeds available stock");
        }
    }
}
