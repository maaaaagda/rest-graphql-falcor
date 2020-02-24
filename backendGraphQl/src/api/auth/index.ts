import { loginSchema } from "./schema/post/login";
import { IAuthService } from "./service/IAuthService";
import { IValidator } from "../../core/validator/IValidator";
import { AUTH_TYPES } from "./ioc/AuthTypes";
import { NextFunction, Request, Response } from "express";
import { Container, inject } from "inversify";
import { controller, httpPost, interfaces } from "inversify-express-utils";
import { TYPES } from "../../ioc/types";
import getContainer from "./ioc/inversify.config";
import { Context } from "vm";

export class AuthController implements interfaces.Controller {

  @inject(TYPES.IValidator)
  protected readonly _validator: IValidator;
  private readonly _container: Container = getContainer();

  @inject(AUTH_TYPES.IAuthService)
  private readonly _authService: IAuthService;

  public readonly login = async (parent, args, ctx: Context, info): Promise<string> => {
    this._validator.validate({ email: args.email, password: args.password }, loginSchema);
    const token = await this._authService.login(args.email, args.password);
    return token;
  }
}
