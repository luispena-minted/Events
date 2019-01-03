const express = require("express");
const User = require("../DB Modals/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.get("/test", (req, res) => res.json({ login: "required" }));

// route    api/user/resgister
// method  POST
// access  Public
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (user) {
        // user found in database
        res.status(400).json({ msg: "User already exist" });
      } else {
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
            res.status(200).json({ msg: "user Created" });
          });
        });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
