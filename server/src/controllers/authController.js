import { login, refresh, register, revoke } from "../services/authServices.js";
import jwt from 'jsonwebtoken'
import asyncHandler from "express-async-handler";


const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const registerController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  const { user, refreshToken, accessToken } = await register({ email, password });
  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
  res.status(201).json({ user, accessToken });
})

export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, refreshToken, accessToken } = await login({ email, password });
  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
  res.status(200).json({ user, accessToken });
})

export const refreshController = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken
  if (!token) return res.status(401).json({ message: "No token found." })

  const { refreshToken, accessToken, user } = await refresh(token)
  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS); // rotate cookie
  res.status(201).json({ user, accessToken })

})

export const logoutController = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.refreshToken
    if (token) {
      try {
        const decode = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        await revoke(decode.userId)
      } catch (error) {

      }
    }
    res.clearCookie('refreshToken', { path: '/' });
    res.json({ ok: true });

  } catch (error) {

  }
})