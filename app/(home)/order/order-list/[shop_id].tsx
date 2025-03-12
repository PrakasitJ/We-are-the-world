import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/ui/IconSymbol";
import ShopCardList from "@/components/ui/ShopCardList";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Loading from "@/components/Loading";
import { IProduct } from "@/interfaces/IProduct";
import { IShop } from "@/interfaces/IShop";
import { useCart } from "@/contexts/CartContext";

export default function ShopListScreen() {
  const route = useRoute() as { params: { shop_id: string } };
  const insets = useSafeAreaInsets();
  const [shop, setShop] = useState<IShop>();
  const [products, setProducts] = useState<IProduct[]>();
  const { cartItems } = useCart();

  const fetchProductByShopId = async () => {
    const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/product/getByShopID/${route.params.shop_id}`);
    if (res.status === 200) setProducts(res.data);
  }

  const fetchShopByShopId = async () => {
    const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/shop/get/${route.params.shop_id}`);
    if (res.status === 200) setShop(res.data);
  }

  useEffect(() => {
    fetchShopByShopId();
    fetchProductByShopId();
  }, [])

  return (
    <ThemedView>
      <View className="flex items-center bg-[#354138] w-full h-full">
        <View className="flex flex-row bg-[#517B5D] h-[52px] w-full items-center px-5 justify-between">
          {shop ? <Text className="text-base font-regular text-white">{shop?.name}</Text> : <Loading color="white" />}
          <TouchableOpacity className="w-full flex-1 flex-row justify-end items-center" onPress={() => router.push('/order/order-summary')}>
            <IconSymbol name="cart.fill" size={40} color="#FFFF" />
            {cartItems.length > 0 && <Text className="font-regular w-[24px] absolute text-sm top-[8px] text-center right-[5px]">
              {
                cartItems.reduce((sum, item) => {
                  return sum + item.quantity
                }, 0)
              }
            </Text>}
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
            {products ? <ShopCardList products={products} /> : <Loading color="white" />}
          </View>
        </ScrollView>
      </View>
    </ThemedView>
  );
}
