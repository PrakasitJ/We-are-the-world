import { StyleSheet, Platform, View, Text } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <ThemedView style={{ paddingTop: insets.top }}>
      <View className="flex flex-column justify-end pb-6 pl-6 bg-[#253D2C] h-[250]"><Text className = "text-4xl font-extrabold text-white " >Hello, Phunyisa</Text></View>
      <View className="flex flex-column">
       <View></View>
       <View><Text>ส่งที่ฉัน</Text><View></View></View>
       <View></View>
       <View></View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
