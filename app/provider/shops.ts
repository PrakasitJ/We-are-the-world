import { IProduct } from '@/interfaces/IProduct';
import { IShop } from '@/interfaces/IShop';
import { create } from 'zustand'

interface Shop {
    id: number;
    user_id: string;
    name: string;
    description: string;
    status: string;
    open_time: string;
    close_time: string;
    address: string;
    Shop_images: Image[];
    Product: ProductCategorys[];

    rating?: number;
    deliveryTime?: string;
    minOrder?: string;
    deliveryFee?: string;
    isExpress?: boolean;
}
interface Image {
    id: number;
    shop_id: number;
    image_url: string;
}

interface ProductCategorys {
    product_category?: Category;
}

interface Category {
    category_name: string;
}

interface ShopsState {
    shops: Shop[];
    setShops: (shops: Shop[]) => void;
    getShop: (shopId: number) => Shop | null;
    fetchShops: () => void;
}

interface ShopState {
    shop: Shop | null;
    products: IProduct[];
}

const useShops = create<ShopsState>((set) => ({
    shops: [],
    setShops: (shops: Shop[]) => set({ shops }),
    getShop: (shopId: number): Shop | null => {
        const state = useShops.getState();
        return state.shops.find((shop: Shop) => shop.id === shopId) || null;
    },
    fetchShops: async () => {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/shop/getAllWithImagesAndCategory`);
        const data = await response.json();
        set({ shops: data });
    },
}));

const useShop = create<ShopState>((set) => ({
    shop: null,
    products: [],
}));

export default useShops;
