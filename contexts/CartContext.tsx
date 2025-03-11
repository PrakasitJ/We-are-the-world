import { createContext, ReactNode, useState } from "react";

const CartContext = createContext<{
    cartItems: ICart[];
    addToCart: (item: ICart) => void;
    removeFromCart: (id: number) => void;
}>({
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
});

interface ICart {
    id: 1,
    shop_id: 1,
    product_category_id: 1,
    amount: number;
    name: string;
    image_url: string;
}

export default function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<ICart[]>([]);

    const addToCart = (item: ICart) => {
        console.log("Adding to cart", item);

        if (cartItems.some((cartItem) => cartItem.id === item.id)) {
            const newCartItems = cartItems.map((cartItem) => {
                if (cartItem.id === item.id) {
                    return {
                        ...cartItem,
                        amount: cartItem.amount + item.amount,
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

    const removeFromCart = (id: number) => {
        setCartItems(cartItems.filter((item) => item.id !== id));
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}