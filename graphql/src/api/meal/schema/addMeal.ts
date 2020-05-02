import Joi from "@hapi/joi";
import { Ingredient } from "./ingredient";

export const mealAddSchema: Joi.Schema = Joi.object().keys({
  name: Joi.string().required(),
  ingredients: Joi.array().items(Ingredient),
  recipe: Joi.string(),
  photoUrl: Joi.string()
});
