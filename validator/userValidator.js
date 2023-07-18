import Joi from "joi";

export const UserScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).required(),
});

export const UserLoginScheme = Joi.object({
  email: Joi.string().email().required(),
});
