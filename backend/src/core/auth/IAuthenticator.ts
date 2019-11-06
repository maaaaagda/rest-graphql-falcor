import { UserRole } from "../../api/user/model/UserRole";

export interface IAuthenticator {
  authenticate(authorization?: string): boolean;
  generateJWTToken(userRole: UserRole): string;
}
