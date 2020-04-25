import { Container, inject } from "inversify";
import getContainer from "../ioc/inversify.config";
import { TYPES } from "../../../ioc/types";
import { Context } from "vm";
import { dietOrderUpdateSchema } from "./../schema/updateDietOrder";
import { dietOrderAddSchema } from "./../schema/addDietOrder";
import { UserRole } from "./../../user/model/UserRole";
import { IValidator } from "./../../../core/validator/IValidator";
import { dietOrderCostSchema } from "./../schema/dietOrderCost";
import { IDietOrder } from "./../model/DietOrder";
import { IAuthenticator } from "./../../../core/auth/IAuthenticator";
import { DIET_ORDER_TYPES } from "./../ioc/DietOrderTypes";
import { IDietOrderService } from "./../service/IDietOrderService";

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
  
    public readonly getDietOrders = async (parent, args, ctx: Context, info): Promise<IDietOrder[]> => {
        const { userId } = this._authenticator.authenticate(ctx.token);
        const dietOrders: IDietOrder[] = await this._dietOrderService.getDietOrders(
          userId
        );
        return dietOrders;
    }
  
    public readonly getAllDietOrders = async (parent, args, ctx: Context, info): Promise<IDietOrder[]> => {
        this._authenticator.authenticate(
          ctx.token,
          UserRole.ADMIN
        );
        const dietOrders: IDietOrder[] = await this._dietOrderService.getAllDietOrders();
        return dietOrders;
    }
  
    public readonly getDietOrderCost = async (parent, args: { dietId: string, dates: string[], kcal: number}, ctx: Context, info): Promise<number> => {
        this._authenticator.authenticate(ctx.token);
        this._validator.validate({dietId: args.dietId, dates: args.dates, kcal: args.kcal}, dietOrderCostSchema);
        const cost: number = await this._dietOrderService.getDietOrderCost(
          args.dates.length,
          args.kcal,
          args.dietId
        );
        return cost;
    }
  
    public readonly addDietOrder = async (parent, args: { dietOrder: any}, ctx: Context, info): Promise<IDietOrder> => {
      const { userId } = this._authenticator.authenticate(
          ctx.token
        );
      this._validator.validate(args.dietOrder, dietOrderAddSchema);
      const dietOrder: IDietOrder = await this._dietOrderService.addDietOrder(
          args.dietOrder,
          userId
        );
      return dietOrder;
    }
  
    public readonly updateDietOrder = async (parent, args: { id: string, dietOrder: any}, ctx: Context, info): Promise<IDietOrder> => {
        this._authenticator.authenticate(ctx.token);
        this._validator.validate(args.dietOrder, dietOrderUpdateSchema);
        const updatedDietOrder: IDietOrder = await this._dietOrderService.updateDietOrder(
          args.id,
          args.dietOrder
        );
        return updatedDietOrder;
    }
  }
  