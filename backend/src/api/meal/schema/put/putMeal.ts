import Joi from "@hapi/joi";
import { Ingredient } from "../ingredient";

export const mealPutSchema: Joi.Schema = Joi.object().keys({
  name: Joi.string().required(),
  ingredients: Joi.array().items(Ingredient),
  receipe: Joi.string(),
  authorId: Joi.string(),
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
});
