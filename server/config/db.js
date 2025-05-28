const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load the .env file manually from the current directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI, "Mongo URI Loaded");

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(` MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
