import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import CartItem from '../Components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/actions/Actions';

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const cartData = useSelector(state => state.Reducers);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cartData}
        renderItem={({ item, index }) => {
          return <CartItem item={item}
            onRemoveItem={() => {
              dispatch(removeFromCart(index));
            }} />;
        }}
      />
    </View>
  );
};

export default Cart;
