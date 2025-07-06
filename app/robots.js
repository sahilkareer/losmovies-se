

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/blogs', '/movies', '/shows', '/discover', '/info/', '/adults'],
      disallow: ["/watch/", "/about", "/dmca"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}