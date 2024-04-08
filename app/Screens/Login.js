import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post('http://192.168.1.122:8000/login', user)
      .then(response => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem('authToken', token);
        navigation.navigate('TabNavigation');
      })
      .catch(error => {
        Alert.alert('Login Error', 'Invalid Email');
        console.log(error);
      });
  };
  return (
    <View>
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
          <Text style={{fontSize: 30, color: 'black', fontWeight: 700}}>
            Welcome,
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text style={{fontSize: 14, color: '#0A8ED9', fontWeight: 500}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <Text>Sign in to Continue</Text>
        <View style={{marginVertical: 50}}>
          <Text style={{fontSize: 20, fontWeight: 500}}>Email</Text>
          <CustomInput
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder={'Enter Email'}
            icon={require('../images/mail.png')}></CustomInput>
        </View>
        <View>
          <Text style={{fontSize: 20, fontWeight: 500}}>Password</Text>
          <CustomInput
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder={'Enter Password'}
            type={'password'}
            icon={require('../images/key.png')}></CustomInput>
        </View>
        <View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingTop: 10,
            }}
            onPress={() => {
              navigation.navigate('ForgotPassword1');
            }}>
            <Text style={{fontSize: 14, color: 'black'}}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
        <View>
          <CustomButton
            title={'SIGN IN'}
            bg={'#0A8ED9'}
            color={'white'}
            onClick={handleLogin}></CustomButton>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            marginVertical: 15,
          }}>
          -OR-
        </Text>
      </View>

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            borderColor: 'rgba(10, 142, 217, 1)',
            borderWidth: 2,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: Dimensions.get('window').width - 40,
            height: 53,
          }}
          onPress={() => {}}>
          <Image
            source={require('../images/mail.png')}
            style={{
              width: 30,
              height: 30,
              marginRight: 30,
            }}
          />
          <Text style={{color: 'black', fontWeight: 500, fontSize: 18}}>
            SIGN IN
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
