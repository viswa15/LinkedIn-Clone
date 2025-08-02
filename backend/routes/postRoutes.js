import express from 'express';
import { createPost, getFeed } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', protect, createPost);
router.get('/', getFeed);

export default router;
