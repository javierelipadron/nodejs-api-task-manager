const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(5).max(255).required(),
});

const updateCategorySchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(5).max(255).required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
