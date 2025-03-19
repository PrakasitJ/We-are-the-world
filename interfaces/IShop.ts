export interface IShop {
    id: number;
    user_id: string;
    bank_account_id: string | null;
    name: string;
    description: string;
    status: "OPEN" | "CLOSE";
    open_time: string;
    close_time: string;
    latitude: number;
    longitude: number;
    address: string;
    createdAt: string;
    updatedAt: string;
}