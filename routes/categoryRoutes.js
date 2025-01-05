const express = require("express");
const router = express.Router();
const { readCategories, saveCategories } = require("../utils/categoryUtils");
const Category = require("./../entities/category");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("./../validationSchemas/categorySchema");

const categoryService = router.get("/categories", (req, res) => {
  const categories = readCategories();
  res
    .status(200)
    .json(categories.filter((category) => category.status === true));
});

router.get("/categories/:id", (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "ID is required" });

  const categories = readCategories();
  const category = categories.find(
    (category) => category.id === parseInt(id) && category.status === true
  );
  if (!category) return res.status(404).json({ message: "Category not found" });

  res.status(200).json(category);
});

router.post("/categories", (req, res) => {
  const { error } = createCategorySchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, description } = req.body;

  const newCategory = new Category(Date.now(), name, description);
  const categories = readCategories();
  categories.push(newCategory);
  saveCategories(categories);

  res.status(201).json(newCategory);
});

router.put("/categories/:id", (req, res) => {
  const { error } = updateCategorySchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const id = req.params.id;
  const { name, description } = req.body;

  const categories = readCategories();
  const categoryIndex = categories.findIndex(
    (category) => category.id === parseInt(id)
  );
  if (categoryIndex === -1)
    return res.status(404).json({ message: "Category not found" });

  categories[categoryIndex] = new Category(parseInt(id), name, description);
  saveCategories(categories);

  res.status(200).json(categories[categoryIndex]);
});

router.delete("/categories/:id", (req, res) => {
  const id = req.params.id;
  const categories = readCategories();
  const categoryIndex = categories.findIndex(
    (category) => category.id === parseInt(id)
  );
  if (categoryIndex === -1)
    return res.status(404).json({ message: "Category not found" });

  categories[categoryIndex] = {
    ...categories[categoryIndex],
    status: false,
  };
  saveCategories(categories);

  res.status(204).json();
});

module.exports = router;
