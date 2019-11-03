import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../../../../core/baseController/BaseController";
import { ErrorResponse } from "../../../../response/ErrorResponse";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { DIET_ORDER_REPOSITORIES } from "../../ioc/DietTypes";
import { IDiet } from "../../model/Diet";
import { IDietRepository } from "../../repository/IDietRepository";
import { dietPutSchema } from "../../schema/put/putDiet";
import { IPutDietController } from "./IPutController";

@injectable()
export class PutDietController extends BaseController
  implements IPutDietController {
  @inject(DIET_ORDER_REPOSITORIES.IDietRepository)
  private readonly _dietRepository: IDietRepository;

  public async process(req: Request, res: Response): Promise<Response> {
    this._validator.validate(req.body, dietPutSchema);
    const dietToModify: IDiet = await this._dietRepository.getOne({
      id: req.params.id
    });
    if (dietToModify) {
      const updated = await this._dietRepository.updateOneById(req.params.id, {
        $set: { status: req.body.status }
      });
      return res.json(SuccessResponse.Ok(updated));
    }
    return res.json(ErrorResponse.BadRequest());
  }
}
