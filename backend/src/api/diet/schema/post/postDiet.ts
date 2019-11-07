import Joi from "joi";

export const dietPostSchema: Joi.Schema = Joi.object().keys({
  name: Joi.string().required(),
  dailyCost: Joi.number()
    .min(0)
    .required()
});
