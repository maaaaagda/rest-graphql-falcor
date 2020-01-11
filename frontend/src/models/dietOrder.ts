export type DietOrder = {
  _id: string;
  dietId: string;
  customerId: string;
  dates: string[];
  kcal: number;
  cost: number;
  status: OrderStatus;
  deliveryAddress: string;
  deliveryTime: string;
}

export enum OrderStatus {
  PAID = "paid",
  IN_REALISATION = "in_realisation",
  CANCELLED = "cancelled",
  WAITING_FOR_PAYMENT = "waiting_for_payment",
}

export enum OrderStatusMapped {
  paid = "paid",
  in_realisation = "in realisation",
  cancelled = "cancelled",
  waiting_for_payment = "waiting for payment",
}
