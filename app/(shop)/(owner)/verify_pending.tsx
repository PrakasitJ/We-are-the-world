import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import useAuth from '@/app/provider/auth';
const VerifyPending = () => {
    const { user } = useAuth();
    const handleGoBack = () => {
        router.back(); // Navigate back to the previous screen
    };

    return (
        <View style={styles.container}>
            <Ionicons name="hourglass" size={50} color="#FFA500" />
            <Text style={styles.title}>ข้อมูลการลงทะเบียนร้านกำลังถูกตรวจสอบ</Text>
            <Text style={styles.message}>
                กรุณารอการตรวจสอบจากทางร้านค้า
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleGoBack}>
                <Text style={styles.buttonText}>กลับไปหน้าหลัก</Text>
            </TouchableOpacity>
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
        fontSize: 20,
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
    button: {
        backgroundColor: '#00B900',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default VerifyPending;
