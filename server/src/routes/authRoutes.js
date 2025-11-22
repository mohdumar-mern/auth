import express from 'express';
const router = express.Router();

import { loginController, logoutController, refreshController, registerController } from '../controllers/authController.js';

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/refresh', refreshController)
router.post('/logout', logoutController)

export default router;