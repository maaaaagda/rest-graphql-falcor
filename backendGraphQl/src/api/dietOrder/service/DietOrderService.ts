import { UserInputError } from "apollo-server-express";
import { inject, injectable } from "inversify";
import { DIET_ORDER_REPOSITORIES } from "../ioc/DietOrderTypes";
import { IDietOrderRepository } from "../repository/IDietOrderRepository";
import { IDietOrder } from "../model/DietOrder";
import { DIET_REPOSITORIES } from "../../diet/ioc/DietTypes";
import { IDietRepository } from "../../diet/repository/IDietRepository";
import { IDiet } from "../../diet/model/Diet";
import { KcalOptions } from "../../diet/constants/KcalOptions";

@injectable()
export class DietOrderService {
  @inject(DIET_ORDER_REPOSITORIES.IDietOrderRepository)
  private readonly _dietOrderRepository: IDietOrderRepository;

  @inject(DIET_REPOSITORIES.IDietRepository)
  private readonly _dietRepository: IDietRepository;

  public async getDietOrderCost(
    nrOfDays: number,
    kcal: number,
    dietId: string
  ) {
    const diet: IDiet = await this._dietRepository.getOneById(dietId);
    const kcalOption = KcalOptions.find((kcalObj) => kcalObj.value == kcal);
    if (!kcalOption) {
      throw new UserInputError("Wrong kcal value provided");
    }
    return nrOfDays * (diet.dailyCost + kcalOption.extraCost);
  }

  public async getDietOrders(userId: string): Promise<IDietOrder[]> {
    return await this._dietOrderRepository.getDietOrdersByCustomerId(userId);
  }

  public async getAllDietOrders(): Promise<IDietOrder[]> {
    return await this._dietOrderRepository.getMany();
  }

  public async addDietOrder(dietOrderParams: IDietOrder, userId: string) {
    dietOrderParams.cost = await this.getDietOrderCost(
      dietOrderParams.dates.length,
      dietOrderParams.kcal,
      dietOrderParams.dietId
    );
    dietOrderParams.customerId = userId;
    return await this._dietOrderRepository.insertOne(dietOrderParams);
  }

  public async updateDietOrder(id: string, dietOrderParams: IDietOrder) {
    const dietOrderToModify: IDietOrder = await this._dietOrderRepository.getOne(
      {
        _id: id
      }
    );
    if (dietOrderToModify) {
      const updated: IDietOrder = await this._dietOrderRepository.updateOneById(
        id,
        {
          $set: dietOrderParams
        }
      );
      return updated;
    }
    throw new UserInputError("Wrong diet order id");
  }
}
