const expressAsyncHandler = require("express-async-handler");
const Blueprint = require("../models/blueprint-model");
const { validationResult } = require("express-validator");

const createBlueprint = expressAsyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
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
// const deleteBlueprint = expressAsyncHandler(async (req, res) => {
//   const blueprint = await Blueprint.findById(req.params.id);

//   if (!blueprint) {
//     return res.status(404).json({ error: "Blueprint not found" });
//   }

//   blueprint.flag = true;
//   const flagged = await blueprint.save();

//   res.status(200).json({
//     message: "Blueprint deleted successfully",
//     blueprint: flagged,
//   });
// });

const deleteBlueprint = expressAsyncHandler(async (req, res) => {
  const blueprint = await Blueprint.findByIdAndDelete(req.params.id);

  res.status(201).json({
    message: "Blueprint deleted successfully",
  });
});

const updateBlueprint = expressAsyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, data } = req.body;

    const blueprint = await Blueprint.findById(req.params.id);

    if (!blueprint) {
      return res.status(404).json({ error: "Blueprint not found" });
    }

    blueprint.title = title || blueprint.title;
    blueprint.data = data || blueprint.data;

    const updatedBlueprint = await blueprint.save();

    res.status(200).json({
      message: "Blueprint updated successfully",
      updatedBlueprint,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  createBlueprint,
  getBlueprint,
  deleteBlueprint,
  updateBlueprint,
};
