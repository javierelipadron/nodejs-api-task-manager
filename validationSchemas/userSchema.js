const Joi = require("joi");

const createUserSchema = Joi.object({
  usermane: Joi.string().min(3).max(100).required(),
  name: Joi.string().min(5).max(255).required(),
  password: Joi.string().min(3).max(100).required(),
});

const updateUserSchema = Joi.object({
  usermane: Joi.string().min(3).max(100).required(),
  name: Joi.string().min(5).max(255).required(),
  password: Joi.string().min(3).max(100).required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
