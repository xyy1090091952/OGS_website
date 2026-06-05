/**
 * 首页：组合所有 Section
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import WorksSection from "@/sections/WorksSection";
import ServicesSection from "@/sections/ServicesSection";
import ContactSection from "@/sections/ContactSection";
import Marquee from "@/components/Marquee";

export default function Home() {
  const location = useLocation();

  // 处理从其它页面带 hash 跳过来的滚动定位（普通路由切换的回顶逻辑由 <ScrollToTop /> 统一处理）
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // 等下一帧让 DOM 渲染完
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location]);

  return (
    <div className="relative">
      <HeroSection />
      <Marquee />
      <AboutSection />
      <WorksSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}
