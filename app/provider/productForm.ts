import { create } from 'zustand';

interface Product  {
    name: string;
    price: number;
    amount: number;
    description: string;
    image_url: string;
    category_id: number;
    shop_id: number
}


interface ProductFormState {
    shopId: number | null;
    product: Product;
    setShopId: (value: number) => void;
    setProduct: (value: Product) => void;
}

const useProductForm = create<ProductFormState>((set) => ({
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
    setShopId: (value: number) => set({ shopId: value }),
    setProduct: (value: Product) => set({ product: value }),
}));

export default useProductForm;

