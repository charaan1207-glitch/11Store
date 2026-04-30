import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  // 🔐 Protect page (FIXED → signup instead of login)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) navigate("/signup");
  }, [navigate]);

  // 💰 Total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 📲 WhatsApp Checkout (MOBILE + DESKTOP FIX)
  const checkout = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const items = cart
      .map(
        (item) =>
          `• ${item.name}\nQty: ${item.quantity}\n₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}`
      )
      .join("\n\n");

    const msg = `🛒 ELEVEN STORE ORDER

👤 Customer: ${user?.email || "Guest"}

📦 Items:
${items}

💰 Total: ₹${total}

⚽ Thank you for shopping with Eleven Store!`;

    // ✅ CORRECT NUMBER FORMAT
    const phone = "919008739786";

    // ✅ MOBILE SAFE LINK
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`;

    // ✅ WORKS ON BOTH MOBILE + LAPTOP
    window.location.href = url;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #1e3a8a, #38bdf8)",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            color: "#fff",
          }}
        >
          <h1 style={{ fontSize: "32px", fontWeight: "800" }}>
            Your Cart 🛒
          </h1>

          {/* ✅ FIXED → goes to products */}
          <Link
            to="/products"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#e0f2fe",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>

        {/* EMPTY */}
        {cart.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              background: "#fff",
              padding: "40px",
              borderRadius: "20px",
            }}
          >
            <h2>Your cart is empty 😢</h2>
          </div>
        ) : (
          <>
            {/* ITEMS */}
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  background: "#fff",
                  padding: "18px",
                  borderRadius: "20px",
                  marginBottom: "20px",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    borderRadius: "12px",
                    background: "#f1f5f9",
                    padding: "6px",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0 }}>{item.name}</h3>

                  <p style={{ margin: "4px 0", color: "#555" }}>
                    Price: ₹{item.price}
                  </p>

                  <p style={{ margin: 0 }}>
                    Qty: <b>{item.quantity}</b>
                  </p>
                </div>

                <h3 style={{ color: "#0ea5e9" }}>
                  ₹{item.price * item.quantity}
                </h3>
              </div>
            ))}

            {/* SUMMARY */}
            <div
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "20px",
                marginTop: "30px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
              }}
            >
              <h2 style={{ marginBottom: "5px" }}>
                Final Total: ₹{total.toLocaleString("en-IN")}
              </h2>

              <p style={{ marginBottom: "15px", color: "#666" }}>
                Total Items Purchased:{" "}
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </p>

              <div style={{ display: "flex", gap: "15px" }}>
                <button
                  onClick={clearCart}
                  style={{
                    padding: "12px 20px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    background: "#f1f5f9",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Trash2 size={16} />
                  Clear
                </button>

                <button
                  onClick={checkout}
                  style={{
                    padding: "12px 25px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#22c55e",
                    color: "#fff",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Checkout via WhatsApp
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}