import { View, Text, TouchableOpacity, Platform } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import SearchBar from "@/components/ui/SearchBar";
import React, { useEffect } from "react";
import SearchButton from "@/components/ui/SearchButton";
import useAuth from "../provider/auth";
import { Ionicons } from "@expo/vector-icons";

interface IIconPage {
  title: string,
  iconName: string,
  onPress: () => void
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const ICONPAGE: IIconPage[] = [
    {
      title: 'มูลนิธิ',
      iconName: Platform.OS === 'ios' ? 'building.fill' : 'home',
      onPress: () => router.push('/')
    },
    {
      title: 'ไรเดอร์',
      iconName: Platform.OS === 'ios' ? 'truck.box.fill' : 'car',
      onPress: () => router.push('/')
    },
    {
      title: 'ร้านค้า',
      iconName: Platform.OS === 'ios' ? 'cart.fill' : 'cart',
      onPress: () => router.push('/(shop)/(owner)/shops')
    }
  ];
  const { user, refresh } = useAuth();

  useEffect(() => {
    
    refresh();
  }, []);

  return (
    <ThemedView style={{ paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom }} keyboardShouldPersistTaps="handled">
        <View className="flex flex-row justify-between p-4 px-6 bg-[#253D2C] h-[150px] items-end">
          <Text className="flex-1 text-4xl font-bold text-white pt-3" >สวัสดี, {user.name}</Text>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            {Platform.OS === 'ios' ? (
              <IconSymbol name='person.fill' size={45} color="white" />
            ) : (
              <Ionicons name="person-circle-outline" size={45} color="white" />
            )}
          </TouchableOpacity>
        </View>
        <View className="flex flex-col flex-1">
          <View className="flex flex-row justify-around items-center h-auto pt-5">
            {ICONPAGE.map((item, index) => (
              Platform.OS === 'ios' ? (
                <IconForTouch key={index} title={item.title} iconName={item.iconName as IconSymbolName} onPress={item.onPress} />
              ) : (
                <IconForTouchAndroid key={index} title={item.title} iconName={item.iconName as IconSymbolName} onPress={item.onPress} />
              )
            ))}
          </View>
          <View className="gap-2 pt-7 px-10 ">
            <SearchButton />
            <View className="flex flex-col gap-3 pt-1 ">
              <View className="flex flex-row items-center h-auto gap-2 pt-1">
                <TouchableOpacity onPress={() => router.push('/add-address')}>
                  <Text className="text-xl font-regular underline">ส่งที่ฉัน</Text>
                </TouchableOpacity>
                <IconSymbol name='arrow.right' size={26} color="black" />
              </View>
              <View className="border h-[120px] bg-[#253D2C] rounded-xl">
                <View className="flex flex-row items-center gap-2 p-4">
                  <IconSymbol name='house.fill' size={26} color="white" />
                  <Text className="text-white font-regular">ที่อยู่จัดส่ง</Text>
                </View>
              </View>
            </View>
            <View className="flex flex-row items-center h-auto gap-2 pt-2 ">
              <TouchableOpacity onPress={() => router.push('/order/order-receiving')}>
                <Text className="text-xl font-regular underline">คำสั่งซื้อที่กำลังจะได้รับ</Text>
              </TouchableOpacity>
              <IconSymbol name='arrow.right' size={26} color="black" />
            </View>
            <View className="flex flex-col gap-1">
              <View className="flex flex-row items-center h-auto gap-2 ">
                <TouchableOpacity onPress={() => router.push('/order/order-history')} className="text-xl font-regular underline">
                  <Text className="text-xl font-regular underline">ประวัติการซื้อ</Text>
                </TouchableOpacity>
                <IconSymbol name='arrow.right' size={26} color="black" />
              </View>
              <View className="flex flex-row justify-around items-center h-auto pt-2">
                <View className="flex flex-row h-[100px] w-[100px] bg-[#D9D9D9]" />
                <View className="flex flex-row h-[100px] w-[100px] bg-[#D9D9D9]" />
                <View className="flex flex-row h-[100px] w-[100px] bg-[#D9D9D9]" />
              </View>
            </View>

            <View className="flex flex-col gap-1">
              <View className="flex flex-row items-center h-auto gap-2 ">
                <TouchableOpacity onPress={() => router.push('/foundation-map')} className="text-xl font-regular underline">
                  <Text className="text-xl font-regular underline">บริจาคให้มูลนิธิ</Text>
                </TouchableOpacity>
                <IconSymbol name='arrow.right' size={26} color="black" />
              </View>
              <View className="flex flex-row justify-around items-center h-auto pt-2">
                <View className="flex flex-row h-[100px] w-[100px] bg-[#D9D9D9]" />
                <View className="flex flex-row h-[100px] w-[100px] bg-[#D9D9D9]" />
                <View className="flex flex-row h-[100px] w-[100px] bg-[#D9D9D9]" />
              </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const IconForTouch = ({ title, iconName, onPress }: { title: string, iconName: IconSymbolName, onPress: () => void }) => {
  return (
    <View className="gap-2">
      <TouchableOpacity className="flex flex-col rounded-xl items-center w-16 h-16 bg-[#92bb9e] justify-center" onPress={() => onPress()}>
        <IconSymbol name={iconName} size={32} color="white" />
      </TouchableOpacity>
      <Text className="text-[#517B5D] font-regular text-center">{title}</Text>
    </View>
  );
};

const IconForTouchAndroid = ({ title, iconName, onPress }: { title: string, iconName: string, onPress: () => void }) => {
  return (
    <View className="gap-2">
      <TouchableOpacity className="flex flex-col rounded-xl items-center w-16 h-16 bg-[#92bb9e] justify-center" onPress={() => onPress()}>
        <Ionicons name={iconName as any} size={32} color="white" />
      </TouchableOpacity>
      <Text className="text-[#517B5D] font-regular text-center">{title}</Text>
    </View>
  );
};
