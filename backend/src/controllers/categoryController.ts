import { Request, Response } from 'express';
import { prisma } from '../index';
import { AuthenticatedRequest, ApiResponse, CreateCategoryRequest, UpdateCategoryRequest } from '../types';
import { generateSlug } from '../utils/slug';

// Get all categories with translations
export const getCategories = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { language = 'tr' } = req.query;

    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        translations: {
          where: { language: { code: language.toString().toUpperCase() } }
        },
        _count: {
          select: {
            posts: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedCategories = categories.map(category => ({
      id: category.id,
      slug: category.slug,
      color: category.color,
      icon: category.icon,
      isActive: category.isActive,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      name: category.translations[0]?.name || 'Untitled',
      description: category.translations[0]?.description,
      postCount: category._count.posts
    }));

    res.status(200).json({
      success: true,
      message: 'Categories retrieved successfully',
      data: formattedCategories
    } as ApiResponse);

  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Get single category by slug
export const getCategoryBySlug = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { slug } = req.params;
    const { language = 'tr' } = req.query;

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { language: { code: language.toString().toUpperCase() } }
        },
        posts: {
          where: { status: 'PUBLISHED' },
          include: {
            author: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                avatar: true
              }
            },
            translations: {
              where: { language: { code: language.toString().toUpperCase() } }
            },
            _count: {
              select: {
                comments: true
              }
            }
          },
          orderBy: { publishedAt: 'desc' },
          take: 10
        },
        _count: {
          select: {
            posts: true
          }
        }
      }
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      } as ApiResponse);
    }

    const formattedCategory = {
      id: category.id,
      slug: category.slug,
      color: category.color,
      icon: category.icon,
      isActive: category.isActive,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      name: category.translations[0]?.name || 'Untitled',
      description: category.translations[0]?.description,
      postCount: category._count.posts,
      recentPosts: category.posts.map(post => ({
        id: post.id,
        slug: post.slug,
        featuredImage: post.featuredImage,
        publishedAt: post.publishedAt,
        viewCount: post.viewCount,
        likeCount: post.likeCount,
        author: post.author,
        title: post.translations[0]?.title || 'Untitled',
        excerpt: post.translations[0]?.excerpt,
        commentCount: post._count.comments
      }))
    };

    res.status(200).json({
      success: true,
      message: 'Category retrieved successfully',
      data: formattedCategory
    } as ApiResponse);

  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Create new category
export const createCategory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      } as ApiResponse);
    }

    if (req.user.role !== 'ADMIN' && req.user.role !== 'MODERATOR') {
      return res.status(403).json({
        success: false,
        message: 'Admin or Moderator access required'
      } as ApiResponse);
    }

    const {
      name,
      slug,
      description,
      color,
      icon,
      languageId
    }: CreateCategoryRequest = req.body;

    // Generate slug if not provided
    const categorySlug = slug || generateSlug(name);

    // Check if slug exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug: categorySlug }
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Slug already exists'
      } as ApiResponse);
    }

    // Create category
    const category = await prisma.category.create({
      data: {
        slug: categorySlug,
        color,
        icon,
        translations: {
          create: {
            languageId,
            name,
            description
          }
        }
      },
      include: {
        translations: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    } as ApiResponse);

  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Update category
export const updateCategory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      } as ApiResponse);
    }

    if (req.user.role !== 'ADMIN' && req.user.role !== 'MODERATOR') {
      return res.status(403).json({
        success: false,
        message: 'Admin or Moderator access required'
      } as ApiResponse);
    }

    const { id } = req.params;
    const updateData: UpdateCategoryRequest = req.body;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id }
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      } as ApiResponse);
    }

    // Update category
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        slug: updateData.slug,
        color: updateData.color,
        icon: updateData.icon,
        isActive: updateData.isActive
      },
      include: {
        translations: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory
    } as ApiResponse);

  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Delete category
export const deleteCategory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      } as ApiResponse);
    }

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      } as ApiResponse);
    }

    const { id } = req.params;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      }
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      } as ApiResponse);
    }

    // Check if category has posts
    if (existingCategory._count.posts > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with posts. Please move or delete posts first.'
      } as ApiResponse);
    }

    // Delete category (cascade will handle related records)
    await prisma.category.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    } as ApiResponse);

  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};
