import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthenticator } from "../../../../core/auth/IAuthenticator";
import { IValidator } from "../../../../core/validator/IValidator";
import { TYPES } from "../../../../ioc/types";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { DIET_TYPES } from "../../ioc/DietTypes";
import { IDiet } from "../../model/Diet";
import { dietPutSchema } from "../../schema/put/putDiet";
import { IPutDietController } from "./IPutController";
import { IDietService } from "../../service/IDietService";

@injectable()
export class PutDietController implements IPutDietController {

  @inject(DIET_TYPES.IDietService)
  private readonly _dietService: IDietService;

  @inject(TYPES.IAuthenticator)
  private readonly _authenticator: IAuthenticator;

  @inject(TYPES.IValidator)
  private readonly _validator: IValidator;

  public async process(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      this._authenticator.authenticate(req.headers.authorization);
      this._validator.validate(req.body, dietPutSchema);
      const updatedDiet: IDiet = await this._dietService.putDiet(req.query.id, req.body);
      return res.json(SuccessResponse.Ok(updatedDiet));
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }

  }
}
