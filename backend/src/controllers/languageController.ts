import { Request, Response } from 'express';
import { prisma } from '../index';
import { AuthenticatedRequest, ApiResponse, CreateLanguageRequest, UpdateLanguageRequest } from '../types';

// Get all languages
export const getLanguages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { active = 'true' } = req.query;
    const activeFilter = active === 'true';

    const languages = await prisma.language.findMany({
      where: activeFilter ? { isActive: true } : {},
      orderBy: [
        { isDefault: 'desc' },
        { name: 'asc' }
      ]
    });

    res.status(200).json({
      success: true,
      message: 'Languages retrieved successfully',
      data: languages
    } as ApiResponse);

  } catch (error) {
    console.error('Get languages error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Get single language by code
export const getLanguageByCode = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { code } = req.params;

    const language = await prisma.language.findUnique({
      where: { code: code.toUpperCase() as any }
    });

    if (!language) {
      return res.status(404).json({
        success: false,
        message: 'Language not found'
      } as ApiResponse);
    }

    res.status(200).json({
      success: true,
      message: 'Language retrieved successfully',
      data: language
    } as ApiResponse);

  } catch (error) {
    console.error('Get language error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Get default language
export const getDefaultLanguage = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const defaultLanguage = await prisma.language.findFirst({
      where: { isDefault: true }
    });

    if (!defaultLanguage) {
      return res.status(404).json({
        success: false,
        message: 'Default language not found'
      } as ApiResponse);
    }

    res.status(200).json({
      success: true,
      message: 'Default language retrieved successfully',
      data: defaultLanguage
    } as ApiResponse);

  } catch (error) {
    console.error('Get default language error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Create new language
export const createLanguage = async (req: AuthenticatedRequest, res: Response) => {
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

    const {
      code,
      name,
      nativeName,
      isDefault = false
    }: CreateLanguageRequest = req.body;

    // Check if language code already exists
    const existingLanguage = await prisma.language.findUnique({
      where: { code }
    });

    if (existingLanguage) {
      return res.status(400).json({
        success: false,
        message: 'Language code already exists'
      } as ApiResponse);
    }

    // If setting as default, unset other defaults
    if (isDefault) {
      await prisma.language.updateMany({
        where: { isDefault: true },
        data: { isDefault: false }
      });
    }

    // Create language
    const language = await prisma.language.create({
      data: {
        code,
        name,
        nativeName,
        isDefault,
        isActive: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Language created successfully',
      data: language
    } as ApiResponse);

  } catch (error) {
    console.error('Create language error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Update language
export const updateLanguage = async (req: AuthenticatedRequest, res: Response) => {
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
    const updateData: UpdateLanguageRequest = req.body;

    // Check if language exists
    const existingLanguage = await prisma.language.findUnique({
      where: { id }
    });

    if (!existingLanguage) {
      return res.status(404).json({
        success: false,
        message: 'Language not found'
      } as ApiResponse);
    }

    // If setting as default, unset other defaults
    if (updateData.isDefault) {
      await prisma.language.updateMany({
        where: { isDefault: true },
        data: { isDefault: false }
      });
    }

    // Update language
    const updatedLanguage = await prisma.language.update({
      where: { id },
      data: {
        name: updateData.name,
        nativeName: updateData.nativeName,
        isActive: updateData.isActive,
        isDefault: updateData.isDefault
      }
    });

    res.status(200).json({
      success: true,
      message: 'Language updated successfully',
      data: updatedLanguage
    } as ApiResponse);

  } catch (error) {
    console.error('Update language error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Delete language
export const deleteLanguage = async (req: AuthenticatedRequest, res: Response) => {
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

    // Check if language exists
    const existingLanguage = await prisma.language.findUnique({
      where: { id },
      include: {
        posts: true,
        categories: true,
        tags: true,
        staticPages: true
      }
    });

    if (!existingLanguage) {
      return res.status(404).json({
        success: false,
        message: 'Language not found'
      } as ApiResponse);
    }

    // Check if language is default
    if (existingLanguage.isDefault) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete default language'
      } as ApiResponse);
    }

    // Check if language has translations
    const hasTranslations = 
      existingLanguage.posts.length > 0 ||
      existingLanguage.categories.length > 0 ||
      existingLanguage.tags.length > 0 ||
      existingLanguage.staticPages.length > 0;

    if (hasTranslations) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete language with translations. Please remove all translations first.'
      } as ApiResponse);
    }

    // Delete language
    await prisma.language.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Language deleted successfully'
    } as ApiResponse);

  } catch (error) {
    console.error('Delete language error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Set default language
export const setDefaultLanguage = async (req: AuthenticatedRequest, res: Response) => {
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

    // Check if language exists
    const existingLanguage = await prisma.language.findUnique({
      where: { id }
    });

    if (!existingLanguage) {
      return res.status(404).json({
        success: false,
        message: 'Language not found'
      } as ApiResponse);
    }

    if (!existingLanguage.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Cannot set inactive language as default'
      } as ApiResponse);
    }

    // Unset current default
    await prisma.language.updateMany({
      where: { isDefault: true },
      data: { isDefault: false }
    });

    // Set new default
    const updatedLanguage = await prisma.language.update({
      where: { id },
      data: { isDefault: true }
    });

    res.status(200).json({
      success: true,
      message: 'Default language updated successfully',
      data: updatedLanguage
    } as ApiResponse);

  } catch (error) {
    console.error('Set default language error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Toggle language active status
export const toggleLanguageStatus = async (req: AuthenticatedRequest, res: Response) => {
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

    // Check if language exists
    const existingLanguage = await prisma.language.findUnique({
      where: { id }
    });

    if (!existingLanguage) {
      return res.status(404).json({
        success: false,
        message: 'Language not found'
      } as ApiResponse);
    }

    // Cannot deactivate default language
    if (existingLanguage.isDefault && existingLanguage.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Cannot deactivate default language'
      } as ApiResponse);
    }

    // Toggle status
    const updatedLanguage = await prisma.language.update({
      where: { id },
      data: { isActive: !existingLanguage.isActive }
    });

    res.status(200).json({
      success: true,
      message: `Language ${updatedLanguage.isActive ? 'activated' : 'deactivated'} successfully`,
      data: updatedLanguage
    } as ApiResponse);

  } catch (error) {
    console.error('Toggle language status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};

// Get language statistics
export const getLanguageStats = async (req: AuthenticatedRequest, res: Response) => {
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

    const languages = await prisma.language.findMany({
      include: {
        posts: true,
        categories: true,
        tags: true,
        staticPages: true
      }
    });

    const stats = languages.map(language => ({
      id: language.id,
      code: language.code,
      name: language.name,
      nativeName: language.nativeName,
      isActive: language.isActive,
      isDefault: language.isDefault,
      stats: {
        posts: language.posts.length,
        categories: language.categories.length,
        tags: language.tags.length,
        staticPages: language.staticPages.length
      }
    }));

    res.status(200).json({
      success: true,
      message: 'Language statistics retrieved successfully',
      data: stats
    } as ApiResponse);

  } catch (error) {
    console.error('Get language stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as ApiResponse);
  }
};
