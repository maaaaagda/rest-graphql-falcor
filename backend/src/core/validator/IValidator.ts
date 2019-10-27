import Joi = require("@hapi/joi");
import { Request } from "express";

export interface IValidator {
    validate(req: Request, schema: Joi.Schema): boolean;
}
