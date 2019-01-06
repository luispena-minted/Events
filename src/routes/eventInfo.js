const express = require("express");
const User = require("../DB Modals/User");
const Event = require("../DB Modals/Event");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
mongoose.set("useFindAndModify", false);

router.get("/test", (req, res) => res.json({ login: "true" }));

// route    api/users/active
// method  get
// access  private
router.get(
  "/active",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.user;
    // finds user
    const event = await Event.findOne({ user: req.user.id });
    // if there is not Events associated with the account
    if (!event) {
      const newEvent = new Event({
        user: req.user.id
      });
      newEvent.save();
      res.json({ name: req.user.name });
    } else {
      // sends the profile with the events
      res.json(event);
    }
  }
);

// route    api/users/active
// method  post / update
// access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const date = await new Date();
    const { eventName, eventDescription } = req.body;
    const { id, name, email } = req.user;
    const eventFields = {};
    eventFields.user = req.user.id;

    // find user who made post request
    const event = await Event.findOne({ user: req.user.id });
    if (event) {
      // adds to the events the logged user has
      const updatedEvent = await Event.findOneAndUpdate(
        { user: id },
        { $push: { events: { eventName, eventDescription } } },
        { safe: true, upsert: true, new: true }
      );
      res.json(updatedEvent);
    } else {
      // create a new profile with the events
      const newEvent = await new Event(eventFields);
      res.json(newEvent);
    }
  }
);

module.exports = router;
