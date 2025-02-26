const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
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
