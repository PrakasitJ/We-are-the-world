import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { FieldTextInput } from "@/components/FieldTextInput";

export default function OrderSummaryScreen() {
    const insets = useSafeAreaInsets();
    const route = useRoute();
    const [riderMessage, setRiderMessage] = useState('');

    interface CardItem {
        name: string;
        price: Double;
        amount: number;
    }
    const CardItems = [
        { name: "น้ำพริกปลาทู", price: 30, amount: 1 },
        { name: "ลาบเปรี้ยวๆ", price: 30, amount: 2 },
        { name: "ข้าวเหนียว", price: 30, amount: 1 },
        { name: "ตำไทยใส่พริก", price: 30, amount: 3 },
    ];
    const [cartItems, setCartItems] = useState<CardItem[]>(CardItems);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        setTotalPrice(cartItems.reduce((sum, item) => sum + item.price, 0));
    }, [cartItems]);
    const removeItem = (index: number) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
    }

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
                <View className="w-full h-full mt-8 gap-5">
                    <View className="bg-white w-[364px] rounded-[10px] flex flex-col py-5 px-5">
                        <Text className="font-regular font-medium text-2xl text-black">รายการของฉัน</Text>
                        <View className="bg-[#517B5D] rounded-[10px] flex-col mt-4 p-5  ">
                            {cartItems.length > 0 ? (
                                cartItems.map((item: CardItem, index: number) => (
                                    <View key={index} className="flex flex-row  justify-between pr-5">
                                        <Text className="font-regular text-lg text-white  w-3/6"> {item.name}</Text>
                                        <Text className="font-regular text-lg text-white w-2/6 pl-8"> {item.price} บาท</Text>
                                        <Text className="font-regular text-lg text-white w-1/6 pl-3"> {item.amount}</Text>
                                        <TouchableOpacity onPress={() => removeItem(index)}>
                                            <IconSymbol name='bin.xmark.fill' size={20} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                ))
                            ) : (
                                <Text className="text-gray-500 mt-4 text-center">ไม่มีสินค้าในตะกร้า</Text>
                            )}
                        </View>
                        <View className="flex flex-row items-end justify-end w-full mt-4 mb-4">
                            <Text className="font-regular text-xl text-[#517B5D] mr-2">รวมทั้งหมด</Text>
                            <Text className="font-regular text-lg text-black">
                                {cartItems.reduce((sum, item) => sum + item.price, 0)} บาท
                            </Text>
                        </View>
                        <FieldTextInput SetTextCallBack={setRiderMessage} placeholder="คำอธิบายตำแหน่งที่อยู่เพิ่มเติม" maxLength={100} />
                    </View>
                    <View className="bg-white w-[364px] rounded-[10px] flex flex-col py-5 px-5">
                        <Text className="font-regular font-medium text-2xl text-black">ช่องทางการชำระเงิน</Text>
                        <View className="flex flex-col gap-4  "> 
                        <TouchableOpacity className="flex flex-row items-center mt-4 bg-[#D0DCCF] rounded-[10px] p-1">
                            <Image
                                source={require("@/assets/images/prompt-pay.png")}
                                style={{ width: 50, height: 50, borderRadius: 75, shadowColor: 'slategray' }}
                            />
                            <Text className="font-regular ]"> QR พร้อมเพย์</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex flex-row items-center bg-[#D0DCCF] rounded-[10px] p-4">
                            <Image
                                source={require("@/assets/images/mobile.png")}
                                style={{ width: 30, height: 30, borderRadius: 75, shadowColor: 'slategray' }}
                            />
                            <Text className="font-regular ]"> โมบายแบงค์กิ้ง</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex flex-row items-center bg-[#D0DCCF] rounded-[10px] p-5">
                            <Image
                                source={require("@/assets/images/wallet.png")}
                                style={{ width: 25, height: 25, shadowColor: 'slategray' }}
                            />
                            <Text className="font-regular pl-3"> เงินสด</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>


            </ScrollView>
        </View >
    );
}
