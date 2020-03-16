import { loginSchema } from "../schema/post/login";
import { IAuthService } from "../service/IAuthService";
import { IValidator } from "../../../core/validator/IValidator";
import { AUTH_TYPES } from "../ioc/AuthTypes";
import { Container, inject } from "inversify";
import { interfaces } from "inversify-express-utils";
import { TYPES } from "../../../ioc/types";
import getContainer from "../ioc/inversify.config";

export class AuthController implements interfaces.Controller {

  private readonly _container: Container = getContainer();

  @inject(AUTH_TYPES.IAuthService)
  private readonly _authService: IAuthService = this._container.get(
    AUTH_TYPES.IAuthService
  );

  @inject(TYPES.IValidator)
  private readonly _validator: IValidator = this._container.get(
    TYPES.IValidator
  );

  public readonly login = async (email: string, password: string): Promise<{ token: string }> => {
    this._validator.validate({ email, password }, loginSchema);
    const token: string = await this._authService.login(email, password);
    return { token };
  }
}
