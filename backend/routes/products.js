const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Products Route Working ✅");
});

module.exports = router;