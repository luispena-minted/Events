const express = require("express");
const mongoose = require("mongoose");
const userAuth = require("./routes/userAuth");
const profileInfo = require("./routes/profileInfo");
const DB = require("./config/keys").mongoURI;
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const port = process.env.PORT || 3000;

//Connecting to mongoDB
mongoose
  .connect(
    DB,
    { useNewUrlParser: true }
  )
  .then(() => console.log("DataBase Connected"))
  .catch(err => console.error(err));

//  use of middleweres
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => res.send("Hello World"));
app.use(passport.initialize());

// passport config
require("./config/passportConfig")(passport);

// routes
app.use("/api/users", userAuth);
app.use("/api/profile", profileInfo);

// initialize server
app.listen(port, () => console.log(`Server Running in port ${port}`));
