import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IValidator } from "../../../../core/validator/IValidator";
import { TYPES } from "../../../../ioc/types";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { ILoginController } from "./ILoginController";
import { loginSchema } from "../../schema/post/login";
import { AUTH_TYPES } from "../../ioc/AuthTypes";
import { IAuthService } from "../../service/IAuthService";

@injectable()
export class LoginController implements ILoginController {

  @inject(TYPES.IValidator)
  protected readonly _validator: IValidator;

  @inject(AUTH_TYPES.IAuthService)
  private readonly _authService: IAuthService;

  public async process(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      this._validator.validate(req.body, loginSchema);
      const token = await this._authService.login(req.body.email, req.body.password);
      return res.json(
        SuccessResponse.Ok({
          token
        })
      );
    } catch (error) {
      return new Promise(() => {
        next(error);
      });
    }
  }
}
