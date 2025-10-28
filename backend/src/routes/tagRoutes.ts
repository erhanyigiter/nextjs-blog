import { Router } from 'express';
import { 
  getTags, 
  getTagBySlug, 
  createTag, 
  updateTag, 
  deleteTag,
  getPopularTags
} from '../controllers/tagController';
import { authenticateToken, requireModerator } from '../middleware/auth';
import { validateTag } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/', getTags);
router.get('/popular', getPopularTags);
router.get('/:slug', getTagBySlug);

// Protected routes (require authentication and moderator/admin role)
router.post('/', authenticateToken, requireModerator, validateTag, createTag);
router.put('/:id', authenticateToken, requireModerator, validateTag, updateTag);
router.delete('/:id', authenticateToken, requireModerator, deleteTag);

export default router;
