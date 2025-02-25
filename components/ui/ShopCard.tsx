import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Double } from "react-native/Libraries/Types/CodegenTypes";

interface ShopCardProps {
    name: string;
    price: Double;
    description: string;
}

export default function ShopCard({ name, price, description }: ShopCardProps) {
    return (
        <View className="flex flex-row rounded-[10px] bg-white w-[364px] h-[125px] p-[10px]">
            <View className=" bg-[#D9D9D9] rounded-md p-4 w-2/6">
                <Image
                    src={('../assets/images/shop.png')}
                    alt="hihi"
                    className="shadow-slate-500"
                />
            </View>

            <View className="pl-3 pt-3 flex flex-col flex-1 bottom-3">
                <View>
                    <Text className="font-regular text-base">
                        <Text className="font-bold">ชื่อสินค้า</Text>: {name}
                    </Text>
                    <Text className="font-regular text-base">
                    <Text className="font-bold">ราคา</Text>: {price}
                    </Text>
                    <Text className="font-regular text-base">
                    <Text className="font-bold">รายละเอียด</Text>: {description}
                    </Text>
                </View>
                <TouchableOpacity className="mt-3 items-end pl-3">
                    <Text className="text-base p-[5px] text-white bg-[#68Ba7f] text-center rounded-full font-semibol font-regular shadow">
                        เพิ่มลงรถเข็น
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}