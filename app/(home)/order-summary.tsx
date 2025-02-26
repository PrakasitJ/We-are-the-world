import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Double } from "react-native/Libraries/Types/CodegenTypes";

export default function OrderSummaryScreen() {
    const insets = useSafeAreaInsets();
    const route = useRoute();
    
    interface CardItem {
        name: string;
        price: Double;
        description: string;
    }

    const [cartItems, setCartItems] = useState<CardItem[]>([]);

    return (
        <View className="flex items-center bg-[#354138] w-full h-full">
            <View className="flex flex-row bg-[#517B5D] h-[50px] w-full items-center px-5 justify-between">
                <Text className="text-base font-regular text-white">ร้านจรรยา</Text>

            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: insets.bottom,
                }}
                keyboardShouldPersistTaps="handled"
            >
                <View className="w-full h-full mt-8">
                    <View className="bg-white w-[364px] rounded-[10px] flex flex-col py-5 px-5">
                        <Text className="font-regular font-medium text-xl text-black">รายการของฉัน</Text>
                        
                        {cartItems.length > 0 ? (
                            cartItems.map((item: CardItem, index: number) => (
                                <View key={index} className="bg-[#517B5D] rounded-[10px] flex-col w-full mt-4 p-4">
                                    <Text className="font-regular text-base text-white">ชื่อสินค้า: {item.name}</Text>
                                    <Text className="font-regular text-base text-white">ราคา: {item.price} บาท</Text>
                                    <Text className="font-regular text-base text-white">รายละเอียด: {item.description}</Text>
                                </View>
                            ))
                        ) : (
                            <Text className="text-gray-500 mt-4 text-center">ไม่มีสินค้าในตะกร้า</Text>
                        )}

                        <View className="flex flex-row items-end justify-end w-full mt-4 mb-4">
                            <Text className="font-regular text-lg text-[#517B5D] mr-2">รวมทั้งหมด</Text>
                            <Text className="font-regular text-base text-black">
                                {cartItems.reduce((sum, item) => sum + item.price, 0)} บาท
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
