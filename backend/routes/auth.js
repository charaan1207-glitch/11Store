const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Signup
router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({ msg: "Signup successful ✅" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ msg: "Wrong password" });
        }

        res.json({ msg: "Login successful ✅" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;