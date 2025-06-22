package com.ecommerce.project.service;

import com.ecommerce.project.execptions.APIException;
import com.ecommerce.project.execptions.ResourceNotFoundException;
import com.ecommerce.project.model.Cart;
import com.ecommerce.project.model.CartItem;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.CartItemDTO;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.reposetories.CartItemRepository;
import com.ecommerce.project.reposetories.CartRepository;
import com.ecommerce.project.reposetories.ProductRepository;
import com.ecommerce.project.util.AuthUtil;
import org.apache.catalina.LifecycleState;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.naming.Context;
import java.lang.module.ResolutionException;
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
                    modelMapper.map(cartItem.getProduct(), ProductDTO.class));

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
