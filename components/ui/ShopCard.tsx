import { View, Image, Text, TouchableOpacity } from "react-native";

export default function ShopCard() {
    return (
        <View className="flex flex-row rounded-[10px] bg-white w-[364px] h-[125px] p-[10px]">
            <View className="border  p-4 w-2/6">
                <Image
                    src={('../assets/images/shop.png')}
                    alt="hihi"
                    className="shadow-slate-500"
                />
            </View>

            <View className="pl-3 pt-3 flex flex-col flex-1 bottom-3">
                <View>
                    <Text className="font-regular text-base">
                        ชื่อสินค้า:
                    </Text >
                    <Text className="font-regular text-base">
                        ราคา:
                    </Text>
                    <Text className="font-regular text-base">
                        รายละเอียด:
                    </Text>
                </View >
                <TouchableOpacity  className="mt-3 items-end pl-3  ">
                    <Text className="text-base p-[5px] text-white bg-[#68Ba7f] text-center rounded-full font-semibol font-regular shadow">
                        เพิ่มลงรถเข็น
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}