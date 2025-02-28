import { createContext, ReactNode } from "react";

const CartContext = createContext({
    cartItems: [],
    addToCart: (item: any) => { },
    removeFromCart: (item: any) => { },
    clearCart: () => { },
});

export default function CartProvider({ children }: { children: ReactNode }) {
    return <></>
}