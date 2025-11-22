import express from 'express';
const router = express.Router();

import { registerController } from '../controllers/authController.js';

router.post('/register', registerController);

export default router;