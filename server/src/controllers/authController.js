import { register } from "../services/authServices.js";
import asyncHandler from "express-async-handler";


const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const registerController = asyncHandler(async(req, res) =>{
    const { email, password } = req.body;
    console.log(req.body)
    const {user, refreshToken, accessToken} = await register({ email, password });
    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
    res.status(201).json({ user, accessToken });
})