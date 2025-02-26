import { IMarker } from "@/interfaces/IMarker";
import { useEffect, useRef, useState } from "react";
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import MapView, { Callout, Marker } from "react-native-maps";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import * as Location from "expo-location";
import { router } from "expo-router";

const { height, width } = Dimensions.get("window");

interface IMapEvent {
    nativeEvent: {
        coordinate: {
            latitude: number;
            longitude: number;
        }
    }
}

export default function AddAddressScreen() {
    const [selectedLocation, setSelectedLocation] = useState<IMarker>();
    const [initialLocation, setInitialLocation] = useState<IMarker>();
    const [errorMsg, setErrorMsg] = useState<string>("");

    useEffect(() => {
        (async () => {
            // Request permission to access location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});

            const newMarker: IMarker = {
                id: 0,
                coordinate: currentLocation.coords,
                title: `ที่อยู่ของฉัน`,
                description: `Lat: ${currentLocation.coords.latitude.toFixed(4)}, Long: ${currentLocation.coords.longitude.toFixed(4)}`,
            }
            setSelectedLocation(newMarker);
            setInitialLocation(newMarker);
        })();
    }, [])


    const handleMapPress = (event: IMapEvent) => {
        console.log(event.nativeEvent);
        const newMarker: IMarker = {
            id: 0,
            coordinate: event.nativeEvent.coordinate,
            title: `ที่อยู่ของฉัน`,
            description: `Lat: ${event.nativeEvent.coordinate.latitude.toFixed(4)}, Long: ${event.nativeEvent.coordinate.longitude.toFixed(4)}`,
        }

        setSelectedLocation(newMarker);
    }
    if (!initialLocation) return null;
    return (
        <View className="flex-1">
            {errorMsg && <View className="absolute z-[10] w-full bg-red-500 p-4 items-center animate-pulse">
                <Text className="text-white font-bold">Permission to access location was denied.</Text>
            </View>}
            <MapView
                style={styles.map}
                onPress={handleMapPress}
                showsUserLocation={true}
                initialRegion={{
                    latitude: initialLocation!.coordinate.latitude,
                    longitude: initialLocation!.coordinate.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
                showsMyLocationButton={true}
            >
                {selectedLocation && (
                    <Marker
                        coordinate={selectedLocation.coordinate}
                    // title={selectedLocation.title}
                    // description={selectedLocation.description}
                    >
                        <Image
                            source={require("@/assets/images/profile.png")}
                            className="w-9 h-9 border rounded-full border-green-500"
                            resizeMode="contain"
                        />
                        {/* <Callout tooltip>
                            <View
                                className="flex flex-col overflow-auto w-[250px] gap-3 bg-[#1E1E1E] p-4 rounded-xl"
                            >
                                <Text className="flex text-xl text-white">โรงพยาบาลสัตว์ มหาวิทยาลัยเกษตรศาสตร์</Text>
                                <View className="flex flex-row justify-between items-end">
                                    <TouchableOpacity
                                        className="flex bg-[#A90E0E] px-3 py-1 rounded-full"
                                        onPress={() => setSelectedLocation(undefined)}
                                    >
                                        <Text className="font-bold text-lg text-white">ยกเลิก</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="flex bg-[#68BA7F] px-3 py-1 rounded-full"
                                        onPress={() => console.log('test')}
                                    >
                                        <Text className="font-bold text-lg text-white">ยืนยัน</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Callout> */}
                    </Marker>
                )}
            </MapView>
            {selectedLocation && <View
                className="absolute flex flex-col overflow-auto w-[250px] gap-3 bg-[#1E1E1E] p-4 rounded-xl self-center bottom-16"
            >
                <Text className="flex text-xl text-white font-regular">โรงพยาบาลสัตว์ มหาวิทยาลัยเกษตรศาสตร์</Text>
                <View className="flex flex-row justify-between items-end">
                    <TouchableOpacity
                        className="flex bg-[#A90E0E] px-3 py-1 rounded-full"
                        onPress={() => setSelectedLocation(undefined)}
                    >
                        <Text className="font-bold text-lg text-white">ยกเลิก</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex bg-[#68BA7F] px-3 py-1 rounded-full"
                        onPress={() => router.push('/add-address/confirm-address')}
                    >
                        <Text className="font-bold text-lg text-white">ยืนยัน</Text>
                    </TouchableOpacity>
                </View>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});
