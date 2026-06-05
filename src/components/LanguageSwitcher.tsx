/**
 * 语言切换器
 * 圆角胶囊三段式：中 / EN / 日，当前选中的有底色
 *
 * 历史问题：之前用 framer-motion 的 layoutId 让 pill 在三个按钮间滑动；
 * 但 layoutId 是 framer 的"全局共享 ID"，在路由切换 / 抽屉挂载时
 * 会跨 DOM 实例共享 pill 位置，导致 "pill 从画面外飞进来" 的视觉故障。
 *
 * 现方案：用 CSS transform: translateX 计算 pill 位置（基于按钮索引）。
 * 没有 framer 的 layout 接力，永远不会飞屏外，逻辑也更直白。
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

  // 当前选中的索引（用于 pill 滑动定位）
  const activeIdx = LANGUAGES.indexOf(language);
  // 一共多少个语言（用于 pill 宽度计算）
  const total = LANGUAGES.length;

  return (
    <div
      role="group"
      aria-label={t("nav.langAria")}
      className={cn(
        // grid-cols-3 让三个按钮等宽，pill 宽度才能用 100%/3 精确算
        "relative isolate inline-grid grid-flow-col items-center rounded-full border border-fg/20 p-0.5 text-xs font-mono uppercase tracking-widest",
        "auto-cols-fr"
      )}
    >
      {/* 滑动 pill：宽度 = 容器内 1 个按钮宽，靠 translateX 切换位置
          * 因为按钮被 grid auto-cols-fr 拉成等宽，pill 宽用 percent 即可
          * 计算：容器内总宽 = 100%（除去 0.5rem padding 不影响百分比）
          *      每个按钮 = 100% / total
          *      pill 第 i 个位置的 left 偏移 = i * 100% */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-0.5 top-0.5 bottom-0.5 z-0 rounded-full bg-fg"
        style={{ width: `calc((100% - 0.25rem) / ${total})` }}
        animate={{ x: `${activeIdx * 100}%` }}
        transition={{ duration: 0.45, ease: EASE.expo }}
        // 关键：initial={false} 让首次渲染就直接停在当前位置，不做入场动画
        initial={false}
      />

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
              // relative + z-10 让按钮文字浮在 pill 上层
              "relative z-10 rounded-full px-2.5 py-1 text-center transition-colors duration-300",
              isActive ? "text-bg" : "text-fg/60 hover:text-fg"
            )}
          >
            {compact ? LANG_LABELS[l].short : LANG_LABELS[l].full}
          </button>
        );
      })}
    </div>
  );
}
