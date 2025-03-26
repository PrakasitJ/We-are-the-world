import { router } from 'expo-router';
import { create } from 'zustand';

interface Product {
    name: string;
    price: number;
    amount: number;
    description: string;
    image_url: string;
    category_id: number;
    shop_id: number
}

interface ProductWithID {
    id: number;
    name: string;
    price: number;
    amount: number;
    description: string;
    image_url: string;
    category_id: number;
}


interface ProductFormState {
    shopId: number | null;
    product: Product;
    editProduct: ProductWithID;
    setShopId: (value: number) => void;
    setProduct: (value: Product) => void;
    setEditProduct: (value: ProductWithID) => void;
    setUpdateProduct: (value: ProductWithID) => void;
}

const useProductForm = create<ProductFormState>((set, get) => ({
    shopId: null,
    product: {
        name: '',
        price: 0,
        amount: 0,
        description: '',
        image_url: '',
        category_id: 0,
        shop_id: 0
    },
    editProduct: {
        id: 0,
        name: '',
        price: 0,
        amount: 0,
        description: '',
        image_url: '',
        category_id: 0,
    },
    setShopId: (value: number) => set({ shopId: value }),
    setProduct: (value: Product) => set({ product: value }),
    setEditProduct: (value: ProductWithID) => {
        set({ editProduct: value });
        router.push(`/(shop)/(owner)/edit-product`);
    },
    setUpdateProduct: async (value: ProductWithID) => {
        const body = JSON.stringify({
            id: Number(value.id),
            name: value.name,
            price: Number(value.price),
            amount: Number(value.amount),
            description: value.description,
            image_url: value.image_url,
            product_category_id: Number(value.category_id)
        })
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/product/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        });
        const data = await response.json();
        if(data.errors || data?.error){    
            // set({ error:  data.errors[0]?.summary || data.message });
        }else{
            router.replace(`/(shop)/(owner)/${get().shopId}`);
        }
    }
}));

export default useProductForm;

