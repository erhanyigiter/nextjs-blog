import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../index';
import { generateToken } from '../middleware/auth';
import { AuthenticatedRequest, ApiResponse, LoginRequest, RegisterRequest, AuthResponse } from '../types';

// Register new user
export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password, firstName, lastName }: RegisterRequest = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.email === email 
          ? 'Email already registered' 
          : 'Username already taken'
      } as ApiResponse);
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'USER'
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // Generate JWT token
    const token = generateToken(user.id);

    const response: AuthResponse = {
      user,
      token
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: response
    } as ApiResponse<AuthResponse>);

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequest = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      } as ApiResponse);
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      } as ApiResponse);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      } as ApiResponse);
    }

    // Generate JWT token
    const token = generateToken(user.id);

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    const response: AuthResponse = {
      user: userWithoutPassword,
      token
    };

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: response
    } as ApiResponse<AuthResponse>);

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Get current user profile
export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      } as ApiResponse);
    }

    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: req.user
    } as ApiResponse);

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Update user profile
export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      } as ApiResponse);
    }

    const { firstName, lastName, avatar } = req.body;
    const userId = req.user.id;

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        avatar
      },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser
    } as ApiResponse);

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Change password
export const changePassword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      } as ApiResponse);
    }

    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      } as ApiResponse);
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      } as ApiResponse);
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    });

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    } as ApiResponse);

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Logout (client-side token removal)
export const logout = async (req: Request, res: Response) => {
  try {
    // In JWT, logout is handled client-side by removing the token
    // Server-side logout would require token blacklisting (Redis)
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    } as ApiResponse);

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Refresh token (optional - for extending session)
export const refreshToken = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      } as ApiResponse);
    }

    // Generate new token
    const newToken = generateToken(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: { token: newToken }
    } as ApiResponse);

  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};
