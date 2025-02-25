import { View } from "react-native";
import ShopCard from "./ShopCard";

export default function ShopCardCardList(){
    const fakeData = [
        { id: 1, name: "Item 1", price: 30, description: "Description for Item 1" },
        { id: 2, name: "Item 2", price: 30, description: "Description for Item 2" },
        { id: 3, name: "Item 3", price: 30, description: "Description for Item 3" },
        { id: 4, name: "Item 4", price: 30, description: "Description for Item 4" },
        { id: 5, name: "Item 5", price: 30, description: "Description for Item 5" },
        { id: 6, name: "Item 6", price: 30, description: "Description for Item 6" },
        { id: 7, name: "Item 7", price: 30, description: "Description for Item 7" },
        { id: 8, name: "Item 8", price: 30, description: "Description for Item 8" },
        { id: 9, name: "Item 9", price: 30, description: "Description for Item 9" },
    ];

    return(
        <View className="gap-5">
            {fakeData.map(item => (
                <ShopCard key={item.id} name={item.name} price={item.price} description={item.description} />
            ))}
        </View>
    );
}
