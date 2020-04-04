import { Response } from "got";
export interface IProductRequests {
    getProducts(name?: string): Promise<Response<any>>;
}
