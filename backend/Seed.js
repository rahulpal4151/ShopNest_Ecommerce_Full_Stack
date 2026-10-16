const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    const plainPassword = '123456';
    const password = await bcrypt.hash(plainPassword, 10);

    const users = await User.insertMany([
      {
        name: 'Admin Joker',
        email: 'admin@shopnest.com',
        password,
        role: 'admin',
      },
      {
        name: 'Mango Man',
        email: 'mango@example.com',
        password,
        role: 'user',
      },
      {
        name: 'Coffee Cat',
        email: 'coffee@example.com',
        password,
        role: 'user',
      },
    ]);

    const products = await Product.insertMany([
      {
        name: 'Funny Mug',
        description: 'A mug that makes your coffee feel like a motivational speech.',
        price: 499,
        category: 'Kitchen',
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80',
        ratings: 4.6,
        numReviews: 10,
      },
      {
        name: 'Banana Lamp',
        description: 'A bright little lamp for people who love fruit and weird decor.',
        price: 899,
        category: 'Home',
        stock: 15,
        imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
        ratings: 4.8,
        numReviews: 12,
      },
      {
        name: 'Cactus Hoodie',
        description: 'Warm, stylish, and secretly judging your life choices.',
        price: 1499,
        category: 'Fashion',
        stock: 20,
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
        ratings: 4.7,
        numReviews: 14,
      },
      {
        name: 'Keyboard Cat Mat',
        description: 'A desk mat for keyboard warriors and dramatic coders.',
        price: 699,
        category: 'Office',
        stock: 18,
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        ratings: 4.5,
        numReviews: 9,
      },
    ]);

    await Order.insertMany([
      {
        userId: users[1]._id,
        items: [
          { productId: products[0]._id, qty: 1, price: products[0].price },
          { productId: products[2]._id, qty: 1, price: products[2].price },
        ],
        totalAmount: 1998,
        address: {
          fullName: 'Mango Man',
          street: '10 Mango Street',
          city: 'Delhi',
          postalCode: '110001',
          country: 'India',
        },
        paymentId: 'PAY_001',
        status: 'Pending',
      },
      {
        userId: users[2]._id,
        items: [
          { productId: products[1]._id, qty: 2, price: products[1].price },
        ],
        totalAmount: 1798,
        address: {
          fullName: 'Coffee Cat',
          street: '99 Latte Lane',
          city: 'Bengaluru',
          postalCode: '560001',
          country: 'India',
        },
        paymentId: 'PAY_002',
        status: 'Shipped',
      },
    ]);

    console.log('Dummy data inserted successfully!');
    console.log('Users created:', users.length);
    console.log('Products created:', products.length);

    console.log('\nSeeded user credentials (use these to login):');
    users.forEach((u) => {
      console.log(`- ${u.email} : ${plainPassword}`);
    });
  } catch (error) {
    console.error('Seed error:', error.message);
  } finally {
    mongoose.disconnect();
  }
};

seedData();
