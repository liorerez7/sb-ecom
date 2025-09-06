// import React from 'react';

// function OrderSummary({ totalPrice, cart, address, paymentMethod }) {
//     return (
//         <div style={{ maxWidth: 500, margin: '0 auto', fontFamily: 'sans-serif', fontSize: 15, lineHeight: 1.6 }}>
//             <section style={{ marginBottom: 24 }}>
//                 <h2 style={{ fontSize: 18, marginBottom: 8 }}>Billing Address</h2>
//                 <div>
//                     <div>Building Name: <b>{address?.buildingName}</b></div>
//                     <div>Street: <b>{address?.street}</b></div>
//                     <div>City: <b>{address?.city}</b></div>
//                     <div>State: <b>{address?.state}</b></div>
//                     <div>Postal Code: <b>{address?.zipCode}</b></div>
//                     <div>Country: <b>{address?.country}</b></div>
//                 </div>
//             </section>

//             <section style={{ marginBottom: 24 }}>
//                 <h2 style={{ fontSize: 18, marginBottom: 8 }}>Payment Method</h2>
//                 <div>Method: <b>{paymentMethod}</b></div>
//             </section>

//             <section style={{ marginBottom: 24 }}>
//                 <h2 style={{ fontSize: 18, marginBottom: 8 }}>Order Items</h2>
//                 <div>
//                     {cart?.map(item => (
//                         <div key={item.productId} style={{ display: 'flex', alignItems: 'center', marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
//                             <img
//                                 src={item?.image?.startsWith('http')
//                                     ? item.image
//                                     : `${import.meta.env.VITE_APP_API_BASE_URL}/images/${item.image}`}
//                                 alt={item.productName}
//                                 width={60}
//                                 height={60}
//                                 style={{ objectFit: 'cover', marginRight: 12, borderRadius: 4 }}
//                             />
//                             <div>
//                                 <div style={{ fontWeight: 600 }}>{item.productName}</div>
//                                 <div style={{ color: '#555' }}>{item.productName}</div>
//                                 <div>{item.quantity} x ${item.specialPrice} = <b>${item.quantity * item.specialPrice}</b></div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             <section style={{ borderTop: '1px solid #eee', paddingTop: 16 }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
//                     <span>Products</span>
//                     <span>${totalPrice}</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
//                     <span>Shipping</span>
//                     <span>$0.00</span>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
//                     <span>SubTotal</span>
//                     <span>${totalPrice}</span>
//                 </div>
//             </section>
//         </div>
//     );
// }
import React from 'react';

// MUI Components
import {
  Avatar,
  Box,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

// HeroIcons
import { HomeIcon, CreditCardIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';

function OrderSummary({ totalPrice, cart, address, paymentMethod }) {
  const renderAddress = () => (
    <Box>
      <Typography variant="body2" component="div">Building: <b>{address?.buildingName}</b></Typography>
      <Typography variant="body2" component="div">Street: <b>{address?.street}</b></Typography>
      <Typography variant="body2" component="div">City: <b>{address?.city}</b></Typography>
      <Typography variant="body2" component="div">State: <b>{address?.state}</b></Typography>
      <Typography variant="body2" component="div">Postal Code: <b>{address?.zipCode}</b></Typography>
      <Typography variant="body2" component="div">Country: <b>{address?.country}</b></Typography>
    </Box>
  );

  return (
    <Paper
      elevation={0}
      sx={{
        maxWidth: 600,
        margin: 'auto',
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Billing Address Section */}
      <Box component="section" sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <HomeIcon width={22} height={22} />
          <Typography variant="h6" component="h2">Billing Address</Typography>
        </Stack>
        {address ? renderAddress() : <Typography color="text.secondary">No address selected.</Typography>}
      </Box>
      <Divider sx={{ mb: 3 }} />

      {/* Payment Method Section */}
      <Box component="section" sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <CreditCardIcon width={22} height={22} />
          <Typography variant="h6" component="h2">Payment Method</Typography>
        </Stack>
        <Typography variant="body1">Method: <b>{paymentMethod || 'Not selected'}</b></Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />

      {/* Order Items Section */}
      <Box component="section" sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <ShoppingBagIcon width={22} height={22} />
          <Typography variant="h6" component="h2">Order Items</Typography>
        </Stack>
        <List disablePadding>
          {cart?.map((item, index) => (
            <React.Fragment key={item.productId}>
              <ListItem disableGutters sx={{ py: 1.5 }}>
                <ListItemAvatar>
                  <Avatar
                    src={item?.image?.startsWith('http') ? item.image : `${import.meta.env.VITE_APP_API_BASE_URL}/images/${item.image}`}
                    alt={item.productName}
                    variant="rounded"
                    sx={{ width: 64, height: 64, mr: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight="600" component="div">
                      {item.productName}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {`${item.quantity} x $${item.specialPrice.toFixed(2)}`}
                    </Typography>
                  }
                />
                <Typography variant="body1" fontWeight="600" sx={{ ml: 2, whiteSpace: 'nowrap' }}>
                  {`$${(item.quantity * item.specialPrice).toFixed(2)}`}
                </Typography>
              </ListItem>
              {index < cart.length - 1 && <Divider component="li" variant="inset" />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Totals Section */}
      <Box component="section">
        <Divider sx={{ my: 2 }} />
        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" color="text.secondary">Products Total</Typography>
            <Typography variant="body1" color="text.secondary">{`$${totalPrice.toFixed(2)}`}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1" color="text.secondary">Shipping</Typography>
            <Typography variant="body1" color="text.secondary">$0.00</Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">SubTotal</Typography>
            <Typography variant="h6">{`$${totalPrice.toFixed(2)}`}</Typography>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}

export default OrderSummary;