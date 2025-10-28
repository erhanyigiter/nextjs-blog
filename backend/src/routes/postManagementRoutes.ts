import { Router } from 'express';
import { 
  getPosts, 
  getPostBySlug,
  createPost, 
  updatePost, 
  deletePost,
  getPopularPosts,
  getRecentPosts,
  getPostsByAuthor
} from '../controllers/postManagementController';
import { authenticateToken, requireModerator } from '../middleware/auth';
import { validatePost } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/', getPosts);
router.get('/popular', getPopularPosts);
router.get('/recent', getRecentPosts);
router.get('/author/:username', getPostsByAuthor);
router.get('/:slug', getPostBySlug);

// Protected routes (require authentication and moderator/admin role)
router.post('/', authenticateToken, requireModerator, validatePost, createPost);
router.put('/:id', authenticateToken, requireModerator, validatePost, updatePost);
router.delete('/:id', authenticateToken, requireModerator, deletePost);

export default router;
