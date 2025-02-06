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
        <View className="flex flex-col px-6 pt-8 gap-3">
          <View className="flex flex-row items-center h-auto gap-2">
            <Text className="text-xl font-bold underline">ส่งที่ฉัน</Text>
            <IconSymbol name='arrow.right' size={26} color="black" />
          </View>
          <View className="border h-[120px] bg-[#253D2C] rounded-xl">
            <View className="flex flex-row items-center gap-2 p-4">
              <IconSymbol name='house.fill' size={26} color="white" />
              <Text className="text-white">ที่อยู่จัดส่ง</Text>
            </View>
          </View>
        </View>
      </View>
    </ThemedView >
  );
}

const IconForTouch = ({ title, iconName, onPress }: { title: string, iconName: IconSymbolName, onPress: () => void }) => {
  return (
    <View className="gap-2">
      <TouchableOpacity className="flex flex-col rounded-xl items-center w-16 h-16 bg-[#92bb9e] justify-center" onPress={() => onPress()}>
        <IconSymbol name={iconName} size={32} color="white" />
      </TouchableOpacity>
      <Text className="text-[#92bb9e] text-center">{title}</Text>
    </View>
  );
};