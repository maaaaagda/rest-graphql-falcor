import { Container, inject } from "inversify";
import getContainer from "../ioc/inversify.config";
import { TYPES } from "../../../ioc/types";
import { dietOrderUpdateSchema } from "../schema/updateDietOrder";
import { dietOrderAddSchema } from "../schema/addDietOrder";
import { UserRole } from "../../user/model/UserRole";
import { IValidator } from "../../../core/validator/IValidator";
import { dietOrderCostSchema } from "../schema/dietOrderCost";
import { IDietOrder } from "../model/DietOrder";
import { IAuthenticator } from "../../../core/auth/IAuthenticator";
import { DIET_ORDER_TYPES } from "../ioc/DietOrderTypes";
import { IDietOrderService } from "../service/IDietOrderService";

export class DietOrderController {
    private readonly _container: Container = getContainer();
  
    private readonly _dietOrderService: IDietOrderService = this._container.get<
      IDietOrderService
    >(DIET_ORDER_TYPES.IDietOrderService);
  
    @inject(TYPES.IAuthenticator)
    private readonly _authenticator: IAuthenticator = this._container.get(
        TYPES.IAuthenticator
      );

    @inject(TYPES.IValidator)
    private readonly _validator: IValidator = this._container.get(TYPES.IValidator);
  
    public readonly getDietOrders = async (token: string): Promise<Array<IDietOrder<Date>>> => {
        const { userId } = this._authenticator.authenticate(token);
        const dietOrders: Array<IDietOrder<Date>> = await this._dietOrderService.getDietOrders(
          userId
        );
        return dietOrders;
    }
  
    public readonly getAllDietOrders = async (token: string): Promise<Array<IDietOrder<Date>>> => {
        this._authenticator.authenticate(
          token,
          UserRole.ADMIN
        );
        const dietOrders: Array<IDietOrder<Date>> = await this._dietOrderService.getAllDietOrders();
        return dietOrders;
    }
  
    public readonly getDietOrderCost = async (dietOrderData: { dietId: string, dates: string[], kcal: number}, token: string): Promise<number> => {
        this._authenticator.authenticate(token);
        this._validator.validate({dietId: dietOrderData.dietId, dates: dietOrderData.dates, kcal: dietOrderData.kcal}, dietOrderCostSchema);
        const cost: number = await this._dietOrderService.getDietOrderCost(
          dietOrderData.dates.length,
          dietOrderData.kcal,
          dietOrderData.dietId
        );
        return cost;
    }
  
    public readonly addDietOrder = async ( dietOrderData: IDietOrder<string>, token: string): Promise<IDietOrder<Date>> => {
        const { userId } = this._authenticator.authenticate(
          token
        );
        this._validator.validate(dietOrderData, dietOrderAddSchema);
        const dietOrder: IDietOrder<Date> = await this._dietOrderService.addDietOrder(
          dietOrderData,
          userId
        );
        return dietOrder;
    }
  
    public readonly updateDietOrder = async ( id: string, dietOrderData: IDietOrder<string>, token: string): Promise<IDietOrder<Date>> => {
        this._authenticator.authenticate(token);
        this._validator.validate(dietOrderData, dietOrderUpdateSchema);
        const updatedDietOrder: IDietOrder<Date> = await this._dietOrderService.updateDietOrder(
          id,
          dietOrderData
        );
        return updatedDietOrder;
    }
  }
  