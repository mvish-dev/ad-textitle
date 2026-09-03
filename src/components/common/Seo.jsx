import { useLocation } from 'react-router-dom'

const SITE_NAME = 'A D Textile'
const DEFAULT_TITLE = `${SITE_NAME} | Global Excellence in Manufacturing`
const DEFAULT_DESCRIPTION =
  'A D Textile is a vertically integrated home textile manufacturer and exporter based in Karur, India, producing kitchen, table, bed and living linen for global retail brands since 1990.'

// Renders <title>/<meta>/<link> directly in the tree — React 19 hoists these
// into <head> automatically, wherever the page happens to render this.
// Works for any crawler that executes JS (incl. Googlebot); it does not help
// non-JS social-card scrapers, which only ever see the static defaults in
// index.html, since this is a client-rendered SPA with no server prerender.
function Seo({ title, description = DEFAULT_DESCRIPTION, noindex = false }) {
  const { pathname } = useLocation()
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE
  const canonical = typeof window !== 'undefined' ? `${window.location.origin}${pathname}` : undefined

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}
    </>
  )
}

export default Seo
