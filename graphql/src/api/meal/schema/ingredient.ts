import Joi from "@hapi/joi";

export const Ingredient = Joi.object({
  productId: Joi.string().required(),
  weight: Joi.number()
    .min(0)
    .required()
});
