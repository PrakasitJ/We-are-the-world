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
  // ใช้ state เพื่อเก็บข้อมูลคำสั่งซื้อและสถานะการโหลด
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ฟังก์ชันสำหรับดึงข้อมูลประวัติการสั่งซื้อจาก API
  const fetchOrders = async () => {
    try {
      setLoading(true);

      // ฮาร์ดโค้ด API URL ตรงนี้
      const apiUrl = "http://localhost:3000";
      const ordersEndpoint = "/api/order/getAll";

      console.log("กำลังดึงข้อมูลจาก:", `${apiUrl}${ordersEndpoint}`);

      // ทำการเรียก API
      const response = await axios.get(`${apiUrl}${ordersEndpoint}`);

      console.log("การตอบกลับจาก API:", response.data);

      if (response.status === 200) {
        const formattedOrders: Order[] = response.data.map((item: any) => ({
          id: item.id || item.order_id,
          shopName: item.shop_name || item.shopName,
          productName: item.product_name || item.productName,
          price: `${item.price} บาท`,
          details: item.details || item.description || "-",
          orderDate: item.order_date || item.createdAt,
          paymentMethod: item.payment_method || item.paymentMethod,
          userLocation: item.user_location || item.userLocation,
          shopLocation: item.shop_location || item.shopLocation,
          orderStatus: item.order_status || item.orderStatus
        }));  

        setOrders(formattedOrders);
      }
    } catch (err) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", err);
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการดึงข้อมูล");
    } finally {
      setLoading(false);
    }
  };


  // เรียกใช้ฟังก์ชัน fetchOrders เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    fetchOrders();
  }, []);

  const OrderDetail = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.detailRow}>
      <Text style={styles.label}>{label}: </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  // แสดงตัวโหลดถ้ากำลังโหลดข้อมูล
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
      </SafeAreaView>
    );
  }

  // แสดงข้อความถ้าเกิดข้อผิดพลาด
  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>เกิดข้อผิดพลาด: {error}</Text>
      </SafeAreaView>
    );
  }

  // แสดงข้อความถ้าไม่มีประวัติการสั่งซื้อ
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

            <Text style={styles.orderStatus}>สถานะการสั่งซื้อ : {order.orderStatus}</Text>

            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>ราคาสินค้า : {order.price}</Text>
            </View>
          </View>
          </TouchableOpacity>
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