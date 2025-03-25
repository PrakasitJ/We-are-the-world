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
import { IconSymbol } from '@/components/ui/IconSymbol';
import { FontAwesome } from '@expo/vector-icons';


const OrderReceiving = () => {
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
          <View key={order.id} className="flex flex-col gap-1 bg-white rounded-lg p-4 mb-4">
            <View className='flex flex-1 flex-row justify-between'>
              <Text className="font-regular text-gray-500">{formatTime(order.created_at)}</Text>
              <Text className="font-regular">xxx บาท</Text>
            </View>
            <View className='flex flex-1 flex-row gap-2'>
              <FontAwesome name="map-marker" size={20} color="#A90E0E" />
              <Text className="font-regular">{order.shop.address}</Text>
            </View>
            <View className='flex flex-1 flex-row gap-2'>
              <FontAwesome name="map-marker" size={20} color="#517B5D" />
              <Text className="font-regular">{order.customer.name} {order.customer.surname}</Text>
            </View>
            <Text className="font-regular">{order.status}</Text>
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

export default OrderReceiving;