import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Products from "./pages/Products.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Cart from "./pages/Cart.jsx";
import Admin from "./pages/Admin.jsx";

import { CartProvider } from "./context/CartContext";

// 🔐 Protect routes (UPDATED)
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // 👉 CHANGE HERE (login → signup)
  return isLoggedIn ? children : <Navigate to="/signup" />;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>

          {/* ✅ DEFAULT → SIGNUP */}
          <Route path="/" element={<Navigate to="/signup" />} />

          {/* ✅ PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ PROTECTED ROUTES */}
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />

          {/* ✅ FALLBACK */}
          <Route path="*" element={<Navigate to="/signup" />} />

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;