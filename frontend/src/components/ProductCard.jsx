import React, { useState } from "react";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart, cart } = useCart();

  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  // 🔥 Find quantity in cart
  const itemInCart = cart.find((item) => item.id === product.id);

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        padding: "16px",
        minWidth: "280px",
        textAlign: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        transition: "0.3s",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* 🔥 BADGE */}
      <span
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "#ef4444",
          color: "#fff",
          fontSize: "11px",
          padding: "4px 8px",
          borderRadius: "8px",
          fontWeight: "600",
        }}
      >
        NEW 🔥
      </span>

      {/* 🖼 IMAGE */}
      <div
        style={{
          height: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "12px",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            borderRadius: "10px",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />
      </div>

      {/* NAME */}
      <h3
        style={{
          fontSize: "14px",
          fontWeight: "600",
          marginBottom: "6px",
        }}
      >
        {product.name}
      </h3>

      {/* PRICE */}
      <p
        style={{
          fontWeight: "700",
          color: "#0284c7",
          marginBottom: "10px",
        }}
      >
        ₹{product.price}
      </p>

      {/* 🔥 QUANTITY DISPLAY */}
      {itemInCart && (
        <p
          style={{
            fontSize: "12px",
            color: "#16a34a",
            marginBottom: "8px",
            fontWeight: "600",
          }}
        >
          In Cart: {itemInCart.quantity}
        </p>
      )}

      {/* 🛒 BUTTON */}
      <button
        onClick={handleAdd}
        style={{
          width: "100%",
          padding: "9px",
          borderRadius: "10px",
          border: "none",
          background: added
            ? "#22c55e"
            : "linear-gradient(90deg,#0ea5e9,#2563eb)",
          color: "#fff",
          fontWeight: "600",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        {added ? "Added ✓" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;