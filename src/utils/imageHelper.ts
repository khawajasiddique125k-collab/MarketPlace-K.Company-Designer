/**
 * Helper to ensure all image URLs work seamlessly in both local development
 * and production builds on Cloudflare Pages, Netlify, Vercel, and custom domains.
 */

export const resolveImageUrl = (url?: string): string => {
  if (!url) return '/images/hero_design_showcase.jpg';

  // If URL already points to external link or data URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }

  // Normalize /src/assets/images/... to /images/... for production build compatibility
  if (url.startsWith('/src/assets/images/')) {
    const filename = url.replace('/src/assets/images/', '');
    // Check if it's one of our known primary images with simplified name
    if (filename.startsWith('hero_design_showcase')) {
      return '/images/hero_design_showcase.jpg';
    }
    if (filename.startsWith('portfolio_branding')) {
      return '/images/portfolio_branding.jpg';
    }
    if (filename.startsWith('portfolio_social_youtube')) {
      return '/images/portfolio_social_youtube.jpg';
    }
    if (filename.startsWith('portfolio_digital_card')) {
      return '/images/portfolio_digital_card.jpg';
    }
    return `/images/${filename}`;
  }

  return url;
};

/**
 * Fallback handler to prevent broken image frames
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc = '/images/hero_design_showcase.jpg'
) => {
  const target = e.currentTarget;
  if (target.src !== fallbackSrc && !target.src.endsWith(fallbackSrc)) {
    target.src = fallbackSrc;
  }
};
