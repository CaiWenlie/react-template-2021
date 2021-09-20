import { useRouteMatch } from "react-router-dom";

// 匹配路由
// level: 路由级别 1 | 2 ...
export function useRouteName(level = 1) {
  const { path } = useRouteMatch()
  return path.split('/')[level] || ''
}