import Joi from "@hapi/joi";
import { Ingredient } from "../ingredient";

export const mealPutSchema: Joi.Schema = Joi.object().keys({
  name: Joi.string().required(),
  ingredients: Joi.array().items(Ingredient),
  receipe: Joi.string(),
  authorId: Joi.string(),
  photo: Joi.string()
});
