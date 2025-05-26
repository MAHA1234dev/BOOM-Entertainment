// server/controllers/videoController.js
const Video = require('../models/Video');
const Purchase = require('../models/Purchase');
const Comment = require('../models/Comment');
const User = require('../models/User');

exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, videoType, videoUrl, price, creator } = req.body;
    let videoPath = videoUrl;

    if (videoType === 'Short-Form' && req.file) {
      videoPath = `/uploads/${req.file.filename}`;
    }

    const video = await Video.create({
      title,
      description,
      videoType,
      videoUrl: videoPath,
      price: price || 0,
      creator
    });

    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFeed = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 }).populate('creator', 'username');
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.watchVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.purchaseVideo = async (req, res) => {
  try {
    const { userId } = req.body;
    const video = await Video.findById(req.params.id);
    const user = await User.findById(userId);
    const alreadyPurchased = await Purchase.findOne({ user: userId, video: video._id });

    if (alreadyPurchased) return res.json({ message: 'Already purchased' });
    if (user.wallet < video.price) return res.status(400).json({ message: 'Insufficient funds' });

    user.wallet -= video.price;
    await user.save();
    await Purchase.create({ user: userId, video: video._id });

    res.json({ message: 'Purchase successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const comment = await Comment.create({
      user: userId,
      video: req.params.id,
      content
    });

    const populatedComment = await comment.populate('user', 'username');
    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.giftCreator = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const video = await Video.findById(req.params.id).populate('creator');
    const user = await User.findById(userId);

    if (!video || !video.creator) return res.status(404).json({ message: 'Invalid video or creator' });
    if (user.wallet < amount) return res.status(400).json({ message: 'Insufficient balance' });

    user.wallet -= amount;
    await user.save();

    res.json({
      message: `You gifted ₹${amount} to ${video.creator.username}`
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
