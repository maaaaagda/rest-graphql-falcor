import Joi from "@hapi/joi";

export const dietAddSchema: Joi.Schema = Joi.object().keys({
  name: Joi.string().required(),
  dailyCost: Joi.number()
    .min(0)
    .required(),
  photoUrl: Joi.string().required()
});
