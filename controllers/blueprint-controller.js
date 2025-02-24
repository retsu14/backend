const expressAsyncHandler = require("express-async-handler");
const Blueprint = require("../models/blueprint-model");

const createBlueprint = expressAsyncHandler(async (req, res) => {
  const { title, data } = req.body;

  const blueprint = new Blueprint({
    user: req.user._id,
    title,
    data,
  });

  const createdBlueprint = await blueprint.save();

  res.status(201).json({
    message: "Blueprint created successfully",
    blueprint: createdBlueprint,
  });
});

const getBlueprint = expressAsyncHandler(async (req, res) => {
  const blueprints = await Blueprint.find({ user: req.user._id });

  res.status(200).json(blueprints);
});

//soft delete
const deleteBlueprint = expressAsyncHandler(async (req, res) => {
  const blueprint = await Blueprint.findById(req.params.id);

  if (!blueprint) {
    return res.status(404).json({ error: "Blueprint not found" });
  }

  blueprint.flag = true;
  const flagged = await blueprint.save();

  res.status(200).json({
    message: "Blueprint deleted successfully",
    blueprint: flagged,
  });
});

module.exports = { createBlueprint, getBlueprint, deleteBlueprint };
