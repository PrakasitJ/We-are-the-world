import { Dimensions, Platform, StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from "react";
import useShops from "../provider/shops";
import SetUpFonts from "../fonts";
import { router } from "expo-router";
const { width, height } = Dimensions.get('window');
const os = Platform.OS;

type IconName = keyof typeof Ionicons.glyphMap;

const categories: { id: number; name: string; icon: IconName }[] = [
    { id: 1, name: 'ร้านอาหาร', icon: 'restaurant' },
    { id: 2, name: 'ร้านค้า', icon: 'cart' },
    { id: 3, name: 'ร้านสุขภาพ', icon: 'medical' },
    { id: 4, name: 'ร้านสินค้า', icon: 'cart' },
    { id: 5, name: 'ร้านอื่นๆ', icon: 'ellipsis-horizontal' },
];

export default function Shops() {
    SetUpFonts();
    const { fetchShops, filterShops } = useShops();
    useEffect(() => {
        fetchShops();
        filterShops('');
    }, []);
    return (
        <View style={styles.container}>
            <Header />
            <SearchBar />
            <Categories />
            <ShopList />
        </View>
    );
}

const Header = () => {
    return (
        <View style={styles.header} >
            <View style={styles.headerTop} >
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.locationButton}>
                    <View style={styles.locationContainer}>
                        <Ionicons name="location" size={22} color="#FFFFFF" />
                        <Text style={styles.locationText} className="font-regular">สถานที่จัดส่ง</Text>
                        <Ionicons name="chevron-down-outline" size={22} color="#FFFFFF" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.notificationButton}>
                    <Ionicons name="notifications" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
            <Text style={styles.headerTitle} className="font-regular">หิวท้องร้องทานอะไรดี</Text>
        </View>
    );
}

const SearchBar = () => {
    const { filterShops } = useShops();
    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchBarContent}>
                <Ionicons name="search" size={25} color="#253D2C" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    className="font-regular"
                    placeholder="ค้นหาร้านค้า"
                    placeholderTextColor="#666"
                    onChangeText={(text) => filterShops(text)}
                />
            </View>
        </View>
    );
}

const Categories = () => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
        >
            {categories.map((category) => (
                <TouchableOpacity key={category.id} style={styles.categoryItem}>
                    <View style={styles.categoryIconContainer}>
                        <Ionicons name={category.icon} size={24} color="#253D2C" />
                    </View>
                    <Text style={styles.categoryText} className="font-regular">{category.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const ShopList = () => {
    const { shops } = useShops();
    return (
        <View style={styles.shopListContainer}>
            <ScrollView style={styles.shopList}>
                {shops.map((shop) => (
                    <TouchableOpacity key={shop.id} style={styles.shopItem} onPress={() => router.push(`/(home)/order/order-list/${shop.id}`)}>
                        <Image
                            source={{ uri: shop && shop.Shop_images && shop?.Shop_images?.length > 0 ? shop.Shop_images[0].image_url : 'https://picsum.photos/200' }}
                            style={styles.shopImage}
                            resizeMode="cover"
                            defaultSource={require('@/assets/images/profile.png')}
                        />
                        <View style={styles.shopInfo}>
                            <View style={styles.shopHeader}>
                                <View style={styles.shopNameContainer}>
                                    <Text style={styles.shopName}>{shop.name}</Text>
                                    <View style={styles.tagContainer}>
                                        {shop.Product.map((category, index) => (
                                            <View key={index} style={styles.tag}>
                                                <Text style={styles.tagText}>{category.product_category?.category_name}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                                {shop?.isExpress && (
                                    <View style={styles.expressBadge}>
                                        <Ionicons name="flash" size={12} color="#fff" />
                                        <Text style={styles.expressText}>Express</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.shopDetails}>
                                <View style={styles.ratingContainer}>
                                    <Ionicons name="star" size={14} color="#FFD700" />
                                    <Text style={styles.ratingText}>{shop?.rating || 4.38}</Text>
                                </View>
                                <Text style={styles.deliveryTime}>{shop?.deliveryTime || '20-30 นาที'}</Text>
                            </View>
                            <View style={styles.shopFooter}>
                                <Text style={styles.minOrder}>ราคาเฉลี่ย {shop?.minOrder || '40'} บาท</Text>
                                <Text style={styles.deliveryFee}>ค่าจัดส่ง {shop?.deliveryFee || '10'} บาท</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 15,
        backgroundColor: '#253D2C',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingTop: os === 'ios' ? 40 : 5,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    backButton: {
        padding: 5,
    },
    locationButton: {
        padding: 5,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        marginLeft: 5,
        fontSize: 15,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    notificationButton: {
        padding: 8,
        backgroundColor: '#253D2C',
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: 25,
        marginLeft: 10
    },
    searchContainer: {
        padding: 15,
        backgroundColor: '#fff',
    },
    searchBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D9D9D9',
        borderRadius: 999,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        marginLeft: 5,
        color: '#333',
    },
    filterButton: {
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    categoriesContainer: {
        maxHeight: 90,
        paddingHorizontal: 15,
        marginBottom: 5,
    },
    categoriesContent: {
        paddingRight: 15,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 20,
    },
    categoryIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E7F0E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    categoryText: {
        fontSize: 13,
        color: '#000000',
        fontWeight: '500',
    },
    shopListContainer: {
        flex: 1,
    },
    shopList: {
        flex: 1,
    },
    shopItem: {
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    shopImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
    },
    shopInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'space-between',
    },
    shopHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    shopNameContainer: {
        flex: 1,
    },
    shopName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
    },
    tag: {
        backgroundColor: '#f0f9f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    tagText: {
        fontSize: 12,
        color: '#00B900',
        fontWeight: '500',
    },
    expressBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00B900',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    expressText: {
        color: '#fff',
        fontSize: 12,
        marginLeft: 4,
        fontWeight: '500',
    },
    shopDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        backgroundColor: '#f0f9f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 13,
        color: '#333',
        fontWeight: '500',
    },
    deliveryTime: {
        fontSize: 13,
        color: '#666',
    },
    shopFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    minOrder: {
        fontSize: 13,
        color: '#666',
        marginRight: 15,
    },
    deliveryFee: {
        fontSize: 13,
        color: '#666',
    }
});
