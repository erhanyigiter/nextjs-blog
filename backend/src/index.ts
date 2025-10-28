import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'NextJS Blog API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to NextJS Blog API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      posts: '/api/posts',
      categories: '/api/categories',
      tags: '/api/tags',
      comments: '/api/comments',
      media: '/api/media',
      settings: '/api/settings',
      languages: '/api/languages'
    }
  });
});

// Auth routes (simplified)
app.post('/api/auth/register', (req, res) => {
  res.json({
    success: true,
    message: 'Register endpoint ready',
    data: { message: 'Auth system will be implemented' }
  });
});

app.post('/api/auth/login', (req, res) => {
  res.json({
    success: true,
    message: 'Login endpoint ready',
    data: { message: 'Auth system will be implemented' }
  });
});

// Post routes (simplified)
app.get('/api/posts', (req, res) => {
  res.json({
    success: true,
    message: 'Posts endpoint ready',
    data: { message: 'Post management system will be implemented' }
  });
});

app.get('/api/posts/:slug', (req, res) => {
  res.json({
    success: true,
    message: 'Post detail endpoint ready',
    data: { message: 'Post detail system will be implemented', slug: req.params.slug }
  });
});

app.post('/api/posts', (req, res) => {
  res.json({
    success: true,
    message: 'Create post endpoint ready',
    data: { message: 'Post creation system will be implemented' }
  });
});

// Category routes (simplified)
app.get('/api/categories', (req, res) => {
  res.json({
    success: true,
    message: 'Categories endpoint ready',
    data: { message: 'Category management system will be implemented' }
  });
});

app.get('/api/categories/:slug', (req, res) => {
  res.json({
    success: true,
    message: 'Category detail endpoint ready',
    data: { message: 'Category detail system will be implemented', slug: req.params.slug }
  });
});

app.post('/api/categories', (req, res) => {
  res.json({
    success: true,
    message: 'Create category endpoint ready',
    data: { message: 'Category creation system will be implemented' }
  });
});

// Tag routes (simplified)
app.get('/api/tags', (req, res) => {
  res.json({
    success: true,
    message: 'Tags endpoint ready',
    data: { message: 'Tag management system will be implemented' }
  });
});

app.get('/api/tags/popular', (req, res) => {
  res.json({
    success: true,
    message: 'Popular tags endpoint ready',
    data: { message: 'Popular tags system will be implemented' }
  });
});

app.get('/api/tags/:slug', (req, res) => {
  res.json({
    success: true,
    message: 'Tag detail endpoint ready',
    data: { message: 'Tag detail system will be implemented', slug: req.params.slug }
  });
});

app.post('/api/tags', (req, res) => {
  res.json({
    success: true,
    message: 'Create tag endpoint ready',
    data: { message: 'Tag creation system will be implemented' }
  });
});

// Static Pages routes (simplified)
app.get('/api/static-pages', (req, res) => {
  res.json({
    success: true,
    message: 'Static pages endpoint ready',
    data: { message: 'Static pages management system will be implemented' }
  });
});

app.get('/api/static-pages/:slug', (req, res) => {
  res.json({
    success: true,
    message: 'Static page detail endpoint ready',
    data: { message: 'Static page detail system will be implemented', slug: req.params.slug }
  });
});

app.get('/api/static-pages/admin/all', (req, res) => {
  res.json({
    success: true,
    message: 'Admin static pages endpoint ready',
    data: { message: 'Admin static pages system will be implemented' }
  });
});

app.get('/api/static-pages/admin/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Admin static page detail endpoint ready',
    data: { message: 'Admin static page detail system will be implemented', id: req.params.id }
  });
});

app.post('/api/static-pages', (req, res) => {
  res.json({
    success: true,
    message: 'Create static page endpoint ready',
    data: { message: 'Static page creation system will be implemented' }
  });
});

app.put('/api/static-pages/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Update static page endpoint ready',
    data: { message: 'Static page update system will be implemented', id: req.params.id }
  });
});

app.delete('/api/static-pages/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Delete static page endpoint ready',
    data: { message: 'Static page deletion system will be implemented', id: req.params.id }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API docs: http://localhost:${PORT}/api`);
});

export default app;