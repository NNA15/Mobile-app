import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../Components/CustomTextInput';
import CommonButton from '../Components/CommonButton';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAddress = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    
    const handleAddAddress = async() => {
        const userId = await AsyncStorage.getItem('userId');
        const address = {
            name,
            phone,
            street,
            district,
            city
        }
        axios.post('http://192.168.1.122:8000/addresses',{userId,address}).then((response) => {
            setName("");
            setPhone("");
            setStreet("");
            setDistrict("");
            setCity("");
  
            setTimeout(() => {
              navigation.goBack();
            },500)
        }).catch((error) => {
            Alert.alert("Error","Failed to add address")
            console.log("error",error)
        })
    }
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    width: '100%',
                    height: 70,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    style={{
                        marginLeft: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 0.2,
                        padding: 7,
                        borderRadius: 10,
                    }}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Image
                        source={require('../images/back.png')}
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                    Add Address
                </Text>
                <CustomTextInput
                    placeholder={'Enter Name'}
                    value={name}
                    onChangeText={txt => {
                        setName(txt);
                    }}
                    icon={require('../images/building.png')}
                />
                <CustomTextInput
                    placeholder={'Enter Mobile Number'}
                    value={phone}
                    onChangeText={txt => {
                        setPhone(txt);
                    }}
                    icon={require('../images/building.png')}
                />
                <CustomTextInput
                    placeholder={'Enter Address'}
                    value={street}
                    onChangeText={txt => {
                        setStreet(txt);
                    }}
                    icon={require('../images/pin.png')}
                />
                <CustomTextInput
                    placeholder={'Enter District'}
                    value={district}
                    onChangeText={txt => {
                        setDistrict(txt);
                    }}
                    icon={require('../images/pin.png')}
                />
                <CustomTextInput
                    placeholder={'Enter City Name'}
                    value={city}
                    onChangeText={txt => {
                        setCity(txt);
                    }}
                    icon={require('../images/buildings.png')}
                />
                <CommonButton
                    title={'Save Address'}
                    bgColor={'#0A8ED9'}
                    textColor={'#fff'}
                    onPress={() => {handleAddAddress()}}
                />
            </View>
        </View>
    );
};

export default AddAddress;
