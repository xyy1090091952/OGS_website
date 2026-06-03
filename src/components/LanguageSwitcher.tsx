/**
 * 语言切换器
 * 圆角胶囊三段式：中 / EN / 日，当前选中的有底色
 */
import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";
import { LANG_LABELS, useT } from "@/lib/i18n";
import { LANGUAGES, type Lang } from "@/data/types";
import { cn } from "@/lib/utils";
import { EASE } from "@/constants";

interface LanguageSwitcherProps {
  // 紧凑模式：只显示一个字，常用于 Header
  compact?: boolean;
}

export default function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { language, setLanguage, setCursor } = useUIStore();
  const { t } = useT();

  return (
    <div
      role="group"
      aria-label={t("nav.langAria")}
      className={cn(
        "relative isolate inline-flex items-center rounded-full border border-fg/20 p-0.5 text-xs font-mono uppercase tracking-widest"
      )}
    >
      {LANGUAGES.map((l: Lang) => {
        const isActive = language === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLanguage(l)}
            onMouseEnter={() => setCursor("hover-link")}
            onMouseLeave={() => setCursor("default")}
            aria-pressed={isActive}
            className={cn(
              "relative z-10 rounded-full px-2.5 py-1 transition-colors duration-300",
              isActive ? "text-bg" : "text-fg/60 hover:text-fg"
            )}
          >
            {/* 选中态背景：layoutId 让胶囊在三个选项间平滑滑动 */}
            {isActive && (
              <motion.span
                layoutId="lang-pill"
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-fg"
                initial={false}
                transition={{ duration: 0.45, ease: EASE.expo }}
              />
            )}
            {compact ? LANG_LABELS[l].short : LANG_LABELS[l].full}
          </button>
        );
      })}
    </div>
  );
}
