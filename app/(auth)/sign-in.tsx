import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import CustomTextInput from "@/components/ui/CustomTextInput";
import { Link, router } from "expo-router";
import BacktoWelcomeButton from "@/components/ui/BacktoWelcomeButton";
import useAuth from "../provider/auth";

interface SignInProps {
  email: string;
  password: string;
}
function SignInButton({ email, password }: SignInProps) {
  const { login, isLoggedIn, error, setErrorMessage,logout } = useAuth();
  return (
    <TouchableOpacity
      onPress={() => {
        login(email, password);
      }}
    >
      <View className="w-[100px] h-[50px] justify-center items-center bg-green-500 rounded-[10px] mb-[10px]">
        <Text className="text-[16px] text-white font-regular">login</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function SingUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error } = useAuth();

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex flex-col justify-center h-full w-full px-10">
          <Text className="font-extrabold text-3xl mb-[15px] font-regular">
            Log In
          </Text>
          <CustomTextInput
            title="Username"
            placeholder="Email / Username"
            onChange={setEmail}
          />
          <CustomTextInput
            title="Password"
            placeholder="Password"
            onChange={setPassword}
          />
          {error && (
            <Text className="text-md font-bold text-pink-500">{error}</Text>
          )}
          <View className="flex-row w-full justify-between items-center py-[10px]">
            <BacktoWelcomeButton />
            <SignInButton email={email} password={password} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
