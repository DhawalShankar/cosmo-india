import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter> 
      <DarkModeProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </DarkModeProvider>
    </BrowserRouter>
     </AuthProvider>
  </StrictMode>
);