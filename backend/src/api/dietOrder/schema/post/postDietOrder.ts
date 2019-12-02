import Joi from "@hapi/joi";
import { OrderStatus } from "../../model/OrderStatus";

export const dietOrderPostSchema: Joi.Schema = Joi.object().keys({
  dietId: Joi.string().required(),
  dates: Joi.array().items(Joi.string()),
  kcal: Joi.number()
    .min(0)
    .required(),
  status: Joi.string()
    .valid(...Object.values(OrderStatus))
    .default(OrderStatus.IN_REALISATION)
});
