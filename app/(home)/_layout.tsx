import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";


export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#253D2C",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
          fontFamily: "notoSansThai",
        },
        headerBackTitleStyle: {
          fontFamily: "notoSansThai",
        },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "หน้าหลัก",
        }}
      />

      <Stack.Screen
        name="profile"
        options={{
          title: "บัญชีผู้ใช้",
          headerShown: true,
        }}

      />

      <Stack.Screen
        name="order/order-list"
        options={{
          title: "ร้านค้า",
          headerShown: true,
          contentStyle: { backgroundColor: "#354138" }
        }}
      />

      <Stack.Screen
        name="order/order-summary"
        options={{
          title: "รายการสินค้า",
          headerShown: true,
          contentStyle: { backgroundColor: "#354138" }
        }}
      />

      <Stack.Screen
        name="order/order-history"
        options={{
          title: "ประวัติการสั่งซื้อ",
          headerShown: true
        }}
      />

      <Stack.Screen
        name="order/order-receiving"
        options={{
          title: "คำสั่งซื้อที่กำลังจะได้รับ",
          headerShown: true
        }}
      />

      <Stack.Screen
        name="foundation-map"
        options={{
          title: "แผนที่มูลนิธิ",
          headerShown: true
        }}
      />

      <Stack.Screen
        name="add-address/index"
        options={{
          title: "แผนที่",
          headerShown: true
        }}
      />

      <Stack.Screen
        name="add-address/confirm-address"
        options={{
          title: "ที่อยู่",
          headerShown: true
        }}
      />
    </Stack>
  );
}
