import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderDetail = ({ route }) => {
    const { order } = route.params;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image
                        source={require('../images/back.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>Order Details</Text>
            </View>

            {/* Order Details */}
            <View style={styles.orderDetails}>
                {/* General Details */}
                <View style={styles.itemDetails}>
                    <Text style={styles.detailText}>Order ID: {order._id}</Text>
                    <Text style={styles.detailText}>Payment Method: {order.paymentMethod}</Text>
                    <Text style={styles.detailText}>Total Price: {order.totalPrice}</Text>
                    <Text style={styles.detailText}>Created At: {new Date(order.createdAt).toLocaleString()}</Text>
                </View>

                {/* Shipping Address */}
                <View style={[styles.shippingDetailsContainer, styles.shadow]}>
                    <Text style={styles.shippingHeaderText}>Shipping Address</Text>
                    <Text style={styles.addressText}>Name: {order.shippingAddress.name}</Text>
                    <Text style={styles.addressText}>Phone: {order.shippingAddress.phone}</Text>
                    <Text style={styles.addressText}>Address: {order.shippingAddress.houseNo}, {order.shippingAddress.street}, {order.shippingAddress.district}, {order.shippingAddress.city}</Text>
                </View>

                {/* Products List */}
                <View style={styles.productsList}>
                    <Text style={styles.listHeaderText}>Products List</Text>
                    {order.products.map((product, index) => (
                        <View key={index} style={styles.productItem}>
                            <Image
                                source={{ uri: product.image }}
                                style={styles.productImage}
                            />
                            <View style={styles.productDetails}>
                                <Text style={styles.productName}>{product.name}</Text>
                                <Text style={styles.productPrice}>Giá: {product.price}đ </Text>

                            </View>
                        </View>
                    ))}
                </View>

                {/* Price Details */}
                <View style={styles.priceDetails}>
                    <Text style={styles.detailText}>Shipping Fee: {order.shippingPrice}</Text>
                    <Text style={styles.detailText}>Products Price: {order.productsPrice}</Text>
                    <Text style={[styles.detailText, styles.totalPrice]}>Total Price: {order.totalPrice}</Text>
                </View>
            </View>
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
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    backButton: {
        padding: 10,
    },
    orderDetails: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    itemDetails: {
        marginBottom: 20,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 5,
    },
    shippingDetailsContainer: {
        backgroundColor: '#e0f2f1',  // Màu xanh nhạt
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    shadow: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
    },
    shippingHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    addressText: {
        fontSize: 16,
        marginBottom: 3,
    },
    productsList: {
        marginBottom: 20,
        padding: 10,
    },
    listHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000', // Màu viền đen
        paddingBottom: 10,
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 8,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        color: '#0A8ED9',
    },
    productQuantity: {
        fontSize: 14,
        color: '#666',
    },
    priceDetails: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 10,
    },
    totalPrice: {
        fontWeight: 'bold',
    },
});

export default OrderDetail;
