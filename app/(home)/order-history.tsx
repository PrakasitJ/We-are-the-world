import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const OrderHistory = () => {
  const orders = [
    {
      id: 1,
      shopName: 'ร้านอาหารตามสั่ง',
      productName: 'ข้าวผัดหมู',
      price: '45 บาท',
      details: 'ไม่ใส่ผัก',
      orderDate: '24/02/2025',
      paymentMethod: 'เงินสด'
    },
    {
      id: 2,
      shopName: 'ร้านก๋วยเตี๋ยว',
      productName: 'ก๋วยเตี๋ยวต้มยำ',
      price: '50 บาท',
      details: 'พิเศษ, น้ำน้อย',
      orderDate: '23/02/2025',
      paymentMethod: 'พร้อมเพย์'
    },
  ];

  const OrderDetail = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.detailRow}>
      <Text style={styles.label}>{label}: </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2d4134" barStyle="light-content" />

      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ประวัติการสั่งซื้อ</Text>
      </View> */}

      {/* Orders List */}
      <ScrollView style={styles.scrollView}>
        <View className="flex flex-row justify-around items-center h-auto pt-8">
        </View>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>

            {/* Image placeholder */}
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderText}>รูปภาพ</Text>
            </View>

            {/* Order details */}
            <View style={styles.orderDetails}>
              <OrderDetail label="ชื่อร้านค้า" value={order.shopName} />
              <OrderDetail label="ชื่อสินค้า" value={order.productName} />
              <OrderDetail label="ราคา" value={order.price} />
              <OrderDetail label="รายละเอียด" value={order.details} />
              <OrderDetail label="วันที่สั่งซื้อ" value={order.orderDate} />
              <OrderDetail label="วิธีการชำระเงิน" value={order.paymentMethod} />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d4134',
  },
  header: {
    backgroundColor: '#2d4134',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
  },
  orderDetails: {
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    color: '#666',
  },
  value: {
    flex: 1,
  },
});

export default OrderHistory;
