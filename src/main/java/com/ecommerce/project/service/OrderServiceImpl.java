package com.ecommerce.project.service;

import com.ecommerce.project.execptions.APIException;
import com.ecommerce.project.execptions.ResourceNotFoundException;
import com.ecommerce.project.model.*;
import com.ecommerce.project.payload.OrderDTO;
import com.ecommerce.project.payload.OrderItemDTO;
import com.ecommerce.project.payload.OrderRequestDTO;
import com.ecommerce.project.payload.OrderResponse;
import com.ecommerce.project.reposetories.*;
import com.ecommerce.project.util.AuthUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartService cartService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AuthUtil authUtil;

    @Override
    @Transactional
    public OrderDTO placeOrder(String emailId, Long addressId, String paymentMethod, String pgPaymentId,
                               String pgStatus, String pgResponseMessage, String pgName) {
        org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(OrderServiceImpl.class);
        logger.info("Line 60: Getting user cart for emailId={}", emailId);
        Cart cart = cartRepository.findCartByEmail(emailId);
        if (cart == null || cart.getCartItems().isEmpty()) {
            logger.error("Line 62: Cart not found or empty for emailId={}", emailId);
            throw new ResourceNotFoundException("Cart", "email", emailId);
        }

        logger.info("Line 65: Fetching address for addressId={}", addressId);
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> {
                    logger.error("Line 66: Address not found for addressId={}", addressId);
                    return new ResourceNotFoundException("Address", "id", addressId);
                });

        logger.info("Line 68: Creating new Order object");
        Order order = new Order();
        order.setEmail(emailId);
        order.setOrderDate(LocalDate.now());
        order.setTotalAmount(cart.getTotalPrice());
        order.setOrderStatus("Accepted");
        order.setAddress(address);

        logger.info("Line 75: Creating new Payment object");
        Payment payment = new Payment(paymentMethod, pgPaymentId, pgStatus, pgResponseMessage, pgName);
        payment.setOrder(order);
        logger.info("Line 77: Saving payment");
        payment = paymentRepository.save(payment);
        order.setPayment(payment);
        logger.info("Line 79: Saving order");
        Order savedOrder = orderRepository.save(order);

        logger.info("Line 82: Getting cart items");
        List<CartItem> cartItems = cart.getCartItems();
        if(cartItems.isEmpty()){
            logger.error("Line 84: No items found in cart for emailId={}", emailId);
            throw new APIException("No items found in cart");
        }

        logger.info("Line 87: Creating order items from cart items");
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            logger.debug("Line 89: Processing cartItem with productId={}", cartItem.getProduct().getProductId());
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setDiscount(cartItem.getDiscount());
            orderItem.setOrderedProductPrice(cartItem.getProductPrice());
            orderItem.setOrder(savedOrder);
            orderItems.add(orderItem);
        }

        logger.info("Line 98: Saving all order items");
        orderItems = orderItemRepository.saveAll(orderItems);

        logger.info("Line 109: Collecting productIds from cart items");
        List<Long> productIds = cart.getCartItems().stream()
                .map(cartItem -> cartItem.getProduct().getProductId())
                .toList();

        logger.info("Line 114: Updating product quantities");
        cart.getCartItems().forEach(cartItem -> {
            int quantity = cartItem.getQuantity();
            Product product = cartItem.getProduct();
            logger.debug("Line 117: Updating productId={} quantity from {} to {}", product.getProductId(), product.getQuantity(), product.getQuantity() - quantity);
            product.setQuantity(product.getQuantity() - quantity);
            productRepository.save(product);
        });

        logger.info("Line 122: Removing products from cart");
        productIds.forEach(productId -> {
            logger.debug("Line 123: Removing productId={} from cartId={}", productId, cart.getCartId());
            cartService.deleteProductFromCart(cart.getCartId(), productId);
        });

        logger.info("Line 128: Mapping savedOrder to OrderDTO");
        OrderDTO orderDTO = modelMapper.map(savedOrder, OrderDTO.class);
        orderItems.forEach(orderItem -> {
            logger.debug("Line 130: Mapping orderItemId={} to OrderItemDTO", orderItem.getOrderItemId());
            OrderItemDTO orderItemDTO = modelMapper.map(orderItem, OrderItemDTO.class);
            orderDTO.getOrderItems().add(orderItemDTO);
        });

        logger.info("Line 134: Setting addressId={} in OrderDTO", addressId);
        orderDTO.setAddressId(addressId);
        logger.info("Line 135: Returning OrderDTO for orderId={}", savedOrder.getOrderId());
        return orderDTO;
    }

    @Override
    public OrderResponse getAllOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Order> pageOrders = orderRepository.findAll(pageDetails);
        List<Order> orders = pageOrders.getContent();
        List<OrderDTO> orderDTOs = orders.stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .toList();
        OrderResponse orderResponse = new OrderResponse();
        orderResponse.setContent(orderDTOs);
        orderResponse.setPageNumber(pageOrders.getNumber());
        orderResponse.setPageSize(pageOrders.getSize());
        orderResponse.setTotalElements(pageOrders.getTotalElements());
        orderResponse.setTotalPages(pageOrders.getTotalPages());
        orderResponse.setLastPage(pageOrders.isLast());
        return orderResponse;
    }

    @Override
    public OrderDTO updateOrder(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order","orderId",orderId));
        order.setOrderStatus(status);
        orderRepository.save(order);
        return modelMapper.map(order, OrderDTO.class);
    }

    @Override
    public OrderResponse getAllSellerOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);

        User seller = authUtil.getLoggedInUser();

        Page<Order> pageOrders = orderRepository.findAllBySellerId(seller.getId(), pageDetails);

        List<OrderDTO> orderDTOs = pageOrders.getContent().stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .toList();

        OrderResponse res = new OrderResponse();
        res.setContent(orderDTOs);
        res.setPageNumber(pageOrders.getNumber());
        res.setPageSize(pageOrders.getSize());
        res.setTotalElements(pageOrders.getTotalElements()); // עכשיו נכון, רק של המוכר
        res.setTotalPages(pageOrders.getTotalPages());
        res.setLastPage(pageOrders.isLast());
        return res;
    }
}
