import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";


interface MarkerData {
    id: number;
    title: string;
    description: string;
    coordinate: {
        latitude: number;
        longitude: number;
    };
}

const { width, height } = Dimensions.get("window");

export default function FoundationMap() {
    const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);

    
    const markers: MarkerData[] = [
        { id: 1, title: "มูลนิธิช่วยคนตาบอดแห่งประเทศไทย", description: "ในพระบรมราชินูปถัมภ์", coordinate: { latitude: 13.764934, longitude: 100.530014 } },
        { id: 2, title: "มูลนิธิป่อเต็กตึ๊ง", description: "", coordinate: { latitude: 13.742487, longitude: 100.511482 } },
        { id: 3, title: "มูลนิธิร่วมกตัญญู", description: "", coordinate: { latitude: 13.655931, longitude: 100.752123 } },
        { id: 4, title: "มูลนิธิรักษ์แมว ปันน้ำใจให้แมวจร", description: "", coordinate: { latitude: 13.769656, longitude: 100.537076 } },
        { id: 5, title: "มูลนิธิสันติสุขเพื่อสุนัขและแมวจรจัด", description: "", coordinate: { latitude: 18.847860, longitude: 99.150690 } },
        { id: 6, title: "คุ้มเดวตาและมูลนิธิทวีพูล", description: "", coordinate: { latitude: 14.9056, longitude: 100.7312 } },
        { id: 7, title: "มูลนิธิพุทธธรรมจินลำพูน", description: "", coordinate: { latitude: 14.9091, longitude: 100.7502 } },
        { id: 8, title: "มูลนิธิพุทธดวงตาลำพูน", description: "", coordinate: { latitude: 14.9024, longitude: 100.7621 } },
        { id: 9, title: "มูลนิธิป่อเต็กตึ๊ง สาขาเยาวราช", description: "สาขาเยาวราช", coordinate: { latitude: 13.7392, longitude: 100.5101 } },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2d5d44" />

            {/* Map */}
            <TouchableWithoutFeedback onPress={() => setSelectedMarker(null)}>
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 13.764934,
                            longitude: 100.530014,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                        showsUserLocation
                        showsMyLocationButton={true}
                        showsCompass={true}
                    >
                        {markers.map((marker) => (
                            <Marker
                                key={marker.id}
                                coordinate={marker.coordinate}
                                title={marker.title}
                                description={marker.description}
                                pinColor="red"
                                onPress={() => setSelectedMarker(marker)}
                                tracksViewChanges={false}
                                anchor={{ x: 0.5, y: 1.0 }}
                            />
                        ))}
                    </MapView>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <View style={styles.searchBar}>
                            <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
                            <TextInput style={styles.searchInput} placeholder="ค้นหามูลนิธิ" placeholderTextColor="gray" />
                        </View>
                    </View>

                    {/* เพิ่มเลเยอร์สีจาง (Overlay) เมื่อ Info Box แสดงขึ้นมา */}
                    {selectedMarker && (
                        <View style={styles.overlay} />
                    )}


                    {/* Info Box */}
                    {selectedMarker && (
                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>{selectedMarker.title}</Text>
                            <Text style={styles.infoText}>เวลาที่เปิด : -</Text>
                            <Text style={styles.infoText}>หมวดหมู่ : -</Text>
                            <Text style={styles.infoText}>#ของที่ห้ามบริจาค : -</Text>
                            <TouchableOpacity style={styles.donateButton}>
                                <Text style={styles.donateText}>บริจาค</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#2d5d44" },
    header: { backgroundColor: "#2d5d44", height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: 16 },
    backButton: { marginRight: 16 },
    headerTitle: { color: "white", fontSize: 18, fontWeight: "bold", textAlign: "center", flex: 1 },
    mapContainer: { flex: 1, backgroundColor: "white" },
    map: { width: "100%", height: "100%" },
    searchContainer: { position: "absolute", top: 10, left: 0, right: 0, paddingHorizontal: 16 },
    searchBar: { backgroundColor: "white", borderRadius: 25, height: 45, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 5 },
    searchIcon: { marginRight: 8 },
    searchInput: { flex: 1, fontSize: 16, color: "black" },

    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)", // สีพื้นหลังจางลง
        zIndex: 1,
    },

    // Info Box Styles
    infoBox: {
        position: "absolute",
        top: '40%',
        left: 20,
        right: 20,
        backgroundColor: "#333333",
        padding: 15,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 3,
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: "normal",
        color: "white",
        marginBottom: 4
    },
    infoText: {
        fontSize: 14,
        color: "white",
        marginVertical: 2
    },


    donateButton: {
        backgroundColor: "#4CAF50",
        padding: 8,
        borderRadius: 4,
        alignItems: "center",
        alignSelf: "flex-end",
        marginTop: 8,
        marginRight: 5,
        paddingHorizontal: 16,
    },
    donateText: {
        color: "white",
        fontSize: 12,
        fontWeight: "normal"
    },
});