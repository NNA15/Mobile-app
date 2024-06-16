import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  Alert
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {useNavigation, useIsFocused, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {addAddress, deleteAddress} from '../redux/actions/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MyAddress = () => {
  const navigation = useNavigation();
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
      const {addresses} = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log('error', error);
    }
  };
  //refresh the addresses when the component comes to the focus ie basically when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, []),
  );

  const handleDeleteAddress = async (addressId) => {
    try {
        const userId = await AsyncStorage.getItem('userId');
      await axios.delete('http://192.168.1.122:8000/addresses', {
        data: { userId, addressId } // Truyền userId và addressId
      });

      // Cập nhật danh sách địa chỉ sau khi xóa
      setAddresses(addresses.filter(address => address._id !== addressId));
    } catch (error) {
      Alert.alert("Error", "Failed to delete address");
      console.log("Error:", error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            height: 70,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: '#e0e0e0',
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 7,
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../images/back.png')}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
          <Text style={{fontWeight: '600', fontSize: 18}}>My Address</Text>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 7,
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate('AddAddress');
            }}>
            <Text style={{color: '#007bff'}}>Add Address</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={addresses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View
              style={{
                width: '90%',
                borderWidth: 0.5,
                borderColor: '#8e8e8e',
                borderRadius: 10,
                padding: 15,
                marginVertical: 10,
                alignSelf: 'center',
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2,
              }}>
              <View>
                <Text style={{ marginBottom: 5 }}>{'Name: ' + item.name}</Text>
                                <Text style={{ marginBottom: 5 }}>{'Phone: ' + item.phone}</Text>
                                <Text style={{ marginBottom: 5 }}>{'Address: ' + item.street + ', ' + item.district + ', ' + item.city}</Text>
              </View>
              <TouchableOpacity
                style={{
                  borderWidth: 0.5,
                  borderColor: '#ff0000',
                  padding: 5,
                  borderRadius: 5,
                  alignSelf: 'flex-end',
                  marginTop: 10,
                }}
                onPress={() => {
                  handleDeleteAddress(item._id);
                }}>
                <Text style={{color: '#ff0000'}}>Delete address</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyAddress;
