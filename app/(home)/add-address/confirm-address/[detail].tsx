import { FieldTextInput } from "@/components/FieldTextInput";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import axios from "axios";

export default function ConfirmAddressScreen() {
    const route = useRoute() as { params: { detail: string } };
    const [info, lat, lon] = route.params.detail.split("|");

    const [infomationLocation, setInformationLocation] = useState<string>(info);
    const [additionInformation, setAddressInformation] = useState<string>("");

    useEffect(() => {
        console.log(info, lat, lon);
    }, []);

    
    // เพิ่มฟังก์ชันสำหรับส่งข้อมูลไปยัง Backend
    const handleConfirmLocation = async () => {
        console.log("📌 Sending data to API:");
        console.log({
            user_id: "713f020d-8b9e-4048-9dbc-0146df7cb4e7",
            address: infomationLocation,
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
            additional_info: additionInformation,
        });


        try {
            const response = await axios.post("http://localhost:3000/api/location/create", {
                user_id: "713f020d-8b9e-4048-9dbc-0146df7cb4e7",
                address: infomationLocation,
                latitude: parseFloat(lat),
                longitude: parseFloat(lon),
                additional_info: additionInformation,
            });
    
            console.log("✅ API Response:", response.data);
            alert("บันทึกที่อยู่เรียบร้อยแล้ว!");
            router.dismissAll();
            router.replace("/(home)");
        } catch (error) {
            console.error("❌ Error saving location:", error);
            alert("เกิดข้อผิดพลาดในการบันทึกที่อยู่");
        }
    };
    

    return (
        <View className="bg-backgroud h-full w-full flex items-center justify-center pb-5">
            <View className="bg-white w-[90%] border h-[90%] rounded-2xl p-6 gap-8">
                <Text className="font-regular font-semibold text-2xl">ข้อมูลที่อยู่</Text>
                <Text className="font-regular text-lg">{infomationLocation}</Text>
                <FieldTextInput SetTextCallBack={setAddressInformation} placeholder="คำอธิบายตำแหน่งที่อยู่เพิ่มเติม" maxLength={100} />

                <TouchableOpacity className="bg-success py-4 px-8 mx-auto rounded-full shadow-md mb-5" onPress={handleConfirmLocation}>
                    <Text className="font-regular text-white">ยืนยัน</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
