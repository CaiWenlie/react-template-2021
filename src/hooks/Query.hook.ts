import { useLocation } from "react-router-dom";
import * as qs from 'qs'

export function useQuery<T>(search?: string) {
  const location = useLocation()
  if (search === undefined) {
    search = location.search
  }
  search = search.replace(/^\?/, '')
  return qs.parse(search) as Partial<T>
}