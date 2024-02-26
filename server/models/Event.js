const mongoose = require("mongoose");

const Event = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // date: { type: Date, required: true },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "past"],
    required: true,
  },
});

module.exports = mongoose.model("Event", Event);
