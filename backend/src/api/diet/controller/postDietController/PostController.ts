import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../../../../core/baseController/BaseController";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { DIET_ORDER_REPOSITORIES } from "../../ioc/DietTypes";
import { IDiet } from "../../model/Diet";
import { IDietRepository } from "../../repository/IDietRepository";
import { dietPostSchema } from "../../schema/post/postDiet";
import { IPostDietController } from "./IPostController";

@injectable()
export class PostDietController extends BaseController
  implements IPostDietController {
  @inject(DIET_ORDER_REPOSITORIES.IDietRepository)
  private readonly _dietRepository: IDietRepository;

  public async process(req: Request, res: Response): Promise<Response> {
    this._validator.validate(req.body, dietPostSchema);
    const diet: IDiet = await this._dietRepository.insertOne(req.body);

    return res.json(SuccessResponse.Created(diet));
  }
}
