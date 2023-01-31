import express from 'express';
const router = express.Router();

import signUp from '../controllers/signup.js';
import verifyOTP from '../controllers/verifyOTP.js';

//middleware
import checkToken from '../middlewares/auth.js';

router.post('/signup',signUp);
router.post('/verify/:userId',checkToken,verifyOTP);
export default router;