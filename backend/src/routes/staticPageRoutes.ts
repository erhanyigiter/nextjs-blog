import { Router } from 'express';
import { 
  getStaticPages, 
  getStaticPageBySlug, 
  createStaticPage, 
  updateStaticPage, 
  deleteStaticPage,
  getStaticPageById,
  getAllStaticPages
} from '../controllers/staticPageController';
import { authenticateToken, requireModerator } from '../middleware/auth';
import { validateStaticPage } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/', getStaticPages);
router.get('/:slug', getStaticPageBySlug);

// Protected routes (require authentication and moderator/admin role)
router.get('/admin/all', authenticateToken, requireModerator, getAllStaticPages);
router.get('/admin/:id', authenticateToken, requireModerator, getStaticPageById);
router.post('/', authenticateToken, requireModerator, validateStaticPage, createStaticPage);
router.put('/:id', authenticateToken, requireModerator, validateStaticPage, updateStaticPage);
router.delete('/:id', authenticateToken, requireModerator, deleteStaticPage);

export default router;
