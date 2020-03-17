import { IDailyDiet } from "../model/DailyDiet";
import { IValidator } from "../../../core/validator/IValidator";
import { IAuthenticator } from "../../../core/auth/IAuthenticator";
import { DAILY_DIET_TYPES } from "../ioc/DailyDietTypes";
import { IDailyDietService } from "../service/IDailyDietService";
import { Container, inject } from "inversify";
import { dailyDietUpdateSchema } from "../schema/putDailyDiet";
import { dailyDietAddSchema } from "../schema/addDailyDiet";
import getContainer from "../ioc/inversify.config";
import { TYPES } from "../../../ioc/types";
import { BadRequestError } from "../../../core/error/BadRequestError";

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

  public readonly getDailyDiets = async (date?: string, dietId?: string): Promise<IDailyDiet[]> => {  
    const dailyDiets: IDailyDiet[] = await this._dailyDietService.getDailyDiets(
        date,
        dietId
      );
    return dailyDiets;
  }

  public readonly getDailyDietById = async (id: string): Promise<IDailyDiet> => {
      const dailyDiet: IDailyDiet = await this._dailyDietService.getDailyDietById(
        id
      );
      if (dailyDiet) {
        return dailyDiet;
      }
      throw new BadRequestError("Daily diet with given id does not exist");
  }

  public readonly addDailyDiet = async (dailyDietData: IDailyDiet, token: string): Promise<IDailyDiet> => {
      this._authenticator.authenticate(token);
      this._validator.validate(dailyDietData, dailyDietAddSchema);
      const dailyDiet: IDailyDiet = await this._dailyDietService.addDailyDiet(
        dailyDietData
      );
      return dailyDiet;
  }

  public readonly updateDailyDiet = async (id: string, dailyDietData: IDailyDiet, token: string)
  : Promise<IDailyDiet> => {
        this._authenticator.authenticate(token);
        this._validator.validate(dailyDietData, dailyDietUpdateSchema);
        const dailyDiet: IDailyDiet = await this._dailyDietService.updateDailyDiet(id, dailyDietData);
        return dailyDiet;
    }
}
