const express = require("express");
const router = express.Router();

router.get("/profile", (req, res) => res.json({ login: "true" }));

module.exports = router;
