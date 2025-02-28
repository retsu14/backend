const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  hook: String,
  flag: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Site", siteSchema);
