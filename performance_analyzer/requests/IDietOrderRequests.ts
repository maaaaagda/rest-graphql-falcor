import { IDietOrder } from './../generate_data/dietOrders/IDietOrder';
import { Response } from 'got';

export interface IDietOrderRequests {
    getAllDietOrders(nrOfDietOrders?: number): Promise<Response<string>>;
    getDietOrders(token: string): Promise<Response<string>>;
    addDietOrder(dietOrder: IDietOrder, token: string): Promise<Response<string>>;
}
