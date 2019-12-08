import Joi from "@hapi/joi";
import { Ingredient } from "../ingredient";

export const mealPostSchema: Joi.Schema = Joi.object().keys({
  name: Joi.string().required(),
  ingredients: Joi.array()
    .items(Ingredient)
    .required(),
  recipe: Joi.string(),
  photo: Joi.string()
});
