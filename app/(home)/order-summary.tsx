import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/IconSymbol";
import ShopCardCardList from "@/components/ui/ShopCardList";
import { TextInput } from "react-native-gesture-handler";

export default function OrderSummaryScreen() {
    const insets = useSafeAreaInsets();
    const [searchValue, setSearchValue] = useState<string>("");

    return (
        <View className="flex items-center bg-[#354138] w-full h-full">
            <View className="flex flex-row bg-[#517B5D] h-[50px] w-full items-center px-5 justify-between">
                <Text className="text-base font-regular text-white">ร้านจรรยา</Text>
                <TouchableOpacity>
                    <IconSymbol name="cart.fill" size={20} color="#FFFF" />
                </TouchableOpacity>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: insets.bottom,
                }}
                keyboardShouldPersistTaps="handled"
            >
                <View className="w-full h-full mt-8" >
                    <View className="bg-white w-[364px] rounded-[10px] flex flex-col py-5 px-5">
                        <Text className="font-regular font-medium text-xl text-black">รายการของฉัน</Text>
                        <View className="bg-[#517B5D] rounded-[10px] flex-col w-full mt-4"> 
                            <View className=" flex flex-row justify-between items-center h-[50px] px-5">
                            <Text className="font-regular text-base text-white w-3/6"> ชื่อสินค้า </Text>
                            <Text className="font-regular text-base text-white"> จำนวน </Text>
                            <Text className="font-regular text-base text-white"> ราคา </Text>
                            <TouchableOpacity>
                                <IconSymbol name="bin.xmark.fill" size={20} color="#FFFF" />
                            </TouchableOpacity>
                            </View>
                        </View>
                        <View className="flex flex-row items-end justify-end w-full mt-4 mb-4 ">
                            <Text className="font-regular text-lg text-[#517B5D] mr-2">รวมทั้งหมด</Text>
                            <Text className="font-regular text-base text-black">ราคาสินค้ารวม</Text>
                        </View>
                    </View>
                    <View></View>
                </View>
            </ScrollView>
        </View>
    );
}
