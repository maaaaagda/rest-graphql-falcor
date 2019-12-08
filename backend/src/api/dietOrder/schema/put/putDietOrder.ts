import Joi from "@hapi/joi";
import { OrderStatus } from "../../model/OrderStatus";

export const dietOrderPutSchema: Joi.Schema = Joi.object().keys({
  status: Joi.string().valid(...Object.values(OrderStatus)),
  deliveryAddress: Joi.string(),
  deliveryTime: Joi.string()
});
