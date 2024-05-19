import React, {useState, useEffect} from 'react';
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
import {useSelector, useDispatch} from 'react-redux';
import {removeFromCart} from '../redux/actions/Actions';
import axios from 'axios';
import MomoPayment from '../MomoPayment/MomoPayment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {
  const [cartList, setCartList] = useState([]);
  const cartData = useSelector(state => state.Reducers);
  const dispatch = useDispatch();
  const [selectedCart, setSelectedCar] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedAll, setselectedAll] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState([]);

  const handleCheckOut = async() => {
    const merchantname = "CGV Cinemas";
    const merchantcode = "CGV01";
    const merchantNameLabel = "Nhà cung cấp";
    const billdescription = "Fast and Furious 8";
    const enviroment = "0"; //"0": SANBOX , "1": PRODUCTION
  
    let jsonData = {};
    jsonData.enviroment = enviroment; //SANBOX OR PRODUCTION
    jsonData.action = "gettoken"; //DO NOT EDIT
    jsonData.merchantname = merchantname; //edit your merchantname here
    jsonData.merchantcode = merchantcode; //edit your merchantcode here
    jsonData.merchantnamelabel = merchantNameLabel;
    jsonData.description = billdescription;
    jsonData.amount = totalPrice;//order total amount
    jsonData.orderId = "ID" + new Date().getTime();
    jsonData.orderLabel = "Ma don hang";
  
    const momoPaymentInstance = new MomoPayment(); 
    momoPaymentInstance.requestMomoPayment(jsonData);
  };

  const createOrder = async() => {
    const userId = await AsyncStorage.getItem("userId");
    const orderData = {
      user: userId, 
      products: [
        selectedCart,
      ],
      totalPrice: 400, // Tổng giá
      shippingAddress: {
        name: "John Doe",
        mobileNo: "123456789",
        houseNo: "123",
        street: "Main St",
      },
      paymentMethod: "MoMo", // Hoặc phương thức thanh toán khác
    };
    try {
      const response = await axios.post('http://192.168.1.122:8000/order/', orderData);
      if (response.status === 201) {
        console.log("Order created successfully:", response.data);
      } else {
        console.error("Failed to create order:", response.data);
      }
    } catch (error) {
      console.error("Error creating order:", error.message);
    }
  };

  // hàm lọc ra các phần tử được chọn
  const handleFilterData = data => {
    const filterData = data.filter(value => {
      return value.selected;
    });
    setSelectedCar(filterData);
  };

  useEffect(() => {
    // Khởi tạo danh sách giỏ hàng khi cartData thay đổi
    setCartList(cartData);
  }, [cartData]);

  // thêm dấu tích
  const handleCheckListCart = item => {
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

  // tính tổng số tiền mua hàng
  const handleCalculateTotalPrice = () => {
    const calculatePrice = selectedCart.reduce(
      (acc, val) => acc + val.price * val.quantity,
      0,
    );
    setTotalPrice(calculatePrice);
  };

  // chọn tất cả sản phẩm
  const handleSetlectedAllCart = () => {
    const filterCart = cartList.map(data => {
      if (selectedAll) {
        return {
          ...data,
          selected: false,
        };
      } else {
        return {
          ...data,
          selected: true,
        };
      }
    });
    setCartList(filterCart);
    handleFilterData(filterCart);
  };

  const validateSelectedAll = () => {
    const data = cartList.every(value => value.selected === true);
    setselectedAll(data);
  };

  useEffect(() => {
    handleCalculateTotalPrice();
    validateSelectedAll();
  }, [selectedCart]);

  const handleAddQuantity = item => {
    const selectedItem = cartList.map(data => {
      if (data.name === item.name) {
        return {
          ...data,
          quantity: data.quantity + 1,
        };
      } else {
        return data;
      }
    });
    setCartList(selectedItem);
    handleFilterData(selectedItem);
  };
  const handlereduceQuantity = item => {
    const selectedItem = cartList.map(data => {
      if (data.name === item.name && data.quantity > 1) {
        return {
          ...data,
          quantity: data.quantity - 1,
        };
      } else {
        return data;
      }
    });
    setCartList(selectedItem);
    handleFilterData(selectedItem);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <FlatList
          data={cartList}
          renderItem={({item, index}) => {
            return (
              <CartItem
                item={item}
                onCheckItem={() => handleCheckListCart(item)}
                addQuantity={() => handleAddQuantity(item)}
                reduceQuantity={() => handlereduceQuantity(item)}
                onRemoveItem={() => {
                  dispatch(removeFromCart(index));
                }}
              />
            );
          }}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSetlectedAllCart}>
            <Text style={styles.iconPlus}>{selectedAll ? '✔️' : ''}</Text>
          </TouchableOpacity>
          <Text style={[styles.textFooter, {marginRight: 10}]}>
            Total Price
          </Text>
          <Text style={styles.textFooter}>đ {totalPrice}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleCheckOut()}
          style={[styles.buttonCheckout, {backgroundColor: '#0A8ED9'}]}>
          <Text style={{color: 'black'}}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    flex: 1,
    padding: 15,
  },
  footer: {
    borderTopWidth: 0.5,
    paddingLeft: 15,
    borderColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textFooter: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonCheckout: {
    backgroundColor: 'blue',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  button: {
    borderWidth: 0.5,
    borderRadius: 4,
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconPlus: {
    color: 'green',
    fontWeight: '600',
  },
});
