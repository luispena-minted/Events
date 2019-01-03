const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ login: "true" }));

module.exports = router;
