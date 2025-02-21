import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function CustomTextInput({ title ,placeholder, onChange }: { title: string, placeholder: string, onChange: (temp: string) => void }) {

	const [showPassword, setShowPassword] = useState(false);
	const handleChange = (temp: string) => {
		onChange(temp);
	};

	return (
		<View className="flex-row justify-between w-full h-[50px] bg-gray-200 rounded-[5px] mb-[10px] px-3">
			<TextInput
				className="text-[16px] text-black w-[90%]"
				placeholder={placeholder}
				onChangeText={handleChange}
				secureTextEntry={title === "Password" ? !showPassword : false}
			/>
			{title === "Password" && (
				<TouchableOpacity className="justify-center w-[10%]" onPress={() => setShowPassword(!showPassword)}>
					<Feather name={showPassword ? "eye" : "eye-off"} size={20} color="black" />
				</TouchableOpacity>
			)}
		</View>
	);
}
