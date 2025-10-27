import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Validation error handler
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Register validation rules
export const validateRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('username')
    .isLength({ min: 3, max: 20 })
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username must be 3-20 characters, alphanumeric and underscores only'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('firstName')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be 1-50 characters'),
  body('lastName')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be 1-50 characters'),
  handleValidationErrors
];

// Login validation rules
export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Post validation rules
export const validatePost = [
  body('title')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be 1-200 characters'),
  body('content')
    .isLength({ min: 1 })
    .withMessage('Content is required'),
  body('categoryId')
    .isUUID()
    .withMessage('Valid category ID is required'),
  body('slug')
    .optional()
    .isLength({ min: 1, max: 100 })
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug must be lowercase, alphanumeric and hyphens only'),
  body('excerpt')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Excerpt must be max 500 characters'),
  body('status')
    .optional()
    .isIn(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
    .withMessage('Status must be DRAFT, PUBLISHED, or ARCHIVED'),
  handleValidationErrors
];

// Category validation rules
export const validateCategory = [
  body('name')
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be 1-100 characters'),
  body('slug')
    .optional()
    .isLength({ min: 1, max: 100 })
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug must be lowercase, alphanumeric and hyphens only'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description must be max 500 characters'),
  body('color')
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage('Color must be a valid hex color'),
  handleValidationErrors
];

// Tag validation rules
export const validateTag = [
  body('name')
    .isLength({ min: 1, max: 50 })
    .withMessage('Name must be 1-50 characters'),
  body('slug')
    .optional()
    .isLength({ min: 1, max: 50 })
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug must be lowercase, alphanumeric and hyphens only'),
  body('color')
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage('Color must be a valid hex color'),
  handleValidationErrors
];

// Comment validation rules
export const validateComment = [
  body('content')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Content must be 1-1000 characters'),
  body('authorName')
    .isLength({ min: 1, max: 100 })
    .withMessage('Author name must be 1-100 characters'),
  body('authorEmail')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('authorWebsite')
    .optional()
    .isURL()
    .withMessage('Author website must be a valid URL'),
  body('postId')
    .isUUID()
    .withMessage('Valid post ID is required'),
  body('parentId')
    .optional()
    .isUUID()
    .withMessage('Parent ID must be a valid UUID'),
  handleValidationErrors
];

// Static page validation rules
export const validateStaticPage = [
  body('title')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be 1-200 characters'),
  body('content')
    .isLength({ min: 1 })
    .withMessage('Content is required'),
  body('slug')
    .optional()
    .isLength({ min: 1, max: 100 })
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug must be lowercase, alphanumeric and hyphens only'),
  body('excerpt')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Excerpt must be max 500 characters'),
  body('metaTitle')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Meta title must be max 200 characters'),
  body('metaDescription')
    .optional()
    .isLength({ max: 300 })
    .withMessage('Meta description must be max 300 characters'),
  body('status')
    .optional()
    .isIn(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
    .withMessage('Status must be DRAFT, PUBLISHED, or ARCHIVED'),
  handleValidationErrors
];
