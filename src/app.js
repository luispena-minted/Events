const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userAuth = require("./routes/userAuth");
const profileInfo = require("./routes/profileInfo");
const DB = require("./config/keys").mongoURI;
const port = process.env.PORT || 3000;

//Connecting to mongoDB
mongoose
  .connect(
    DB,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch(err => console.log(err, "hello"));

//  use of middleweres
app.use(express.json());

// routes
app.use("/api/user", userAuth);
app.use("/api/user", profileInfo);

// initialize server
app.listen(port, () => console.log(`Server Running in port ${port}`));
