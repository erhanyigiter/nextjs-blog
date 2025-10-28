import { Router } from 'express';
import { 
  getLanguages, 
  getLanguageByCode, 
  getDefaultLanguage,
  createLanguage, 
  updateLanguage, 
  deleteLanguage,
  setDefaultLanguage,
  toggleLanguageStatus,
  getLanguageStats
} from '../controllers/languageController';
import { authenticateToken, requireAdmin, requireModerator } from '../middleware/auth';
import { validateLanguage } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/', getLanguages);
router.get('/default', getDefaultLanguage);
router.get('/:code', getLanguageByCode);

// Protected routes (require authentication and admin role)
router.post('/', authenticateToken, requireAdmin, validateLanguage, createLanguage);
router.put('/:id', authenticateToken, requireAdmin, validateLanguage, updateLanguage);
router.delete('/:id', authenticateToken, requireAdmin, deleteLanguage);
router.put('/:id/set-default', authenticateToken, requireAdmin, setDefaultLanguage);
router.put('/:id/toggle-status', authenticateToken, requireAdmin, toggleLanguageStatus);

// Stats route (require moderator or admin)
router.get('/admin/stats', authenticateToken, requireModerator, getLanguageStats);

export default router;
