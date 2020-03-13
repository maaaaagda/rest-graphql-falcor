import Joi from "@hapi/joi";

export const productUpdateSchema: Joi.Schema = Joi.object().keys({
  name: Joi.string().required(),
  kcal: Joi.number()
    .min(0),
  protein: Joi.number()
    .min(0),
  carbohydrate: Joi.number()
    .min(0),
  fat: Joi.number()
    .min(0),
  fibre: Joi.number()
    .min(0),
  photo: Joi.string()
});
