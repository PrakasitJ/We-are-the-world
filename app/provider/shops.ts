import { IProduct } from '@/interfaces/IProduct';
import { create } from 'zustand'
import { router } from 'expo-router';

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

interface CreateShop {
    name: string;
    description: string;
    open_time: string;
    close_time: string;
    user_id: string;
}

interface CreateProduct {
    name: string;
    price: number;
    amount: number;
    description: string;
    image_url: string;
    category_id: number;
    shop_id: number;
}

interface CreateCategory {
    category_name: string;
    shop_id: number;
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
    id: number;
    shop_id: number;
    category_name: string;
}

interface ShopsState {
    shops: Shop[];
    fullShops: Shop[];
    myShops: Shop[];
    myShop: ShopWithProduct | null;
    error: string | null;
    categories: Category[];
    setShops: (shops: Shop[]) => void;
    getShop: (shopId: number) => Shop | null;
    getShopWithProductByID: (shopId: number) => void;
    createShop: (shop: CreateShop) => void;
    deleteShop: (shopId: number) => void;
    filterShops: (search: string) => void;
    fetchShops: () => void;
    fetchMyShops: (userId: string) => void;
    fetchCategories: (shopId: number) => void;
    createProduct: (product: CreateProduct) => void;
    createCategory: (category: CreateCategory) => void;
}

interface ShopWithProduct {
    id: number;
    user_id: string;
    name: string;
    description: string;
    status: string;
    open_time: string;
    close_time: string;
    address: string;
    Shop_images: Image[];
    Product: Product[];
}
interface Product {
    id: number;
    name: string;
    price: number;
    amount: number;
    description: string;
    image_url: string;
    product_category: Category;
}


interface ShopState {
    shop: Shop | null;
    products: IProduct[];
}

const useShops = create<ShopsState>((set) => ({
    shops: [],
    myShops: [],
    fullShops: [],
    myShop: null,
    error: null,
    categories: [],
    setShops: (shops: Shop[]) => set({ shops }),
    getShop: (shopId: number): Shop | null => {
        const state = useShops.getState();
        return state.fullShops.find((shop: Shop) => shop.id === shopId) || null;
    },
    getShopWithProductByID: async (shopId: number) => {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/shop/get/${shopId}/detail`);
        const data = await response.json();
        set({ myShop: data });
    },
    deleteShop: (shopId: number) => {
        const state = useShops.getState();
        set({ shops: state.fullShops.filter((shop: Shop) => shop.id !== shopId) });
    },
    filterShops: (search: string) => {
        const state = useShops.getState();
        set({ shops: state.fullShops.filter((shop: Shop) => shop.name.toLowerCase().includes(search.toLowerCase())) });
    },
    fetchShops: async () => {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/shop/getAllWithImagesAndCategory`);
        const data = await response.json();
        set({ shops: data, fullShops: data });
    },
    fetchMyShops: async (userId: string) => {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/shop/getByUserId/${userId}`);
        const data = await response.json();
        set({ myShops: data });
    },
    createShop: async (shop: CreateShop) => {
        console.log(shop);
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/shop/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(shop),
        });
        const data = await response.json();
        console.log(data);
        if(data.errors || data?.error){    
            set({ error:  data.errors[0]?.summary || data.message });
        }else{
            set({ shops: [...useShops.getState().shops, data] });
            set({ error: null });
            router.replace(`/(shop)/(owner)/shops`);
        }
    },
    createProduct: async (product: CreateProduct) => {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/shop/addProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: product.name,
                price: Number(product.price),
                amount: Number(product.amount),
                description: product.description,
                image_url: product.image_url,
                category_id: Number(product.category_id),
                shop_id: Number(product.shop_id)
            }),
        });
        const data = await response.json();
        console.log(data);
        if(data.errors || data?.error){    
            // set({ error:  data.errors[0]?.summary || data.message });
        }else{
            set({ error: null });
            router.replace(`/(shop)/(owner)/${product.shop_id}`);
        }
    },
    createCategory: async (category: CreateCategory) => {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/ProductCategory/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                category_name: category.category_name,
                shop_id: Number(category.shop_id)
            }),
        });

        const data = await response.json();
        if(data.errors || data?.error){    
            set({ error:  data.errors[0]?.summary || data.message });
        }else{
            set({ error: null, categories: [...useShops.getState().categories, data] });
            router.back();
        }   
    },
    fetchCategories: async (shopId: number) => {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/ProductCategory/getByShopId/${shopId}`);
        const data = await response.json();
        set({ categories: data });
    },
}));

const useShop = create<ShopState>((set) => ({
    shop: null,
    products: [],
}));

export default useShops;
