import React from 'react';

function OrderSummary({ totalPrice, cart, address, paymentMethod }) {
    return (
        <div style={{ maxWidth: 500, margin: '0 auto', fontFamily: 'sans-serif', fontSize: 15, lineHeight: 1.6 }}>
            <section style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 18, marginBottom: 8 }}>Billing Address</h2>
                <div>
                    <div>Building Name: <b>{address?.buildingName}</b></div>
                    <div>Street: <b>{address?.street}</b></div>
                    <div>City: <b>{address?.city}</b></div>
                    <div>State: <b>{address?.state}</b></div>
                    <div>Postal Code: <b>{address?.zipCode}</b></div>
                    <div>Country: <b>{address?.country}</b></div>
                </div>
            </section>

            <section style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 18, marginBottom: 8 }}>Payment Method</h2>
                <div>Method: <b>{paymentMethod}</b></div>
            </section>

            <section style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 18, marginBottom: 8 }}>Order Items</h2>
                <div>
                    {cart?.map(item => (
                        <div key={item.productId} style={{ display: 'flex', alignItems: 'center', marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
                            <img
                                src={item?.image?.startsWith('http')
                                    ? item.image
                                    : `${import.meta.env.VITE_APP_API_BASE_URL}/images/${item.image}`}
                                alt={item.productName}
                                width={60}
                                height={60}
                                style={{ objectFit: 'cover', marginRight: 12, borderRadius: 4 }}
                            />
                            <div>
                                <div style={{ fontWeight: 600 }}>{item.productName}</div>
                                <div style={{ color: '#555' }}>{item.productName}</div>
                                <div>{item.quantity} x ${item.specialPrice} = <b>${item.quantity * item.specialPrice}</b></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ borderTop: '1px solid #eee', paddingTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span>Products</span>
                    <span>${totalPrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span>Shipping</span>
                    <span>$0.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                    <span>SubTotal</span>
                    <span>${totalPrice}</span>
                </div>
            </section>
        </div>
    );
}

export default OrderSummary;
