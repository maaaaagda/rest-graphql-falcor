import Joi from "@hapi/joi";

export const productPostSchema: Joi.Schema = Joi.object().keys({
  name: Joi.string().required(),
  kcal: Joi.number()
    .min(0)
    .required(),
  protein: Joi.number()
    .min(0)
    .required(),
  carbohydrate: Joi.number()
    .min(0)
    .required(),
  fat: Joi.number()
    .min(0)
    .required(),
  fibre: Joi.number()
    .min(0)
    .required(),
  photo: Joi.string()
   .required()
})
