import authValidator from "../middleware/authMiddleware.js";
import { userRegister, userLogin } from "../controllers/authController.js";
import express from 'express';

const router = express.Router();

router.post('/register', authValidator, userRegister);
router.post('/login', authValidator, userLogin);

export default router;