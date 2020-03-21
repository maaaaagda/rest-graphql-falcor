import Joi from "@hapi/joi";
import { Ingredient } from "./ingredient";

export const mealUpdateSchema: Joi.Schema = Joi.object().keys({
  name: Joi.string().required(),
  ingredients: Joi.array().items(Ingredient),
  recipe: Joi.string(),
  authorId: Joi.string(),
  photo: Joi.string()
});
