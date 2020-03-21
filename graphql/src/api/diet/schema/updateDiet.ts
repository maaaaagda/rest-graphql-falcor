import Joi from "@hapi/joi";

export const dietUpdateSchema: Joi.Schema = Joi.object().keys({
  name: Joi.string(),
  dailyCost: Joi.number().min(0),
  photoUrl: Joi.string()
});
