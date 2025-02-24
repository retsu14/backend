const mongoose = require("mongoose");

const blockScheme = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blueprint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blueprint",
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Block", blockScheme);
