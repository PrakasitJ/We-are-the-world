import { View } from "react-native";
import ShopCard from "./ShopCard";
import { IProduct } from "@/interfaces/IProduct";


export default function ShopCardList({ products }: { products: IProduct[] }){
    return(
        <View className="gap-5">
            {products.map((item: IProduct, index) => (
                <ShopCard key={index} product={item} />
            ))}
        </View>
    );
}