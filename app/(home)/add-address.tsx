import { IMarker } from "@/interfaces/IMarker";
import { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import MapView, { Callout, Marker } from "react-native-maps";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import * as Location from "expo-location";

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
            console.log(newMarker);
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
                    latitude: 13.8457336,
                    longitude: 100.571257,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}
            >
                {selectedLocation && (
                    <Marker
                        coordinate={selectedLocation.coordinate}
                        title={selectedLocation.title}
                        description={selectedLocation.description}
                    >
                        <Callout>
                            <View style={styles.callout}>
                                <Text style={styles.calloutTitle}>{selectedLocation.title}</Text>
                                <Text>{selectedLocation.description}</Text>
                            </View>
                        </Callout>
                    </Marker>
                )}
            </MapView>
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
