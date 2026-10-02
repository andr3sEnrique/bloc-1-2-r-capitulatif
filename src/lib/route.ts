import { useEffect, useState } from 'react'

export type Route = 'accueil' | 'criteres' | 'jury' | 'oral' | 'glossaire'

const ROUTES: Route[] = ['accueil', 'criteres', 'jury', 'oral', 'glossaire']

function parse(): Route {
  const h = window.location.hash.replace(/^#\/?/, '') as Route
  return ROUTES.includes(h) ? h : 'accueil'
}

/** Routage par hash : aucune réécriture nécessaire côté Vercel. */
export function useHashRoute() {
  const [route, setRoute] = useState<Route>(parse)

  useEffect(() => {
    const onChange = () => {
      setRoute(parse())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const navigate = (r: Route) => {
    window.location.hash = `/${r}`
  }

  return { route, navigate }
}
