import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Products from "./pages/Products.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Cart from "./pages/Cart.jsx";
import Admin from "./pages/Admin.jsx";

import { CartProvider } from "./context/CartContext"; // ✅ MUST be used

// 🔐 Protect routes
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <CartProvider> {/* 🔥 THIS LINE FIXES WARNING */}
      <Router>
        <Routes>

          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* PROTECTED */}
          <Route
            path="/"
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

          {/* DEFAULT */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;