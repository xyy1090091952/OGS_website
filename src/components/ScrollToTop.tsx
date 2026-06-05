/**
 * 路由切换时自动回到页面顶部
 *  - react-router 默认不会重置滚动位置
 *  - 因为我们用了 Lenis 平滑滚动，普通的 window.scrollTo 不一定生效
 *    这里同时调用 Lenis（如果存在）和原生 scrollTo 兜底
 *  - 仅在 pathname 改变时触发，hash（同页锚点）跳转不重置
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 立即滚到顶部，不要平滑（详情页打开就该在最上面）
    // 用 setTimeout(0) 确保新页面已经挂载，避免被新页面的 scroll restoration 覆盖
    const timer = setTimeout(() => {
      // 优先用原生 scrollTo（覆盖 Lenis 内部状态）
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      // 双保险：directly set documentElement
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  // 这是个纯逻辑组件，不渲染任何内容
  return null;
}
