import { Dimensions, Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from "react";
import useShops from "@/app/provider/shops";
import useAuth from "@/app/provider/auth";
import { router } from "expo-router";
const { width, height } = Dimensions.get('window');
const os = Platform.OS;

export default function Shops() {
    const { myShops, deleteShop, fetchMyShops } = useShops();
    const { user, validateShopState } = useAuth();
    useEffect(() => {
        validateShopState();
        fetchMyShops(user.uuid);
    }, []);

    const handleDelete = (shopId: number) => {
        Alert.alert(
            "Delete Shop",
            "Are you sure you want to delete this shop?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => deleteShop(shopId) }
            ]
        );
    };

    const handleCreateShop = () => {
        router.push("/(shop)/(owner)/add-shop");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Manage Shops</Text>
                <TouchableOpacity onPress={handleCreateShop}>
                    <Ionicons name="add" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {myShops.length === 0 ? (
                <View style={styles.noShopsContainer}>
                    <Text style={styles.noShopsText}>No shops available.</Text>
                    <TouchableOpacity style={styles.createShopButton} onPress={handleCreateShop}>
                        <Text style={styles.createShopButtonText}>Create Shop</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView style={styles.shopList}>
                    {myShops.map((shop) => (
                        <TouchableOpacity key={shop.id} style={styles.shopItem} onPress={() => router.push(`/(shop)/(owner)/${shop.id}`)}>
                            <Image
                                source={{ uri: shop.Shop_images[0]?.image_url || 'https://picsum.photos/200' }} // Fallback image
                                style={styles.shopImage}
                                resizeMode="cover"
                                defaultSource={require('@/assets/images/profile.png')}
                            />
                            <View style={styles.shopDetails}>
                                <Text style={styles.shopName}>{shop.name}</Text>
                                <View style={styles.shopActions}>
                                    <TouchableOpacity onPress={() => router.push(`/(shop)/(owner)/${shop.id}`)}>
                                        <Ionicons name="pencil" size={20} color="#00B900" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDelete(shop.id)}>
                                        <Ionicons name="trash" size={20} color="#FF0000" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8', // Light background for better contrast
        paddingTop: os === 'ios' ? 40 : 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        margin: 15,
    },
    noShopsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noShopsText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 10,
    },
    createShopButton: {
        backgroundColor: '#00B900',
        padding: 10,
        borderRadius: 5,
    },
    createShopButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    shopList: {
        flex: 1,
    },
    shopItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 10,
        elevation: 2,
    },
    shopImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 15,
    },
    shopDetails: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    shopName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    shopActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
}); 