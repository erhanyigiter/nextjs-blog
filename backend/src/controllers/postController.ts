import { Request, Response } from 'express';
import { prisma } from '../index';
import { AuthenticatedRequest, ApiResponse, CreatePostRequest, UpdatePostRequest, PostQuery } from '../types';
import { generateSlug } from '../utils/slug';

// Get all posts with translations
export const getPosts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      page = '1',
      limit = '10',
      sort = 'createdAt',
      order = 'desc',
      category,
      tag,
      status,
      search,
      author,
      language = 'tr'
    }: PostQuery = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};
    
    if (status) {
      where.status = status;
    }
    
    if (author) {
      where.authorId = author;
    }

    if (category) {
      where.categoryId = category;
    }

    // Get posts with translations
    const posts = await prisma.post.findMany({
      where,
      skip,
      take: limitNum,
      orderBy: { [sort]: order },
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
        category: {
          include: {
            translations: {
              where: { language: { code: language.toUpperCase() } }
            }
          }
        },
        tags: {
          include: {
            tag: {
              include: {
                translations: {
                  where: { language: { code: language.toUpperCase() } }
                }
              }
            }
          }
        },
        translations: {
          where: { language: { code: language.toUpperCase() } }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    });

    // Get total count
    const total = await prisma.post.count({ where });

    // Format response
    const formattedPosts = posts.map(post => ({
      id: post.id,
      slug: post.slug,
      featuredImage: post.featuredImage,
      status: post.status,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      viewCount: post.viewCount,
      likeCount: post.likeCount,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author,
      category: {
        id: post.category.id,
        slug: post.category.slug,
        color: post.category.color,
        icon: post.category.icon,
        name: post.category.translations[0]?.name || 'Untitled',
        description: post.category.translations[0]?.description
      },
      tags: post.tags.map(pt => ({
        id: pt.tag.id,
        slug: pt.tag.slug,
        color: pt.tag.color,
        name: pt.tag.translations[0]?.name || 'Untitled'
      })),
      title: post.translations[0]?.title || 'Untitled',
      content: post.translations[0]?.content || '',
      excerpt: post.translations[0]?.excerpt,
      commentCount: post._count.comments
    }));

    res.status(200).json({
      success: true,
      message: 'Posts retrieved successfully',
      data: formattedPosts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    } as ApiResponse);

  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Get single post by slug
export const getPostBySlug = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { slug } = req.params;
    const { language = 'tr' } = req.query;

    const post = await prisma.post.findUnique({
      where: { slug },
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
        category: {
          include: {
            translations: {
              where: { language: { code: language.toUpperCase() } }
            }
          }
        },
        tags: {
          include: {
            tag: {
              include: {
                translations: {
                  where: { language: { code: language.toUpperCase() } }
                }
              }
            }
          }
        },
        translations: {
          where: { language: { code: language.toUpperCase() } }
        },
        comments: {
          where: { isApproved: true },
          include: {
            replies: {
              where: { isApproved: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      } as ApiResponse);
    }

    // Increment view count
    await prisma.post.update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } }
    });

    const formattedPost = {
      id: post.id,
      slug: post.slug,
      featuredImage: post.featuredImage,
      status: post.status,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      viewCount: post.viewCount + 1,
      likeCount: post.likeCount,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author,
      category: {
        id: post.category.id,
        slug: post.category.slug,
        color: post.category.color,
        icon: post.category.icon,
        name: post.category.translations[0]?.name || 'Untitled',
        description: post.category.translations[0]?.description
      },
      tags: post.tags.map(pt => ({
        id: pt.tag.id,
        slug: pt.tag.slug,
        color: pt.tag.color,
        name: pt.tag.translations[0]?.name || 'Untitled'
      })),
      title: post.translations[0]?.title || 'Untitled',
      content: post.translations[0]?.content || '',
      excerpt: post.translations[0]?.excerpt,
      comments: post.comments.map(comment => ({
        id: comment.id,
        content: comment.content,
        authorName: comment.authorName,
        authorEmail: comment.authorEmail,
        authorWebsite: comment.authorWebsite,
        createdAt: comment.createdAt,
        replies: comment.replies.map(reply => ({
          id: reply.id,
          content: reply.content,
          authorName: reply.authorName,
          authorEmail: reply.authorEmail,
          authorWebsite: reply.authorWebsite,
          createdAt: reply.createdAt
        }))
      }))
    };

    res.status(200).json({
      success: true,
      message: 'Post retrieved successfully',
      data: formattedPost
    } as ApiResponse);

  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Create new post
export const createPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      } as ApiResponse);
    }

    const {
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      categoryId,
      tagIds = [],
      status = 'DRAFT',
      languageId
    }: CreatePostRequest = req.body;

    // Generate slug if not provided
    const postSlug = slug || generateSlug(title);

    // Check if slug exists
    const existingPost = await prisma.post.findUnique({
      where: { slug: postSlug }
    });

    if (existingPost) {
      return res.status(400).json({
        success: false,
        message: 'Slug already exists'
      } as ApiResponse);
    }

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category not found'
      } as ApiResponse);
    }

    // Create post
    const post = await prisma.post.create({
      data: {
        slug: postSlug,
        featuredImage,
        status: status as any,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        authorId: req.user.id,
        categoryId,
        translations: {
          create: {
            languageId,
            title,
            content,
            excerpt
          }
        }
      },
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
        category: true,
        translations: true
      }
    });

    // Add tags if provided
    if (tagIds.length > 0) {
      await prisma.postTag.createMany({
        data: tagIds.map(tagId => ({
          postId: post.id,
          tagId
        }))
      });
    }

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post
    } as ApiResponse);

  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Update post
export const updatePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      } as ApiResponse);
    }

    const { id } = req.params;
    const updateData: UpdatePostRequest = req.body;

    // Check if post exists and user has permission
    const existingPost = await prisma.post.findUnique({
      where: { id },
      include: { author: true }
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      } as ApiResponse);
    }

    // Check if user is author or admin
    if (existingPost.authorId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Permission denied'
      } as ApiResponse);
    }

    // Update post
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        slug: updateData.slug,
        featuredImage: updateData.featuredImage,
        status: updateData.status as any,
        publishedAt: updateData.status === 'PUBLISHED' ? new Date() : existingPost.publishedAt
      },
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
        category: true,
        translations: true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost
    } as ApiResponse);

  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Delete post
export const deletePost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      } as ApiResponse);
    }

    const { id } = req.params;

    // Check if post exists and user has permission
    const existingPost = await prisma.post.findUnique({
      where: { id },
      include: { author: true }
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      } as ApiResponse);
    }

    // Check if user is author or admin
    if (existingPost.authorId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Permission denied'
      } as ApiResponse);
    }

    // Delete post (cascade will handle related records)
    await prisma.post.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully'
    } as ApiResponse);

  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Like/Unlike post
export const togglePostLike = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      } as ApiResponse);
    }

    const { id } = req.params;

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      } as ApiResponse);
    }

    // For now, just increment like count
    // In a real app, you'd want to track individual likes
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { likeCount: { increment: 1 } }
    });

    res.status(200).json({
      success: true,
      message: 'Post liked successfully',
      data: { likeCount: updatedPost.likeCount }
    } as ApiResponse);

  } catch (error) {
    console.error('Toggle post like error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};
