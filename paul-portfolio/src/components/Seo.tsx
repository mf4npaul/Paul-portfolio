import { siteConfig } from '../config/site'

interface SeoProps {
  title?: string
  description?: string
  /** Path such as "/projects". Used for the canonical URL when a site URL is configured. */
  path?: string
  noindex?: boolean
}

const DEFAULT_DESCRIPTION =
  'Paul Mfonobong Victor is a software developer in Lagos, Nigeria, building responsive web applications with a growing focus on full-stack engineering, real-time systems and cloud technologies.'

/**
 * Sets the page title and meta tags. React 19 moves <title>, <meta> and <link>
 * rendered anywhere in the tree into <head>, so no extra library is needed.
 */
export function Seo({ title, description = DEFAULT_DESCRIPTION, path, noindex }: SeoProps) {
  const fullTitle = title ? `${title} | ${siteConfig.shortName}` : `${siteConfig.shortName} | ${siteConfig.title} in Lagos`
  const url = siteConfig.siteUrl && path !== undefined ? `${siteConfig.siteUrl}${path}` : undefined

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {url && <link rel="canonical" href={url} />}
      {url && <meta property="og:url" content={url} />}
      {noindex && <meta name="robots" content="noindex" />}
    </>
  )
}
