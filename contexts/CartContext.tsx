import { ICart, ICartRequest } from "@/interfaces/ICart";
import axios from "axios";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useState } from "react";

const CartContext = createContext<{
    cartItems: ICartRequest[];
    addToCart: (item: ICartRequest) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    createOrderAndProductList: () => void;
}>({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    createOrderAndProductList: () => {},
});

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<ICartRequest[]>([]);
    const router = useRouter();

    const addToCart = (item: ICartRequest) => {
        console.log("Adding to cart", item);

        if (cartItems.some((cartItem) => cartItem.product_id === item.product_id)) {
            const newCartItems = cartItems.map((cartItem) => {
                if (cartItem.product_id === item.product_id) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + item.quantity,
                    };
                }
                return cartItem;
            });
            setCartItems(newCartItems);
            return;
        } else {
            setCartItems([...cartItems, item]);
        }
    };

    const clearCart = () => {
        setCartItems([]);
    }

    const removeFromCart = (product_id: number) => {
        setCartItems(cartItems.filter((item) => item.product_id !== product_id));
    }

    const createOrderAndProductList = async () => {
        const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/order/create`, {
            customer_id: "713f020d-8b9e-4048-9dbc-0146df7cb4e7",
            rider_id: 1,
            shop_id: 1,
            service_fee: 1,
            pickup_location_id: 1,
            note: "nono"
        });

        const order_id = res.data.id;

        cartItems.map(async (item) => {
            const res2 = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/ProductList/create`, {
                order_id: order_id,
                product_id: item.product_id,
                quantity: item.quantity,
            });
        });
        
        console.log(order_id);
        clearCart();
        router.dismissTo('/');
        router.push(`/order/order-status/${order_id}`);
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, createOrderAndProductList }}>
            {children}
        </CartContext.Provider>
    );
}