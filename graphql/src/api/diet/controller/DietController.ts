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
import { Context } from "vm";

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

  public readonly getDiets = async (parent, args, ctx: Context, info): Promise<IDiet[]> => {
    this._authenticator.authenticate(ctx.token);
    const diets: IDiet[] = await this._dietService.getDiets();
    return diets;
  }

  public readonly getDietById = async (parent, args, ctx: Context, info): Promise<IDiet> => {
    const diet: IDiet = await this._dietService.getDietById(args.id);
    return diet;
  }
     
  public readonly getDietKcalOptions = () => KcalOptions;

  public readonly addDiet = async (parent, args: { diet: IDiet }, ctx: Context, info): Promise<IDiet> => {
    this._authenticator.authenticate(ctx.token);
    this._validator.validate(args.diet, dietAddSchema);
    const diet: IDiet = await this._dietService.addDiet(args.diet);
    return diet;
  }

  public readonly updateDiet = async (parent, args: { id: string, diet: IDiet }, ctx: Context, info): Promise<IDiet> => {
    this._authenticator.authenticate(ctx.token);
    this._validator.validate(args.diet, dietUpdateSchema);
    const diet: IDiet = await this._dietService.updateDiet(args.id, args.diet);
    return diet;
  }
}
