import { View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import CustomButton from '../Components/CustomButton'
import CustomInput from '../Components/CustomInput'
import { useNavigation } from '@react-navigation/native'

const Signup = () => {
    const navigation = useNavigation();
  return (
    <View>
        <View
        style={{
            marginTop: 30,
            paddingHorizontal: 20,
        }}
        >
            <TouchableOpacity
            onPress={() =>
                navigation.navigate('Login')
            }
            >
                <Image
                style={{
                    height: 25,
                    width: 25,
                }}
                source={require('../images/back.png')}
                ></Image>
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
          <Text style={{fontSize: 30, color: 'black', fontWeight: 700}}>
            Welcome,
          </Text>
        </View>
        <Text>Sign up to Continue</Text>
        <View style={{marginVertical: 25}}>
          <Text style={{fontSize: 20, fontWeight: 500}}>Name</Text>
          <CustomInput
            placeholder={'Enter Name'}
            icon={require('../images/user.png')}></CustomInput>
        </View>
        <View>
          <Text style={{fontSize: 20, fontWeight: 500}}>Email</Text>
          <CustomInput
            placeholder={'Enter Email'}
            icon={require('../images/mail.png')}></CustomInput>
        </View>
        <View style={{marginVertical: 25}}>
          <Text style={{fontSize: 20, fontWeight: 500}}>Password</Text>
          <CustomInput
            placeholder={'Enter Password'}
            type={'password'}
            icon={require('../images/key.png')}></CustomInput>
        </View>
        <View>
          <CustomButton
            title={'SIGN UP'}
            bg={'#0A8ED9'}
            color={'white'}
            onClick={() => 
                navigation.navigate('VerifySignup')
            }></CustomButton>
        </View>
      </View>
    </View>
  )
}

export default Signup