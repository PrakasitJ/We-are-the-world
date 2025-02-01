import { useEffect, useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import {
  GestureDetector,
  Gesture,
  ScrollView,
} from "react-native-gesture-handler";
import SetUpFonts from "../fonts";

const { width } = Dimensions.get("window");
export default function Tailwind() {
  SetUpFonts();
  return (
    <ScrollContainer>
      <Welcome />
      <ImageCarousel />
      <Text
        className="text-xl text-blue-400"
        style={{ fontFamily: "SpaceMono" }}
      >
        Please try to click on the images
      </Text>
    </ScrollContainer>
  );
}

function ScrollContainer({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView className="w-full h-full mt-[75px]">
      <View className="flex flex-col justify-center items-center w-full h-full">
        {children}
      </View>
    </ScrollView>
  );
}

function Welcome() {
  return (
    <View className="flex flex-row justify-center items-center w-full h-fit gap-[10px]">
      <Text
        className="text-2xl text-blue-400"
        style={{ fontFamily: "SpaceMono" }}
      >
        Hello, Tailwind!
      </Text>
      <SpinnerBox />
    </View>
  );
}

function ImageCarousel() {
  const images: string[] = [
    "https://i.pinimg.com/736x/6a/d7/2f/6ad72f2370b68be1f06b4463d8aec8df.jpg",
    "https://i.pinimg.com/736x/2c/c4/9c/2cc49c95b4647ac0bd07bd1c6936c882.jpg",
    "https://i.pinimg.com/736x/72/3a/8b/723a8b5adc341c0317d850563f4c9ed6.jpg",
    "https://i.pinimg.com/736x/7d/97/3f/7d973f9a581b7711350a80b4a67bb3b4.jpg",
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex flex-row h-fit w-fit overflow-hidden">
        {images.map((image, index) => {
          return <TouchableImage key={index} index={index} image={image} />;
        })}
      </View>
    </ScrollView>
  );
}

function TouchableImage({ index, image }: { index: number; image: string }) {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withSpring(isTouched ? 250 : 200),
      transform: [{ scale: isTouched ? withSpring(1.2) : withSpring(1) }],
    };
  });

  return (
    <Animated.View
      onTouchEnd={() => setIsTouched(!isTouched)}
      className="flex flex-col justify-center items-center w-[200px] h-[100px]"
      style={animatedStyles}
    >
      <Image
        className="w-full h-full"
        source={{ uri: image }}
        style={{ objectFit: "cover" }}
      />
    </Animated.View>
  );
}

function SpinnerBox() {
  const sv = useSharedValue<number>(0);

  useEffect(() => {
    sv.value = withRepeat(
      withTiming(1, {
        duration: 2000,
        easing: Easing.bezier(0.25, -0.5, 0.25, 1),
      }),
      -1
    );
  }, []);

  const Spinner = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${sv.value * 360}deg` }],
    };
  });

  return (
    <Animated.View
      className="w-[20px] h-[20px] bg-blue-400"
      style={Spinner}
    ></Animated.View>
  );
}
// const x = useSharedValue(0);
// const y = useSharedValue(0);
// const context = useSharedValue({ x: 0, y: 0 });

// const gesture = Gesture.Pan()
//   .onStart(() => {
//     context.value = { x: x.value, y: y.value };
//   })
//   .onUpdate((event) => {
//     x.value = context.value.x + event.translationX;
//     y.value = context.value.y + event.translationY;
//   })
//   .onEnd(() => {
//     // Spring back to center
//     x.value = withSpring(0);
//     y.value = withSpring(0);
//   });

// const animatedStyle = useAnimatedStyle(() => ({
//   transform: [{ translateX: x.value }, { translateY: y.value }],
// }));

{
  /* <GestureDetector gesture={gesture}>
  <Animated.View
    className="w-full h-full"
    style={animatedStyle}
  ></Animated.View>
</GestureDetector>; */
}
