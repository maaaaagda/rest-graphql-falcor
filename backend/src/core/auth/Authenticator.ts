import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "../error/AuthenticationError";
import { IAuthenticator } from "./IAuthenticator";
const TOKEN_REGEX: RegExp = /^Bearer (?<TOKEN>.+)$/;

@injectable()
export class Authenticator implements IAuthenticator {
  public authenticate(authorization: string | undefined): boolean {
    if (!authorization) {
      throw new AuthenticationError("Authorization required");
    }
    try {
      const tokenRegexMatch: RegExpMatchArray = authorization.match(
        TOKEN_REGEX
      );
      jwt.verify(tokenRegexMatch.groups.TOKEN, process.env.JWT_SECRET);
    } catch (err) {
      throw new AuthenticationError("Not authorized");
    }

    return true;
  }
}
