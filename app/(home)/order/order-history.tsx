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
} from 'react-native';
import axios from 'axios';

interface Order {
  id: number;
  shopName: string;
  productName: string;
  price: string;
  details: string;
  orderDate: string;
  paymentMethod: string;
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
          <View key={order.id} style={styles.orderCard}>
            {/* Image placeholder */}
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderText}>รูปภาพ</Text>
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
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
  loadingText: {
    color: 'white',
    marginTop: 10,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
  emptyText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  }
});

export default OrderHistory;