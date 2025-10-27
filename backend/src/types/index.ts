import { Request } from 'express';
import { User } from '@prisma/client';

// Extend Express Request interface
export interface AuthenticatedRequest extends Request {
  user?: User;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

// Post types
export interface CreatePostRequest {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  categoryId: string;
  tagIds?: string[];
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: string;
}

// Category types
export interface CreateCategoryRequest {
  name: string;
  slug?: string;
  description?: string;
  color?: string;
  icon?: string;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  id: string;
}

// Tag types
export interface CreateTagRequest {
  name: string;
  slug?: string;
  color?: string;
}

export interface UpdateTagRequest extends Partial<CreateTagRequest> {
  id: string;
}

// Comment types
export interface CreateCommentRequest {
  content: string;
  authorName: string;
  authorEmail: string;
  authorWebsite?: string;
  postId: string;
  parentId?: string;
}

export interface UpdateCommentRequest {
  id: string;
  content?: string;
  isApproved?: boolean;
}

// Media types
export interface UploadMediaRequest {
  file: Express.Multer.File;
  alt?: string;
}

// Settings types
export interface CreateSettingRequest {
  key: string;
  value: string;
  type: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON';
  description?: string;
}

export interface UpdateSettingRequest {
  id: string;
  value?: string;
  description?: string;
}

// Query types
export interface PaginationQuery {
  page?: string;
  limit?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PostQuery extends PaginationQuery {
  category?: string;
  tag?: string;
  status?: string;
  search?: string;
  author?: string;
}

export interface CommentQuery extends PaginationQuery {
  postId?: string;
  approved?: string;
}
