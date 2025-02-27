import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/IconSymbol";
import ShopCardCardList from "@/components/ui/ShopCardList";
import { router } from "expo-router";

export default function ShopListScreen() {
  const insets = useSafeAreaInsets();
  

  return (
    <View className="flex items-center bg-[#354138] w-full h-full">
          <View className="flex flex-row bg-[#517B5D] h-[50px] w-full items-center px-5 justify-between">
            <Text className="text-base font-regular text-white">ร้านจรรยา</Text>
            <TouchableOpacity onPress={() => router.push('/order/order-summary')}>
              <IconSymbol name="cart.fill" size={20} color="#FFFF" />
            </TouchableOpacity>
          </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
        }}
        keyboardShouldPersistTaps="handled"
      >
        
          <View className=" mt-6"> 
          <ShopCardCardList />
          </View>
      </ScrollView>
    </View>
  );
}
