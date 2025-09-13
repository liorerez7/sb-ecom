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
import java.util.Objects;

@Service
@Transactional
public class StripeServiceImpl implements StripeService{

    @Value( "${stripe.secret.key}")
    private String stripeApiKey;


    // it will run once after the bean is created and dependency injection is done
    @PostConstruct
    public void init(){
        Stripe.apiKey = stripeApiKey;
    }

    @Override
    public PaymentIntent paymentIntent(StripePaymentDTO stripePaymentDTO) throws StripeException {

        Customer customer;

        CustomerSearchParams searchParams =
                CustomerSearchParams.builder()
                        .setQuery("email:'" + stripePaymentDTO.getEmail() + "'")
                        .build();

        CustomerSearchResult customers = Customer.search(searchParams);

        if(customers.getData().isEmpty()) {

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

        } else{
            customer = customers.getData().getFirst();
        }


        PaymentIntentCreateParams.Builder builder =
                PaymentIntentCreateParams.builder()
                        .setAmount(stripePaymentDTO.getAmount())
                        .setCurrency(stripePaymentDTO.getCurrency())
                        .setCustomer(customer.getId())
                        .setDescription(stripePaymentDTO.getDescription())
                        .addPaymentMethodType("card");


        if (stripePaymentDTO.getMetadata() != null) {
            for (Map.Entry<String, String> e : stripePaymentDTO.getMetadata().entrySet()) {
                builder.putMetadata(e.getKey(), e.getValue());
            }
        }

        PaymentIntentCreateParams params = builder.build();

        // Idempotency-Key מהלקוח (נשלח ב-metadata)
        String idemKey = stripePaymentDTO.getMetadata() != null
                ? stripePaymentDTO.getMetadata().get("idempotencyKey")
                : null;

        RequestOptions options = RequestOptions.builder()
                .setIdempotencyKey(idemKey)
                .build();

        return PaymentIntent.create(params, options);
    }
}
