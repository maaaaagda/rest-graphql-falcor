import { loginSchema } from "../schema/post/login";
import { IAuthService } from "../service/IAuthService";
import { IValidator } from "../../../core/validator/IValidator";
import { AUTH_TYPES } from "../ioc/AuthTypes";
import { Container, inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import { TYPES } from "../../../ioc/types";
import getContainer from "../ioc/inversify.config";
import { Context } from "vm";

export class AuthController implements interfaces.Controller {

  @inject(TYPES.IValidator)
  protected readonly _validator: IValidator = this._container.get(
    TYPES.IValidator
  );

  private readonly _container: Container = getContainer();

  @inject(AUTH_TYPES.IAuthService)
  private readonly _authService: IAuthService = this._container.get(
    AUTH_TYPES.IAuthService
  );

  public readonly login = async (parent, args, ctx: Context, info): Promise<{ token: string }> => {
    this._validator.validate({ email: args.email, password: args.password }, loginSchema);
    const token = await this._authService.login(args.email, args.password);
    return { token };
  }
}
