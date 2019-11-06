import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAuthenticator } from "../../../../core/auth/IAuthenticator";
import { AuthenticationError } from "../../../../core/error/AuthenticationError";
import { IValidator } from "../../../../core/validator/IValidator";
import { TYPES } from "../../../../ioc/types";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { USER_REPOSITORIES } from "../../../user/ioc/UserTypes";
import { IUser } from "../../../user/model/User";
import { UserRole } from "../../../user/model/UserRole";
import { IUserRepository } from "../../../user/repository/IUserRepository";
import { ILoginController } from "../../controller/loginController/ILoginController";
import { loginSchema } from "../../schema/post/login";

@injectable()
export class LoginController implements ILoginController {

  @inject(TYPES.IValidator)
  protected readonly _validator: IValidator;

  @inject(USER_REPOSITORIES.IUserRepository)
  private readonly _userRepository: IUserRepository;

  @inject(TYPES.IAuthenticator)
  private readonly _authenticator: IAuthenticator;

  public async process(req: Request, res: Response): Promise<Response> {
    this._validator.validate(req.body, loginSchema);

    const user: IUser = await this._userRepository.getOne({
      email: req.body.email,
      password: req.body.password
    });

    if (!user) {
      throw new AuthenticationError("Wrong credentials sent");
    }
    return res.json(
      SuccessResponse.Ok({
        token: this._authenticator.generateJWTToken(user.role as UserRole)
      })
    );
  }
}
