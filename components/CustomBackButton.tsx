import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function CustomBackButton() {
    return (
        <TouchableOpacity className="p-[5px]" onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
    )
}