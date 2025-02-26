import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";

export default function Profile() {
    const [showEditNames, setShowEditName] = useState<boolean>(false);
    const [name, setName] = useState<string>("ชื่อผู้ใช้");

    const router = useRouter();

    return (
        <View className="flex-1">
            <View className="flex flex-col items-center mt-[100px]">
                <Image
                    source={require("@/assets/images/profile.png")}
                    alt="Profile"
                    className="w-[150px] h-[150px] rounded-full shadow-slate-600"
                />
                <View className="flex-row items-center mt-6 gap-2">
                    <Text className="text-xl text-black font-medium font-regular">{name}</Text>
                    <TouchableOpacity onPress={() => setShowEditName(true)}>
                        <IconSymbol name="pencil" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                <Text className="text-xl text-black font-medium mt-3 justify-center items-center font-regular">เบอร์โทรศัพท์</Text>
            </View>
            <TouchableOpacity className="flex-1 justify-end items-center pb-[100px]" onPress={() => router.push("/(welcome)/welcome")}>
                <Text className="text-base text-white bg-[#517B5D] py-[16px] px-[120px] rounded-full font-semibold font-regular">ออกจากระบบ</Text>
            </TouchableOpacity>
            {showEditNames && <ModalProfile setShowEditName={setShowEditName} setName={setName} />}
        </View>
    );
}


const ModalProfile = ({ setShowEditName, setName }: { setShowEditName: React.Dispatch<React.SetStateAction<boolean>>, setName: React.Dispatch<React.SetStateAction<string>> }) => {
    const [searchValue, setSearchValue] = useState<string>("");

    const handleConfirm = () => {
        setName(searchValue);
        setShowEditName(false);
    };

    return (
        <View className="absolute items-center justify-center h-full w-full bg-black/50 ">
            <View className="flex  p-7 justify-center w-[350px] h-[250px] bg-gray-100 rounded-lg shadow-lg">
                <Text className="font-medium mb-4 text-xl font-regular">แก้ไขชื่อผู้ใช้</Text>
                <TextInput
                    editable
                    value={searchValue}
                    placeholder="ชื่อผู้ใช้"
                    placeholderTextColor="#354138 opacity-50"
                    className="w-full h-[40px] rounded-[10px] bg-[#D9D9D9]  pl-[20px]"
                    onChangeText={setSearchValue}
                />
                <TouchableOpacity onPress={() => handleConfirm()} className="mt-4" >
                    <Text className="text-base text-white bg-[#68Ba7f] py-[15px] text-center rounded-full font-semibol font-regular">ยืนยัน</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowEditName(false)} className="mt-4">
                    <Text className="text-base text-[#68Ba7f]  py-[5px] text-center rounded-full font-semibol shadow-slate-500 font-regular">ยกเลิก</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

