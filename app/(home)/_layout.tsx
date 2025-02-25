import { Stack } from "expo-router";
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
          headerShown: true
        }}
      />

      <Stack.Screen
        name="add-address"
        options={{
          title: "แผนที่",
          headerShown: true
        }}
      />
    </Stack>
  );
}
