import express from 'express';
const router = express.Router();

import checkToken from '../middlewares/auth.js';
import UserProfile from '../controllers/onboard.js';
router.post('/start/:pages',checkToken,UserProfile);

export default router;