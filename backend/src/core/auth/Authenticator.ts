import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "../error/AuthenticationError";
import { IAuthenticator } from "./IAuthenticator";
import { UserRole } from "../../api/user/model/UserRole";
import { TYPES } from "../../ioc/types";
import { IConfig } from "../../config/IConfig";
const TOKEN_REGEX: RegExp = /^Bearer (?<TOKEN>.+)$/;

@injectable()
export class Authenticator implements IAuthenticator {

  @inject(TYPES.IConfig)
  private readonly _config: IConfig;


  public authenticate(authorization?: string): boolean {
    if (!authorization) {
      throw new AuthenticationError("Authorization required");
    }
    try {
      const tokenRegexMatch: RegExpMatchArray = authorization.match(
        TOKEN_REGEX
      );
      jwt.verify(tokenRegexMatch.groups.TOKEN, this._config.JWT_SECRET);
    } catch (err) {
      throw new AuthenticationError("Not authorized");
    }

    return true;
  }

  public generateJWTToken(userRole: UserRole): string {
    return jwt.sign(
      {
        data: { role: userRole }
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h", algorithm: "HS256" }
    );
  }
}
