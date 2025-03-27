import useAuth from "@/app/provider/auth";
import { ICart, ICartRequest } from "@/interfaces/ICart";
import axios from "axios";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useState } from "react";

const CartContext = createContext<{
    cartItems: ICartRequest[];
    addToCart: (item: ICartRequest) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    riderMsg: string;
    setRiderMsg: (msg: string) => void;
    shopId: number;
    setShopId: (id: number) => void;
}>({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    riderMsg: "",
    setRiderMsg: () => {},
    shopId: 0,
    setShopId: ()=>{}
});

export const useCart = () => useContext(CartContext);


export default function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<ICartRequest[]>([]);
    const [riderMsg, setRiderMsg] = useState<string>("");
    const [shopId, setShopId] = useState<number>(0);

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

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, setRiderMsg, riderMsg, shopId, setShopId }}>
            {children}
        </CartContext.Provider>
    );
}