const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ✅ SAVE ORDER
router.post("/", async (req, res) => {
    try {
        const { email, items, total } = req.body;

        const newOrder = new Order({
            email,
            items,
            total,
        });

        await newOrder.save();

        res.json({ msg: "Order saved successfully ✅" });
    } catch (err) {
        res.status(500).json({ msg: "Error saving order" });
    }
});

// ✅ GET ALL ORDERS (ADMIN)
router.get("/", async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
});

module.exports = router;