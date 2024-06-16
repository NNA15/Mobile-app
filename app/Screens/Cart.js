import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import CartItem from '../Components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/actions/Actions';
import axios from 'axios';
import MomoPayment from '../MomoPayment/MomoPayment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { addItemToCart } from '../redux/actions/Actions';
const Cart = () => {
  const navigation = useNavigation();
  const [cartList, setCartList] = useState([]);
  const cartData = useSelector(state => state.Reducers);
  const dispatch = useDispatch();
  const [selectedCart, setSelectedCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedAll, setSelectedAll] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState([]);


  const handleFilterData = (data) => {
    const filterData = data.filter(value => value.selected);
    setSelectedCart(filterData);
  };

  useEffect(() => {
    setCartList(cartData);
  }, [cartData]);

  const handleCheckListCart = (item) => {
    const updatedCartList = cartList.map(data => {
      if (data.name === item.name) {
        return {
          ...data,
          selected: !data.selected,
        };
      } else {
        return data;
      }
    });
    setCartList(updatedCartList);
    handleFilterData(updatedCartList);
  };

  const handleCalculateTotalPrice = () => {
    const calculatePrice = selectedCart.reduce((acc, val) => acc + val.price * val.quantityorder, 0);
    setTotalPrice(calculatePrice);
  };

  const handleSelectedAllCart = () => {
    const filterCart = cartList.map(data => {
      return {
        ...data,
        selected: !selectedAll,
      };
    });
    setCartList(filterCart);
    handleFilterData(filterCart);
    setSelectedAll(!selectedAll);
  };

  const validateSelectedAll = () => {
    const data = cartList.every(value => value.selected);
    setSelectedAll(data);
  };
useEffect(() => {
    handleCalculateTotalPrice();
    validateSelectedAll();
  }, [selectedCart]);

  const handleAddQuantity = (item) => {
    const updatedCartList = cartList.map(data => {
      if (data.name === item.name && data.quantityorder < data.quantity) {
        return {
          ...data,
          quantityorder: data.quantityorder + 1,
        };
      } else {
        return data;
      }
    });
    setCartList(updatedCartList);
    handleFilterData(updatedCartList);
  };

  const handleReduceQuantity = (item) => {
    const updatedCartList = cartList.map(data => {
      if (data.name === item.name && data.quantityorder > 1) {
        return {
          ...data,
          quantityorder: data.quantityorder - 1,
        };
      } else {
        return data;
        return data;
      }
    });
    setCartList(updatedCartList);
    handleFilterData(updatedCartList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={cartList}
        renderItem={({ item, index }) => (
          <CartItem
            item={item}
            onCheckItem={() => handleCheckListCart(item)}
            addQuantity={() => handleAddQuantity(item)}
            reduceQuantity={() => handleReduceQuantity(item)}
            onRemoveItem={() => dispatch(removeFromCart(index))}
          />
        )}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <TouchableOpacity style={styles.selectAllButton} onPress={handleSelectedAllCart}>
            <Text style={styles.selectAllText}>{selectedAll ? '✔️' : ''}</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>Total Price</Text>
          <Text style={styles.footerPrice}>đ {totalPrice}</Text>
        </View>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate('CheckoutScreen');
          }}
          style={[styles.checkoutButton, { backgroundColor: '#0A8ED9' }]}>
          <Text style={{ color: 'black' }}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllButton: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 4,
    width: 24,
    height: 24,
    alignItems: 'center',
justifyContent: 'center',
    marginRight: 10,
  },
  selectAllText: {
    fontSize: 16,
    color: '#0A8ED9',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  footerPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A8ED9',
  },
  checkoutButton: {
    backgroundColor: '#0A8ED9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});