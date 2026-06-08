/**
 * 底部页脚
 * - 大字号品牌标识
 * - 版权 + 滚动到顶按钮
 */
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { EASE } from "@/constants";
// 多语言：t 翻译 UI 文案
import { useT } from "@/lib/i18n";

export default function Footer() {
  const setCursor = useUIStore((s) => s.setCursor);
  const year = new Date().getFullYear();
  const { t } = useT();

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    // bg-grad-footer：渐变 F 橙 → 蜜桃（情绪收尾大色块）
    <footer className="bg-grad-footer relative overflow-hidden px-5 pb-8 pt-16 md:px-12 md:pb-12 md:pt-24">
      <div className="ogs-container">
        {/* 大字品牌 —— 在橙底上用白字 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: EASE.expo }}
          className="mb-12 select-none font-display text-[18vw] leading-none tracking-tightest text-white md:text-[14vw]"
        >
          {t("footer.with")} <span className="italic text-white/85">{t("footer.creative")}</span> {t("footer.fromHeart")}
        </motion.div>

        {/* 版权信息行 */}
        <div className="flex flex-col gap-4 border-t border-white/30 pt-6 text-xs uppercase tracking-widest text-white/80 md:flex-row md:items-center md:justify-between">
          <span>{t("footer.copyright", { year })}</span>
          <div className="flex items-center gap-6">
            <span>{t("footer.madeWith")}</span>
            <button
              onClick={scrollTop}
              onMouseEnter={() => setCursor("hover-link")}
              onMouseLeave={() => setCursor("default")}
              className="flex items-center gap-2 transition-colors hover:text-white"
              aria-label={t("footer.top")}
            >
              <ArrowUp size={14} />
              <span>{t("footer.top")}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
