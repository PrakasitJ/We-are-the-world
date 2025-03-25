import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import useShops from '@/app/provider/shops';
import useProductForm from '@/app/provider/productForm';
export default function AddCategory() {
    const [categoryName, setCategoryName] = useState('');
    const { createCategory } = useShops();
    const { shopId } = useProductForm();

    const handleCreateCategory = () => {
        if (categoryName.trim() === '') {
            Alert.alert("กรุณากรอกชื่อหมวดหมู่"); // Alert if the input is empty
            return;
        }
        createCategory({ category_name: categoryName, shop_id: Number(shopId) });
        setCategoryName(''); // Clear the input after submission
        Alert.alert("หมวดหมู่ถูกเพิ่มเรียบร้อยแล้ว"); // Confirmation alert
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>เพิ่มหมวดหมู่</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>ชื่อหมวดหมู่</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ชื่อหมวดหมู่"
                    value={categoryName}
                    onChangeText={setCategoryName}
                />
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={handleCreateCategory}>
                <Text style={styles.buttonText}>ยืนยัน</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
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
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4CAF50',
        marginBottom: 5,
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});
