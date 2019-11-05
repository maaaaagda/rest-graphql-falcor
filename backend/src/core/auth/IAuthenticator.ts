export interface IAuthenticator {
  authenticate(authorization: string | undefined): boolean;
}
