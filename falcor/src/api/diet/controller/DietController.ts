import { UserRole } from "./../../user/model/UserRole";
import { Container, inject } from "inversify";
import { TYPES } from "../../../ioc/types";
import { DIET_TYPES } from "../ioc/DietTypes";
import getContainer from "../ioc/inversify.config";
import { IDiet } from "../model/Diet";
import { IDietService } from "../service/IDietService";
import { dietAddSchema } from "../schema/addDiet";
import { IAuthenticator } from "../../../core/auth/IAuthenticator";
import { IValidator } from "../../../core/validator/IValidator";
import { dietUpdateSchema } from "../schema/updateDiet";
import { KcalOptions } from "../constants/KcalOptions";

export class DietController  {
  private readonly _container: Container = getContainer();
  private readonly _dietService: IDietService = this._container.get<
    IDietService
  >(DIET_TYPES.IDietService);

  @inject(TYPES.IAuthenticator)
  private readonly _authenticator: IAuthenticator = this._container.get(
      TYPES.IAuthenticator
    );

  @inject(TYPES.IValidator)
  private readonly _validator: IValidator = this._container.get(TYPES.IValidator);

  public readonly getDiets = async (): Promise<IDiet[]> => {
    const diets: IDiet[] = await this._dietService.getDiets();
    return diets;
  }

  public readonly getDietById = async (id: string): Promise<IDiet> => {
    const diet: IDiet = await this._dietService.getDietById(id);
    return diet;
  }
     
  public readonly getDietKcalOptions = () => KcalOptions;

  public readonly addDiet = async ( dietData: IDiet, token: string): Promise<IDiet> => {
    this._authenticator.authenticate(token);
    this._validator.validate(dietData, dietAddSchema);
    const diet: IDiet = await this._dietService.addDiet(dietData);
    return diet;
  }

  public readonly updateDiet = async ( id: string, dietData: IDiet, token: string): Promise<IDiet> => {
    this._authenticator.authenticate(token);
    this._validator.validate(dietData, dietUpdateSchema);
    const diet: IDiet = await this._dietService.updateDiet(id, dietData);
    return diet;
  }

  public readonly removeDiet = async ( id: string, authToken: string ): Promise<boolean> => {
    this._authenticator.authenticate(
        authToken,
        UserRole.DIETITIAN
    );
    await this._dietService.removeDiet(
        id
    );
    return true;
  }
}
