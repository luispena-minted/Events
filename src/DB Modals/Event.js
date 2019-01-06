const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  events: [
    {
      eventName: {
        type: String
      },
      eventDescription: {
        type: String
      },
      addedOn: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Profile = mongoose.model("Event", eventsSchema);
