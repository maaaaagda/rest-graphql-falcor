import Joi from "@hapi/joi";
export const dietOrderCostSchema: Joi.Schema = Joi.object().keys({
  dietId: Joi.string().required(),
  dates: Joi.array().items(Joi.string()),
  kcal: Joi.number()
    .min(0)
    .required()
});
