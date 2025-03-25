import { useFonts } from "expo-font";

export default function SetUpFonts() {
  const [loaded] = useFonts({
    "NewAmsterdam": require("../assets/fonts/NewAmsterdam-Regular.ttf"),
    "Playfair": require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
    "SpaceMono": require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Poppins": require("../assets/fonts/Poppins-Regular.ttf"),
    "Sarabun": require("../assets/fonts/Sarabun/Sarabun-Regular.ttf"),
    "Sarabun-Regular": require("../assets/fonts/Sarabun/Sarabun-Regular.ttf"),
    "Sarabun-Bold": require("../assets/fonts/Sarabun/Sarabun-Bold.ttf"),
    "Sarabun-SemiBold": require("../assets/fonts/Sarabun/Sarabun-SemiBold.ttf"),
  });
  return loaded;
}
  