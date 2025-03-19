import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import generatePayload from "promptpay-qr";
import { router } from "expo-router";
import { useCart } from "@/contexts/CartContext";
import Loading from "@/components/Loading";
import axios from "axios";
import useAuth from "@/app/provider/auth";

export default function OrderPaymentScreen() {
    const { cartItems, clearCart, riderMsg } = useCart();
    const { user } = useAuth();
    const [elementQRCode, setElementQRCode] = useState<React.ReactNode>(null);

    const initPage = async () => {
        const promptPayQR = await generatePayload("0914298877", {
            amount: cartItems.reduce((sum, item) => {
                return sum + item.price * item.quantity
            }, 0)
        });
        setElementQRCode(<QRCode value={promptPayQR} size={250} />);
    }

    const createOrderAndProductList = async () => {
        const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/order/create`, {
            customer_id: user.uuid,
            rider_id: 1,
            shop_id: 1,
            service_fee: 1,
            pickup_location_id: 1,
            note: "-"
        });

        const order_id = res.data.id;

        cartItems.map(async (item) => {
            const res2 = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/api/ProductList/create`, {
                order_id: order_id,
                product_id: item.product_id,
                quantity: item.quantity,
            });
        });

        console.log(order_id);
        clearCart();
        router.dismissTo('/');
        router.push(`/order/order-status/${order_id}`);
    }

    useEffect(() => {
        initPage();
    }, [])

    return (
        <View className="flex flex-col items-center bg-backgroud w-full h-full px-4 pt-16">
            <View className="w-full bg-white rounded-xl shadow-lg">
                <Text className="font-regular text-2xl border-b border-[#3541384D] p-4">สแกนคิวอาร์โค้ด</Text>
                <View className="flex flex-col items-center justify-center pt-[15%] gap-12">
                    {elementQRCode ? (
                        elementQRCode
                    ) : <Loading color="white" />}
                    <View className="border-t w-full pt-4 border-[#3541384D]">
                        <TouchableOpacity className="bg-success py-4 px-8 mx-auto rounded-full shadow-md mb-5" onPress={() => createOrderAndProductList()}>
                            <Text className="font-regular text-white">บันทึก</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
