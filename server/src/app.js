import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import protectRoutes from './middleware/authMiddleware.js';

export const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>{
    res.send("Hello World!");
})
app.get('/api/v1/profile', protectRoutes, (req, res) => {
  res.json({ user: req.user });
});

app.use("/api/v1/auth", authRoutes)