import { Request, Response } from 'express';
import { prisma } from '../index';
import { AuthenticatedRequest, ApiResponse, CreateStaticPageRequest, UpdateStaticPageRequest } from '../types';
import { generateSlug } from '../utils/slug';

// Get all static pages with translations
export const getStaticPages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { language = 'tr' } = req.query;

    const pages = await prisma.staticPage.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        translations: {
          where: { language: { code: language.toString().toUpperCase() } }
        },
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
      orderBy: { createdAt: 'desc' }
    });

    const formattedPages = pages.map(page => ({
      id: page.id,
      slug: page.slug,
      status: page.status,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
      author: page.author,
      title: page.translations[0]?.title || 'Untitled',
      excerpt: page.translations[0]?.excerpt,
      metaTitle: page.translations[0]?.metaTitle,
      metaDescription: page.translations[0]?.metaDescription
    }));

    res.status(200).json({
      success: true,
      message: 'Static pages retrieved successfully',
      data: formattedPages
    } as ApiResponse);

  } catch (error) {
    console.error('Get static pages error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Get single static page by slug
export const getStaticPageBySlug = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { slug } = req.params;
    const { language = 'tr' } = req.query;

    const page = await prisma.staticPage.findUnique({
      where: { slug },
      include: {
        translations: {
          where: { language: { code: language.toString().toUpperCase() } }
        },
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

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Static page not found'
      } as ApiResponse);
    }

    if (page.status !== 'PUBLISHED') {
      return res.status(404).json({
        success: false,
        message: 'Static page not found'
      } as ApiResponse);
    }

    const formattedPage = {
      id: page.id,
      slug: page.slug,
      status: page.status,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
      author: page.author,
      title: page.translations[0]?.title || 'Untitled',
      content: page.translations[0]?.content || '',
      excerpt: page.translations[0]?.excerpt,
      metaTitle: page.translations[0]?.metaTitle,
      metaDescription: page.translations[0]?.metaDescription
    };

    res.status(200).json({
      success: true,
      message: 'Static page retrieved successfully',
      data: formattedPage
    } as ApiResponse);

  } catch (error) {
    console.error('Get static page error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Create new static page
export const createStaticPage = async (req: AuthenticatedRequest, res: Response) => {
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
      status = 'DRAFT',
      title,
      content,
      excerpt,
      metaTitle,
      metaDescription,
      languageId
    }: CreateStaticPageRequest = req.body;

    // Generate slug if not provided
    const pageSlug = slug || generateSlug(title);

    // Check if slug exists
    const existingPage = await prisma.staticPage.findUnique({
      where: { slug: pageSlug }
    });

    if (existingPage) {
      return res.status(400).json({
        success: false,
        message: 'Slug already exists'
      } as ApiResponse);
    }

    // Create static page
    const page = await prisma.staticPage.create({
      data: {
        slug: pageSlug,
        status: status as any,
        authorId: req.user.id,
        translations: {
          create: {
            languageId,
            title,
            content,
            excerpt,
            metaTitle,
            metaDescription
          }
        }
      },
      include: {
        translations: true,
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

    res.status(201).json({
      success: true,
      message: 'Static page created successfully',
      data: page
    } as ApiResponse);

  } catch (error) {
    console.error('Create static page error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Update static page
export const updateStaticPage = async (req: AuthenticatedRequest, res: Response) => {
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
    const updateData: UpdateStaticPageRequest = req.body;

    // Check if page exists
    const existingPage = await prisma.staticPage.findUnique({
      where: { id }
    });

    if (!existingPage) {
      return res.status(404).json({
        success: false,
        message: 'Static page not found'
      } as ApiResponse);
    }

    // Update static page
    const updatedPage = await prisma.staticPage.update({
      where: { id },
      data: {
        slug: updateData.slug,
        status: updateData.status
      },
      include: {
        translations: true,
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
      message: 'Static page updated successfully',
      data: updatedPage
    } as ApiResponse);

  } catch (error) {
    console.error('Update static page error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Delete static page
export const deleteStaticPage = async (req: AuthenticatedRequest, res: Response) => {
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

    // Check if page exists
    const existingPage = await prisma.staticPage.findUnique({
      where: { id }
    });

    if (!existingPage) {
      return res.status(404).json({
        success: false,
        message: 'Static page not found'
      } as ApiResponse);
    }

    // Delete static page (cascade will handle related records)
    await prisma.staticPage.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Static page deleted successfully'
    } as ApiResponse);

  } catch (error) {
    console.error('Delete static page error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Get static page by ID (for admin panel)
export const getStaticPageById = async (req: AuthenticatedRequest, res: Response) => {
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

    const page = await prisma.staticPage.findUnique({
      where: { id },
      include: {
        translations: {
          include: {
            language: true
          }
        },
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

    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Static page not found'
      } as ApiResponse);
    }

    res.status(200).json({
      success: true,
      message: 'Static page retrieved successfully',
      data: page
    } as ApiResponse);

  } catch (error) {
    console.error('Get static page by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Get all static pages (for admin panel)
export const getAllStaticPages = async (req: AuthenticatedRequest, res: Response) => {
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

    const { language = 'tr' } = req.query;

    const pages = await prisma.staticPage.findMany({
      include: {
        translations: {
          where: { language: { code: language.toString().toUpperCase() } }
        },
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
      orderBy: { createdAt: 'desc' }
    });

    const formattedPages = pages.map(page => ({
      id: page.id,
      slug: page.slug,
      status: page.status,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
      author: page.author,
      title: page.translations[0]?.title || 'Untitled',
      excerpt: page.translations[0]?.excerpt,
      metaTitle: page.translations[0]?.metaTitle,
      metaDescription: page.translations[0]?.metaDescription
    }));

    res.status(200).json({
      success: true,
      message: 'All static pages retrieved successfully',
      data: formattedPages
    } as ApiResponse);

  } catch (error) {
    console.error('Get all static pages error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};
