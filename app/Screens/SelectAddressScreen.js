import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Thêm AsyncStorage

const SelectAddressScreen = ({ navigation }) => {
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const response = await axios.get(
                `http://192.168.1.122:8000/addresses/${userId}`,
            );
            const { addresses } = response.data;
            setAddresses(addresses);
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleAddressSelect = async (selectedAddress) => {
        try {
            // Lưu địa chỉ đã chọn vào AsyncStorage
            await AsyncStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
            // Quay lại màn hình trước đó (CheckoutScreen)
            navigation.goBack();
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chọn Địa Chỉ</Text>
            <FlatList
                data={addresses}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.addressItem}
                        onPress={() => handleAddressSelect(item)}
                    >
                        <Text>Tên: {item.name}</Text>
                        <Text>Số Điện Thoại: {item.mobileNo}</Text>
                        <Text>Địa Chỉ: {item.houseNo}, {item.street}, {item.district}, {item.city}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item._id} // hoặc bất kỳ khóa duy nhất nào
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#333',
    },
    addressItem: {
        backgroundColor: '#e6f7ff',
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 15,
    },
});

export default SelectAddressScreen;
