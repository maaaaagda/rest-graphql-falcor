import Joi = require("@hapi/joi");
import { OrderStatus } from "../../model/OrderStatus";

export const dietOrderPostSchema: Joi.Schema = Joi.object().keys({
  diet: Joi.string().required(),
  dates: Joi.array().items(Joi.string()),
  status: Joi.string()
    .valid(...Object.values(OrderStatus))
    .default(OrderStatus.IN_REALISATION)
});
