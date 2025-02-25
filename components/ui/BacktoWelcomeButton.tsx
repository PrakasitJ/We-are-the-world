import { Link, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function BacktoWelcomeButton() {
	const router = useRouter();

	return (
		<Pressable onPress={() => router.back()}>
			<View className="w-[100px] h-[50px] justify-center items-center bg-green-300 rounded-[10px] mb-[10px]">
				<Text className="text-[16px] text-white">ย้อนกลับ</Text>
			</View>
		</Pressable>
	);
}
