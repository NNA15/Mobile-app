import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../redux/actions/Actions';

const ProductDetail = ({ route }) => {
  const dispatch = useDispatch();
  const { item } = route.params;
  const navigation = useNavigation();

  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...item }));
    console.log('Thêm vào giỏ hàng:', item.name, 'số lượng:', 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../images/back.png')} style={styles.backImage} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>Price: {item.price}đ</Text>
          <Text style={styles.price}>Description:</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  backImage: {
    width: 30,
    height: 30,
  },
  imageContainer: {
    height: 500,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  detailsContainer: {
    padding: 20,
  },
  name: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 300,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20, // Ensure there is some margin at the bottom
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetail;
