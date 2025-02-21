import { Image, StyleSheet, Platform, Text, View ,TouchableOpacity} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { Link, Redirect } from "expo-router";

function LoginButton() {
  return (
	<View className="w-full h-[50px] justify-center items-center bg-green-500 rounded-[10px] mb-[10px]">
	  <Text className="text-[16px] text-white">Login</Text>
	</View>
  );
}

export default function HomeScreen() {
  return (
	<SafeAreaView className="bg-primary h-full">
	  <ScrollView contentContainerStyle={{ height: '100%' }}>
		<View className="fixed bottom-[10px] w-full px-10" style={{position: 'absolute', bottom: 10}}>
		  <Text className="font-extrabold text-2xl" style={{marginBottom: 50}}>We are the world</Text>
		  <Link href={"/(auth)/sign-in"}>
		  <LoginButton/>
		  </Link>
		  <View className="w-full justify-center items-end">
			<Link href="/(auth)/sign-up" className="underline text-[19px] mb-[70px]">สมัครสมาชิก</Link>
		  </View>
		  </View>
	  </ScrollView>
	</SafeAreaView>
  );
}
