import { Request } from "express";
import Joi from "joi";

export interface IValidator {
    validate(req: Request, schema: Joi.Schema): boolean;
}
