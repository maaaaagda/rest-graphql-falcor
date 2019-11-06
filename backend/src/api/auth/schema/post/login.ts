import Joi = require("@hapi/joi");

export const loginSchema: Joi.Schema = Joi.object().keys({
  email:  Joi.string().email().lowercase().required(),
  password: Joi.string().required()
});
