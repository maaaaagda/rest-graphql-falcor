import Joi from "@hapi/joi";

export const dietPutSchema: Joi.Schema = Joi.object().keys({
  name: Joi.string(),
  dailyCost: Joi.number().min(0),
  photoUrl: Joi.string()
});
