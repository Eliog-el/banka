import Joi from '@hapi/joi';

export const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().lowercase().required().trim(),
  password: Joi.string().min(8).required(),
});
