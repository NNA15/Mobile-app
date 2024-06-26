const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const productRoutes = require('./Product/Product.js');
const MomoPaymentRoutes = require('./MomoPayment/Momo.js');
const userRoutes = require('./User/User.js');
const orderRouters = require('./Order/Order.js');

const app = express();
const port = 8000;
const cors = require('cors');
app.use(express.json());

app.use('/product', productRoutes);
app.use('/momo', MomoPaymentRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRouters);

app.use(cors({origin: true, credentials: true}));

app.use(express.urlencoded({extended: false}));

const jwt = require('jsonwebtoken');
app.listen(port, () => {
  console.log('Server is running on port 8000');
});

mongoose
  .connect(
    'mongodb+srv://nhatnguyenb25:nhatnguyenb25@mobileapp.kesy0eu.mongodb.net/',
    {},
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to MongoDb', err);
  });

const User = require('./models/user');
const Order = require('./models/order');

const sendVerificationEmail = async (email, verificationToken) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    // Configure the email service or SMTP details here
    service: 'gmail',
    auth: {
      user: 'nhatnguyenb25@gmail.com',
      pass: 'ibov ykqp sxto qgzl',
    },
  });

  // Compose the email message
  const mailOptions = {
    from: 'nhatnguyenb25@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Please click the following link to verify your email: http://192.168.1.122:8000/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};
// Register a new user
// ... existing imports and setup ...

app.post('/register', async (req, res) => {
  try {
    const {name, email, password} = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({email});
    if (existingUser) {
      console.log('Email already registered:', email); // Debugging statement
      return res.status(400).json({message: 'Email already registered'});
    }

    // Create a new user
    const newUser = new User({name, email, password});

    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString('hex');

    // Save the user to the database
    await newUser.save();

    // Debugging statement to verify data
    console.log('New User Registered:', newUser);

    // Send verification email to the user
    // Use your preferred email service or library to send the email
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(201).json({
      message:
        'Registration successful. Please check your email for verification.',
    });
  } catch (error) {
    console.log('Error during registration:', error); // Debugging statement
    res.status(500).json({message: 'Registration failed'});
  }
});

//endpoint to verify the email
app.get('/verify/:token', async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user witht the given verification token
    const user = await User.findOne({verificationToken: token});
    if (!user) {
      return res.status(404).json({message: 'Invalid verification token'});
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({message: 'Email verified successfully'});
  } catch (error) {
    res.status(500).json({message: 'Email Verificatioion Failed'});
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex');

  return secretKey;
};

const secretKey = generateSecretKey();

//endpoint to login the user!
app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;

    //check if the user exists
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({message: 'Invalid email or password'});
    }

    //check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({message: 'Invalid password'});
    }

    //generate a token
    const token = jwt.sign({userId: user._id}, secretKey);

    res.status(200).json({token});
  } catch (error) {
    res.status(500).json({message: 'Login Failed'});
  }
});
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    //find the user by the Userid
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //add the new address to the user's addresses array
    user.addresses.push(address);

    //save the updated user in te backend
    await user.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error addding address" });
  }
});
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieveing the addresses" });
  }
});
app.delete("/addresses", async (req, res) => {
  try {
    const { userId, addressId } = req.body;

    // Tìm người dùng bằng userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Tìm và xóa địa chỉ từ mảng addresses của người dùng
    user.addresses = user.addresses.filter(address => address._id.toString() !== addressId);

    // Lưu người dùng đã cập nhật vào cơ sở dữ liệu
    await user.save();

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Error deleting address" });
  }
});
app.get('/order/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({user: userId}).populate('user');

    if (!orders || orders.length === 0) {
      return res.status(404).json({message: 'No orders found for this user'});
    }

    res.status(200).json({orders});
  } catch (error) {
    res.status(500).json({message: 'Error'});
  }
});