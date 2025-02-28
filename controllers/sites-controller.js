const expressAsyncHandler = require("express-async-handler");
const Site = require("../models/sites-model");
const { validationResult } = require("express-validator");

const createSite = expressAsyncHandler(async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, domain, hook } = req.body;

    const site = new Site({
      user: req.user._id,
      name,
      domain,
      hook,
    });

    const createdSite = await site.save();

    res.status(201).json({
      message: "Site created successfully",
      site: createdSite,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

const getSite = expressAsyncHandler(async (req, res) => {
  try {
    const sites = await Site.find();
    res.status(200).json(sites);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

const deleteSite = expressAsyncHandler(async (req, res) => {
  try {
    const site = await Site.findByIdAndDelete(req.params.id);

    if (!site) {
      return res.status(404).json({ error: "Site not found" });
    }

    res.status(200).json({
      message: "Site deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

const updateSite = expressAsyncHandler(async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, domain, hook } = req.body;
    const site = await Site.findByIdAndUpdate(
      req.params.id,
      { $set: { name, domain, hook } },
      { new: true }
    );

    if (!site) {
      return res.status(404).json({ error: "Site not found" });
    }

    res.status(200).json({
      message: "Site updated successfully",
      site,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = { createSite, getSite, deleteSite, updateSite };
