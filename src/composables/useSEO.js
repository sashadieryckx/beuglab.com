import { useHead } from '@vueuse/head'

/**
 * SEO Composable for Beug Lab
 * Provides consistent, reusable SEO configuration across all pages
 *
 * @param {Object} config - SEO configuration object
 * @param {string} config.title - Page title (will be appended with " | Beug Lab")
 * @param {string} config.description - Meta description for the page
 * @param {string} config.path - Current route path (e.g., '/about')
 * @param {string} [config.image] - OG image URL (defaults to logo)
 * @param {string} [config.type] - OG type (defaults to 'website')
 * @param {Object} [config.schema] - Optional JSON-LD structured data
 */
export function useSEO(config) {
  const {
    title,
    description,
    path,
    image = 'https://beuglab.ca/logo.png',
    type = 'website',
    schema = null
  } = config

  const siteUrl = 'https://beuglab.ca'
  const fullTitle = title ? `${title} | Beug Lab` : 'Beug Lab'
  const canonicalUrl = `${siteUrl}${path}`
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`

  // Base meta configuration
  const headConfig = {
    title: fullTitle,
    meta: [
      // Standard meta tags
      { name: 'description', content: description },
      { name: 'author', content: 'Dr. Shawn Beug' },
      { name: 'keywords', content: 'cancer research, immunology, molecular biology, therapeutic strategies, Beug Lab, cancer biology, immune system' },

      // Open Graph meta tags
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: 'Beug Lab' },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:alt', content: title || 'Beug Lab' },
      { property: 'og:locale', content: 'en_CA' },

      // Twitter Card meta tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:image:alt', content: title || 'Beug Lab' },

      // Additional SEO meta tags
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ]
  }

  // Add JSON-LD structured data if provided
  if (schema) {
    headConfig.script = [
      {
        type: 'application/ld+json',
        children: JSON.stringify(schema)
      }
    ]
  }

  useHead(headConfig)
}

/**
 * Default organization schema for Beug Lab
 * Can be used on the home page and other main pages
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Beug Lab",
  "alternateName": "The Beug Laboratory",
  "url": "https://beuglab.ca",
  "logo": "https://beuglab.ca/logo.png",
  "description": "The Beug Lab investigates the molecular mechanisms underlying human disease to identify new therapeutic strategies. Led by Dr. Shawn Beug, the lab bridges fundamental research with clinical application to improve health outcomes.",
  "founder": {
    "@type": "Person",
    "name": "Dr. Shawn Beug",
    "jobTitle": "Principal Investigator"
  },
  "knowsAbout": [
    "Cancer Biology",
    "Immunology",
    "Molecular Medicine",
    "Therapeutic Development",
    "Disease Mechanisms"
  ],
  "sameAs": [
    // Add social media URLs here if available
  ]
}

/**
 * Research article schema generator
 * Use for publications and research pages
 */
export function createResearchSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": article.title,
    "author": article.authors || [],
    "datePublished": article.date,
    "publisher": {
      "@type": "Organization",
      "name": article.publisher || "Beug Lab"
    },
    "url": article.url,
    "description": article.description
  }
}

/**
 * Person schema generator for team members
 * Use on team and individual profile pages
 */
export function createPersonSchema(person) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": person.name,
    "jobTitle": person.jobTitle,
    "worksFor": {
      "@type": "Organization",
      "name": "Beug Lab"
    },
    "description": person.description,
    "image": person.image,
    "url": person.url
  }
}
