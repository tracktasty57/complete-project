import express from 'express';
import { getUserProfile, toggleFavorite, toggleLike } from '../controllers/user.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);
router.post('/favorites', verifyToken, toggleFavorite);
router.post('/likes', verifyToken, toggleLike);

export default router;
