const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const User = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
      productsPrice,
      shippingPrice,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    //create an array of product objects from the cart Items
    const products = cartItems.map(item => ({
      name: item?.name,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    //create a new Order
    const order = new Order({
      user: userId,
      products: products,
      productsPrice: productsPrice,
      shippingPrice: shippingPrice,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({message: 'Order created successfully!'});
  } catch (error) {
    console.log('error creating orders', error);
    res.status(500).json({message: 'Error creating orders'});
  }
});
module.exports = router;
