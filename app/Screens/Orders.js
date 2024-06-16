import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Orders = ({ navigation }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (!userId) {
                    console.log('No userId found in AsyncStorage');
                    return;
                }

                const response = await axios.get(`http://192.168.1.122:8000/order/${userId}`);
                setOrders(response.data.orders);  // Giả sử dữ liệu trả về có dạng { orders: [...] }
            } catch (error) {
                console.log('Error retrieving orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('OrderDetail', { order: item })} style={styles.orderItem}>
            <Text style={styles.orderText}>Order ID: {item._id}</Text>
            <Text style={styles.orderText}>Payment Method: {item.paymentMethod}</Text>
            <Text style={styles.orderText}>Total Price: {item.totalPrice}</Text>
            <Text style={styles.orderText}>Created At: {new Date(item.createdAt).toLocaleString()}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header with Back Button and Title */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={require('../images/back.png')} style={styles.backImage} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Orders List</Text>
            </View>

            {/* Orders List */}
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButton: {
        padding: 10,
    },
    backImage: {
        width: 24,
        height: 24,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    orderItem: {
        backgroundColor: '#e0f7fa',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
    },
    orderText: {
        color: '#000',
    },
});

export default Orders;
