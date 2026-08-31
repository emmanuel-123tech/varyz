import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://varyz.io';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/prototype', '/api/'], // Protect private prototype route from web scrapers
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
