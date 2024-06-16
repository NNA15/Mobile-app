import React, { Component } from 'react';
import {
  Platform,
  DeviceEventEmitter,
  NativeModules,
  NativeEventEmitter,
  Alert,
} from 'react-native';
import RNMomosdk from 'react-native-momosdk';

const RNMomosdkModule = NativeModules.RNMomosdk;

class MomoPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      processing: false
    };
  }

  // Action to Request Payment MoMo App
  requestMomoPayment = async(jsonData) => {
    try {
      console.log("data_request_payment " + JSON.stringify(jsonData));
    if (Platform.OS === 'android'){
      console.log("true");
      let dataPayment = await RNMomosdk.requestPayment(jsonData);
      this.momoHandleResponse(dataPayment);
    }else{
      console.log("ios open momo json");
      RNMomosdk.requestPayment(JSON.stringify(jsonData));
    }
    } catch (error) {
      console.log(error);
    }
  }

  momoHandleResponse = async(response) => {
    try {
      if (response && response.status === 0) {
        // console.log("MomoHandleRespone: " , response.status);
        console.log("Success Payment");
      } else {
        console.log("error ",response)
        Alert.alert('THANH TOÁN LỖI. VUI LÒNG THANH TOÁN LẠI.');
      }
    } catch (ex) {
      
    }
  }

  render() {
    return null; // You may need to replace this with your actual render logic
  }
}

export default MomoPayment;
