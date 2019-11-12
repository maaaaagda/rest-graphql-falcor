import { inject, injectable } from "inversify";
import { DIET_ORDER_REPOSITORIES } from "../ioc/DietOrderTypes";
import { IDietOrderRepository } from "../repository/IDietOrderRepository";
import { IDietOrder } from "../model/DietOrder";
import { BadRequestError } from "../../../core/error/BadRequestError";

@injectable()
export class DietOrderService {

  @inject(DIET_ORDER_REPOSITORIES.IDietOrderRepository)
  private readonly _dietOrderRepository: IDietOrderRepository;

  public async getDietOrders(): Promise<IDietOrder[]> {
    return await this._dietOrderRepository.getMany();
  }

  public async postDietOrder(dietOrderParams: IDietOrder) {
    return await this._dietOrderRepository.insertOne(dietOrderParams);
  }

  public async putDietOrder(id: string, dietOrderParams: IDietOrder) {
    const dietOrderToModify: IDietOrder = await this._dietOrderRepository.getOne({
      _id: id
    });
    if (dietOrderToModify) {
      const { status } = dietOrderParams;
      const updated: IDietOrder = await this._dietOrderRepository.updateOneById(id, {
        $set: { status }
      });
      return updated;
    }
    throw new BadRequestError();
  }
}
