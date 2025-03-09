const expressAsyncHandler = require("express-async-handler");
const Block = require("../models/block-model");
const Blueprint = require("../models/blueprint-model");
const Site = require("../models/sites-model");
const { validationResult } = require("express-validator");

const createBlock = expressAsyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, blueprint, component, site } = req.body;
    const image = req.file ? req.file.path : null;

    //validation if the selected data existed
    const foundBlueprint = await Blueprint.findById(blueprint);
    const foundSite = await Site.findById(site);

    if (!foundBlueprint || !foundSite) {
      return res.status(400).json({
        message: "Invalid Data",
      });
    }
    //

    const block = new Block({
      user: req.user._id,
      name,
      blueprint,
      component,
      image,
      site,
    });

    const createdBlock = await block.save();

    res.status(201).json({
      message: "Block has been created successfully",
      block: createdBlock,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

const getBlock = expressAsyncHandler(async (req, res) => {
  try {
    const blocks = await Block.find().populate({ path: 'blueprint site', select: 'name title' });

    res.status(200).json(blocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const deleteBlock = expressAsyncHandler(async (req, res) => {
  await Block.findByIdAndDelete(req.params.id);

  res.status(201).json({
    message: "Block has been deleted successfully",
  });
});

const updateBlock = expressAsyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, blueprint, component, site } = req.body;
    const image = req.file ? req.file.path : null;

    const block = await Block.findById(req.params.id);

    if (!block) {
      return res.status(404).json({ error: "Block not found" });
    }

    if (blueprint) {
      const foundBlueprint = await Blueprint.findById(blueprint);
      if (!foundBlueprint) {
        return res.status(400).json({
          message: "Invalid Blueprint",
        });
      }
    }

    if (site) {
      const foundSite = await Site.findById(site);
      if (!foundSite) {
        return res.status(400).json({
          message: "Invalid Site",
        });
      }
    }

    block.name = name || block.name;
    block.blueprint = blueprint || block.blueprint;
    block.component = component || block.component;
    block.image = image || block.image;
    block.site = site || block.site;

    const updatedBlock = await block.save();

    res.status(200).json({
      message: "Block has been updated successfully",
      block: updatedBlock,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = { createBlock, getBlock, deleteBlock, updateBlock };
