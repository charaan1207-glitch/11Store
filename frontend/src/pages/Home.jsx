import React from "react";
import ProductCard from "../components/ProductCard";

import tshirt1 from "../assets/tshirt1.jpg";
import tshirt2 from "../assets/tshirt2.jpg";
import tshirt3 from "../assets/tshirt3.jpg";

const products = [
  {
    id: 1,
    name: "Eleven Oversized T-Shirt Black",
    price: 799,
    image: tshirt1,
  },
  {
    id: 2,
    name: "Eleven Streetwear T-Shirt White",
    price: 899,
    image: tshirt2,
  },
  {
    id: 3,
    name: "Eleven Premium T-Shirt Brown",
    price: 999,
    image: tshirt3,
  },
];

const Home = () => {

  // ✅ GLOBAL LOGOUT FIX
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/signup";
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 className="page-title">Eleven Store</h1>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 22px",
            border: "none",
            borderRadius: "30px",
            backgroundColor: "#000",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;