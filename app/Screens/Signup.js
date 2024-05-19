import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../Components/CustomButton';
import CustomInput from '../Components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post('http://192.168.1.12:8000/register', user)
      .then(response => {
        console.log(response);
        Alert.alert(
          'Registration Successfull',
          'You have registered successfully',
        );
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        Alert.alert(
          'Registration Error',
          'an error occurred during registration',
        );
        console.log('registration failed', error);
      });
  };
  return (
    <View>
      <View
        style={{
          marginTop: 30,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Image
            style={{
              height: 25,
              width: 25,
            }}
            source={require('../images/back.png')}></Image>
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 15,
          backgroundColor: 'white',
          marginTop: 70,
          borderRadius: 5,
          marginHorizontal: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 30, color: 'black', fontWeight: 700 }}>
            Welcome,
          </Text>
        </View>
        <Text>Sign up to Continue</Text>
        <View style={{ marginVertical: 25 }}>
          <Text style={{ fontSize: 20, fontWeight: 500 }}>Name</Text>
          <CustomInput
            value={name}
            onChangeText={text => setName(text)}
            placeholder={'Enter Name'}
            icon={require('../images/user.png')}></CustomInput>
        </View>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 500 }}>Email</Text>
          <CustomInput
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder={'Enter Email'}
            icon={require('../images/mail.png')}></CustomInput>
        </View>
        <View style={{ marginVertical: 25 }}>
          <Text style={{ fontSize: 20, fontWeight: 500 }}>Password</Text>
          <CustomInput
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder={'Enter Password'}
            type={'password'}
            icon={require('../images/key.png')}></CustomInput>
        </View>
        <View>
          <CustomButton
            title={'SIGN UP'}
            bg={'#0A8ED9'}
            color={'white'}
            onClick={handleRegister}></CustomButton>
        </View>
      </View>
    </View>
  );
};

export default Signup;
