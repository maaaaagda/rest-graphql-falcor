export interface IDietOrder {
    userId?: string;
    dietId: string;
    dates: string[];
    deliveryAddress: string;
    deliveryTime: string;
    kcal: number;
}
