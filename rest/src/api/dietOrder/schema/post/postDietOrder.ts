import Joi from "@hapi/joi";
import { OrderStatus } from "../../model/OrderStatus";

export const dietOrderPostSchema: Joi.Schema = Joi.object().keys({
  userId: Joi.string(),
  dietId: Joi.string().required(),
  dates: Joi.array().items(Joi.string()),
  deliveryAddress: Joi.string().required(),
  deliveryTime: Joi.string().required(),
  kcal: Joi.number()
    .min(0)
    .required(),
  status: Joi.string()
    .valid(...Object.values(OrderStatus))
    .default(OrderStatus.IN_REALISATION)
});
