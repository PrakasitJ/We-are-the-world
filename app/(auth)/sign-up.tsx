import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import CustomTextInput from "@/components/ui/CustomTextInput";
import BacktoWelcomeButton from "@/components/ui/BacktoWelcomeButton";
import useAuth from "../provider/login";

function SingUpButton({
  username,
  email,
  password,
  name,
  surname,
  phone,
}: {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
}) {
  const { register } = useAuth();
  return (
    <TouchableOpacity
      onPress={() => {
        register({
          username: username,
          email: email,
          password: password,
          name: name,
          surname: surname,
          tel: phone,
        });
      }}
    >
      <View className="w-[100px] h-[50px] justify-center items-center bg-green-500 rounded-[10px] mb-[10px]">
        <Text className="text-[16px] text-white font-regular">ยืนยัน</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function SingUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const { error } = useAuth();
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex flex-col justify-center h-full w-full px-10">
          <Text className="font-extrabold text-3xl mb-[15px] font-regular">
            Register
          </Text>
          <CustomTextInput
            title="Username"
            placeholder="Username"
            onChange={setUsername}
          />
          <CustomTextInput
            title="Email"
            placeholder="Email"
            onChange={setEmail}
          />
          <CustomTextInput
            title="Password"
            placeholder="Password"
            onChange={setPassword}
          />
          <CustomTextInput
            title="Password"
            placeholder="Confirm Password"
            onChange={setConfirmPassword}
          />
          <CustomTextInput title="Name" placeholder="ชื่อ" onChange={setName} />
          <CustomTextInput
            title="Surname"
            placeholder="นามสกุล"
            onChange={setSurname}
          />
          <CustomTextInput
            title="Tel"
            placeholder="เบอร์โทร"
            onChange={setPhone}
          />
		  {error && <Text className="text-red-500">{error}</Text>}
          <View className="flex-row w-full justify-between items-center py-[10px]">
            <BacktoWelcomeButton />
            <SingUpButton
              username={username}
              email={email}
              password={password}
              name={name}
              surname={surname}
              phone={phone}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
