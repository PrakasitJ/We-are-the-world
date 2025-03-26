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
            <Stack.Screen name="shops" options={{ title: "My Shops" }} />
            <Stack.Screen name="verify_pending" options={{ title: "Verify Pending" }} />
            <Stack.Screen name="verify_reject" options={{ title: "Verify Reject" }} />
            <Stack.Screen name="add-shop" options={{ title: "Add Shop" }} />
            <Stack.Screen name="[shop_id]" options={{ title: "Shop Detail" }} />
            <Stack.Screen name="add-product" options={{ title: "Add Product" }} />
            <Stack.Screen name="add-category" options={{ title: "Add Category" }} />
            <Stack.Screen name="edit-product" options={{ title: "Edit Product" }} />
        </Stack>
    );
}