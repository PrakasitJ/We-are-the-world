import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform } from "react-native";
import { router } from "expo-router";
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import SetUpFonts from "@/app/fonts";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Register() {
    SetUpFonts();
    const [selectedCase, setSelectedCase] = useState<1 | 2>(1);
    const [files, setFiles] = useState<{ [key: string]: string }>({});
    const [openTime, setOpenTime] = useState<Date | undefined>(undefined);
    const [closeTime, setCloseTime] = useState<Date | undefined>(undefined);
    const [showOpenTimePicker, setShowOpenTimePicker] = useState(false);
    const [showCloseTimePicker, setShowCloseTimePicker] = useState(false);

    const handleDocumentUpload = async (documentType: string) => {
        const result = await DocumentPicker.getDocumentAsync({});
        if (result.canceled === false) {
            setFiles(prev => ({
                ...prev,
                [documentType]: result.assets[0].name
            }));
        }
    };

    const handleRemoveFile = (documentType: string) => {
        setFiles(prev => {
            const newFiles = { ...prev };
            delete newFiles[documentType];
            return newFiles;
        });
    };

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

    const renderFileUploadSection = (documentType: string, label: string) => (
        <View style={styles.uploadSection}>
            <View style={styles.labelContainer}>
                <View style={styles.bulletPoint} />
                <Text style={styles.uploadLabel}>{label.replace('• ', '')}</Text>
            </View>
            {!files[documentType] ? (
                <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => handleDocumentUpload(documentType)}
                >
                    <Text style={styles.buttonText}>อัพโหลดเอกสาร</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.filePreview}>
                    <View style={styles.fileInfo}>
                        <Text style={styles.fileNameText}>📄 {files[documentType]}</Text>
                        <TouchableOpacity
                            onPress={() => handleRemoveFile(documentType)}
                            style={styles.removeButton}
                        >
                            <Text style={styles.removeButtonText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>ลงทะเบียนร้านค้า</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>ข้อมูลร้านค้า</Text>
                    <TextInput style={styles.input} placeholder="ชื่อร้านค้า" placeholderTextColor="#666" />

                    <Text style={styles.timeLabel}>เวลาเปิด</Text>
                    <View style={styles.timePickerContainer}>
                        <TouchableOpacity style={styles.timePickerButton} onPress={() => setShowOpenTimePicker(true)}>
                            <Text style={styles.timePickerText}>{openTime ? openTime.toLocaleTimeString() : 'เลือกเวลาเปิด'}</Text>
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
                        <TouchableOpacity style={styles.timePickerButton} onPress={() => setShowCloseTimePicker(true)}>
                            <Text style={styles.timePickerText}>{closeTime ? closeTime.toLocaleTimeString() : 'เลือกเวลาปิด'}</Text>
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
                        style={styles.input}
                        placeholder="คำอธิบายเพิ่มเติม"
                        placeholderTextColor="#666"
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

                <View style={styles.radioContainer}>
                    <TouchableOpacity style={styles.radioOption} onPress={() => setSelectedCase(1)}>
                        <View style={styles.radioButton}>
                            <View style={[styles.radioInner, selectedCase === 1 && styles.radioSelected]} />
                        </View>
                        <Text style={styles.radioText}>กรณี 1 นิติบุคคล</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.radioOption} onPress={() => setSelectedCase(2)}>
                        <View style={styles.radioButton}>
                            <View style={[styles.radioInner, selectedCase === 2 && styles.radioSelected]} />
                        </View>
                        <Text style={styles.radioText}>กรณี 2 บุคคลธรรมดา</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.documentSection}>
                    <Text style={styles.subtitle}>อัพโหลดเอกสาร</Text>
                    <View style={styles.documentBox}>
                        <Text style={styles.documentTitle}>
                            {selectedCase === 1 ? 'เอกสารสำหรับนิติบุคคล' : 'เอกสารสำหรับบุคคลธรรมดา'}
                        </Text>
                        {selectedCase === 1 ? (
                            <>
                                {renderFileUploadSection('companyReg', '• หนังสือรับรองบริษัท')}
                                {renderFileUploadSection('vatReg', '• ใบทะเบียนภาษีมูลค่าเพิ่ม')}
                                {renderFileUploadSection('companyBoardReg', '• เอกสารรับรองจากคณะกรรมการบริษัท')}
                                {renderFileUploadSection('bankCompanyReg', '• สำเนาบัญชีธนาคารบริษัท')}
                            </>
                        ) : (
                            <>
                                {renderFileUploadSection('idCard', '• สำเนาบัตรประชาชน')}
                                {renderFileUploadSection('bankReg', '• สำเนาบัญชีธนาคาร')}
                            </>
                        )}
                    </View>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Text style={styles.backButtonText}>กลับไปหน้าหลัก</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.submitButton} onPress={() => console.log('Submit form')}>
                        <Text style={styles.buttonText}>ส่งข้อมูลการลงทะเบียน</Text>
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
        minHeight: 100,
        textAlignVertical: 'top',
    },
    documentSection: {
        marginBottom: 30,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 15,
        fontFamily: 'Sarabun-Bold',
    },
    documentBox: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    documentTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#2E7D32',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E8F5E9',
        paddingBottom: 10,
        fontFamily: 'Sarabun-SemiBold',
    },
    uploadSection: {
        marginBottom: 20,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: '#F1F8E9',
        padding: 8,
        borderRadius: 6,
        borderLeftWidth: 3,
        borderLeftColor: '#2E7D32',
    },
    bulletPoint: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#2E7D32',
        marginRight: 10,
        marginLeft: 4,
    },
    uploadButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
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
    radioContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingRight: 15
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#2E7D32',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'transparent',
    },
    radioSelected: {
        backgroundColor: '#2E7D32',
    },
    radioText: {
        fontSize: 16,
        color: '#424242',
        fontFamily: 'Sarabun-Regular',
    },
    filePreview: {
        backgroundColor: '#E8F5E9',
        padding: 10,
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#2E7D32',
    },
    fileInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fileNameText: {
        color: '#1B5E20',
        fontSize: 13,
        flex: 1,
        marginRight: 10,
        fontFamily: 'Sarabun-Regular',
    },
    removeButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#ffebee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeButtonText: {
        color: '#d32f2f',
        fontSize: 12,
        fontWeight: 'bold',
    },
    uploadLabel: {
        fontSize: 15,
        color: '#1B5E20',
        fontWeight: '600',
        flex: 1,
        lineHeight: 20,
        fontFamily: 'Sarabun-SemiBold',
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
});

