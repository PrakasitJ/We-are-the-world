import { View, TextInput, Image } from "react-native";
import { IconSymbol } from "./IconSymbol";
import { useState } from "react";

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState<string>("");
  return (
    <View className="relative w-full">
      <TextInput
        editable
        value={searchValue}
        placeholder="ค้นหาร้านค้า"
        placeholderTextColor= "#354138 opacity-50"
        className="w-full h-[40px] rounded-[50px] bg-[#D9D9D9]  pl-[40px] font-regular"
        onChangeText={setSearchValue}
      />
      <View className="absolute mt-[13px] ml-[13px]">
    <IconSymbol name='magnifyingglass' size={15} color="#253D2C"/>
    </View>
    </View>
  );
}
