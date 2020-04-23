import { UserInputError } from "apollo-server-express";
import { IDailyDiet } from "./../model/DailyDiet";
import { IValidator } from "./../../../core/validator/IValidator";
import { IAuthenticator } from "./../../../core/auth/IAuthenticator";
import { DAILY_DIET_TYPES } from "./../ioc/DailyDietTypes";
import { IDailyDietService } from "./../service/IDailyDietService";
import { Container, inject } from "inversify";
import { Context } from "vm";
import { dailyDietUpdateSchema } from "../schema/putDailyDiet";
import { dailyDietAddSchema } from "../schema/addDailyDiet";
import getContainer from "../ioc/inversify.config";
import { TYPES } from "../../../ioc/types";

export class DailyDietController {
  private readonly _container: Container = getContainer();
  private readonly _dailyDietService: IDailyDietService = this._container.get<
    IDailyDietService
  >(DAILY_DIET_TYPES.IDailyDietService);

  @inject(TYPES.IAuthenticator)
  private readonly _authenticator: IAuthenticator = this._container.get(
      TYPES.IAuthenticator
    );

  @inject(TYPES.IValidator)
  private readonly _validator: IValidator = this._container.get(TYPES.IValidator);

  public readonly getDailyDiets = async (parent, args: {date: string, dietId: string}, ctx: Context, info)
  : Promise<IDailyDiet[]> => {  
    const dailyDiets: IDailyDiet[] = await this._dailyDietService.getDailyDiets(
        args.date,
        args.dietId
      );
    return dailyDiets;
  }

  public getDailyDietById = async (parent, args: {id: string}, ctx: Context, info) 
  : Promise<IDailyDiet> => {
      const dailyDiet: IDailyDiet = await this._dailyDietService.getDailyDietById(
        args.id
      );
      if (dailyDiet) {
        return dailyDiet;
      }
      throw new UserInputError("Daily diet with given id does not exist");
  }

  public addDailyDiet = async (parent, args: {dailyDiet: IDailyDiet}, ctx: Context, info)
  : Promise<IDailyDiet> => {
      this._authenticator.authenticate(ctx.token);
      this._validator.validate(args.dailyDiet, dailyDietAddSchema);
      const dailyDiet: IDailyDiet = await this._dailyDietService.addDailyDiet(
        args.dailyDiet
      );
      return dailyDiet;
  }

  public updateDailyDiet = async (parent, args: {id: string, dailyDiet: IDailyDiet}, ctx: Context, info)
  : Promise<IDailyDiet> => {
        this._authenticator.authenticate(ctx.token);
        this._validator.validate(args.dailyDiet, dailyDietUpdateSchema);
        const dailyDiet: IDailyDiet = await this._dailyDietService.updateDailyDiet(args.id, args.dailyDiet);
        return dailyDiet;
    }
}
