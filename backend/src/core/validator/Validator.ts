import Joi, { ValidationResult } from "@hapi/joi";
import { ErrorResponse } from "../../response/ErrorResponse";
import { IValidator } from "./IValidator";

export class Validator implements IValidator {
    public validate(body: object, schema: Joi.Schema): boolean {
        const result: ValidationResult = schema.validate(body);

        if (result.error || result.errors) {
            throw ErrorResponse.BadRequest(result.error.message);
        }

        return true;
    }
}
