import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/IconSymbol";
import ShopCardList from "@/components/ui/ShopCardList";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { useRoute } from "@react-navigation/native";
import { IProduct } from "@/interfaces/IProduct";
import axios from "axios";
import Loading from "@/components/Loading";
import { IShopDetail } from "@/interfaces/IShopDetail";

export default function ShopListScreen() {
  const route = useRoute() as { params: { shop_id: string } };
  const insets = useSafeAreaInsets();
  const [shopDetail, setShopDetail] = useState<IShopDetail>();

  const fetchProductByShopId = async () => {
    const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/shop/get/${route.params.shop_id}/detail`);
    if (res.status === 200) setShopDetail(res.data);
  }

  useEffect(() => {
    fetchProductByShopId();
  }, [])

  return (
    <ThemedView>
      <View className="flex items-center bg-[#354138] w-full h-full">
        <View className="flex flex-row bg-[#517B5D] h-[50px] w-full items-center px-5 justify-between">
          <Text className="text-base font-regular text-white">{shopDetail?.user.name}</Text>
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
          <View className="mt-5">
            {shopDetail?.Product ? <ShopCardList products={shopDetail.Product} /> : <Loading color="white" />}
          </View>
        </ScrollView>
      </View>
    </ThemedView>
  );
}
