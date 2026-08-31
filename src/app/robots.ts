import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://varys.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/prototype', '/api/'], // Protect private prototype route from web scrapers
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
