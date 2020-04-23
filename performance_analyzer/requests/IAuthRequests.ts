import { Response } from 'got';

export interface IAuthRequests {
    login(email?: string, password?: string): Promise<Response<string>>;
}
