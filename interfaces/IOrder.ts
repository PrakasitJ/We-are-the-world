export interface IOrderDetail {
    id: number;
    charity_id: number | null;
    customer_id: string;
    rider_id: number;
    shop_id: number;
    pickup_location_id: number;
    service_fee: number;
    status: string;
    note: string;
    finish_job_image_url: string;
    created_at: string;
    updated_at: string;
    charity: any | null;
    customer: ICustomer;
    rider: IRider;
    shop: IShop;
    Product_list: IProduct[];
    Transaction: any | null;
    Report: any[];
}

export interface ICustomer {
    uuid: string;
    username: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    tel: string;
    salt: string;
    profile_image_url: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IRider {
    id: number;
    user_id: string;
    vehicle_type_id: number | null;
    bank_account_id: number | null;
    vehicle_registration: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface IShop {
    id: number;
    user_id: string;
    bank_account_id: number | null;
    name: string;
    description: string;
    status: string;
    open_time: string;
    close_time: string;
    latitude: number;
    longitude: number;
    address: string;
    createdAt: string;
    updatedAt: string;
}

export interface IProduct {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;
}

export interface IOrder {
    customer: ICustomer;
    rider: IRider;
    shop: IShop;
    Product_list: IProduct[];
    Transaction: any | null;
    Report: any[];
}