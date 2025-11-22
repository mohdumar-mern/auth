import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'
const protectRoutes = async (req, res, next) => {
  try {
    const header = req.headers['authorization'];
    if (!header) return res.status(401).json({ message: 'No auth header' });

    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(payload.userId).select('-refreshTokenHash');
    if (!user) return res.status(401).json({ message: 'No user' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default protectRoutes