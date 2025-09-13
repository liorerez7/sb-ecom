package com.ecommerce.project.controller;

import com.ecommerce.project.config.AppConstants;
import com.ecommerce.project.payload.*;
import com.ecommerce.project.service.OrderService;
import com.ecommerce.project.service.StripeService;
import com.ecommerce.project.util.AuthUtil;
import com.stripe.model.PaymentIntent;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Orders", description = "Place orders, manage status & payments")
@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private StripeService stripeService;

    @Operation(
            summary = "Place order",
            description = "Creates an order for the current user with the given payment method.",
            requestBody = @RequestBody(description = "Order details (address & payment gateway metadata)", required = true)
    )
    @ApiResponse(responseCode = "201", description = "Order created")
    @PostMapping("/order/users/payments/{paymentMethod}")
    public ResponseEntity<OrderDTO> orderProducts(
            @Parameter(description = "Payment method (e.g., 'stripe' or 'cod')", required = true, example = "stripe")
            @PathVariable String paymentMethod,
            @org.springframework.web.bind.annotation.RequestBody OrderRequestDTO orderRequestDTO
    ){
        String emailId = authUtil.loggedInEmail();
        OrderDTO orderDTO = orderService.placeOrder(
                emailId,
                orderRequestDTO.getAddressId(),
                paymentMethod,
                orderRequestDTO.getPgPaymentId(),
                orderRequestDTO.getPgStatus(),
                orderRequestDTO.getPgResponseMessage(),
                orderRequestDTO.getPgName()
        );
        return new ResponseEntity<>(orderDTO, HttpStatus.CREATED);
    }

    @Operation(
            summary = "Create Stripe client secret",
            description = "Initializes a Stripe PaymentIntent and returns its client secret.",
            requestBody = @RequestBody(description = "Stripe payment request (amount, currency, etc.)", required = true)
    )
    @ApiResponse(responseCode = "201", description = "Client secret created")
    @PostMapping("/order/stripe-client-secret")
    public ResponseEntity<String> createStripeClientSecret(
            @org.springframework.web.bind.annotation.RequestBody StripePaymentDTO stripePaymentDTO
    ) throws Exception {
        PaymentIntent paymentIntent = stripeService.paymentIntent(stripePaymentDTO);
        return new ResponseEntity<>(paymentIntent.getClientSecret(), HttpStatus.CREATED);
    }

    @Operation(
            summary = "List all orders (admin)",
            description = "Admin endpoint. Supports pagination and sorting."
    )
    @GetMapping("/admin/orders")
    public ResponseEntity<OrderResponse> getAllOrders(
            @Parameter(description = "Zero-based page index", example = "0")
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER) Integer pageNumber,
            @Parameter(description = "Page size", example = "10")
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE) Integer pageSize,
            @Parameter(description = "Sort field", example = "orderId")
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_ORDERS_BY) String sortBy,
            @Parameter(description = "Sort direction", example = "asc")
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR) String sortOrder
    ) {
        OrderResponse orderResponse = orderService.getAllOrders(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(orderResponse, HttpStatus.OK);
    }

    @Operation(
            summary = "List seller orders",
            description = "Seller endpoint. Supports pagination and sorting."
    )
    @GetMapping("/seller/orders")
    public ResponseEntity<OrderResponse> getAllSellerOrders(
            @Parameter(description = "Zero-based page index", example = "0")
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER) Integer pageNumber,
            @Parameter(description = "Page size", example = "10")
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE) Integer pageSize,
            @Parameter(description = "Sort field", example = "orderId")
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_ORDERS_BY) String sortBy,
            @Parameter(description = "Sort direction", example = "asc")
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR) String sortOrder
    ) {
        OrderResponse orderResponse = orderService.getAllSellerOrders(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(orderResponse, HttpStatus.OK);
    }

    @Operation(
            summary = "Update order status (admin)",
            description = "Admin endpoint to update an order's status.",
            requestBody = @RequestBody(description = "New status payload", required = true)
    )
    @PutMapping("/admin/orders/{orderId}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(
            @Parameter(description = "Order ID", required = true, example = "1001")
            @PathVariable Long orderId,
            @org.springframework.web.bind.annotation.RequestBody OrderStatusUpdateDto orderStatusUpdateDto
    ) {
        OrderDTO order = orderService.updateOrder(orderId, orderStatusUpdateDto.getStatus());
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @Operation(
            summary = "Update order status (seller)",
            description = "Seller endpoint to update an order's status.",
            requestBody = @RequestBody(description = "New status payload", required = true)
    )
    @PutMapping("/seller/orders/{orderId}/status")
    public ResponseEntity<OrderDTO> updateOrderStatusSeller(
            @Parameter(description = "Order ID", required = true, example = "1001")
            @PathVariable Long orderId,
            @org.springframework.web.bind.annotation.RequestBody OrderStatusUpdateDto orderStatusUpdateDto
    ) {
        OrderDTO order = orderService.updateOrder(orderId, orderStatusUpdateDto.getStatus());
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
