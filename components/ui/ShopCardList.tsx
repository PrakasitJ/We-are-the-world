import { View } from "react-native";
import ShopCard from "./ShopCard";

export default function ShopCardCardList(){
    return(
        <View className="gap-5">
            <ShopCard/>
            <ShopCard/>
            <ShopCard/>
            <ShopCard/>
            <ShopCard/>
            <ShopCard/>
            <ShopCard/>
            <ShopCard/>
            <ShopCard/>
        </View>
    );
}