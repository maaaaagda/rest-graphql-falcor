import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthenticator } from "../../../../core/auth/IAuthenticator";
import { IValidator } from "../../../../core/validator/IValidator";
import { TYPES } from "../../../../ioc/types";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import {  DIET_TYPES } from "../../ioc/DietTypes";
import { IDiet } from "../../model/Diet";
import { dietPostSchema } from "../../schema/post/postDiet";
import { IPostDietController } from "./IPostController";
import { IDietService } from "../../service/IDietService";

@injectable()
export class PostDietController implements IPostDietController {

  @inject(DIET_TYPES.IDietService)
  private readonly _dietService: IDietService;

  @inject(TYPES.IAuthenticator)
  private readonly _authenticator: IAuthenticator;

  @inject(TYPES.IValidator)
  private readonly _validator: IValidator;

  public async process(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      this._authenticator.authenticate(req.headers.authorization);
      this._validator.validate(req.body, dietPostSchema);
      const diet: IDiet = await this._dietService.postDiet(req.body);
      return res.json(SuccessResponse.Created(diet));
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }
  }
}
