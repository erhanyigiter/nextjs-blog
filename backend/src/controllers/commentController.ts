import { Request, Response } from 'express';
import { prisma } from '../index';
import { AuthenticatedRequest, ApiResponse, CreateCommentRequest, UpdateCommentRequest } from '../types';

// Get comments for a post
export const getPostComments = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { postSlug } = req.params;
    const { language = 'tr', page = '1', limit = '10' } = req.query;
    const pageNum = parseInt(page.toString());
    const limitNum = parseInt(limit.toString());
    const skip = (pageNum - 1) * limitNum;

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { slug: postSlug }
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      } as ApiResponse);
    }

    // Get comments with pagination
    const comments = await prisma.comment.findMany({
      where: { 
        postId: post.id,
        status: 'APPROVED',
        parentId: null // Only top-level comments
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
        },
        _count: {
          select: {
            replies: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limitNum
    });

    // Get total count
    const totalComments = await prisma.comment.count({
      where: { 
        postId: post.id,
        status: 'APPROVED',
        parentId: null
      }
    });

    res.status(200).json({
      success: true,
      message: 'Comments retrieved successfully',
      data: {
        comments,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: totalComments,
          pages: Math.ceil(totalComments / limitNum)
        }
      }
    } as ApiResponse);

  } catch (error) {
    console.error('Get post comments error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Get single comment by ID
export const getCommentById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id },
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
        post: {
          select: {
            id: true,
            slug: true,
            title: true
          }
        },
        parent: {
          include: {
            author: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true
              }
            }
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
      }
    });

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      } as ApiResponse);
    }

    res.status(200).json({
      success: true,
      message: 'Comment retrieved successfully',
      data: comment
    } as ApiResponse);

  } catch (error) {
    console.error('Get comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Create new comment
export const createComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      } as ApiResponse);
    }

    const { postSlug } = req.params;
    const {
      content,
      parentId
    }: CreateCommentRequest = req.body;

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { slug: postSlug }
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      } as ApiResponse);
    }

    // If parentId provided, check if parent comment exists
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId }
      });

      if (!parentComment) {
        return res.status(400).json({
          success: false,
          message: 'Parent comment not found'
        } as ApiResponse);
      }

      if (parentComment.postId !== post.id) {
        return res.status(400).json({
          success: false,
          message: 'Parent comment does not belong to this post'
        } as ApiResponse);
      }
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: post.id,
        authorId: req.user.id,
        parentId: parentId || null,
        status: 'PENDING' // Comments need approval by default
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
        post: {
          select: {
            id: true,
            slug: true,
            title: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Comment created successfully. It will be published after approval.',
      data: comment
    } as ApiResponse);

  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Update comment
export const updateComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      } as ApiResponse);
    }

    const { id } = req.params;
    const updateData: UpdateCommentRequest = req.body;

    // Check if comment exists
    const existingComment = await prisma.comment.findUnique({
      where: { id }
    });

    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      } as ApiResponse);
    }

    // Check if user owns the comment or is admin/moderator
    if (existingComment.authorId !== req.user.id && 
        req.user.role !== 'ADMIN' && 
        req.user.role !== 'MODERATOR') {
      return res.status(403).json({
        success: false,
        message: 'You can only edit your own comments'
      } as ApiResponse);
    }

    // Update comment
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: {
        content: updateData.content,
        status: updateData.status || existingComment.status
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
        }
      }
    });

    res.status(200).json({
      success: true,
      message: 'Comment updated successfully',
      data: updatedComment
    } as ApiResponse);

  } catch (error) {
    console.error('Update comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Delete comment
export const deleteComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      } as ApiResponse);
    }

    const { id } = req.params;

    // Check if comment exists
    const existingComment = await prisma.comment.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            replies: true
          }
        }
      }
    });

    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      } as ApiResponse);
    }

    // Check if user owns the comment or is admin/moderator
    if (existingComment.authorId !== req.user.id && 
        req.user.role !== 'ADMIN' && 
        req.user.role !== 'MODERATOR') {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own comments'
      } as ApiResponse);
    }

    // Check if comment has replies
    if (existingComment._count.replies > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete comment with replies. Please delete replies first.'
      } as ApiResponse);
    }

    // Delete comment
    await prisma.comment.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    } as ApiResponse);

  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Approve comment (Admin/Moderator only)
export const approveComment = async (req: AuthenticatedRequest, res: Response) => {
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

    // Check if comment exists
    const existingComment = await prisma.comment.findUnique({
      where: { id }
    });

    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      } as ApiResponse);
    }

    // Approve comment
    const approvedComment = await prisma.comment.update({
      where: { id },
      data: { status: 'APPROVED' },
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
      }
    });

    res.status(200).json({
      success: true,
      message: 'Comment approved successfully',
      data: approvedComment
    } as ApiResponse);

  } catch (error) {
    console.error('Approve comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Reject comment (Admin/Moderator only)
export const rejectComment = async (req: AuthenticatedRequest, res: Response) => {
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

    // Check if comment exists
    const existingComment = await prisma.comment.findUnique({
      where: { id }
    });

    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      } as ApiResponse);
    }

    // Reject comment
    const rejectedComment = await prisma.comment.update({
      where: { id },
      data: { status: 'REJECTED' },
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
      }
    });

    res.status(200).json({
      success: true,
      message: 'Comment rejected successfully',
      data: rejectedComment
    } as ApiResponse);

  } catch (error) {
    console.error('Reject comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Get pending comments (Admin/Moderator only)
export const getPendingComments = async (req: AuthenticatedRequest, res: Response) => {
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

    const { page = '1', limit = '20' } = req.query;
    const pageNum = parseInt(page.toString());
    const limitNum = parseInt(limit.toString());
    const skip = (pageNum - 1) * limitNum;

    const comments = await prisma.comment.findMany({
      where: { status: 'PENDING' },
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
        post: {
          select: {
            id: true,
            slug: true,
            title: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limitNum
    });

    const totalComments = await prisma.comment.count({
      where: { status: 'PENDING' }
    });

    res.status(200).json({
      success: true,
      message: 'Pending comments retrieved successfully',
      data: {
        comments,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: totalComments,
          pages: Math.ceil(totalComments / limitNum)
        }
      }
    } as ApiResponse);

  } catch (error) {
    console.error('Get pending comments error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};
