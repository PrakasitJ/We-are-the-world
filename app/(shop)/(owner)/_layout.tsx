import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="unauthorized_page" options={{ title: "Unauthorized" }} />
            <Stack.Screen name="register" options={{ title: "Register" }} />
        </Stack>
    );
}