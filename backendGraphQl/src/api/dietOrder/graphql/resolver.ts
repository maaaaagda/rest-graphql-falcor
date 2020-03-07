import { IResolver } from "../../../core/graphql/IResolver";
import { DietOrderController } from "../controller/DietOrderController";
const dietOrderController = new DietOrderController();

export const DietOrderResolvers: IResolver = {
  Query: {
    dietOrders: dietOrderController.getDietOrders,
    allDietOrders: dietOrderController.getAllDietOrders,
    dietOrderCost: dietOrderController.getDietOrderCost
  },
  Mutation: {
    addDietOrder: dietOrderController.addDietOrder,
    updateDietOrder: dietOrderController.updateDietOrder
  }
};
