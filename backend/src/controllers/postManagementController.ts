import { Request, Response } from 'express';
import { prisma } from '../index';
import { AuthenticatedRequest, ApiResponse, CreatePostRequest, UpdatePostRequest } from '../types';
import { generateSlug } from '../utils/slug';

// Get all posts with pagination and filters
export const getPosts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { 
      language = 'tr', 
      page = '1', 
      limit = '10',
      category,
      tag,
      status = 'PUBLISHED',
      search,
      sortBy = 'publishedAt',
      sortOrder = 'desc'
    } = req.query;

    const pageNum = parseInt(page.toString());
    const limitNum = parseInt(limit.toString());
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const whereClause: any = {};
    
    if (status !== 'ALL') {
      whereClause.status = status;
    }

    if (category) {
      whereClause.category = {
        slug: category.toString()
      };
    }

    if (tag) {
      whereClause.tags = {
        some: {
          tag: {
            slug: tag.toString()
          }
        }
      };
    }

    if (search) {
      whereClause.translations = {
        some: {
          title: {
            contains: search.toString(),
            mode: 'insensitive'
          }
        }
      };
    }

    // Get posts with pagination
    const posts = await prisma.post.findMany({
      where: whereClause,
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
              where: { language: { code: language.toString().toUpperCase() } }
            }
          }
        },
        tags: {
          include: {
            tag: {
              include: {
                translations: {
                  where: { language: { code: language.toString().toUpperCase() } }
                }
              }
            }
          }
        },
        translations: {
          where: { language: { code: language.toString().toUpperCase() } }
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      },
      orderBy: { [sortBy.toString()]: sortOrder.toString() as any },
      skip,
      take: limitNum
    });

    // Get total count
    const totalPosts = await prisma.post.count({
      where: whereClause
    });

    const formattedPosts = posts.map(post => ({
      id: post.id,
      slug: post.slug,
      featuredImage: post.featuredImage,
      status: post.status,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      viewCount: post.viewCount,
      likeCount: post.likeCount,
      author: post.author,
      category: post.category ? {
        id: post.category.id,
        slug: post.category.slug,
        name: post.category.translations[0]?.name || 'Untitled',
        color: post.category.color,
        icon: post.category.icon
      } : null,
      tags: post.tags.map(pt => ({
        id: pt.tag.id,
        slug: pt.tag.slug,
        name: pt.tag.translations[0]?.name || 'Untitled',
        color: pt.tag.color
      })),
      title: post.translations[0]?.title || 'Untitled',
      excerpt: post.translations[0]?.excerpt,
      metaTitle: post.translations[0]?.metaTitle,
      metaDescription: post.translations[0]?.metaDescription,
      commentCount: post._count.comments,
      likeCount: post._count.likes
    }));

    res.status(200).json({
      success: true,
      message: 'Posts retrieved successfully',
      data: {
        posts: formattedPosts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: totalPosts,
          pages: Math.ceil(totalPosts / limitNum)
        }
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
            avatar: true,
            bio: true
          }
        },
        category: {
          include: {
            translations: {
              where: { language: { code: language.toString().toUpperCase() } }
            }
          }
        },
        tags: {
          include: {
            tag: {
              include: {
                translations: {
                  where: { language: { code: language.toString().toUpperCase() } }
                }
              }
            }
          }
        },
        translations: {
          where: { language: { code: language.toString().toUpperCase() } }
        },
        comments: {
          where: { status: 'APPROVED', parentId: null },
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
            replies: {
              where: { status: 'APPROVED' },
              include: {
                author: {
                  select: {
                    id: true,
                    username: true,
                    firstName: true,
                    lastName: true,
                    avatar: true
                  }
                }
              },
              orderBy: { createdAt: 'asc' }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
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
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      viewCount: post.viewCount + 1, // Include the increment
      likeCount: post.likeCount,
      author: post.author,
      category: post.category ? {
        id: post.category.id,
        slug: post.category.slug,
        name: post.category.translations[0]?.name || 'Untitled',
        color: post.category.color,
        icon: post.category.icon
      } : null,
      tags: post.tags.map(pt => ({
        id: pt.tag.id,
        slug: pt.tag.slug,
        name: pt.tag.translations[0]?.name || 'Untitled',
        color: pt.tag.color
      })),
      title: post.translations[0]?.title || 'Untitled',
      content: post.translations[0]?.content || '',
      excerpt: post.translations[0]?.excerpt,
      metaTitle: post.translations[0]?.metaTitle,
      metaDescription: post.translations[0]?.metaDescription,
      comments: post.comments,
      commentCount: post._count.comments,
      likeCount: post._count.likes
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

    if (req.user.role !== 'ADMIN' && req.user.role !== 'MODERATOR') {
      return res.status(403).json({
        success: false,
        message: 'Admin or Moderator access required'
      } as ApiResponse);
    }

    const {
      slug,
      title,
      content,
      excerpt,
      metaTitle,
      metaDescription,
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

    // Check if category exists
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId }
      });

      if (!category) {
        return res.status(400).json({
          success: false,
          message: 'Category not found'
        } as ApiResponse);
      }
    }

    // Check if tags exist
    if (tagIds.length > 0) {
      const tags = await prisma.tag.findMany({
        where: { id: { in: tagIds } }
      });

      if (tags.length !== tagIds.length) {
        return res.status(400).json({
          success: false,
          message: 'One or more tags not found'
        } as ApiResponse);
      }
    }

    // Create post
    const post = await prisma.post.create({
      data: {
        slug: postSlug,
        featuredImage,
        status: status as any,
        authorId: req.user.id,
        categoryId: categoryId || null,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        translations: {
          create: {
            languageId,
            title,
            content,
            excerpt,
            metaTitle,
            metaDescription
          }
        },
        tags: {
          create: tagIds.map(tagId => ({
            tagId
          }))
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
        category: {
          include: {
            translations: true
          }
        },
        tags: {
          include: {
            tag: {
              include: {
                translations: true
              }
            }
          }
        },
        translations: true
      }
    });

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

    if (req.user.role !== 'ADMIN' && req.user.role !== 'MODERATOR') {
      return res.status(403).json({
        success: false,
        message: 'Admin or Moderator access required'
      } as ApiResponse);
    }

    const { id } = req.params;
    const updateData: UpdatePostRequest = req.body;

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id }
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      } as ApiResponse);
    }

    // Update post
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        slug: updateData.slug,
        featuredImage: updateData.featuredImage,
        status: updateData.status,
        categoryId: updateData.categoryId,
        publishedAt: updateData.status === 'PUBLISHED' && existingPost.status !== 'PUBLISHED' 
          ? new Date() 
          : existingPost.publishedAt
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
        category: {
          include: {
            translations: true
          }
        },
        tags: {
          include: {
            tag: {
              include: {
                translations: true
              }
            }
          }
        },
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

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      } as ApiResponse);
    }

    const { id } = req.params;

    // Check if post exists
    const existingPost = await prisma.post.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            comments: true
          }
        }
      }
    });

    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      } as ApiResponse);
    }

    // Check if post has comments
    if (existingPost._count.comments > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete post with comments. Please delete comments first.'
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

// Get popular posts
export const getPopularPosts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { language = 'tr', limit = '5' } = req.query;
    const limitNum = parseInt(limit.toString());

    const posts = await prisma.post.findMany({
      where: { 
        status: 'PUBLISHED',
        publishedAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
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
        translations: {
          where: { language: { code: language.toString().toUpperCase() } }
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      },
      orderBy: [
        { viewCount: 'desc' },
        { likeCount: 'desc' }
      ],
      take: limitNum
    });

    const formattedPosts = posts.map(post => ({
      id: post.id,
      slug: post.slug,
      featuredImage: post.featuredImage,
      publishedAt: post.publishedAt,
      viewCount: post.viewCount,
      likeCount: post.likeCount,
      author: post.author,
      title: post.translations[0]?.title || 'Untitled',
      excerpt: post.translations[0]?.excerpt,
      commentCount: post._count.comments,
      likeCount: post._count.likes
    }));

    res.status(200).json({
      success: true,
      message: 'Popular posts retrieved successfully',
      data: formattedPosts
    } as ApiResponse);

  } catch (error) {
    console.error('Get popular posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Get recent posts
export const getRecentPosts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { language = 'tr', limit = '5' } = req.query;
    const limitNum = parseInt(limit.toString());

    const posts = await prisma.post.findMany({
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
            comments: true,
            likes: true
          }
        }
      },
      orderBy: { publishedAt: 'desc' },
      take: limitNum
    });

    const formattedPosts = posts.map(post => ({
      id: post.id,
      slug: post.slug,
      featuredImage: post.featuredImage,
      publishedAt: post.publishedAt,
      viewCount: post.viewCount,
      likeCount: post.likeCount,
      author: post.author,
      title: post.translations[0]?.title || 'Untitled',
      excerpt: post.translations[0]?.excerpt,
      commentCount: post._count.comments,
      likeCount: post._count.likes
    }));

    res.status(200).json({
      success: true,
      message: 'Recent posts retrieved successfully',
      data: formattedPosts
    } as ApiResponse);

  } catch (error) {
    console.error('Get recent posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Get posts by author
export const getPostsByAuthor = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { username } = req.params;
    const { language = 'tr', page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page.toString());
    const limitNum = parseInt(limit.toString());
    const skip = (pageNum - 1) * limitNum;

    // Check if author exists
    const author = await prisma.user.findUnique({
      where: { username }
    });

    if (!author) {
      return res.status(404).json({
        success: false,
        message: 'Author not found'
      } as ApiResponse);
    }

    const posts = await prisma.post.findMany({
      where: { 
        authorId: author.id,
        status: 'PUBLISHED'
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
        category: {
          include: {
            translations: {
              where: { language: { code: language.toString().toUpperCase() } }
            }
          }
        },
        translations: {
          where: { language: { code: language.toString().toUpperCase() } }
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      },
      orderBy: { publishedAt: 'desc' },
      skip,
      take: limitNum
    });

    const totalPosts = await prisma.post.count({
      where: { 
        authorId: author.id,
        status: 'PUBLISHED'
      }
    });

    const formattedPosts = posts.map(post => ({
      id: post.id,
      slug: post.slug,
      featuredImage: post.featuredImage,
      publishedAt: post.publishedAt,
      viewCount: post.viewCount,
      likeCount: post.likeCount,
      author: post.author,
      category: post.category ? {
        id: post.category.id,
        slug: post.category.slug,
        name: post.category.translations[0]?.name || 'Untitled',
        color: post.category.color,
        icon: post.category.icon
      } : null,
      title: post.translations[0]?.title || 'Untitled',
      excerpt: post.translations[0]?.excerpt,
      commentCount: post._count.comments,
      likeCount: post._count.likes
    }));

    res.status(200).json({
      success: true,
      message: 'Author posts retrieved successfully',
      data: {
        author: {
          id: author.id,
          username: author.username,
          firstName: author.firstName,
          lastName: author.lastName,
          avatar: author.avatar,
          bio: author.bio
        },
        posts: formattedPosts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: totalPosts,
          pages: Math.ceil(totalPosts / limitNum)
        }
      }
    } as ApiResponse);

  } catch (error) {
    console.error('Get posts by author error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};
