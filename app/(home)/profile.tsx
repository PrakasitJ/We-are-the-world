import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import useAuth from "../provider/auth";

export default function Profile() {
  const { user, logout } = useAuth();
  const [showEditNames, setShowEditName] = useState<boolean>(false);
  const [name, setName] = useState<string>(user.name);
  const [surname, setSurname] = useState<string>(user.surname);
  const [phone, setPhone] = useState<string>(user.tel);
  const router = useRouter();
  return (
    <View className="flex-1">
      <View className="flex flex-col items-center mt-[100px]">
        <Image
          source={
            user.profile_image_url
              ? { uri: user.profile_image_url }
              : require("@/assets/images/profile.png")
          }
          alt="Profile"
          className="w-[150px] h-[150px] rounded-full shadow-slate-600"
        />
        <View className="flex-row items-center mt-6 gap-2">
          <Text className="text-xl text-black font-medium font-regular">
            {name} {surname}
          </Text>
          <TouchableOpacity onPress={() => setShowEditName(true)}>
            <IconSymbol name="pencil" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-black font-medium mt-3 justify-center items-center font-regular">
          {phone}
        </Text>
      </View>
      <TouchableOpacity
        className="flex-1 justify-end items-center pb-[100px]"
        onPress={() => {
          logout();
          router.dismissAll();
          router.replace("/(welcome)/welcome");
        }}
      >
        <Text className="text-base text-white bg-[#517B5D] py-[16px] px-[120px] rounded-full font-semibold font-regular">
          ออกจากระบบ
        </Text>
      </TouchableOpacity>
      {showEditNames && (
        <ModalProfile setShowEditName={setShowEditName} setName={setName} setSurname={setSurname} setPhone={setPhone} />
      )}
    </View>
  );
}

const ModalProfile = ({
  setShowEditName,
  setName,
  setSurname,
  setPhone,
}: {
  setShowEditName: React.Dispatch<React.SetStateAction<boolean>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setSurname: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { user, updateUser } = useAuth();
  const [searchValue, setSearchValue] = useState<string>(user.name);
  const [surnameValue, setSurnameValue] = useState<string>(user.surname);
  const [phoneValue, setPhoneValue] = useState<string>(user.tel);

  const pattern = (setter: (setterStr: string) => void, str: string, type: string) => {
    switch (type) {
      case "phone":
      if (/^\d{0,10}$/.test(str)) {
        setter(str);
      }
      break;

      default:
      if (/^[A-Za-zก-๛]*$/.test(str)) {
        setter(str);
      }
      break;
    }
  }

  const handleConfirm = () => {
    updateUser(user.uuid, { name: searchValue, surname: surnameValue, tel: phoneValue });

    setName(searchValue);
    setSurname(surnameValue);
    setPhone(phoneValue);
    setShowEditName(false);
  };

  return (
    <View className="absolute items-center justify-center h-full w-full bg-black/50 ">
      <View className="flex p-7 justify-center w-[350px] h-[400px] bg-gray-100 rounded-lg shadow-lg">
        <Text className="font-medium mb-4 text-xl font-regular">
          แก้ไขข้อมูลผู้ใช้
        </Text>
        <View className="flex flex-col gap-3">
          <TextInput
            editable
            value={searchValue}
            placeholder={user.name}
            placeholderTextColor="#354138 opacity-50"
            className="w-full h-[40px] rounded-[10px] bg-[#D9D9D9] pl-[20px]"
            onChangeText={(e) => pattern(setSearchValue, e, "name")}
          />
          {searchValue.trim() === "" && (
            <Text className="text-[##EB4236] text-sm font-regular">กรุณากรอกชื่อผู้ใช้</Text>
          )}
          <TextInput
            editable
            value={surnameValue}
            placeholder={user.surname}
            placeholderTextColor="#354138 opacity-50"
            className="w-full h-[40px] rounded-[10px] bg-[#D9D9D9] pl-[20px]"
            onChangeText={(e) => pattern(setSurnameValue, e, "name")}
          />
          {surnameValue.trim() === "" && (
            <Text className="text-[##EB4236] text-sm font-regular">กรุณากรอกนามสกุล</Text>
          )}
          <TextInput
            editable
            value={phoneValue}
            placeholder={user.tel}
            placeholderTextColor="#354138 opacity-50"
            className="w-full h-[40px] rounded-[10px] bg-[#D9D9D9]  pl-[20px]"
            onChangeText={(e) => pattern(setPhoneValue, e, "phone")}
            keyboardType="phone-pad"
          />
          {phoneValue.trim() === "" && (
            <Text className="text-[##EB4236] text-sm font-regular">กรุณากรอกเบอร์โทรศัพท์</Text>
          )}
          {phoneValue.trim() !== "" && (!/^\d{10}$/.test(phoneValue)) && (
            <Text className="text-[##EB4236] text-sm font-regular">เบอร์โทรศัพท์ต้องประกอบด้วย 10 ตัวเลข</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => handleConfirm()}
          className={`mt-4 rounded-full ${searchValue.trim() === "" ||
            surnameValue.trim() === "" ||
            phoneValue.trim() === "" ||
            !/^\d{10}$/.test(phoneValue)
            ? "bg-[#b3c9ba]"
            : "bg-[#68Ba7f]"
            }`}
          disabled={
            searchValue.trim() === "" ||
            surnameValue.trim() === "" ||
            phoneValue.trim() === "" ||
            !/^\d{10}$/.test(phoneValue)
          }
        >
          <Text className="text-base text-white py-[15px] text-center rounded-full font-semibol font-regular">
            ยืนยัน
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowEditName(false)}
          className="mt-4"
        >
          <Text className="text-base text-[#68Ba7f]  py-[5px] text-center rounded-full font-semibol shadow-slate-500 font-regular">
            ยกเลิก
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
