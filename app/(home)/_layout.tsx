import { Stack } from "expo-router";
import React from "react";


export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />      
      
    </Stack>
  );
}
