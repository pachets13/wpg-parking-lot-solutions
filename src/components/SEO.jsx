import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'WPG Parking Lot Solutions and Concrete'
const BASE_URL = 'https://pachets13.github.io/wpg-parking-lot-solutions'

export default function SEO({ title, description, path = '/' }) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const canonicalUrl = `${BASE_URL}/#${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
    </Helmet>
  )
}
