const expressAsyncHandler = require("express-async-handler");
const Page = require("../models/page-model");
const Site = require("../models/sites-model");
const Block = require("../models/block-model");
const { validationResult } = require("express-validator");

const getPage = expressAsyncHandler(async (req, res) => {
  try {
    const page = await Page.find()
      .populate({
        path: "sites",
        select: "name",
      })
      .populate({
        path: "block",
        populate: {
          path: "blueprint",
        },
      })
      .populate({
        path: "user",
        select: "name",
      });

    res.status(200).json(page);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const createPage = expressAsyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, url, visibility, sites, block } = req.body;

  try {
    const foundSite = await Site.findById(sites);
    const foundBlock = await Block.findById(block);

    if (!foundSite || !foundBlock) {
      return res.status(400).json({
        message: "Invalid site or block reference",
      });
    }

    const page = new Page({
      user: req.user._id,
      name,
      url,
      visibility,
      sites,
      block,
    });

    const createdPage = await page.save();
    res.status(201).json({
      message: "Page created successfully",
      page: createdPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const deletePage = expressAsyncHandler(async (req, res) => {
  try {
    await Page.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Page has been deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const updatePage = expressAsyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, url, visibility, sites, block } = req.body;

    const page = await Page.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }

    if (sites) {
      const foundSite = await Site.findById(sites);
      if (!foundSite) {
        return res.status(400).json({
          message: "Invalid site reference",
        });
      }
    }

    if (block) {
      const foundBlock = await Block.findById(block);
      if (!foundBlock) {
        return res.status(400).json({
          message: "Invalid block reference",
        });
      }
    }

    page.name = name || page.name;
    page.url = url || page.url;
    page.visibility = visibility || page.visibility;
    page.sites = sites || page.sites;
    page.block = block || page.block;

    const updatedPage = await page.save();

    res.status(200).json({
      message: "Page updated successfully",
      page: updatedPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = {
  getPage,
  createPage,
  deletePage,
  updatePage,
};
