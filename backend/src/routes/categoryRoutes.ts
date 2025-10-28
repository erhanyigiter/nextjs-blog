import { Router } from 'express';
import { 
  getCategories, 
  getCategoryBySlug, 
  createCategory, 
  updateCategory, 
  deleteCategory
} from '../controllers/categoryController';
import { authenticateToken, requireModerator } from '../middleware/auth';
import { validateCategory } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/', getCategories);
router.get('/:slug', getCategoryBySlug);

// Protected routes (require authentication and moderator/admin role)
router.post('/', authenticateToken, requireModerator, validateCategory, createCategory);
router.put('/:id', authenticateToken, requireModerator, validateCategory, updateCategory);
router.delete('/:id', authenticateToken, requireModerator, deleteCategory);

export default router;
