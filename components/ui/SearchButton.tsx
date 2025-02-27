import { View, TextInput, Image, TouchableOpacity, Text } from "react-native";
import { IconSymbol } from "./IconSymbol";
import { useState } from "react";
import { router } from "expo-router";

export default function SearchButton() {
  return (
    <View className="relative w-full justify-center ">
      <TouchableOpacity onPress={() => router.push('/(home)/order/order-list')}>
        <Text className="flex w-full h-[40px] rounded-[50px] bg-[#D9D9D9]  pl-[40px] font-regular justify-center pt-[10px] text-#354138 opacity-50">
          ค้นหาร้านค้า
        </Text>
      </TouchableOpacity>
      <View className="absolute mt-[13px] ml-[13px]">
    <IconSymbol name='magnifyingglass' size={15} color="#253D2C"/>
    </View>
    </View>
  );
}
