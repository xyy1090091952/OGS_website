/**
 * 主题色切换器（Accent Picker）
 * - 一个圆点按钮，点击展开浮层显示所有预设
 * - 选中后立即写入 store -> hook 同步到 CSS 变量 -> 整站颜色更新
 *
 * 视觉细节：
 *   - 触发按钮上展示的是当前主题的"双色斜分圆点"，让用户一眼看出搭配气质
 *   - 浮层里的色板也是双色斜分圆点 + 主题名 + 选中态
 */
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { ACCENTS, ACCENT_PRESETS, type AccentId } from "@/lib/themes";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { EASE } from "@/constants";

// 双色斜分圆点（左下色 + 右上色，用 conic-gradient 切两个三角）
function DuoSwatch({
  from,
  to,
  size = 18,
  className,
}: {
  from: string;
  to: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("rounded-full", className)}
      style={{
        width: size,
        height: size,
        // 用 linear-gradient 沿 135° 切分双色，形成斜分双色圆点
        background: `linear-gradient(135deg, ${from} 0%, ${from} 50%, ${to} 50%, ${to} 100%)`,
      }}
    />
  );
}

export default function ThemeColorPicker() {
  const accent = useUIStore((s) => s.accent);
  const setAccent = useUIStore((s) => s.setAccent);
  const setCursor = useUIStore((s) => s.setCursor);
  const { t } = useT();

  const [open, setOpen] = useState(false);
  // 用于点击外部关闭弹层
  const wrapRef = useRef<HTMLDivElement>(null);

  // 当前选中的预设
  const current = ACCENTS[accent];

  // 点击外部 + ESC 关闭
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // 选中某个主题色：写 store + 关闭弹层
  const handlePick = (id: AccentId) => {
    setAccent(id);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      {/* 触发按钮：圆框 + 内嵌当前主题双色圆点 */}
      <button
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setCursor("hover-link")}
        onMouseLeave={() => setCursor("default")}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-fg/20 transition-colors duration-300 hover:bg-fg/5"
        aria-label={t("nav.accentAria")}
        aria-expanded={open}
      >
        <DuoSwatch
          from={current.swatch.from}
          to={current.swatch.to}
          size={18}
          className="ring-1 ring-fg/15"
        />
      </button>

      {/* 浮层：色板列表（标题 + 三个选项） */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.25, ease: EASE.expo }}
            className="absolute right-0 top-12 z-50 w-52 rounded-2xl border border-fg/15 bg-bg/95 p-3 shadow-xl backdrop-blur-lg"
            role="menu"
          >
            {/* 标题 */}
            <div className="mb-2 px-1 font-mono text-[10px] uppercase tracking-widest text-fg/50">
              {t("nav.accentTitle")}
            </div>

            {/* 主题列表：竖直排列；每行 [双色圆点] + 名字 + 选中标记 */}
            <ul className="flex flex-col gap-1">
              {ACCENT_PRESETS.map((id) => {
                const p = ACCENTS[id];
                const active = id === accent;
                return (
                  <li key={id}>
                    <button
                      onClick={() => handlePick(id)}
                      onMouseEnter={() => setCursor("hover-link")}
                      onMouseLeave={() => setCursor("default")}
                      className={cn(
                        "group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors duration-200",
                        active ? "bg-fg/5" : "hover:bg-fg/5"
                      )}
                      aria-label={p.label}
                    >
                      <DuoSwatch
                        from={p.swatch.from}
                        to={p.swatch.to}
                        size={20}
                        className="ring-1 ring-fg/10"
                      />
                      <span
                        className={cn(
                          "flex-1 text-sm transition-colors",
                          active ? "text-fg" : "text-fg/70 group-hover:text-fg"
                        )}
                      >
                        {p.label}
                      </span>
                      {active && (
                        <Check size={14} className="text-accent" strokeWidth={2.5} />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
