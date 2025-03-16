import useAuth from "@/app/provider/auth";
import { Link, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function BacktoWelcomeButton() {
  const router = useRouter();
  const { setErrorMessage } = useAuth();

  return (
    <Pressable
      onPress={() => {
        setErrorMessage("");
        router.back();
      }}
    >
      <View className="w-[100px] h-[50px] justify-center items-center bg-green-300 rounded-[10px] mb-[10px]">
        <Text className="text-[16px] text-white font-regular">ย้อนกลับ</Text>
      </View>
    </Pressable>
  );
}
