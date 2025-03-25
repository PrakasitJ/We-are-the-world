import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
const VerifyReject = () => {
    const handleGoBack = () => {
        router.back(); // Navigate back to the previous screen
    };

    const handleReRegister = () => {
        // Navigate to the registration screen
        router.replace('/(shop)/(owner)/register'); // Adjust the path as necessary
    };

    return (
        <View style={styles.container}>
            <Ionicons name="close-circle" size={50} color="#FF0000" />
            <Text style={styles.title}>ข้อมูลการลงทะเบียนร้านถูกปฏิเสธ</Text>
            <Text style={styles.message}>
                กรุณาตรวจสอบข้อมูลการลงทะเบียนร้านอีกครั้ง
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleGoBack}>
                    <Text style={styles.buttonText}>กลับไปหน้าหลัก</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleReRegister}>
                    <Text style={styles.buttonText}>ลงทะเบียนใหม่อีกครั้ง</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 10,
    },
    message: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#00B900',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        flex: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default VerifyReject;
