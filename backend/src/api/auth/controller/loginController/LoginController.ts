import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "../../../../core/error/AuthenticationError";
import { SuccessResponse } from "../../../../response/SuccessResponse";
import { USER_REPOSITORIES } from "../../../user/ioc/UserTypes";
import { IUser } from "../../../user/model/User";
import { UserRole } from "../../../user/model/UserRole";
import { IUserRepository } from "../../../user/repository/IUserRepository";
import { ILoginController } from "../../controller/loginController/ILoginController";

@injectable()
export class LoginController implements ILoginController {
  @inject(USER_REPOSITORIES.IUserRepository)
  private readonly _userRepository: IUserRepository;

  public async process(req: Request, res: Response): Promise<Response> {
    const user: IUser = await this._userRepository.getOne({
      email: req.body.email,
      password: req.body.password
    });
    if (user) {
      return res.json(
        SuccessResponse.Ok({
          token: this.generateJWTToken(user.role as UserRole)
        })
      );
    }
    throw new AuthenticationError("Wrong credentials sent");
  }

  private generateJWTToken(userRole: UserRole): string {
    return jwt.sign(
      {
        data: { role: userRole }
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h", algorithm: "HS256" }
    );
  }
}
