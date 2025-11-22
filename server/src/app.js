import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import e from 'express';

export const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>{
    res.send("Hello World!");
})

app.use("/api/v1/auth", authRoutes)