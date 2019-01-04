const express = require("express");
const User = require("../DB Modals/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const passport = require("passport");
const router = express.Router();

router.get("/test", (req, res) => res.send({ login: "required" }));

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
  const user = await User.findOne({ email });

  // checks for user in database
  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  //  compare password typed to the DB
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // user found
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email
    };
    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
      res.json({ success: true, token: "Bearer " + token });
    });
  } else {
    return res.status(404).json({ msg: "password incorrect" });
  }
});

// route    api/users/active
// method  get
// access  private
router.get(
  "/active",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // resp with the user data after bein auth
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
  }
);
module.exports = router;
