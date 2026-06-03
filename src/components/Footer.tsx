/**
 * 底部页脚
 * - 大字号品牌标识
 * - 版权 + 滚动到顶按钮
 */
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { EASE } from "@/constants";

export default function Footer() {
  const setCursor = useUIStore((s) => s.setCursor);
  const year = new Date().getFullYear();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-fg/10 px-5 pb-8 pt-16 md:px-12 md:pb-12 md:pt-24">
      <div className="ogs-container">
        {/* 大字品牌 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: EASE.expo }}
          className="mb-12 select-none font-display text-[18vw] leading-none tracking-tightest md:text-[14vw]"
        >
          With <span className="italic text-accent">Creative</span> From Heart.
        </motion.div>

        {/* 版权信息行 */}
        <div className="flex flex-col gap-4 border-t border-fg/10 pt-6 text-xs uppercase tracking-widest text-fg/60 md:flex-row md:items-center md:justify-between">
          <span>© {year} Old_glasses · All rights reserved.</span>
          <div className="flex items-center gap-6">
            <span>Made with ♡</span>
            <button
              onClick={scrollTop}
              onMouseEnter={() => setCursor("hover-link")}
              onMouseLeave={() => setCursor("default")}
              className="flex items-center gap-2 transition-colors hover:text-accent"
              aria-label="返回顶部"
            >
              <ArrowUp size={14} />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
