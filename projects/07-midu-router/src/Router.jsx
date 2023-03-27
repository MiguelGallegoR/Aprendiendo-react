import { EVENTS } from './const'
import { useState, useEffect, Children } from 'react'
import { match } from 'path-to-regexp'
import { getCurrentPath } from './utils'

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => null }) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.addEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  // add routes from children <Route /> components
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  })

  console.log(routesFromChildren)

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)
  console.log(routesToUse)
  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false

    routeParams = matched.params
    return true
  })?.Component
  return Page
    ? <Page routeParams={routeParams} />
    : <DefaultComponent routeParams={routeParams} />
}
