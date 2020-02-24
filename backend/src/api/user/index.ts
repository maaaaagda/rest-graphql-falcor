import { IUser } from "./model/User";
import { userPostSchema } from "./schema/post/postUser";
import { SuccessResponse } from "./../../response/SuccessResponse";
import { IAuthenticator } from "./../../core/auth/IAuthenticator";
import { IValidator } from "./../../core/validator/IValidator";
import { IUserService } from "./service/IUserService";
import { NextFunction, Request, Response } from "express";
import { Container, inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  interfaces
} from "inversify-express-utils";
import { TYPES } from "../../ioc/types";
import { USER_TYPES } from "./ioc/UserTypes";
import getContainer from "./ioc/inversify.config";
import { Config } from "../../config/Config";

const config: Config = new Config();
const ENDPOINT: string = "users";

@controller(`${config.API_PATH}${ENDPOINT}`)
export class UserController implements interfaces.Controller {
  private readonly _container: Container = getContainer();
  private readonly _userService: IUserService = this._container.get<IUserService>(USER_TYPES.IUserService);

  @inject(TYPES.IAuthenticator)
  private readonly _authenticator: IAuthenticator;

  @inject(TYPES.IValidator)
  private readonly _validator: IValidator;

  @httpGet("/")
  public async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    this._authenticator.authenticate(req.headers.authorization);
    const users: IUser[] = await this._userService.getUsers();

    return res.json(SuccessResponse.Ok(users));
  }

  @httpPost("/")
  public async postUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
      this._validator.validate(req.body, userPostSchema);
      const user: IUser = await this._userService.postUser(req.body);
  
      return res.json(SuccessResponse.Created(user));
  }
}
