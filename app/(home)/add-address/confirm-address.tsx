import { FieldTextInput } from "@/components/FieldTextInput";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface IInformationLocation {

}

export default function ConfirmAddressScreen() {
    const [infomationLocation, setInformationLocation] = useState<string>("โรงพยาบาลสัตว์ มหาวิทยาลัยเกษตรศาสตร์ บางเขน เลขที่ 50 ถนน พหลโยธิน แขวง ลาดยาว เขต จตุจักร จังหวัด กรุงเทพฯ รหัสไปรษณีย์ 10900 เบอร์โทรติดต่อ 02-7971900 กด 9");
    const [AdditionInformation, setAddrerssInformation] = useState<string>("");
    return (
        <View className="bg-backgroud h-full w-full flex items-center justify-center pb-5">
            <View className="bg-white w-[90%] border h-[90%] rounded-2xl p-6 gap-8">
                <Text className="font-regular font-semibold text-2xl">ข้อมูลที่อยู่</Text>
                <Text className="font-regular text-lg">{infomationLocation}</Text>
                <FieldTextInput SetTextCallBack={setAddrerssInformation} placeholder="คำอธิบายตำแหน่งที่อยู่เพิ่มเติม" maxLength={100}/>
                <TouchableOpacity className="bg-success py-4 px-8 mx-auto rounded-full shadow-md mb-5">
                    <Text className="font-regular text-white">ยืนยัน</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}