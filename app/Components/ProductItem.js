import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native-elements';

const ProductItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image}></Image>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.titleText}>{item.name}</Text>
      <Text style={styles.priceText}>{item.price + 'đ'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 260,
    elevation: 2,
    marginRight: 20,
    backgroundColor: 'white',
  },
  image: {
    width: 148,
    height: 184,
  },
  nameText: {
    fontSize: 12,
    color: '#9B9B9B',
  },
  titleText: {
    fontSize: 16,
    color: '#222222',
    fontWeight: '600',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'red',
  },
});

export default ProductItem;
