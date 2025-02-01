import { useFonts } from "expo-font";

export default function SetUpFonts() {
  const [loaded] = useFonts({
    "NewAmsterdam": require("../assets/fonts/NewAmsterdam-Regular.ttf"),
    "Playfair": require("../assets/fonts/PlayfairDisplay-Regular.ttf"),
    "SpaceMono": require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Poppins": require("../assets/fonts/Poppins-Regular.ttf"),
  });
  return loaded;
}
