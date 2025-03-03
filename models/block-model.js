const mongoose = require("mongoose");

const blockScheme = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    blueprint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blueprint",
      required: true,
    },
    component: {
      type: String,
      required: true,
    },
    image: String,
    site: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Site",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Block", blockScheme);
