import { AuthenticationError } from "./../error/AuthenticationError";
import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import { UserRole } from "../../api/user/model/UserRole";
import { IConfig } from "../../config/IConfig";
import { TYPES } from "../../ioc/types";
import { IAuthenticator } from "./IAuthenticator";
import { ITokenData } from "./ITokenData";
import bcrypt from "bcrypt";

const TOKEN_REGEX: RegExp = /^Bearer (?<TOKEN>.+)$/;

@injectable()
export class Authenticator implements IAuthenticator {
  @inject(TYPES.IConfig)
  private readonly _config: IConfig;

  public authenticate(authorization?: string, role?: UserRole): ITokenData {
    if (!authorization) {
      throw new AuthenticationError("Authorization required");
    }
    try {
      const tokenRegexMatch: RegExpMatchArray = authorization.match(
        TOKEN_REGEX
      );
      const decoded: { data: ITokenData } = jwt.verify(
        tokenRegexMatch.groups.TOKEN,
        this._config.JWT_SECRET
      );
      if (
        role &&
        decoded.data.role !== UserRole.ADMIN &&
        decoded.data.role !== role
      ) {
        throw new AuthenticationError("Missing required permissions");
      }
      return { role: decoded.data.role, userId: decoded.data.userId };
    } catch (err) {
      if (err instanceof AuthenticationError) {
        throw err;
      }
      throw new AuthenticationError("Not authorized");
    }
  }

  public generateJWTToken(userRole: UserRole, userId: string): string {
    return jwt.sign(
      {
        data: { role: userRole, userId }
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h", algorithm: "HS256" }
    );
  }

  public async encodePassword(password: string): Promise<string> {
    const saltRounds: number = 10;
    return bcrypt.hash(password, saltRounds);
  }

  public async isPasswordValid(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
