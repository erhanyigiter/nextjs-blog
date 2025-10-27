import { Router } from 'express';
import { 
  register, 
  login, 
  getProfile, 
  updateProfile, 
  changePassword, 
  logout, 
  refreshToken 
} from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';
import { validateRegister, validateLogin } from '../middleware/validation';

const router = Router();

// Public routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Protected routes (require authentication)
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.put('/change-password', authenticateToken, changePassword);
router.post('/logout', logout);
router.post('/refresh', authenticateToken, refreshToken);

export default router;
