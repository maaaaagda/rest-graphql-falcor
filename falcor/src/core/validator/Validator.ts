import { BadRequestError } from "./../error/BadRequestError";
import { injectable } from "inversify";
import Joi, { ValidationResult } from "@hapi/joi";
import { IValidator } from "./IValidator";

@injectable()
export class Validator implements IValidator {
  public validate(body: object, schema: Joi.Schema): boolean {
    const result: ValidationResult = schema.validate(body);

    if (result.error || result.errors) {
      throw new BadRequestError(result.error.message);
    }

    return true;
  }
}
