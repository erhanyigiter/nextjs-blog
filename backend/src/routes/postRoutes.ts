import { Router } from 'express';
import { 
  getPosts, 
  getPostBySlug, 
  createPost, 
  updatePost, 
  deletePost,
  togglePostLike
} from '../controllers/postController';
import { authenticateToken, optionalAuth } from '../middleware/auth';
import { validatePost } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/', optionalAuth, getPosts);
router.get('/:slug', optionalAuth, getPostBySlug);

// Protected routes (require authentication)
router.post('/', authenticateToken, validatePost, createPost);
router.put('/:id', authenticateToken, validatePost, updatePost);
router.delete('/:id', authenticateToken, deletePost);
router.post('/:id/like', authenticateToken, togglePostLike);

export default router;
