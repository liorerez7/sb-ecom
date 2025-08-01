package com.ecommerce.project.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {

    private Long paymentId;
    private String paymentMethod; // e.g., "Credit Card", "PayPal"
    private String pgPaymentId; // Payment Gateway ID
    private String pgStatus; // Status from Payment Gateway
    private String pgResponseMessage; // Response message from Payment Gateway
    private String pgName; // Name of the Payment Gateway
}
