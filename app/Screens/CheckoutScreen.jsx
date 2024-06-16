import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import CheckoutItem from '../Components/CheckoutItem'; // Import CheckoutItem component
import axios from 'axios';
import RNMomosdk from 'react-native-momosdk';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const [shippingAddress, setshippingAddress] = useState(null); // State để lưu địa chỉ được chọn
  const [addresses, setAddresses] = useState([]);
  const cartItems = useSelector(state => state.Reducers);
  const [productsPrice, setProductsPrice] = useState(0); // State để lưu tổng số tiền sản phẩm
  const shippingPrice = 30000; // Phí ship cố định
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Khi màn hình được focus lại, cập nhật lại địa chỉ đã chọn từ AsyncStorage
      fetchshippingAddress();
    });
    fetchAddresses(); // Fetch danh sách địa chỉ ngay khi màn hình được tải lần đầu
    calculateProductsPrice(); // Tính lại tổng số tiền khi có thay đổi trong giỏ hàng
    return unsubscribe;
  }, [navigation, cartItems]);

  const fetchAddresses = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await axios.get(
        `http://192.168.1.122:8000/addresses/${userId}`,
      );
      const { addresses } = response.data;
      setAddresses(addresses);
      // Nếu danh sách địa chỉ không rỗng, đặt địa chỉ ban đầu là địa chỉ đầu tiên
      if (addresses.length > 0) {
        setshippingAddress(addresses[0]);
        // Lưu địa chỉ ban đầu vào AsyncStorage (nếu cần thiết)
        await AsyncStorage.setItem('selectedAddress', JSON.stringify(addresses[0]));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchshippingAddress = async () => {
    try {
      const shippingAddressJson = await AsyncStorage.getItem('selectedAddress');
      if (shippingAddressJson) {
        const shippingAddress = JSON.parse(shippingAddressJson);
        setshippingAddress(shippingAddress);
      } else {
        setshippingAddress(null);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const requestMomoPayment = async(jsonData) => {
    try {
      console.log("data_request_payment " + JSON.stringify(jsonData));
      if (Platform.OS === 'android') {
        console.log("true");
        let dataPayment = await RNMomosdk.requestPayment(jsonData);
        momoHandleResponse(dataPayment, (status) => {
          if (status === 0) {
            console.log("Create Order");
            createOrder();
          }
        });
      } else {
        console.log("ios open momo json");
        RNMomosdk.requestPayment(JSON.stringify(jsonData));
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  const momoHandleResponse = async(response, callback) => {
    try {
      let status = response.status; // Default to -1 if status is undefined
      console.log("Respone status:" + response.status);
      if (status === 0) {
        console.log("Success Payment");
        Alert.alert('THANH TOÁN THÀNH CÔNG.');
  
        // Gọi hàm callback với status
        if (callback) {
          callback(status);
        }
  
      } else {
        console.log("error ", response);
        Alert.alert('THANH TOÁN LỖI. VUI LÒNG THANH TOÁN LẠI.');
        
        // Gọi hàm callback với status
        if (callback) {
          callback(status);
        }
      }
    } catch (ex) {
      console.log("Exception in momoHandleResponse: ", ex);
    }
  }
  

  const createOrder = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const paymentMethod = "Momo";
    const orderData = {
      userId,
      cartItems,
      productsPrice,
      shippingPrice,
      totalPrice,
      shippingAddress,
      paymentMethod
    };
  
    try {
      const response = await axios.post('http://192.168.1.122:8000/order', orderData);
      if (response.status === 201 || response.status === 200) {
        console.log("Order created successfully:", response.data);
      } else {
        console.error("Failed to create order:", response.data);
      }
    } catch (error) {
      console.error("Error creating order:", error.message);
    }
  };

  const calculateProductsPrice = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantityorder; // Thay đổi phần tính toán tùy vào cấu trúc dữ liệu của bạn
    });
    setProductsPrice(total);
  };

  const handleAddressSelect = async (address) => {
    try {
      // Lưu địa chỉ mới vào AsyncStorage
      await AsyncStorage.setItem('selectedAddress', JSON.stringify(address));
      setshippingAddress(address);
      navigation.goBack(); // Quay lại màn hình CheckoutScreen sau khi chọn địa chỉ
      console.log('Đã lưu địa chỉ mới vào biến shippingAddress:', address);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handlePayment = () => {
    // Xử lý logic thanh toán ở đây
    const merchantname = "CGV Store";
    const merchantcode = "CGV01";
    const merchantNameLabel = "Nhà cung cấp";
    const billdescription = "Thanh toán hóa đơn";
    const enviroment = "0"; //"0": SANBOX , "1": PRODUCTION

    let jsonData = {};
    jsonData.enviroment = enviroment; //SANBOX OR PRODUCTION
    jsonData.action = "gettoken"; //DO NOT EDIT
    jsonData.merchantname = merchantname; //edit your merchantname here
    jsonData.merchantcode = merchantcode; //edit your merchantcode here
    jsonData.merchantnamelabel = merchantNameLabel;
    jsonData.description = billdescription;
    jsonData.amount = totalPrice;//order total amount
    jsonData.orderId = "ID" + new Date().getTime();
    jsonData.orderLabel = "Mã thanh toán";

    requestMomoPayment(jsonData);
    navigation.navigate("Home");
  };

  const totalPrice = productsPrice + shippingPrice;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.backButton}>
        <Image source={require('../images/back.png')} style={styles.backImage} />
      </TouchableOpacity>
      <Text style={styles.title}>Thanh Toán</Text>
      <Text style={styles.sectionTitle}>Địa Chỉ Giao Hàng</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SelectAddressScreen')} style={styles.addressContainer}>
        {shippingAddress ? (
          <View>
            <Text style={styles.addressText}>Tên: {shippingAddress.name}</Text>
            <Text style={styles.addressText}>Số Điện Thoại: {shippingAddress.phone}</Text>
            <Text style={styles.addressText}>Địa Chỉ: {shippingAddress.houseNo}, {shippingAddress.street}, {shippingAddress.district}, {shippingAddress.city}</Text>
          </View>
        ) : (
          <Text style={styles.addressText}>Chưa có địa chỉ nào được chọn</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Sản Phẩm</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item, index }) => (
          <CheckoutItem
            item={item}
          />
        )}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.priceDetailContainer}>
        <View style={styles.priceDetailRow}>
          <Text style={styles.priceDetailLabel}>Tiền Sản Phẩm:</Text>
          <Text style={styles.priceDetailValue}>{productsPrice} đ</Text>
        </View>
        <View style={styles.priceDetailRow}>
          <Text style={styles.priceDetailLabel}>Tiền Ship:</Text>
          <Text style={styles.priceDetailValue}>{shippingPrice} đ</Text>
        </View>
        <View style={styles.priceDetailRow}>
          <Text style={[styles.priceDetailLabel, styles.totalLabel]}>Tổng Cộng:</Text>
          <Text style={[styles.priceDetailValue, styles.totalValue]}>{totalPrice} đ</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handlePayment} style={styles.paymentButton}>
        <Text style={styles.paymentButtonText}>Thanh Toán</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  backButton: {
    margin: 15,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  addressContainer: {
    backgroundColor: '#e6f7ff',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  addressText: {
    fontSize: 16,
    marginVertical: 2,
  },
  priceDetailContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  priceDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceDetailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  priceDetailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#0A8ED9',
  },
  paymentButton: {
    backgroundColor: '#0A8ED9',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CheckoutScreen;
