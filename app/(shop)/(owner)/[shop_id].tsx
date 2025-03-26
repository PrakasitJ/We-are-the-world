import useProductForm from "@/app/provider/productForm";
import useShops from "@/app/provider/shops";
import { useRoute } from "@react-navigation/native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function ShopDetail() {
    const router = useRouter();
    const route = useRoute() as { params: { shop_id: string } };
    const shopId = route.params.shop_id;
    const { getShopWithProductByID, myShop } = useShops();
    const { setShopId,setEditProduct } = useProductForm();

    useEffect(() => {
        getShopWithProductByID(Number(shopId));
        setShopId(Number(shopId));
    }, []);

    const handleAddProduct = () => {
        router.push(`/(shop)/(owner)/add-product`);
    };

    const handleEditProduct = (productId: number) => {
        const product = myShop?.Product.find(product => product.id === productId);
        if (product) {
            setEditProduct({
                ...product,
                category_id: product.product_category.id
            });
        }
    };

    const handleDeleteProduct = (productId: number) => {
        Alert.alert(
            "Delete Product",
            "Are you sure you want to delete this product?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => "deleteProduct(productId)" }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.shopName}>{myShop?.name}</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                    <Ionicons name="add" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.productList}>
                {myShop?.Product.map((product) => (
                    <View key={product.id} style={styles.productCard}>
                        <Image
                            source={{ uri: product.image_url }}
                            style={styles.productImage}
                            resizeMode="cover"
                        />
                        <View style={styles.productInfo}>
                            <View style={styles.productNameContainer}>
                                <Text style={styles.productName}>{product.name}</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={() => handleEditProduct(product.id)}>
                                        <Ionicons name="pencil" size={20} color="#00B900" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDeleteProduct(product.id)}>
                                        <Ionicons name="trash" size={20} color="#FF0000" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={styles.productPrice}>{product.price} บาท</Text>
                            <Text style={styles.productDescription}>{product.description}</Text>
                            <Text style={styles.productCategory}>{product.product_category.category_name}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 10,
        paddingTop: 20,
        marginTop: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    shopName: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 3,
    },
    shopDescription: {
        fontSize: 14,
        color: '#495057',
        marginBottom: 3,
    },
    shopAddress: {
        fontSize: 14,
        color: '#495057',
        marginBottom: 5,
    },
    addButton: {
        padding: 10,
    },
    productList: {
        width: '100%',
    },
    productCard: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    productPrice: {
        fontSize: 14,
        color: '#007bff',
        marginBottom: 5,
    },
    productDescription: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    productCategory: {
        fontSize: 14,
        color: '#6c757d',
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
    },
    productNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
