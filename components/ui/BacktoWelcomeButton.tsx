import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function BacktoWelcomeButton() {
	return (
		<Link href={"/(welcome)/welcome"}>
			<View className="w-[100px] h-[50px] justify-center items-center bg-green-100 rounded-[10px] mb-[10px]">
				<Text className="text-[16px] text-white">ย้อนกลับ</Text>
			</View>
		</Link>
	);
}
