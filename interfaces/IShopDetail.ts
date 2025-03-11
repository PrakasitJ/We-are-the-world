import { IProduct } from "./IProduct";

export interface IShopDetail {
    id: number;
    user_id: string;
    bank_account_id: string | null;
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
    user: any;
    bank_account: string | null;
    Shop_images: any[];
    Product: IProduct[];
    product: {
        [key: string]: Omit<IProduct, 'product_category'>[];
    };
}
