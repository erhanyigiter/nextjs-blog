import { Router } from 'express';
import { 
  getPostComments, 
  getCommentById,
  createComment, 
  updateComment, 
  deleteComment,
  approveComment,
  rejectComment,
  getPendingComments
} from '../controllers/commentController';
import { authenticateToken, requireModerator } from '../middleware/auth';
import { validateComment } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/post/:postSlug', getPostComments);
router.get('/:id', getCommentById);

// Protected routes (require authentication)
router.post('/post/:postSlug', authenticateToken, validateComment, createComment);
router.put('/:id', authenticateToken, validateComment, updateComment);
router.delete('/:id', authenticateToken, deleteComment);

// Admin/Moderator routes
router.get('/admin/pending', authenticateToken, requireModerator, getPendingComments);
router.put('/:id/approve', authenticateToken, requireModerator, approveComment);
router.put('/:id/reject', authenticateToken, requireModerator, rejectComment);

export default router;
