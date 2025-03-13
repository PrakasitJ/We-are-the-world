import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';

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
  // ใช้ state เพื่อเก็บข้อมูลคำสั่งซื้อและสถานะการโหลด
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ฟังก์ชันสำหรับดึงข้อมูลประวัติการสั่งซื้อจาก API
  const fetchOrders = async () => {
    try {
      setLoading(true);

      // ดึงค่า BASE_URL จากตัวแปรสภาพแวดล้อม
      const apiUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL || process.env.EXPO_PUBLIC_API_URL;
      // ดึงค่า endpoint จากตัวแปรสภาพแวดล้อม หรือกำหนดค่าเริ่มต้น
      const ordersEndpoint = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_ORDERS_ENDPOINT ||
        process.env.EXPO_PUBLIC_API_ORDERS_ENDPOINT ||
        "/api/orders/history";


      if (!apiUrl) {
        throw new Error("API URL ไม่ได้ถูกกำหนด กรุณาตรวจสอบไฟล์ .env หรือ app.config.js");
      }

      console.log("กำลังดึงข้อมูลจาก:", `${apiUrl}/api/orders/history`);

      // ทำการเรียก API
      const response = await axios.get(`${apiUrl}/api/orders/history`);

      console.log("การตอบกลับจาก API:", response.data);

      // ตรวจสอบว่าการตอบกลับสำเร็จหรือไม่
      if (response.status === 200) {
        // แปลงข้อมูลจาก API ให้ตรงกับโครงสร้างที่ต้องการ (ถ้าจำเป็น)
        const formattedOrders: Order[] = response.data.map((item: any) => ({
          id: item.id || item.order_id,
          shopName: item.shop_name || item.shopName,
          productName: item.product_name || item.productName,
          price: `${item.price} บาท`,
          details: item.details || item.description || "-",
          orderDate: item.order_date || item.createdAt,
          paymentMethod: item.payment_method || item.paymentMethod
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
      <StatusBar backgroundColor="#2d4134" barStyle="light-content" />

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