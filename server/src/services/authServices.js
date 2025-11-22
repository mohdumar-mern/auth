import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { generateAccessToken, generateHashToken, generateRefreshToken } from '../utils/tokenUtils.js';


const register= async ({email, password}) => {
    
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
    const user =await User.create({email, password: hashedPassword}); // Save the user to the database
    const accessToken = generateAccessToken(user._id); // Generate an access token for the user
    const refreshToken = generateRefreshToken(user._id); // Generate a refresh token for the user
    user.refreshTokenHash = generateHashToken(refreshToken); // Store the hashed refresh token in the database
    await user.save();
    return { accessToken, refreshToken, accessToken };

}

export { register };