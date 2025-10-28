import { Request, Response } from 'express';
import { prisma } from '../index';
import { AuthenticatedRequest, ApiResponse, CreateTagRequest, UpdateTagRequest } from '../types';
import { generateSlug } from '../utils/slug';

// Get all tags with translations
export const getTags = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { language = 'tr' } = req.query;

    const tags = await prisma.tag.findMany({
      include: {
        translations: {
          where: { language: { code: language.toString().toUpperCase() } }
        },
        posts: {
          include: {
            post: {
              where: { status: 'PUBLISHED' }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedTags = tags.map(tag => ({
      id: tag.id,
      slug: tag.slug,
      color: tag.color,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
      name: tag.translations[0]?.name || 'Untitled',
      postCount: tag.posts.length
    }));

    res.status(200).json({
      success: true,
      message: 'Tags retrieved successfully',
      data: formattedTags
    } as ApiResponse);

  } catch (error) {
    console.error('Get tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Get single tag by slug
export const getTagBySlug = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { slug } = req.params;
    const { language = 'tr' } = req.query;

    const tag = await prisma.tag.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { language: { code: language.toString().toUpperCase() } }
        },
        posts: {
          include: {
            post: {
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
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!tag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      } as ApiResponse);
    }

    const formattedTag = {
      id: tag.id,
      slug: tag.slug,
      color: tag.color,
      createdAt: tag.createdAt,
      updatedAt: tag.updatedAt,
      name: tag.translations[0]?.name || 'Untitled',
      postCount: tag.posts.length,
      recentPosts: tag.posts.map(pt => ({
        id: pt.post.id,
        slug: pt.post.slug,
        featuredImage: pt.post.featuredImage,
        publishedAt: pt.post.publishedAt,
        viewCount: pt.post.viewCount,
        likeCount: pt.post.likeCount,
        author: pt.post.author,
        title: pt.post.translations[0]?.title || 'Untitled',
        excerpt: pt.post.translations[0]?.excerpt,
        commentCount: pt.post._count.comments
      }))
    };

    res.status(200).json({
      success: true,
      message: 'Tag retrieved successfully',
      data: formattedTag
    } as ApiResponse);

  } catch (error) {
    console.error('Get tag error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Create new tag
export const createTag = async (req: AuthenticatedRequest, res: Response) => {
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
      color,
      languageId
    }: CreateTagRequest = req.body;

    // Generate slug if not provided
    const tagSlug = slug || generateSlug(name);

    // Check if slug exists
    const existingTag = await prisma.tag.findUnique({
      where: { slug: tagSlug }
    });

    if (existingTag) {
      return res.status(400).json({
        success: false,
        message: 'Slug already exists'
      } as ApiResponse);
    }

    // Create tag
    const tag = await prisma.tag.create({
      data: {
        slug: tagSlug,
        color,
        translations: {
          create: {
            languageId,
            name
          }
        }
      },
      include: {
        translations: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Tag created successfully',
      data: tag
    } as ApiResponse);

  } catch (error) {
    console.error('Create tag error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Update tag
export const updateTag = async (req: AuthenticatedRequest, res: Response) => {
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
    const updateData: UpdateTagRequest = req.body;

    // Check if tag exists
    const existingTag = await prisma.tag.findUnique({
      where: { id }
    });

    if (!existingTag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      } as ApiResponse);
    }

    // Update tag
    const updatedTag = await prisma.tag.update({
      where: { id },
      data: {
        slug: updateData.slug,
        color: updateData.color
      },
      include: {
        translations: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Tag updated successfully',
      data: updatedTag
    } as ApiResponse);

  } catch (error) {
    console.error('Update tag error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Delete tag
export const deleteTag = async (req: AuthenticatedRequest, res: Response) => {
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

    // Check if tag exists
    const existingTag = await prisma.tag.findUnique({
      where: { id },
      include: {
        posts: true
      }
    });

    if (!existingTag) {
      return res.status(404).json({
        success: false,
        message: 'Tag not found'
      } as ApiResponse);
    }

    // Check if tag has posts
    if (existingTag.posts.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete tag with posts. Please remove tag from posts first.'
      } as ApiResponse);
    }

    // Delete tag (cascade will handle related records)
    await prisma.tag.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Tag deleted successfully'
    } as ApiResponse);

  } catch (error) {
    console.error('Delete tag error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Get popular tags
export const getPopularTags = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { language = 'tr', limit = '10' } = req.query;
    const limitNum = parseInt(limit.toString());

    const tags = await prisma.tag.findMany({
      include: {
        translations: {
          where: { language: { code: language.toString().toUpperCase() } }
        },
        posts: {
          include: {
            post: {
              where: { status: 'PUBLISHED' }
            }
          }
        }
      },
      orderBy: {
        posts: {
          _count: 'desc'
        }
      },
      take: limitNum
    });

    const formattedTags = tags.map(tag => ({
      id: tag.id,
      slug: tag.slug,
      color: tag.color,
      name: tag.translations[0]?.name || 'Untitled',
      postCount: tag.posts.length
    }));

    res.status(200).json({
      success: true,
      message: 'Popular tags retrieved successfully',
      data: formattedTags
    } as ApiResponse);

  } catch (error) {
    console.error('Get popular tags error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};
