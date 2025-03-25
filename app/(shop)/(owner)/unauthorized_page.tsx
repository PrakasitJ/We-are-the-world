import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function UnauthorizedPage() {
    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/shops/headache-nobg.png')}
                style={styles.vectorImage}
                resizeMode="contain"
            />
            <Text style={styles.title}>คุณยังไม่ได้เป็นเจ้าของร้าน</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>กลับไปหน้าหลัก</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/register')}>
                    <Text style={styles.buttonText}>สมัครเป็นเจ้าของร้าน</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#e8f5e9', 
    },
    vectorImage: {
        width: 200,
        height: 200, 
        marginBottom: 20, 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2e7d32', 
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '100%', 
    },
    button: {
        backgroundColor: '#4caf50', 
        padding: 15,
        borderRadius: 10, 
        marginVertical: 10,
        flex: 1, 
        marginHorizontal: 5, 
        alignItems: 'center',
        shadowColor: '#000', 
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2, 
    },
    buttonText: {
        color: '#ffffff', 
        fontSize: 16,
        fontWeight: '600',
    },
});
