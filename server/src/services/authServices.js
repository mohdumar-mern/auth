import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateHashToken, generateRefreshToken } from '../utils/tokenUtils.js';


const register = async ({ email, password }) => {

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
    const user = await User.create({ email, password: hashedPassword }); // Save the user to the database
    const accessToken = generateAccessToken(user._id); // Generate an access token for the user
    const refreshToken = generateRefreshToken(user._id); // Generate a refresh token for the user
    user.refreshTokenHash = generateHashToken(refreshToken); // Store the hashed refresh token in the database
    await user.save();
    return { accessToken, refreshToken, accessToken };

}

const login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid credentials");
    }
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    user.refreshTokenHash = generateHashToken(refreshToken);
    await user.save();
    return { user, refreshToken, accessToken };

}

const refresh = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error("No user found.")
        }
        // check hash match
        const incomingHash = generateHashToken(refreshToken)
        if (incomingHash !== user.refreshTokenHash) {
            // token reuse or tampering — revoke
            user.refreshTokenHash = null;
            await user.save();
            throw new Error('Invalid refresh token');
        }
        // rotation: create new refresh token (invalidate previous)
        const newAccessToken = generateAccessToken({ id: user._id });
        const newRefreshToken = generateRefreshToken({ id: user._id });
        user.refreshTokenHash = generateHashToken(newRefreshToken);
        await user.save();
        return { accessToken: newAccessToken, refreshToken: newRefreshToken, user };

    } catch (error) {
        throw error
    }

   
}
 const revoke = async (userId) => {
        const user = await User.findById(userId)
        if (!user) return;
        user.refreshTokenHash = null;
        await user.save();

    }

export { register, login, refresh, revoke };