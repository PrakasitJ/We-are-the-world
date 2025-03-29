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
        if (selectedTime) {
            setOpenTime(formatTime(selectedTime));
        }
    };

    const handleCloseTimeChange = (event: any, selectedTime: Date | undefined) => {
        if (selectedTime) {
            setCloseTime(formatTime(selectedTime));
        }
    };

    const formatTime = (selectedTime: Date | undefined) => {
        if (selectedTime) {
            const hours = selectedTime.getHours();
            const minutes = selectedTime.getMinutes();
            return new Date(selectedTime.setHours(hours, minutes, 0));
        }
        return undefined;
    }

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
                <Text style={styles.title} className='font-regular'>เพิ่มร้านค้า</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label} className='font-regular text-[#517B5D]'>ข้อมูลร้านค้า</Text>
                    <TextInput
                        style={styles.input}
                        className='font-regular'
                        placeholder="ชื่อร้านค้า"
                        placeholderTextColor="#D9D9D9"
                        value={shopName}
                        onChangeText={setShopName}
                    />

<Text style={styles.timeLabel}>เวลาเปิด</Text>
                        <View style={styles.timePickerContainer}>
                            <TouchableOpacity style={styles.timePickerButton} onPress={() => {
                                if (showOpenTimePicker) {
                                    setShowOpenTimePicker(false);
                                } else {
                                    setShowCloseTimePicker(false)
                                    setShowOpenTimePicker(true);
                                }
                            }}>
                                <Text style={styles.timePickerText}>{openTime ? openTime.toLocaleTimeString().slice(0, 5) : 'เลือกเวลาเปิด'}</Text>
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
                            <TouchableOpacity style={styles.timePickerButton} onPress={() => {
                                if (showCloseTimePicker) {
                                    setShowCloseTimePicker(false);
                                } else {
                                    setShowCloseTimePicker(true)
                                    setShowOpenTimePicker(false);
                                }
                            }}>
                                <Text style={styles.timePickerText}>{closeTime ? closeTime.toLocaleTimeString().slice(0, 5) : 'เลือกเวลาปิด'}</Text>
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
                        className='font-regular'
                        placeholder="คำอธิบายเพิ่มเติม"
                        placeholderTextColor="#D9D9D9"
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
                        <Text style={styles.backButtonText} className='font-regular'>กลับ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText} className='font-regular'>เพิ่มร้านค้า</Text>
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
        marginTop: Platform.OS === 'ios' ? 40 : 0,
        marginBottom: 20,
        fontStyle: 'normal',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#253D2C',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#517B5D',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#C2C6C3',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
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
        backgroundColor: '#E7F0E9',
        borderRadius: 8,
        padding: 15,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#517B5D',
    },
    timePickerText: {
        fontSize: 16,
        color: '#517B5D',
    },
    timeLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#517B5D',
        marginBottom: 5,
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
        borderColor: '#517B5D',
    },
    submitButton: {
        flex: 1,
        backgroundColor: '#517B5D',
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
    },
    backButtonText: {
        color: '#517B5D',
        fontSize: 14,
        fontWeight: '600',
    },
    error: {
        color: 'red',
        fontSize: 14,
        fontWeight: '600',
    },
});
