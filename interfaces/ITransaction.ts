export interface ITransaction {
    id: number;
    order_id: number;
    payment_method: PaymentMethod;
    reference_id: string;
    status: TransactionStatus;
    createdAt: Date;
    updatedAt: Date;
}

export enum TransactionStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    CANCELLED
}

export enum PaymentMethod {
    CREDIT_CARD,
    PAYPAL,
    ONLINE_BANKING,
    DEPOSIT
}
