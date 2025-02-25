import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import CustomTextInput from "@/components/ui/CustomTextInput";
import { Link } from "expo-router";
import BacktoWelcomeButton from "@/components/ui/BacktoWelcomeButton";

function SignInButton() {
	return (
		<Link href={"/(home)"}>
			<View className="w-[100px] h-[50px] justify-center items-center bg-green-500 rounded-[10px] mb-[10px]">
				<Text className="text-[16px] text-white font-regular">login</Text>
			</View>
		</Link>
	);
}

export default function SingUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<SafeAreaView className="bg-primary h-full">
			<ScrollView contentContainerStyle={{ height: '100%' }}>
				<View className="flex flex-col justify-center h-full w-full px-10">
					<Text className="font-extrabold text-3xl mb-[15px] font-regular">Log In</Text>
					<CustomTextInput title="Username" placeholder="Email / Username" onChange={setEmail} />
					<CustomTextInput title="Password" placeholder="Password" onChange={setPassword} />
					<View className="flex-row w-full justify-between items-center py-[10px]">
						<BacktoWelcomeButton />
						<SignInButton />
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}
