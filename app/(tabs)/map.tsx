import React, { ReactEventHandler, useState } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Button,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native";

interface Marker {
  id: number;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: string;
  description: string;
  image_url?: string;
}
const { height, width } = Dimensions.get("window");

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState<Marker>();
  const [zoom, setZoom] = useState(0.0001);
  const [markers, setMarkers] = useState<Marker[]>([
    {
      id: 1,
      coordinate: {
        latitude: 13.8479336,
        longitude: 100.572257,
      },
      title: "ร้านป้าแจ่ม",
      description: "อร่อยจัด",
      image_url: "https://img.kapook.com/u/2020/patcharin/Food/etc/restau.jpg",
    },
    {
      id: 2,
      coordinate: {
        latitude: 13.845731,
        longitude: 100.572365,
      },
      title: "Starbuck Coffee",
      description: "กาแฟตามใจคนชง",
      image_url:
        "https://lh5.googleusercontent.com/p/AF1QipOc_NQL4_b-ZFZIz2HFQ0fzz9UZQWR97xEp8O8_=s3000",
    },
    {
      id: 3,
      coordinate: {
        latitude: 13.8457336,
        longitude: 100.571257,
      },
      title: "ดอกจิก สถานีขายน้ำ",
      description: "ร้านขายน้ำคณะวิทยาศาสตร์",
      image_url:
        "https://lh5.googleusercontent.com/p/AF1QipMAjFJ-6GGmH1_Sk3xfvE3zPVvzF0j3edwD7NlH",
    },
    // Add more default markers as needed
  ]);

  const handleMapPress = (event: {
    nativeEvent: { coordinate: { latitude: number; longitude: number } };
  }) => {
    const { coordinate } = event.nativeEvent;

    // Create a new marker at the pressed location
    const newMarker: Marker = {
      id: markers.length + 1,
      coordinate,
      title: `Location ${markers.length + 1}`,
      description: `Lat: ${coordinate.latitude.toFixed(
        4
      )}, Long: ${coordinate.longitude.toFixed(4)}`,
    };

    // setMarkers([...markers, newMarker]);
    // setSelectedLocation(undefined);
  };

  const handleMarkerPress = (marker: Marker) => {
    setSelectedLocation(marker);
  };

  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: x.value, y: y.value };
    })
    .onUpdate((event) => {
      if (y.value > -50 && y.value < 50) {
        let newX = context.value.x + event.translationX;
        let newY = context.value.y + event.translationY;
        // x.value = newX;
        y.value = newY;
      }
    })
    .onEnd(() => {
      // Spring back to center
      x.value = withSpring(0);
      y.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
    position: "absolute",
    width: width - 40,
    height: height / 3,
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }));

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        showsUserLocation={true}
        initialRegion={{
          latitude: 13.8457336,
          longitude: 100.571257,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onPress={() => handleMarkerPress(marker)}
          >
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{marker.title}</Text>
                <Text>{marker.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {selectedLocation && (
        <GestureDetector gesture={gesture}>
          <Animated.View style={animatedStyle}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.selectedLocationTitle} className="font-bold">
                {selectedLocation.title}
              </Text>
              <TouchableOpacity onPress={() => setSelectedLocation(undefined)}>
                <Text className="text-[12px] font-bold">สั่งอาหาร</Text>
              </TouchableOpacity>
            </View>
            <Text>{selectedLocation.description}</Text>
            <Image
              src={selectedLocation.image_url ?? ""}
              style={{
                width: "100%",
                height: "80%",
                objectFit: "scale-down",
                padding: 10,
              }}
            />
          </Animated.View>
        </GestureDetector>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  callout: {
    padding: 10,
    maxWidth: 200,
  },
  calloutTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  selectedLocationInfo: {
    position: "absolute",
    width: width - 40,
    height: height / 3,
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedLocationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
