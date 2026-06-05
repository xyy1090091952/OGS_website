/**
 * 应用根节点
 * - 全局：Loader / Cursor / 滚动进度 / Header / Footer
 * - 路由：首页 / 作品详情 / 404
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import WorkDetail from "@/pages/WorkDetail";
import NotFound from "@/pages/NotFound";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { useApplyTheme } from "@/hooks/useApplyTheme";
import { useLenis } from "@/hooks/useLenis";
import { ROUTES } from "@/constants";

export default function App() {
  // 主题应用 + 平滑滚动
  useApplyTheme();
  useLenis(true);

  return (
    <BrowserRouter>
      <Loader />
      <Cursor />
      <ScrollProgress />
      {/* 路由切换时自动回到顶部（详情页打开必须在最上） */}
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path="/works/:slug" element={<WorkDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
