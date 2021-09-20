import { useRouteMatch } from 'react-router-dom'

export function useCategoryHook() {
  const { path } = useRouteMatch()
  const match = useRouteMatch<{ category: string }>(`${path}/:category`)
  const categoryId = Number(match?.params.category) || 0
  return { path, categoryId }
}