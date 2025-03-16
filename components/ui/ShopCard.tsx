import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { IProduct } from "@/interfaces/IProduct";
import { useCart } from "@/contexts/CartContext";
import { ICart } from "@/interfaces/ICart";

export default function ShopCard({ product }: { product: IProduct }) {
  const { addToCart, cartItems } = useCart();

  const onButtonPress = (product: IProduct) => {
    addToCart({
      product_id: product.id,
      quantity: 1,
      price: product.price,
      name: product.name,
    });
  };

  return (
    <View className="flex flex-row rounded-[10px] bg-white w-[364px] h-fit p-[10px]">
      <View className="flex flex-col rounded-md w-2/6 h-fit shadow-slate-500">
        <View className="rounded-md w-full h-fit shadow-slate-500">
          <Image
            source={{ uri: product?.image_url }}
            style={{
              width: "100%",
              height: 120,
              borderRadius: 10,
              objectFit: "cover",
            }}
            alt={product.name}
          />
        </View>
      </View>

      <View className="pl-3 pt-3 flex flex-col flex-1 bottom-3">
        <View>
          <Text className="font-regular text-base">
            <Text className="font-bold">ชื่อสินค้า</Text>: {product.name}
          </Text>
          <Text className="font-regular text-base">
            <Text className="font-bold">ราคา</Text>: {product.price}
          </Text>
          <Text className="font-regular text-base">
            <Text className="font-bold">รายละเอียด</Text>: {product.description}
          </Text>
        </View>

        <TouchableOpacity
          className="mt-3 items-end pl-3"
          onPress={() => onButtonPress(product)}
        >
          <Text className="text-base p-[5px] px-4 text-white bg-[#68Ba7f] text-center rounded-full font-semibol font-regular shadow">
            เพิ่มลงรถเข็น
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
