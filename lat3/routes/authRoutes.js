import express from 'express';
import { userRegister, userLogin } from '../controllers/authController.js';
import authValidator from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authValidator, userRegister);
router.post('/login', authValidator, userLogin);

export default router;