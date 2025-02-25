import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "./tailwind.css";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// ป้องกันไม่ให้ Splash Screen หายก่อนโหลดเสร็จ
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          {/* Main Tabs */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Order History Page */}
          <Stack.Screen
            name="order-history/index"
            options={{
              //rpresentation: "modal", แสดงเป็นหน้าต่างขึึ้นมา
              title: "ประวัติการสั่งซื้อ",
              headerStyle: {
                backgroundColor: "#2d4134",
              },
              headerTintColor: "#fff",
            }}
          />

          {/* Order Receiving Page */}
          <Stack.Screen
            name="order-receiving/index"
            options={{
              //rpresentation: "modal",
              title: "คำสั่งซื้อที่กำลังจะได้รับ",
              headerStyle: {
                backgroundColor: "#2d4134",
              },
              headerTintColor: "#fff",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
