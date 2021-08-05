import Joi from '@hapi/joi';

export const signupSchema = Joi.object({
  firstName: Joi.string().regex(/^[A-Za-z]{3,}$/).required(),
  lastName: Joi.string().regex(/^[A-Za-z]{3,}$/).required(),
  email: Joi.string().email().lowercase().required().trim(),
  password: Joi.string().min(8).required(),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().min(8).required()
})