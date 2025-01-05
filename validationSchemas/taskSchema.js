const Joi = require("joi");

const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).max(255).required(),
  categoryId: Joi.number().required(),
  completed: Joi.bool().required(),
});

const updateTaskSchema = Joi.object({
  id: Joi.number().integer().required(),
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).max(255).required(),
  categoryId: Joi.number().required(),
  completed: Joi.bool().required(),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};
