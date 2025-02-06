import { View, Text, TouchableOpacity } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { useRouter } from "expo-router";

interface IIconPage {
  title: string,
  iconName: IconSymbolName,
  onPress: () => void
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const ICONPAGE: IIconPage[] = [
    {
      title: 'charity',
      iconName: 'building.fill',
      onPress: () => router.push('/')
    },
    {
      title: 'rider',
      iconName: 'truck.box.fill',
      onPress: () => router.push('/')
    },
    {
      title: 'shop',
      iconName: 'cart.fill',
      onPress: () => router.push('/')
    }
  ];
  return (
    <ThemedView style={{ paddingTop: insets.top, height: '100%' }}>
      <View className="flex flex-col justify-end pb-6 pl-6 bg-[#253D2C] h-[220]">
        <Text className="text-4xl font-extrabold text-white" >Hello, Phunyisa</Text>
      </View>
      <View className="flex flex-col h-screen">
        <View className="flex flex-row justify-around items-center h-auto pt-8">
          {ICONPAGE.map((item, index) => (
            <IconForTouch key={index} title={item.title} iconName={item.iconName} onPress={item.onPress} />
          ))}
        </View>
      </View>
    </ThemedView>
  );
}

const IconForTouch = ({ title, iconName, onPress }: { title: string, iconName: IconSymbolName, onPress: () => void }) => {
  return (
    <View className="gap-2">
      <TouchableOpacity className="flex flex-col rounded-xl items-center w-16 h-16 bg-[#92bb9e] justify-center" onPress={() => onPress()}>
        <IconSymbol name={iconName} size={28} color="white" />
      </TouchableOpacity>
      <Text className="text-[#92bb9e] text-center">{title}</Text>
    </View>
  );
};