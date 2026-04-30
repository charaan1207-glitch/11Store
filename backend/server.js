require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* 🔥 CORS (FULL FIX) */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

// VERY IMPORTANT (handles browser preflight)
app.options("*", cors());

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

/* 🔥 START SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Eleven Store Backend Running on port ${PORT}`);
});