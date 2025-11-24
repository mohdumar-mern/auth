import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import limiter from './middleware/rateLimiter.js';
import protectRoutes from './middleware/authMiddleware.js';
import { corsOptions } from './utils/corsOptions.js';

export const app = express()
app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(limiter)

app.get("/", (req, res) =>{
    res.send("Hello World!");
})
app.get('/api/v1/profile', protectRoutes, (req, res) => {
  res.json({ user: req.user });
});

app.use("/api/v1/auth", authRoutes)