//package com.ecommerce.project.service;
//
//import com.ecommerce.project.payload.StripePaymentDTO;
//import com.stripe.Stripe;
//import com.stripe.exception.StripeException;
//import com.stripe.model.Customer;
//import com.stripe.model.CustomerSearchResult;
//import com.stripe.model.PaymentIntent;
//import com.stripe.net.RequestOptions;
//import com.stripe.param.CustomerCreateParams;
//import com.stripe.param.CustomerSearchParams;
//import com.stripe.param.PaymentIntentCreateParams;
//import jakarta.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.Map;
//import java.util.Objects;
//
//@Service
//@Transactional
//public class StripeServiceImpl implements StripeService{
//
//    @Value( "${stripe.secret.key}")
//    private String stripeApiKey;
//
//
//    // it will run once after the bean is created and dependency injection is done
//    @PostConstruct
//    public void init(){
//        Stripe.apiKey = stripeApiKey;
//    }
//
//    @Override
//    public PaymentIntent paymentIntent(StripePaymentDTO stripePaymentDTO) throws StripeException {
//
//        Customer customer;
//
//        CustomerSearchParams searchParams =
//                CustomerSearchParams.builder()
//                        .setQuery("email:'" + stripePaymentDTO.getEmail() + "'")
//                        .build();
//
//        CustomerSearchResult customers = Customer.search(searchParams);
//
//        if(customers.getData().isEmpty()) {
//
//            CustomerCreateParams customerParams =
//                    CustomerCreateParams.builder()
//                            .setName(stripePaymentDTO.getName())
//                            .setEmail(stripePaymentDTO.getEmail())
//                            .setAddress(
//                                    CustomerCreateParams.Address.builder()
//                                            .setLine1(stripePaymentDTO.getAddress().getStreet())
//                                            .setCity(stripePaymentDTO.getAddress().getCity())
//                                            .setState(stripePaymentDTO.getAddress().getState())
//                                            .setPostalCode(stripePaymentDTO.getAddress().getZipCode())
//                                            .setCountry(stripePaymentDTO.getAddress().getCountry())
//                                            .build()
//                            )
//                            .build();
//
//            customer = Customer.create(customerParams);
//
//        } else{
//            customer = customers.getData().getFirst();
//        }
//
//
//        PaymentIntentCreateParams.Builder builder =
//                PaymentIntentCreateParams.builder()
//                        .setAmount(stripePaymentDTO.getAmount())
//                        .setCurrency(stripePaymentDTO.getCurrency())
//                        .setCustomer(customer.getId())
//                        .setDescription(stripePaymentDTO.getDescription())
//                        .addPaymentMethodType("card");
//
//
//        if (stripePaymentDTO.getMetadata() != null) {
//            for (Map.Entry<String, String> e : stripePaymentDTO.getMetadata().entrySet()) {
//                builder.putMetadata(e.getKey(), e.getValue());
//            }
//        }
//
//        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
//                .setAmount(stripePaymentDTO.getAmount())
//                .setCurrency(stripePaymentDTO.getCurrency())
//                .setCustomer(customer.getId())
//                .setDescription(stripePaymentDTO.getDescription())
//                .setAutomaticPaymentMethods(
//                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
//                                .setEnabled(true)
//                                .build()
//                )
//                .build();
//
//        // Idempotency-Key מהלקוח (נשלח ב-metadata)
//        String idemKey = stripePaymentDTO.getMetadata() != null
//                ? stripePaymentDTO.getMetadata().get("idempotencyKey")
//                : null;
//
//        RequestOptions options = RequestOptions.builder()
//                .setIdempotencyKey(idemKey)
//                .build();
//
//        return PaymentIntent.create(params, options);
//    }
//}

package com.ecommerce.project.service;

import com.ecommerce.project.payload.StripePaymentDTO;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.model.PaymentIntent;
import com.stripe.net.RequestOptions;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@Transactional
public class StripeServiceImpl implements StripeService {

