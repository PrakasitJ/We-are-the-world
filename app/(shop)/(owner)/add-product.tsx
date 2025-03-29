import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import useShops from '@/app/provider/shops';
import useProductForm from '@/app/provider/productForm';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const AddProduct = () => {
    const router = useRouter();
    const { categories, fetchCategories, createProduct } = useShops();
    const {
        shopId,
        product,
        setShopId,
        setProduct
    } = useProductForm();

    useEffect(() => {
        fetchCategories(Number(shopId));
        setProduct({
            name: '',
            price: 0,
            amount: 0,
            description: '',
            image_url: '',
            category_id: 0,
            shop_id: Number(shopId) || 0
        })
    }, []);

    const handleSubmit = () => {
        createProduct(product);
        // router.back(); // Navigate back after creating the product
    };

    const handleConfirm = () => {
        Alert.alert(
            "ยืนยันผลิตภัณฑ์",
            "คุณแน่ใจหรือไม่ว่าต้องการเพิ่มผลิตภัณฑ์นี้?",
            [
                {
                    text: "ยกเลิก",
                    style: "cancel"
                },
                { text: "ตกลง", onPress: handleSubmit }
            ]
        );
    };

    return (
        <>
            <View className="bg-[#253D2C] w-full h-[60px] flex-row justify-between items-center px-5" />
            <View className="bg-[#253D2C] w-full h-[60px] flex-row justify-between items-center px-5">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back-outline" size={24} color="white" />
                </TouchableOpacity>
                <Text className="font-regular text-white text-center items-center text-xl">เพิ่มผลิตภัณฑ์</Text>
                <TouchableOpacity className="opacity-0">
                    <Ionicons name="add-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView className="bg-[#2A312C] w-full h-full">
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>ชื่อผลิตภัณฑ์</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ชื่อผลิตภัณฑ์"
                        value={product?.name}
                        onChangeText={(text) => setProduct({ ...product, name: text })}
                    />
                    <Text style={styles.label}>ราคา</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ราคา"
                        value={product?.price.toString()}
                        onChangeText={(text) => setProduct({ ...product, price: Number(text) })}
                        keyboardType="numeric"
                    />
                    <Text style={styles.label}>คำอธิบาย</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="คำอธิบาย"
                        value={product?.description}
                        onChangeText={(text) => setProduct({ ...product, description: text })}
                    />
                    <Text style={styles.label}>URL รูปภาพผลิตภัณฑ์</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="URL รูปภาพผลิตภัณฑ์"
                        value={product?.image_url}
                        onChangeText={(text) => setProduct({ ...product, image_url: text })}
                    />
                    <Text style={styles.label}>จำนวน</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="จำนวน"
                        value={product?.amount.toString()}
                        onChangeText={(text) => setProduct({ ...product, amount: Number(text) })}
                        keyboardType="numeric"
                    />
                    <View style={styles.categoryContainer}>
                        <Text style={styles.label}>หมวดหมู่</Text>
                        <TouchableOpacity style={styles.categoryButton} onPress={() => router.push('/(shop)/(owner)/add-category')}>
                            <Text style={styles.categoryButtonText}>เพิ่มหมวดหมู่</Text>
                        </TouchableOpacity>
                    </View>
                    <Picker
                        selectedValue={product?.category_id}
                        onValueChange={(value) => setProduct({ ...product, category_id: value })}
                        style={styles.picker}
                        className='font-regular'
                        dropdownIconColor="#4CAF50"
                        dropdownIconRippleColor="#4CAF50"
                        itemStyle={styles.pickerItem}
                    >
                        <Picker.Item label="เลือกหมวดหมู่" value={-1} />
                        {categories.map((category) => (
                            <Picker.Item style={styles.pickerItem} key={category.id} label={category.category_name} value={category.id} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Text style={styles.backButtonText}>กลับ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                        <Text style={styles.buttonText}>ยืนยัน</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9', // Match Register component background
        padding: 20,
        paddingTop: 40,
        marginTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        paddingTop: 25,
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        fontFamily: 'notoSansThai-Regular',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    picker: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        marginBottom: 5,
    },
    pickerItem: {
        fontFamily: 'notoSansThai-Regular',
        color: '#000000',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'notoSansThai-Regular',
        color: '#FFFFFF', // Match Register component label color
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        paddingHorizontal: 20
    },
    backButton: {
        width: 100,
        borderWidth: 1,
        borderColor: '#68BA7F',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
        marginRight: 10,
    },
    confirmButton: {
        width: 100,
        backgroundColor: '#68BA7F',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#68BA7F',
        fontSize: 14,
        fontWeight: '600',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    categoryButton: {
        backgroundColor: '#68BA7F',
        padding: 5,
        borderRadius: 12,
        alignItems: 'center',
    },
    categoryButtonText: {
        color: 'white',
        padding: 3,
        fontFamily: 'notoSansThai-Regular',
        fontSize: 14,
        fontWeight: '600',
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

export default AddProduct; 