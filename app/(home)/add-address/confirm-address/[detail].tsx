import { FieldTextInput } from "@/components/FieldTextInput";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface IInformationLocation {

}

export default function ConfirmAddressScreen() {
    const route = useRoute() as { params: { detail: string } };
    const [ info, lat, lon ] = route.params.detail.split("|");

    const [infomationLocation, setInformationLocation] = useState<string>(info);
    const [AdditionInformation, setAddrerssInformation] = useState<string>("");


    useEffect(() => {
        console.log(info, lat, lon);
    }, [])
    
    return (
        <View className="bg-backgroud h-full w-full flex items-center justify-center pb-5">
            <View className="bg-white w-[90%] border h-[90%] rounded-2xl p-6 gap-8">
                <Text className="font-regular font-semibold text-2xl">ข้อมูลที่อยู่</Text>
                <Text className="font-regular text-lg">{infomationLocation}</Text>
                <FieldTextInput SetTextCallBack={setAddrerssInformation} value={AdditionInformation} placeholder="คำอธิบายตำแหน่งที่อยู่เพิ่มเติม" maxLength={100} />
                <TouchableOpacity className="bg-success py-4 px-8 mx-auto rounded-full shadow-md mb-5" onPress={() => {
                    router.dismissAll();
                    router.replace('/(home)')
                }}>
                    <Text className="font-regular text-white">ยืนยัน</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}