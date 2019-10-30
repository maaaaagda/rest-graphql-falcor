import Joi = require("@hapi/joi");
import { OrderStatus } from "../../model/OrderStatus";

export const dietOrderPutSchema: Joi.Schema = Joi.object().keys({
    status: Joi.string().valid(...Object.values(OrderStatus)).required(),
});
