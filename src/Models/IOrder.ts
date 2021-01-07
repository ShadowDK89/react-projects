export interface Order{
    companyid: number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    orderRows: OrderItems[];
}

export interface OrderItems{
    productId: number;
    amount: number;
}