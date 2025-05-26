// server/routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  uploadVideo,
  getFeed,
  watchVideo,
  purchaseVideo,
  addComment,
  giftCreator
} = require('../controllers/videoController');
const upload = require('../middleware/uploadMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'server/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB

router.post('/upload', upload.single('videoFile'), uploadVideo);
router.get('/feed', getFeed);
router.post('/:id/watch', watchVideo);
router.post('/:id/purchase', purchaseVideo);
router.post('/:id/comment', addComment);
router.post('/:id/gift', giftCreator);

module.exports = router;
