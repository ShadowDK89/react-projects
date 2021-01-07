export interface AdminOrder{
    id: number;
    companyId:number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    status: number;
    totalPrice: number;
    orderRows: AdminOrderRows[];
}

export interface AdminOrderRows{
    id: number;
    productId: number;
    product: string;
    amount: number;
    orderId: number;
}