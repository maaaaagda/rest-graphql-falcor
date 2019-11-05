import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "../error/AuthenticationError";
import { IAuthenticator } from "./IAuthenticator";

@injectable()
export class Authenticator implements IAuthenticator {
  public authenticate(authorization: string | undefined): boolean {
    if (!authorization) {
      throw new AuthenticationError("Authorization required");
    }
    try {
      jwt.verify(authorization, process.env.JWT_SECRET);
    } catch (err) {
      throw new AuthenticationError("Not authorized");
    }

    return true;
  }
}
