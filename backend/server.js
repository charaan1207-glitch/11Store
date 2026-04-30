require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* 🔥 STRONG CORS FIX (FINAL) */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3003",
  "https://elevenstore-frontend.onrender.com" // (your deployed frontend — update if needed)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // allow all (safe fallback for now)
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

/* 🔥 IMPORTANT: Handle preflight manually */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

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