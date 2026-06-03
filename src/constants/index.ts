/**
 * 全局常量：路由、动画曲线、断点等
 * 集中管理避免散落在各组件中
 */

// 路由路径
export const ROUTES = {
  HOME: "/",
  WORKS: "/works",
  WORK_DETAIL: (slug: string) => `/works/${slug}`,
} as const;

// 锚点 ID（用于首页内部跳转）
export const ANCHORS = {
  HOME: "home",
  ABOUT: "about",
  WORKS: "works",
  CONTACT: "contact",
} as const;

// 动画缓动函数
export const EASE = {
  // Out-Expo：干净有力
  expo: [0.22, 1, 0.36, 1] as const,
  // Out-Quart：柔和
  quart: [0.25, 1, 0.5, 1] as const,
} as const;

// 动画时长
export const DURATION = {
  fast: 0.4,
  normal: 0.7,
  slow: 1.0,
} as const;

// 响应式断点（与 Tailwind 默认一致，用于 JS 判断）
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;
