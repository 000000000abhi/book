import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import { ThemeProvider } from './context/ThemeContext'; // Ensure correct path
import { CartProvider } from './context/CartContext'; // Import the CartProvider
import { WishlistProvider } from './context/WishlistContext'; // Import the WishlistProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
  
    <BrowserRouter>
    <CartProvider>
    <WishlistProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
   
  </ThemeProvider>
);
