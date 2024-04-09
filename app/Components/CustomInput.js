import {View, Text, Image} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';

const CustomInput = ({value, onChangeText, placeholder, icon, type}) => {
  return (
    <View
      style={{
        borderBottomWidth: 0.5,
        borderBottomColor: 'darkgray',
        alignItems: 'center',
        // paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
      }}>
      <Image source={icon} style={{width: 24, height: 24}}></Image>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={type == 'password' ? true : false}
        style={{marginLeft: 10, fontSize: 14}}></TextInput>
    </View>
  );
};

export default CustomInput;
