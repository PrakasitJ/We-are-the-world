import { FieldTextInput } from "@/components/FieldTextInput";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Platform, ScrollView, Text, View, ViewProps } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CardItem {
    name: string;
    price: number;
    amount: number;
}

const CardItems = [
    { name: "น้ำพริกปลาทู", price: 30, amount: 1 },
    { name: "ลาบเปรี้ยวๆ", price: 30, amount: 2 },
    { name: "ข้าวเหนียว", price: 30, amount: 1 },
    { name: "ตำไทยใส่พริก", price: 30, amount: 3 },
];

export default function OrderStatusScreen() {
    const [cartItems, setCartItems] = useState<CardItem[]>(CardItems);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        // fetch !!!!
    }, [])


    return (
        <View className="bg-backgroud w-full h-full" >
            <KeyboardAwareScrollView
                enableOnAndroid
                extraScrollHeight={Platform.OS === 'ios' ? 20 : 0}
                style={{ flex: 1 }}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: insets.bottom,
                        alignItems: "center",
                        paddingTop: 15,
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="border w-[90%] bg-white gap-5 p-5 rounded-xl">
                        <View className="pt-2">
                            <Text className="font-regular font-medium text-2xl">ร้านจรรยา</Text>
                            <Text className="font-regular text-gray-500">12 สิงหาคม 2568 19:00</Text>
                        </View>
                        <View>
                            <Text className="font-regular font-medium text-xl">ภูมิระพี เสริญวณิชกุล</Text>
                            <Text className="font-regular text-gray-500">0914298877</Text>
                            <View className="flex flex-row items-center gap-2">
                                <FontAwesome name="map-marker" size={20} color="#A90E0E" />
                                <Text className="font-regular text-gray-500">ที่อยู่ร้านค้า</Text>
                            </View>
                            <View className="flex flex-row items-center gap-2">
                                <FontAwesome name="map-marker" size={20} color="#517B5D" />
                                <Text className="font-regular text-gray-500">ที่อยู่ผู้รับ</Text>
                            </View>
                        </View>
                        <View className="flex flex-col">
                            <Text className="font-regular font-medium text-2xl text-black">รายการของฉัน</Text>
                            <View className="bg-[#517B5D] rounded-[10px] flex-col mt-4 p-5  ">
                                {cartItems.length > 0 ? (
                                    cartItems.map((item: CardItem, index: number) => (
                                        <View key={index} className="flex flex-row  justify-between pr-5">
                                            <Text className="font-regular text-lg text-white  w-3/6"> {item.name}</Text>
                                            <Text className="font-regular text-lg text-white w-2/6 pl-8"> {item.price} บาท</Text>
                                            <Text className="font-regular text-lg text-white w-1/6 pl-3"> {item.amount}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text className="text-gray-500 mt-4 text-center">ไม่มีสินค้าในตะกร้า</Text>
                                )}
                            </View>
                            <View className="flex flex-row items-end justify-between w-full mt-4 mb-4">
                                <Text className="font-regular text-xl text-[#517B5D] mr-2">รวมทั้งหมด</Text>
                                <Text className="font-regular text-lg text-black">
                                    {cartItems.reduce((sum, item) => sum + item.price, 0)} บาท
                                </Text>
                            </View>
                            <FieldTextInput placeholder="ข้อความเพิ่มเติมถึงไรเดอร์" showMax={false} maxLength={100} editable={false} />
                        </View>
                        <View className="flex flex-col">
                            <Text className="font-regular font-medium text-2xl pt-2">สถานะคำสั่งซื้อ</Text>
                            <StepProgressBarItem className="px-5 mt-5 pb-5" />
                        </View>
                        <View className="flex flex-row items-end justify-between w-full mt-5 mb-4">
                            <Text className="font-regular text-xl mr-2">วิธีการชำระเงิน</Text>
                            <Text className="font-regular text-lg text-black">
                                เงินสด
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAwareScrollView>
        </View>
    )
}

const StepProgressBarItem = ({ className }: { className?: string }) => {
    const steps = [
        { step: 0, title: "ร้านค้ารับออเดอร์", status: "" },
        { step: 1, title: "ไรเดอร์รับออเดอร์", status: "" },
        { step: 2, title: "กำลังจัดส่ง", status: "" },
        { step: 3, title: "จัดส่งเสร็จสิ้น", status: "" },
    ]
    return (
        <>
            <View className={`flex flex-row items-center justify-between w-full pr-10 ${className}`}>
                {steps.map((step, index) => (
                    <View key={index} className="flex flex-row items-center w-1/3">
                        <View className={`w-4 h-4 rounded-full ${step.status === "done" || index === 0 ? "bg-green-500"
                            : step.status === "active" ? "bg-yellow-500"
                                : "bg-gray-300"
                            }`} >
                            <Text key={index} className="absolute font-regular self-center mt-5 text-[12px] text-gray-600 text-center w-16">
                                {step.title}
                            </Text>
                        </View>

                        {index !== steps.length - 1 && (
                            <View className={`h-1 flex-1 ${steps[index].status === "done" ? "bg-green-500"
                                : step.status === "done" ? "bg-green-500"
                                    : "bg-gray-300"
                                }`} />
                        )}
                    </View>
                ))}
            </View>

            {/* <View className="flex flex-row justify-between w-full mt-2">
        {steps.map((step, index) => (
            <Text key={index} className="text-[12px] text-gray-600 text-center w-16">
                {step.title}
            </Text>
        ))}
    </View> */}
        </>


    );
}