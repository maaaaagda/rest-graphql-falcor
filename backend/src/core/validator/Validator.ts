import Joi, { ValidationResult } from "@hapi/joi";
import { IValidator } from "./IValidator";
import { injectable } from "inversify";
import { ValidationError } from "../error/ValidationError";

@injectable()
export class Validator implements IValidator {
  public validate(body: object, schema: Joi.Schema): boolean {
    const result: ValidationResult = schema.validate(body);

    if (result.error || result.errors) {
      throw new ValidationError(result.error.message);
    }

    return true;
  }
}
