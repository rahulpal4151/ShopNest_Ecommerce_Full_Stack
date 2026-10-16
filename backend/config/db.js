const mongoose = require('mongoose');
require('dotenv').config();

const connectdb = async () => {
  try {
    const mongoUri = process.env.MONGO_URI?.trim();
    if (!mongoUri) {
      throw new Error('MONGO_URI is missing. Copy .env.example to .env and add your MongoDB connection string.');
    }

    const conn = await mongoose.connect(mongoUri, {
      dbName: 'shopNest',
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectdb;
