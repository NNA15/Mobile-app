import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image, onPress
} from 'react-native';
import React from 'react';

const CustomButton = ({ bg, title, onClick, color, icon, }) => {
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: bg }]}
      onPress={() => {
        onClick();
      }}>
      <Text style={{ color: color, fontSize: 18, fontWeight: '500', backgroundColor: bg }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  btn: {
    width: Dimensions.get('window').width - 40,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
});