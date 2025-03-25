import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
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

const OrderReceiving = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ดึงข้อมูลจาก API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/order/getAll');

      if (response.status === 200) {  
        const formattedOrders: Order[] = response.data.map((item: any) => ({
          id: item.id,
          shopName: item.shop_name,
          productName: item.product_name,
          price: `${item.price} บาท`,
          details: item.details || "-",
          orderDate: item.order_date || item.createdAt,
          paymentMethod: item.payment_method,
          userLocation: item.user_location || "ไม่ระบุ",
          shopLocation: item.shop_location || "ไม่ระบุ",
          orderStatus: item.order_status || "รอดำเนินการ",
        }));

        setOrders(formattedOrders);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2d4134" barStyle="light-content" />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
        </View>
      ) : error ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>เกิดข้อผิดพลาด: {error}</Text>
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.emptyText}>ไม่พบประวัติการสั่งซื้อ</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {orders.map((order) => (
            <TouchableOpacity
                      key={order.id}
                      style={styles.orderCard}
                      onPress={() => router.push('/order/order-summary')}
                    >
            
            <View key={order.id} style={styles.orderCard}>
              <Text style={styles.orderDate}>วันที่สั่งซื้อ, เวลา : {order.orderDate}</Text>

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

              <Text style={styles.statusText}>สถานะการสั่งซื้อ : {order.orderStatus}</Text>

              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>ราคาสินค้า : {order.price}</Text>
              </View>
            </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d4134',
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
  orderDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  locationContainer: {
    marginBottom: 8,
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
  statusText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  emptyText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OrderReceiving;