    @Value("${stripe.secret.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    @Override
    public PaymentIntent paymentIntent(StripePaymentDTO stripePaymentDTO) throws StripeException {
        try {
            System.out.println("🔍 Creating payment intent for amount: " + stripePaymentDTO.getAmount());
            System.out.println("📧 Customer email: " + stripePaymentDTO.getEmail());

            Customer customer;

            // חיפוש לקוח קיים
            CustomerSearchParams searchParams =
                    CustomerSearchParams.builder()
                            .setQuery("email:'" + stripePaymentDTO.getEmail() + "'")
                            .build();

            CustomerSearchResult customers = Customer.search(searchParams);

            if (customers.getData().isEmpty()) {
                System.out.println("👤 Creating new customer");

                CustomerCreateParams customerParams =
                        CustomerCreateParams.builder()
                                .setName(stripePaymentDTO.getName())
                                .setEmail(stripePaymentDTO.getEmail())
                                .setAddress(
                                        CustomerCreateParams.Address.builder()
                                                .setLine1(stripePaymentDTO.getAddress().getStreet())
                                                .setCity(stripePaymentDTO.getAddress().getCity())
                                                .setState(stripePaymentDTO.getAddress().getState())
                                                .setPostalCode(stripePaymentDTO.getAddress().getZipCode())
                                                .setCountry(stripePaymentDTO.getAddress().getCountry())
                                                .build()
                                )
                                .build();

                customer = Customer.create(customerParams);
                System.out.println("✅ New customer created with ID: " + customer.getId());
            } else {
                customer = customers.getData().getFirst();
                System.out.println("✅ Found existing customer with ID: " + customer.getId());
            }

            // בניית PaymentIntent עם כל הפרמטרים
            PaymentIntentCreateParams.Builder builder =
                    PaymentIntentCreateParams.builder()
                            .setAmount(stripePaymentDTO.getAmount())
                            .setCurrency(stripePaymentDTO.getCurrency())
                            .setCustomer(customer.getId())
                            .setDescription(stripePaymentDTO.getDescription())
                            .setAutomaticPaymentMethods(
                                    PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                            .setEnabled(true)
                                            .build()
                            );

            // הוספת metadata אם קיים
            if (stripePaymentDTO.getMetadata() != null) {
                System.out.println("📄 Adding metadata:");
                for (Map.Entry<String, String> entry : stripePaymentDTO.getMetadata().entrySet()) {
                    System.out.println("   " + entry.getKey() + ": " + entry.getValue());
                    // לא מוסיפים את idempotencyKey ל-metadata של PaymentIntent
                    if (!entry.getKey().equals("idempotencyKey")) {
                        builder.putMetadata(entry.getKey(), entry.getValue());
                    }
                }
            }

            PaymentIntentCreateParams params = builder.build();

            // שימוש ב-Idempotency Key רק אם נשלח
            String idempotencyKey = stripePaymentDTO.getMetadata() != null
                    ? stripePaymentDTO.getMetadata().get("idempotencyKey")
                    : null;

            PaymentIntent paymentIntent;

            if (idempotencyKey != null && !idempotencyKey.isEmpty()) {
                System.out.println("🔑 Using idempotency key: " + idempotencyKey);

                RequestOptions options = RequestOptions.builder()
                        .setIdempotencyKey(idempotencyKey)
                        .build();

                try {
                    paymentIntent = PaymentIntent.create(params, options);
                } catch (StripeException e) {
                    // אם יש בעיה עם idempotency key, ננסה לקבל את ה-PaymentIntent הקיים
                    if (e.getCode() != null && e.getCode().equals("idempotency_key_in_use")) {
                        System.out.println("⚠️ Idempotency key already used, attempting to retrieve existing PaymentIntent");
                        // במקרה זה, ננסה ליצור בלי idempotency key או לחפש את הקיים
                        paymentIntent = PaymentIntent.create(params);
                    } else {
                        throw e;
                    }
                }
            } else {
                System.out.println("📝 Creating PaymentIntent without idempotency key");
                paymentIntent = PaymentIntent.create(params);
            }

            System.out.println("✅ PaymentIntent created successfully with ID: " + paymentIntent.getId());
            System.out.println("💰 Client Secret: " + paymentIntent.getClientSecret());
            System.out.println("📊 Status: " + paymentIntent.getStatus());

            return paymentIntent;

        } catch (StripeException e) {
            System.err.println("❌ Stripe Error occurred:");
            System.err.println("   Error Code: " + e.getCode());
            System.err.println("   Error Message: " + e.getMessage());
            System.err.println("   Error Type: " + (e.getStripeError() != null ? e.getStripeError().getType() : "Unknown"));
            System.err.println("   Request ID: " + e.getRequestId());

            // בדיקה אם השגיאה קשורה ל-idempotency
            if (e.getMessage() != null && e.getMessage().contains("idempotent")) {
                System.err.println("💡 Tip: Clear localStorage 'stripe_idem' and try again");
            }

            throw e;
        } catch (Exception e) {
            System.err.println("❌ General Error in paymentIntent: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to create payment intent", e);
        }
    }
}