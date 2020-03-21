import { UserRole } from "../../api/user/model/UserRole";

export interface ITokenData {
  role: UserRole;
  userId: string;
}
