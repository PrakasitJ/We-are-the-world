import { Text, View } from "react-native";

export default function Loading({ color='#000000' }: {color?: string}) {
    return (
        <View className="flex items-center justify-center">
            <Text className="font-regular" style={{ color: color }}>Loading...</Text>
        </View>
    )
}