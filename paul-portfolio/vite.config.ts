import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// NOTE: that file is pure data (no React imports) so this config can import it.
import { projects } from './src/data/projects.ts'

/**
 * Emits sitemap.xml and robots.txt at build time.
 * A sitemap needs absolute URLs, so it is only generated when VITE_SITE_URL is set.
 * Project pages are read from src/data/projects.ts, so new projects appear automatically.
 */
function seoFiles(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/+$/, '')
  return {
    name: 'seo-files',
    // Adds the absolute Open Graph image tag to index.html so social-media
    // crawlers (which do not run JavaScript) can read them. Needs VITE_SITE_URL.
    transformIndexHtml() {
      if (!base) return []
      return [
        { tag: 'meta', attrs: { property: 'og:image', content: `${base}/og-image.png` }, injectTo: 'head' as const },
        { tag: 'meta', attrs: { name: 'twitter:image', content: `${base}/og-image.png` }, injectTo: 'head' as const },
      ]
    },
    generateBundle() {
      const staticPaths = ['/', '/about', '/projects', '/skills', '/experience', '/contact']
      const projectPaths = projects.map((p) => `/projects/${p.slug}`)
      if (base) {
        const urls = [...staticPaths, ...projectPaths]
          .map((path) => `  <url><loc>${base}${path === '/' ? '/' : path}</loc></url>`)
          .join('\n')
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        })
      }
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${base ? `\nSitemap: ${base}/sitemap.xml\n` : ''}`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), seoFiles(env.VITE_SITE_URL ?? '')],
    build: { target: 'es2022', sourcemap: false },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: false,
    },
  }
})
