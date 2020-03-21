import { injectable } from "inversify";
import Joi, { ValidationResult } from "@hapi/joi";
import { IValidator } from "./IValidator";
import { UserInputError } from "apollo-server-express";

@injectable()
export class Validator implements IValidator {
  public validate(body: object, schema: Joi.Schema): boolean {
    const result: ValidationResult = schema.validate(body);

    if (result.error || result.errors) {
      throw new UserInputError(result.error.message);
    }

    return true;
  }
}
