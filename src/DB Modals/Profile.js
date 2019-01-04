const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  user: {
    type: Schema.Types.objectId,
    ref: "User"
  },
  events: {
    types: [String]
  },
  description: {
    type: String,
    required: true
  }
});
