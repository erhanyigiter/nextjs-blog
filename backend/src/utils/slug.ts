// Generate URL-friendly slug from text
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    // Replace Turkish characters
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    // Replace spaces and special characters with hyphens
    .replace(/[^a-z0-9]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
};

// Generate unique slug by appending number if exists
export const generateUniqueSlug = async (
  text: string,
  checkFunction: (slug: string) => Promise<boolean>
): Promise<string> => {
  let slug = generateSlug(text);
  let counter = 1;
  
  while (await checkFunction(slug)) {
    slug = `${generateSlug(text)}-${counter}`;
    counter++;
  }
  
  return slug;
};

// Calculate reading time for content
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200; // Average reading speed
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Extract excerpt from content
export const extractExcerpt = (content: string, maxLength: number = 160): string => {
  // Remove HTML tags
  const plainText = content.replace(/<[^>]*>/g, '');
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength).trim() + '...';
};

// Validate slug format
export const isValidSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9-]+$/;
  return slugRegex.test(slug) && slug.length > 0 && slug.length <= 100;
};
