import { inject, injectable } from "inversify";
import { DIET_REPOSITORIES } from "../ioc/DietTypes";
import { IDietRepository } from "../repository/IDietRepository";
import { IDiet } from "../model/Diet";
import { BadRequestError } from "../../../core/error/BadRequestError";

@injectable()
export class DietService {
  @inject(DIET_REPOSITORIES.IDietRepository)
  private readonly _dietRepository: IDietRepository;

  public async getDiets(): Promise<IDiet[]> {
    return await this._dietRepository.getMany();
  }

  public async getDietById(id: string): Promise<IDiet> {
    return await this._dietRepository.getOneById(id);
  }

  public async postDiet(dietParams: IDiet) {
    return await this._dietRepository.insertOne(dietParams);
  }

  public async putDiet(id: string, dietParams: IDiet) {
    const dietToModify: IDiet = await this._dietRepository.getOne({
      _id: id
    });
    if (dietToModify) {
      const updated: IDiet = await this._dietRepository.updateOneById(id, {
        $set: dietParams
      });
      return updated;
    }
    throw new BadRequestError();
  }
}
