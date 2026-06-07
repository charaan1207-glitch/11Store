import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

import tshirt1 from "../assets/tshirt1.jpg";
import tshirt2 from "../assets/tshirt2.jpg";
import tshirt3 from "../assets/tshirt3.jpg";

function Products() {
  const navigate = useNavigate();
  const { cart, toast } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const products = [
    { id: 1, name: "Oversized Black Tee", price: 799, image: tshirt1 },
    { id: 2, name: "Streetwear White Tee", price: 899, image: tshirt2 },
    { id: 3, name: "Premium Brown Tee", price: 999, image: tshirt3 },
  ];

  const slogans = ["Eat. Sleep. Football. Repeat."];

  // ✅ GLOBAL LOGOUT FIX
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="page">

      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 className="logo">ELEVEN STORE ⚽</h1>

        <div style={{ display: "flex", gap: "12px" }}>
          <button className="btn-primary" onClick={() => navigate("/cart")}>
            Cart 🛒 ({cartCount})
          </button>

          <button className="btn-dark" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <h2>STREET. FOOTBALL. CULTURE.</h2>
        <p>From the Youth !!! For the Youth !!!</p>
      </div>

      {/* SLOGANS */}
      <div className="slogans">
        {slogans.map((s, i) => (
          <div key={i} className="slogan-card">
            {s}
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      <h2 style={{ marginBottom: "15px" }}>🔥 Featured Drops</h2>

      <div className="products">
        {products.map((p) => (
          <div key={p.id} className="product-wrapper">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="footer">
        <h2>ELEVEN STORE ⚽</h2>

        <p className="tagline">
          ⚡ Plum Noir Streetwear — Built for the Fearless
        </p>

        <div className="founders">
          <p><b>Founder:</b> Arfat</p>
          <p><b>Co-founders:</b> Charaan S, Antony</p>
        </div>

        <p style={{ marginTop: "10px", opacity: 0.6 }}>
          © 2025 Eleven Store
        </p>
      </div>

    </div>
  );
}

export default Products;