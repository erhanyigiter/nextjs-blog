import { Request, Response, NextFunction } from 'express';
import { prisma } from '../index';

// Supported languages
export const SUPPORTED_LANGUAGES = ['tr', 'en', 'de', 'fr', 'es', 'ar'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// Default language
export const DEFAULT_LANGUAGE: SupportedLanguage = 'tr';

// Language mapping
export const LANGUAGE_MAPPING = {
  tr: 'TR',
  en: 'EN', 
  de: 'DE',
  fr: 'FR',
  es: 'ES',
  ar: 'AR'
} as const;

// Extended Request interface for i18n
export interface I18nRequest extends Request {
  language?: SupportedLanguage;
  languageCode?: string;
}

// i18n middleware to detect and set language
export const i18nMiddleware = async (
  req: I18nRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Language detection priority:
    // 1. Query parameter (?lang=tr)
    // 2. Header (Accept-Language)
    // 3. Cookie (language)
    // 4. Default language

    let language: SupportedLanguage = DEFAULT_LANGUAGE;

    // Check query parameter
    if (req.query.lang && SUPPORTED_LANGUAGES.includes(req.query.lang as SupportedLanguage)) {
      language = req.query.lang as SupportedLanguage;
    }
    // Check Accept-Language header
    else if (req.headers['accept-language']) {
      const acceptLanguage = req.headers['accept-language'];
      const preferredLanguage = acceptLanguage
        .split(',')[0]
        .split('-')[0]
        .toLowerCase();
      
      if (SUPPORTED_LANGUAGES.includes(preferredLanguage as SupportedLanguage)) {
        language = preferredLanguage as SupportedLanguage;
      }
    }
    // Check cookie
    else if (req.cookies?.language && SUPPORTED_LANGUAGES.includes(req.cookies.language as SupportedLanguage)) {
      language = req.cookies.language as SupportedLanguage;
    }

    // Set language in request
    req.language = language;
    req.languageCode = LANGUAGE_MAPPING[language];

    // Set language cookie
    res.cookie('language', language, {
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    next();
  } catch (error) {
    console.error('i18n middleware error:', error);
    // Fallback to default language
    req.language = DEFAULT_LANGUAGE;
    req.languageCode = LANGUAGE_MAPPING[DEFAULT_LANGUAGE];
    next();
  }
};

// Get language info
export const getLanguageInfo = async (languageCode: string) => {
  try {
    const language = await prisma.language.findUnique({
      where: { code: languageCode as any }
    });
    return language;
  } catch (error) {
    console.error('Error getting language info:', error);
    return null;
  }
};

// Get all active languages
export const getActiveLanguages = async () => {
  try {
    const languages = await prisma.language.findMany({
      where: { isActive: true },
      orderBy: { isDefault: 'desc' }
    });
    return languages;
  } catch (error) {
    console.error('Error getting active languages:', error);
    return [];
  }
};

// Get default language
export const getDefaultLanguage = async () => {
  try {
    const language = await prisma.language.findFirst({
      where: { isDefault: true, isActive: true }
    });
    return language;
  } catch (error) {
    console.error('Error getting default language:', error);
    return null;
  }
};

// Validate language code
export const isValidLanguageCode = (code: string): boolean => {
  return SUPPORTED_LANGUAGES.includes(code.toLowerCase() as SupportedLanguage);
};

// Convert language code to database format
export const toDatabaseLanguageCode = (code: string): string => {
  const lowerCode = code.toLowerCase();
  return LANGUAGE_MAPPING[lowerCode as SupportedLanguage] || LANGUAGE_MAPPING[DEFAULT_LANGUAGE];
};

// Convert database language code to lowercase
export const fromDatabaseLanguageCode = (code: string): string => {
  return code.toLowerCase();
};
