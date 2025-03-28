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
        <View className="bg-[#2A312C] w-full h-full">
            <View className="bg-[#253D2C] w-full h-[60px] flex-row justify-between items-center px-5" />
            <View className="bg-[#253D2C] w-full h-[60px] flex-row justify-between items-center px-5">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back-outline" size={24} color="white" />
                </TouchableOpacity>
                <Text className="font-regular text-white text-center items-center text-xl">จัดการร้านค้า</Text>
                <TouchableOpacity onPress={handleCreateShop}>
                    <Ionicons name="add-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {myShops.length === 0 ? (
                <View className="flex-1 justify-center items-center mt-5">
                    <Text style={styles.noShopsText} className="font-regular">ไม่มีร้านค้า</Text>
                    <TouchableOpacity style={styles.createShopButton} onPress={handleCreateShop}>
                        <Text style={styles.createShopButtonText}>สร้างร้านค้า</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView style={[styles.shopList, { marginTop: 10 }]}>
                    {myShops?.map((shop) => (
                        <TouchableOpacity key={shop.id} style={styles.shopItem} onPress={() => router.push(`/(shop)/(owner)/${shop.id}`)}>
                            <Image
                                source={{ uri: shop.Shop_images[0]?.image_url || 'https://picsum.photos/200' }}
                                style={styles.shopImage}
                                resizeMode="cover"
                                defaultSource={require('@/assets/images/profile.png')}
                            />
                            <View style={styles.shopDetails}>
                                <Text style={styles.shopName} className="font-regular text-lg font-medium">{shop.name}</Text>
                                <View style={styles.shopActions}>
                                    <TouchableOpacity onPress={() => router.push(`/(shop)/(owner)/${shop.id}`)}>
                                        <Ionicons name="pencil" size={20} color="#517B5D" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDelete(shop.id)}>
                                        <Ionicons name="trash" size={20} color="#A90E0E" />
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
        backgroundColor: '#253D2C',
        paddingTop: os === 'ios' ? 40 : 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'medium',
        color: '#ffff',
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
        borderRadius: 10,
        margin: 10,
        elevation: 2,
    },
    shopImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
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