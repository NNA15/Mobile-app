import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';

export default function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  InputStyle,
  Icon,
  label,
  containerStyle
}) {
  const [focused, setFocused] = useState(false);

  const onFocus = () => {
    setFocused(true); // Set focused to true only on focus
  };

  const onBlur = () => {
    setFocused(false); // Set focused to false on blur (optional)
  };

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        focused ? styles.activeBorder : styles.blurBorder,
      ]}
    >
      {label && (
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ color: 'darkgray' }}>{label}</Text>
        </View>
      )}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Image source={Icon} style={{ width: 24, height: 24 }} />
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          style={[styles.input, InputStyle]}
          onBlur={onBlur} // Add optional onBlur handler
          onFocus={onFocus}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 0.4,
  },
  input: {
    paddingVertical: 10,
    fontSize: 14,
  },
  blurBorder: {
    borderColor: 'darkgray',
  },
  activeBorder: {
    borderColor: 'blue', // Thay thế bằng màu sắc mong muốn khi focus
    borderBottomWidth: 1,
  },
});