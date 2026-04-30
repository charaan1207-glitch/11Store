require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* 🔥 SIMPLE + STRONG CORS (NO CONFLICTS) */
app.use(cors({
  origin: "*",   // allow all for now
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

/* 🔥 BODY PARSER */
app.use(express.json());

/* 🔥 HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("🚀 Eleven Store Backend Running");
});

/* 🔥 ROUTES */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

/* 🔥 DATABASE CONNECTION */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Connection Error ❌", error.message);
    process.exit(1);
  }
};

connectDB();

/* 🔥 ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ msg: "Server Error" });
});

/* 🔥 START SERVER (IMPORTANT FIX) */
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Eleven Store Backend Running on port ${PORT}`);
});