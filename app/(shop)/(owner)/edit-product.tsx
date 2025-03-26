import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import useShops from '@/app/provider/shops';
import useProductForm from '@/app/provider/productForm';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';

const EditProduct = () => {
    const router = useRouter();
    const { categories, fetchCategories } = useShops();
    const {
        shopId,
        editProduct,
        setEditProduct,
        setUpdateProduct
    } = useProductForm();

    useEffect(() => {
        fetchCategories(Number(shopId));
    }, []);

    const handleSubmit = () => {
        setUpdateProduct(editProduct);
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
        <ScrollView style={styles.container}>
            <Text style={styles.title}>แก้ไขผลิตภัณฑ์</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>ชื่อผลิตภัณฑ์</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ชื่อผลิตภัณฑ์"
                    value={editProduct?.name}
                    onChangeText={(text) => setEditProduct({ ...editProduct, name: text })}
                />
                <Text style={styles.label}>ราคา</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ราคา"
                    value={editProduct?.price.toString()}
                    onChangeText={(text) => setEditProduct({ ...editProduct, price: Number(text) })}
                    keyboardType="numeric"
                />
                <Text style={styles.label}>คำอธิบาย</Text>
                <TextInput
                    style={styles.input}
                    placeholder="คำอธิบาย"
                    value={editProduct?.description}
                    onChangeText={(text) => setEditProduct({ ...editProduct, description: text })}
                />
                <Text style={styles.label}>URL รูปภาพผลิตภัณฑ์</Text>
                <TextInput
                    style={styles.input}
                    placeholder="URL รูปภาพผลิตภัณฑ์"
                    value={editProduct?.image_url}
                    onChangeText={(text) => setEditProduct({ ...editProduct, image_url: text })}
                />
                <Text style={styles.label}>จำนวน</Text>
                <TextInput
                    style={styles.input}
                    placeholder="จำนวน"
                    value={editProduct?.amount.toString()}
                    onChangeText={(text) => setEditProduct({ ...editProduct, amount: Number(text) })}
                    keyboardType="numeric"
                />
                <View style={styles.categoryContainer}>
                    <Text style={styles.label}>หมวดหมู่</Text>
                    <TouchableOpacity style={styles.categoryButton} onPress={() => router.push('/(shop)/(owner)/add-category')}>
                    <Text style={styles.categoryButtonText}>เพิ่มหมวดหมู่</Text>
                    </TouchableOpacity>
                </View>
                <Picker
                    selectedValue={editProduct?.category_id}
                    onValueChange={(value) => setEditProduct({ ...editProduct, category_id: value })}
                    style={styles.picker}
                >
                    <Picker.Item label="เลือกหมวดหมู่" value={-1} />
                    {categories.map((category) => (
                        <Picker.Item key={category.id} label={category.category_name} value={category.id} />
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
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#E0E0E0',
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
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4CAF50', // Match Register component label color
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    backButton: {
        width: 100,
        borderWidth: 1,
        borderColor: '#4CAF50',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
        marginRight: 10,
    },
    confirmButton: {
        width: 100,
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: '600',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    categoryButton: {
        backgroundColor: '#4CAF50',
        padding: 5,
        borderRadius: 12,
        alignItems: 'center',
    },
    categoryButtonText: {
        color: 'white',
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

export default EditProduct; 