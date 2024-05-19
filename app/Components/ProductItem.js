import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductItem = ({ item, onAddWishlist, onAddToCart }) => {
  const navigation = useNavigation();
  const [isWishlist, setIsWishlist] = useState(false); // State để kiểm tra xem sản phẩm đã được thêm vào danh sách mong muốn chưa

  const handlePress = () => {
    navigation.navigate('ProductDetail', { item: item });
  };

  const handleWishlistPress = () => {
    setIsWishlist(!isWishlist); // Khi người dùng nhấn vào heart, đảo ngược giá trị của isWishlist
    if (!isWishlist) {
      onAddWishlist(item); // Gọi hàm để thêm hoặc xóa sản phẩm khỏi danh sách mong muốn

    }
  };

  return (
    <TouchableOpacity
      style={{
        borderRadius: 10,
        elevation: 5,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
      }}
      onPress={handlePress}
    >
      <View style={{ width: '100%' }}>
        <Image
          source={{ uri: item.image }}
          style={{
            width: '100%',
            height: 120,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />

        <Text
          style={{
            marginTop: 10,
            marginLeft: 10,
            fontSize: 18,
            fontWeight: '600',
          }}>
          {item.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            style={{
              marginTop: 5,
              marginLeft: 10,
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 10,
            }}>
            {'đ ' + item.price}
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: 0.5,
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              marginRight: 15,
            }}
            onPress={() => {
              onAddToCart(item);
            }}>
            <Text style={{ color: '#000' }}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: 40,
            elevation: 5,
            height: 40,
            backgroundColor: '#fff',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          onPress={handleWishlistPress} // Sử dụng hàm mới đã được tạo
        >
          <Image
            source={isWishlist ? require('../images/Redheart.png') : require('../images/heart.png')} // Sử dụng biến isWishlist để quyết định hiển thị hình ảnh tương ứng
            style={{ width: 24, height: 24 }}
          />

        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
