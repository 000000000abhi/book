import React from 'react';
import { useLocation } from 'react-router-dom';

function Checkout() {
  const { state } = useLocation();
  const item = state?.item;

  if (!item) return <div>Item not found</div>;

  return (
    <div className="checkout-page">
      <h1>Checkout for {item.name}</h1>
      <p>Price: ${item.price}</p>
      {/* Add other purchase options here */}
      <button className="buy-confirm-button">Confirm Purchase</button>
    </div>
  );
}

export default Checkout;
