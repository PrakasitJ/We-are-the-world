import { Stack } from "expo-router";

export default function TestLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="shop"
        options={{ title: "Shop", headerShown: true }}
      />
    </Stack>
  );
}
