import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import generatePayload from "promptpay-qr";

export default function OrderPaymentScreen() {
    const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);

    useEffect(() => {
        const promptPayQR = generatePayload("0914298877", { amount: 100 });
        setQrCodeValue(promptPayQR);
    }, []);

    return (
        <View className="flex flex-col items-center bg-backgroud w-full h-full px-4 pt-16">
            <View className="w-full bg-white rounded-xl shadow-lg">
                <Text className="font-regular text-2xl border-b border-[#3541384D] p-4">สแกนคิวอาร์โค้ด</Text>
                <View className="flex flex-col items-center justify-center pt-[15%] gap-12">
                    {qrCodeValue && (
                        <QRCode
                            value={qrCodeValue}
                            size={250}
                        />
                    )}
                    <View className="border-t w-full pt-4 border-[#3541384D]">
                        <TouchableOpacity className="bg-success py-4 px-8 mx-auto rounded-full shadow-md mb-5" onPress={() => {
                        }}>
                            <Text className="font-regular text-white">บันทึก</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
