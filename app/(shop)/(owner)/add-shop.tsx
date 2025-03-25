import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform, Alert } from "react-native";
import { router } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';
import SetUpFonts from "@/app/fonts";
import useAuth from '@/app/provider/auth';
import useShops from '@/app/provider/shops';

export default function AddShop() {
    SetUpFonts();
    const [shopName, setShopName] = useState('');
    const [description, setDescription] = useState('');
    const [openTime, setOpenTime] = useState<Date | undefined>(undefined);
    const [closeTime, setCloseTime] = useState<Date | undefined>(undefined);
    const [showOpenTimePicker, setShowOpenTimePicker] = useState(false);
    const [showCloseTimePicker, setShowCloseTimePicker] = useState(false);
    const { user } = useAuth();
    const { createShop, error } = useShops();

    const handleOpenTimeChange = (event: any, selectedTime: Date | undefined) => {
        setShowOpenTimePicker(false);
        if (selectedTime) {
            setOpenTime(selectedTime);
        }
    };

    const handleCloseTimeChange = (event: any, selectedTime: Date | undefined) => {
        setShowCloseTimePicker(false);
        if (selectedTime) {
            setCloseTime(selectedTime);
        }
    };

    const handleSubmit = () => {
        Alert.alert('ยืนยันการเพิ่มร้านค้า', 'คุณยืนยันการเพิ่มร้านค้าใช่หรือไม่', [
            { text: 'ยกเลิก', style: 'cancel' },
            {
                text: 'ยืนยัน', onPress: () => {
                    createShop({
                        user_id: user.uuid,
                        name: shopName,
                        description: description,
                        open_time: openTime?.toISOString() || '',
                        close_time: closeTime?.toISOString() || '',
                    });
                }
            }
        ]);
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>เพิ่มร้านค้า</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>ข้อมูลร้านค้า</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ชื่อร้านค้า"
                        placeholderTextColor="#666"
                        value={shopName}
                        onChangeText={setShopName}
                    />

                    <Text style={styles.timeLabel}>เวลาเปิด</Text>
                    <View style={styles.timePickerContainer}>
                        <TouchableOpacity
                            style={styles.timePickerButton}
                            onPress={() => setShowOpenTimePicker(true)}
                        >
                            <Text style={styles.timePickerText}>
                                {openTime ? openTime.toLocaleTimeString() : 'เลือกเวลาเปิด'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {showOpenTimePicker && (
                        <DateTimePicker
                            value={openTime || new Date()}
                            mode="time"
                            is24Hour={true}
                            display="spinner"
                            onChange={handleOpenTimeChange}
                        />
                    )}

                    <Text style={styles.timeLabel}>เวลาปิด</Text>
                    <View style={styles.timePickerContainer}>
                        <TouchableOpacity
                            style={styles.timePickerButton}
                            onPress={() => setShowCloseTimePicker(true)}
                        >
                            <Text style={styles.timePickerText}>
                                {closeTime ? closeTime.toLocaleTimeString() : 'เลือกเวลาปิด'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {showCloseTimePicker && (
                        <DateTimePicker
                            value={closeTime || new Date()}
                            mode="time"
                            is24Hour={true}
                            display="spinner"
                            onChange={handleCloseTimeChange}
                        />
                    )}

                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="คำอธิบายเพิ่มเติม"
                        placeholderTextColor="#666"
                        multiline={true}
                        numberOfLines={4}
                        value={description}
                        onChangeText={setDescription}
                    />
                {error && <Text style={styles.error}>{error}</Text>}
                </View>


                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.backButtonText}>กลับ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>เพิ่มร้านค้า</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        fontFamily: 'Sarabun-Bold',
        marginTop: Platform.OS === 'ios' ? 40 : 0,
        marginBottom: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 30,
        textAlign: 'center',
        fontFamily: 'Sarabun-Bold',
    },
    inputContainer: {
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4CAF50',
        marginBottom: 10,
        fontFamily: 'Sarabun-SemiBold',
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        fontFamily: 'Sarabun-Regular',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    timePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    timePickerButton: {
        flex: 1,
        backgroundColor: '#E8F5E9',
        borderRadius: 8,
        padding: 15,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#2E7D32',
    },
    timePickerText: {
        fontSize: 16,
        color: '#424242',
        fontFamily: 'Sarabun-Regular',
    },
    timeLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2E7D32',
        marginBottom: 5,
        fontFamily: 'Sarabun-SemiBold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    backButton: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    submitButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Sarabun-SemiBold',
    },
    backButtonText: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Sarabun-SemiBold',
    },
    error: {
        color: 'red',
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Sarabun-SemiBold',
    },
});
