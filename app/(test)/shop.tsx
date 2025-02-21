import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SetUpFonts from "../fonts";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");
export default function Test() {
  SetUpFonts();
  return (
    <View style={styles.container}>
      <View style={header.header}>
        <Text style={header.text}>ร้านจรรยา</Text>
        <TouchableOpacity onPress={() => router.navigate("/(test)/shop")}>
          <MaterialCommunityIcons name="cart" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <CatagoryMenu />
      <Animated.ScrollView horizontal={false}>
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
        <ShopCard />
      </Animated.ScrollView>
    </View>
  );
}

function CatagoryMenu() {
  const catagoryList : string[] = ["ทั้งหมด", "อาหาร", "เครื่องดื่ม", "ของใช้", "เสื้อผ้า", "อุปกรณ์อิเล็กทรอนิกส์", "ของตกแต่ง", "ของเล่น", "อื่น ๆ"];
  return (
    <Animated.ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={catagory.scroll}
    >
      <View style={catagory.catagory}>
        {catagoryList.map((name) => (
          <CatagoryItem key={name} name={name} />
        ))}
      </View>
    </Animated.ScrollView>
  );
}

function CatagoryItem({ name }: { name: string }) {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={catagory.category_item}>
        <Text style={catagory.text}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

function ShopCard() {
  const [isTouched, setIsTouched] = useState(false);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: isTouched ? withSpring(1.2) : withSpring(1) }],
    };
  });
  return (
    <View style={card.card}>
      <Image
        source={{
          uri: "https://i.pinimg.com/736x/6a/d7/2f/6ad72f2370b68be1f06b4463d8aec8df.jpg",
        }}
        style={card.image}
      />
      <View style={card.describe}>
        <Text style={card.text}>ชื่อสินค้า : มิลิม</Text>
        <Text style={card.text}>ราคา : 100,000 บาท</Text>
        <Text style={card.text}>รายละเอียด :</Text>
        <Text style={card.text} numberOfLines={1} ellipsizeMode="tail">
          มิลิมน่ารักมาก ๆ มาเลี้ยงมิลิมกันเถอะ มิลิมน่ารักมาก ๆ มาเลี้ยงมิ
        </Text>
      </View>

      <TouchableOpacity
        style={card.button_container}
        onPressIn={() => {
          setIsTouched(true);
        }}
        onPressOut={() => {
          setIsTouched(false);
        }}
      >
        <Animated.View style={[card.button, animatedStyles]}>
          <Text style={card.text}>เพิ่มลงรถเข็น</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

const header = StyleSheet.create({
  header: {
    width: width,
    height: 50,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Sarabun",
  },
});

const catagory = StyleSheet.create({
  scroll: {
    width: width,
    height: 85,
    padding: 10,
  },
  catagory: {
    width: "auto",
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  category_item: {
    width: "auto",
    height: 40,
    backgroundColor: "#44CC55",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
  },
  text: {
    fontSize: 12,
    fontWeight: "regular",
    fontFamily: "Sarabun",
  },
});

const card = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    gap: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 120,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  describe: {
    width: "43%",
    height: "auto",
    flexDirection: "column",
    gap: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: "regular",
    fontFamily: "Sarabun",
    textOverflow: "ellipsis",
  },
  button_container: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  button: {
    display: "flex",
    width: "auto",
    height: 30,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#44CC55",
    borderRadius: 10,
  },
});
