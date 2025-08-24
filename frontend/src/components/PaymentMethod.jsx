import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addPaymentMethod } from '../store/actions';
import { createUserCart } from '../store/actions';


function PaymentMethod({ value, onChange }) {
    // Get the selected payment method from Redux state
    const { paymentMethod } = useSelector((state) => state.payment);
    const dispatch = useDispatch();
    const {cart, cartId} = useSelector((state) => state.carts);
    const {isLoading, errorMessage} = useSelector((state) => state.errors);

    useEffect(() => {
        if(cart.length > 0 && !cartId && !errorMessage) {
            const sendCartItems = cart.map((item) => {
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                };
            });

            dispatch(createUserCart(sendCartItems));
        }

    }, [dispatch, cartId]);

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Select Payment Method</FormLabel>
            <RadioGroup
                value={value ?? paymentMethod ?? ''}
                onChange={(e) => {
                    dispatch(addPaymentMethod(e.target.value));
                    onChange?.(e);
                }}
                >
                <FormControlLabel value="Stripe" control={<Radio />} label="Stripe" />
                <FormControlLabel value="PayPal" control={<Radio />} label="PayPal" />

            </RadioGroup>
        </FormControl>
    );
}

export default PaymentMethod;