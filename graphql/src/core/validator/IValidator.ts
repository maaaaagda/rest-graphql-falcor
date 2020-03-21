import Joi from "@hapi/joi";

export interface IValidator {
    validate(req: object, schema: Joi.Schema): boolean;
}
