// ============================================
// auth.service.js - Authentication Service
// ============================================
// Business logic for registration, login,
// Google OAuth, and user profile retrieval.
// ============================================

import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import { verifyGoogleToken } from '../config/google.config.js';
import { generateToken } from '../utils/jwt.utils.js';

export const register = async (name, email, password) => {
  const existing = await User.findOne({ email });
  if (existing) {
    // If the user exists and already has a password, block duplicate registration
    if (existing.password) {
      const error = new Error('Email already registered.');
      error.statusCode = 409;
      throw error;
    }

    // If the user exists via Google (no password), allow them to set a password to complete registration
    const hashedPassword = await bcrypt.hash(password, 10);
    existing.name = name || existing.name;
    existing.password = hashedPassword;
    existing.lastLogin = new Date();
    await existing.save();
    const token = generateToken(existing);

    return {
      token,
      user: { id: existing._id, email: existing.email, name: existing.name, picture: existing.picture },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10); // bcrypt password hashing (Express.js: Authentication)
  const user = await User.create({ name, email, password: hashedPassword });
  const token = generateToken(user); // JWT token generation (Express.js: Authentication)

  return {
    token,
    user: { id: user._id, email: user.email, name: user.name, picture: user.picture },
  };
};

export const emailLogin = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !user.password) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password); // bcrypt password comparison (Express.js: Authentication)
  if (!isMatch) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  user.lastLogin = new Date();
  await user.save();
  const token = generateToken(user);

  return {
    token,
    user: { id: user._id, email: user.email, name: user.name, picture: user.picture },
  };
};

export const googleLogin = async (credential) => {
  const googleUser = await verifyGoogleToken(credential);

  let user = await User.findOneAndUpdate( // Mongoose findOneAndUpdate with upsert (MongoDB: Update Operations)
    { googleId: googleUser.googleId },
    {
      googleId: googleUser.googleId,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
      lastLogin: new Date(),
    },
    {
      returnDocument: 'after',
      upsert: true,
    }
  );

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    },
  };
};

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-__v -googleId');

  if (!user) {
    throw new Error('User not found');
  }

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    picture: user.picture,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin,
  };
};
