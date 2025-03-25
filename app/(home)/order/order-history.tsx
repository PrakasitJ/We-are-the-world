import useAuth from '@/app/provider/auth';
import { IOrderDetail } from '@/interfaces/IOrder';
import { formatTime } from '@/libs/formatTime';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import { router } from 'expo-router';

interface Order {
  id: number;
  shopName: string;
  productName: string;
  price: string;
  details: string;
  orderDate: string;
  paymentMethod: string;
  userLocation: string;
  shopLocation: string;
  orderStatus: string;
}

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<IOrderDetail[]>([]);
  const fetchOrderByUserId = async () => {
    const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/order/getByUserId/${user.uuid}`);
    if (res.status === 200) setOrders(res.data);
  }

  useEffect(() => {
    fetchOrderByUserId();
  }, []);

  if (orders.length === 0) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text style={styles.emptyText}>ไม่พบประวัติการสั่งซื้อ</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* Orders List */}
      <ScrollView style={styles.scrollView}>
        {orders.map((order) => (
          <TouchableOpacity
          key={order.id}
          style={styles.orderCard}
          onPress={() => router.push('/order/order-summary')}
        >
          <View key={order.id} style={styles.orderCard}>
            <Text style={styles.dateTimeText}>วันที่สั่งซื้อ, เวลา : {order.orderDate}</Text>

            <View style={styles.locationContainer}>
              <View style={styles.locationRow}>
                <Text style={styles.locationIconRed}>●</Text>
                <Text style={styles.locationText}>ที่อยู่ร้านค้า : {order.shopLocation}</Text>
              </View>

              <View style={styles.locationRow}>
                <Text style={styles.locationIconGreen}>●</Text>
                <Text style={styles.locationText}>ที่อยู่ผู้รับ : {order.userLocation}</Text>
              </View>
            </View>

            {/* Order details */}
            <View style={styles.orderDetails}>
              <OrderDetail label="ชื่อร้านค้า" value={order.shop.name} />
              <OrderDetail label="ชื่อสินค้า" value="ไม่มี" />
              <OrderDetail label="ราคา" value="999" />
              <OrderDetail label="รายละเอียด" value={order.note} />
              <OrderDetail label="วันที่สั่งซื้อ" value={formatTime(order.created_at)} />
              <OrderDetail label="วิธีการชำระเงิน" value="ไม่มี" />
            </View>
          </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const OrderDetail = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}: </Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d4134',
  },
  header: {
    backgroundColor: '#2d4134',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  backButton: {
    paddingRight: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  dateTimeText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  locationContainer: {
    marginVertical: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationIconRed: {
    color: 'red',
    fontSize: 16,
    marginRight: 8,
  },
  locationIconGreen: {
    color: 'green',
    fontSize: 16,
    marginRight: 8,
  },
  locationText: {
    fontSize: 14,
  },
  orderStatus: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#ddd',
    fontSize: 14,
  },
  value: {
    color: '#fff',
    fontSize: 14,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#ddd',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default OrderHistory;