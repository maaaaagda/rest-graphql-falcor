import { UserRole } from "../../api/user/model/UserRole";
import { ITokenData } from "./ITokenData";

export interface IAuthenticator {
  authenticate(authorization?: string, role?: UserRole): ITokenData;
  generateJWTToken(userRole: UserRole, id: string): string;
}
