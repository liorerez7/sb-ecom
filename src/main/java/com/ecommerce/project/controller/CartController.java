//package com.ecommerce.project.controller;
//
//import com.ecommerce.project.model.Cart;
//import com.ecommerce.project.model.CartItem;
//import com.ecommerce.project.payload.CartDTO;
//import com.ecommerce.project.payload.CartItemDTO;
//import com.ecommerce.project.reposetories.CartRepository;
//import com.ecommerce.project.service.CartService;
//import com.ecommerce.project.util.AuthUtil;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.w3c.dom.stylesheets.LinkStyle;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api")
//public class CartController {
//
//    @Autowired
//    private CartService cartService;
//
//    @Autowired
//    private AuthUtil authUtil;
//
//    @Autowired
//    private CartRepository cartRepository;
//
//    @PostMapping("/carts/products/{productId}/quantity/{quantity}")
//    public ResponseEntity<CartDTO> addProductToCard(@PathVariable Long productId,
//                                                    @PathVariable Integer quantity){
//        CartDTO cartDTO = cartService.addProductToCart(productId, quantity);
//        return new ResponseEntity<>(cartDTO, HttpStatus.CREATED);
//    }
//
//    @PostMapping("/cart/create")
//    public ResponseEntity<String> createOrUpdateCart(@RequestBody List<CartItemDTO> cartItems){
//        String response = cartService.createOrUpdateCartWithItems(cartItems);
//        return new ResponseEntity<>(response, HttpStatus.CREATED);
//    }
//
//    @GetMapping("/carts")
//    public ResponseEntity<List<CartDTO>> getCarts(){
//        List<CartDTO> cartDTOList = cartService.getAllCarts();
//        return new ResponseEntity<>(cartDTOList, HttpStatus.OK);
//    }
//
//    @GetMapping("/carts/users/cart")
//    public ResponseEntity<CartDTO> getCartById(){
//        String emailId = authUtil.loggedInEmail();
//        Cart cart = cartRepository.findCartByEmail(emailId);
//
//        if (cart == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//
//        CartDTO cartDTO = cartService.getCart(emailId, cart.getCartId());
//        return new ResponseEntity<>(cartDTO, HttpStatus.OK);
//    }
//
//    @PutMapping("/cart/products/{productId}/quantity/{operation}")
//    public ResponseEntity<CartDTO> updateCartProduct(@PathVariable Long productId,
//                                                           @PathVariable String operation) {
//        CartDTO cartDTO = cartService.updateProductQuantityInCart(productId,
//                operation.equalsIgnoreCase("delete") ? -1 : 1);
//
//        return new ResponseEntity<>(cartDTO, HttpStatus.OK);
//    }
//
//    @DeleteMapping("/carts/{cartId}/product/{productId}")
//    public ResponseEntity<String> deleteProductFromCart(@PathVariable Long cartId,
//                                                        @PathVariable Long productId) {
//
//        String status = cartService.deleteProductFromCart(cartId, productId);
//
//        return new ResponseEntity<>(status, HttpStatus.OK);
//
//
//
//    }
//}

package com.ecommerce.project.controller;

import com.ecommerce.project.model.Cart;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.CartItemDTO;
import com.ecommerce.project.reposetories.CartRepository;
import com.ecommerce.project.service.CartService;
import com.ecommerce.project.util.AuthUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Carts", description = "Shopping cart operations")
@RestController
@RequestMapping("/api")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private CartRepository cartRepository;

    @Operation(summary = "Add product to cart")
    @PostMapping("/carts/products/{productId}/quantity/{quantity}")
    public ResponseEntity<CartDTO> addProductToCard(@PathVariable Long productId,
                                                    @PathVariable Integer quantity){
        CartDTO cartDTO = cartService.addProductToCart(productId, quantity);
        return new ResponseEntity<>(cartDTO, HttpStatus.CREATED);
    }

    @Operation(summary = "Create or update cart with items")
    @PostMapping("/cart/create")
    public ResponseEntity<String> createOrUpdateCart(@RequestBody List<CartItemDTO> cartItems){
        String response = cartService.createOrUpdateCartWithItems(cartItems);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(summary = "List all carts")
    @GetMapping("/carts")
    public ResponseEntity<List<CartDTO>> getCarts(){
        List<CartDTO> cartDTOList = cartService.getAllCarts();
        return new ResponseEntity<>(cartDTOList, HttpStatus.OK);
    }

    @Operation(summary = "Get current user's cart")
    @GetMapping("/carts/users/cart")
    public ResponseEntity<CartDTO> getCartById(){
        String emailId = authUtil.loggedInEmail();
        Cart cart = cartRepository.findCartByEmail(emailId);

        if (cart == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        CartDTO cartDTO = cartService.getCart(emailId, cart.getCartId());
        return new ResponseEntity<>(cartDTO, HttpStatus.OK);
    }

    @Operation(summary = "Update product quantity in cart")
    @PutMapping("/cart/products/{productId}/quantity/{operation}")
    public ResponseEntity<CartDTO> updateCartProduct(@PathVariable Long productId,
                                                     @PathVariable String operation) {
        CartDTO cartDTO = cartService.updateProductQuantityInCart(
                productId,
                operation.equalsIgnoreCase("delete") ? -1 : 1
        );
        return new ResponseEntity<>(cartDTO, HttpStatus.OK);
    }

    @Operation(summary = "Remove product from cart")
    @DeleteMapping("/carts/{cartId}/product/{productId}")
    public ResponseEntity<String> deleteProductFromCart(@PathVariable Long cartId,
                                                        @PathVariable Long productId) {
        String status = cartService.deleteProductFromCart(cartId, productId);
        return new ResponseEntity<>(status, HttpStatus.OK);
    }
}
