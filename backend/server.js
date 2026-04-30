require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* 🔥 CORS (frontend connection fix) */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

/* 🔥 BODY PARSER */
app.use(express.json());

/* 🔥 ROUTES */
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));

/* 🔥 HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("🚀 Eleven Store Backend Running");
});

/* 🔥 DATABASE CONNECTION (FIXED) */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // ✅ ONLY THIS
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

/* 🔥 SERVER START */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Eleven Store Backend Running on port ${PORT}`);
});