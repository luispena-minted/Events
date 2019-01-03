const express = require("express");
const User = require("../DB Modals/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/test", (req, res) => res.json({ login: "required" }));

// route    api/users/register
// method  POST
// access  Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    // user found in database
    res.status(400).json({ msg: "User already exist" });
  } else {
    // creating new User
    const newUser = new User({
      name,
      email,
      password
    });
    // encrypting password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        newUser.save();
        return res.status(200).json({ msg: "user Created" });
      });
    });
  }
});

// route    api/users/login
// method  post
// access  Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  // checks for user in database
  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  //  compare password typed to the DB
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    res.json({ msg: "logged in" });
  } else {
    return res.status(404).json({ msg: "password incorrect" });
  }
});

module.exports = router;
