const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
  try {
    let users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// Get user by name
router.get('/name/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({name: username});

    if (!user) {
      return res.status(404).json({message: 'Invalid User'});
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// Get user by id
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({message: 'Invalid User'});
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.post('/addresses', async (req, res) => {
  try {
    const {userId, address} = req.body;

    //find the user by the Userid
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    //add the new address to the user's addresses array
    user.addresses.push(address);

    //save the updated user in te backend
    await user.save();

    res.status(200).json({message: 'Address created Successfully'});
  } catch (error) {
    res.status(500).json({message: 'Error addding address'});
  }
});

//endpoint to get all the addresses of a particular user
router.get('/addresses/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const addresses = user.addresses;
    res.status(200).json({addresses});
  } catch (error) {
    res.status(500).json({message: 'Error retrieveing the addresses'});
  }
});
router.post('/change_password', async (req, res) => {
  const {userId, currentPassword, newPassword} = req.body;

  try {
    // Kiểm tra xem userId và currentPassword có được cung cấp không
    if (!userId || !currentPassword || !newPassword) {
      return res
        .status(400)
        .json({
          message: 'Vui lòng cung cấp userId, currentPassword và newPassword',
        });
    }

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({message: 'Người dùng không tồn tại'});
    }

    // Kiểm tra mật khẩu hiện tại có khớp không
    if (user.password !== currentPassword) {
      return res.status(400).json({message: 'Mật khẩu hiện tại không đúng'});
    }

    // Lưu mật khẩu mới vào cơ sở dữ liệu
    user.password = newPassword;
    await user.save();

    res.status(200).json({message: 'Đổi mật khẩu thành công'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Đã xảy ra lỗi khi đổi mật khẩu'});
  }
});
module.exports = router;
