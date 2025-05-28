// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
dotenv.config();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
// const errorHandler = require('./middleware/errorHandler');

connectDB();
const app = express();

console.log((process.env.MONGO_URI), "server");

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/users', userRoutes);

// Error Handling
// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
