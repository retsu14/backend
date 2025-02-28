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
    const { name, blueprint, component, image, site } = req.body;

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
  const block = await Block.find();

  res.status(201).json(block);
});

const deleteBlock = expressAsyncHandler(async (req, res) => {
  await Block.findByIdAndDelete(req.params.id);

  res.status(201).json({
    message: "Block has been deleted successfully",
  });
});

const updateDelete = expressAsyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = { createBlock, getBlock, deleteBlock, updateDelete };
