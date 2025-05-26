// server/models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    videoType: { type: String, enum: ['Short-Form', 'Long-Form'], required: true },
    videoUrl: { type: String }, // URL or local path
    thumbnail: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
