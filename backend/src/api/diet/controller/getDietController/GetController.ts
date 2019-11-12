import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { DIET_TYPES } from "../../ioc/DietTypes";
import { IDiet } from "../../model/Diet";
import { IGetDietController } from "./IGetController";
import { IDietService } from "../../service/IDietService";

@injectable()
export class GetDietController implements IGetDietController {

  @inject(DIET_TYPES.IDietService)
  private readonly _dietService: IDietService;

  public async process(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      const diets: IDiet[] = await this._dietService.getDiets();
      return res.json(SuccessResponse.Ok(diets));
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }
  }
}
