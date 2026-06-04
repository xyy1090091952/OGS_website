/**
 * 联系方式 Section
 * - 大字号邮箱（点击复制）
 * - 社交链接
 * - 底部彩蛋小动画
 */
import { useState, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Copy, ArrowUpRight } from "lucide-react";
import { useProfile } from "@/hooks/useWorks";
import SectionHeader from "@/components/SectionHeader";
import Toast from "@/components/Toast";
import Magnetic from "@/components/Magnetic";
import { ANCHORS, EASE } from "@/constants";
import { useUIStore } from "@/store/uiStore";
// 多语言：t 翻译 UI 文案
import { useT } from "@/lib/i18n";
// useHasHover：仅 hover 设备启用鼠标交互
import { useHasHover } from "@/hooks/useMediaQuery";

// 社交链接的类型（来自 profile.socials 的元素）
type SocialItem = {
  label: string;
  url: string;
};

/**
 * 单张社交卡片（带鼠标跟随高光）
 *  - 抽出子组件是为了能在每张卡里独立调用 useMotionValue（hooks 必须在组件顶层）
 *  - 鼠标移动时，在卡片内绘制一个跟随鼠标的柔和径向光晕
 */
function SocialCard({
  item,
  index,
}: {
  item: SocialItem;
  index: number;
}) {
  const setCursor = useUIStore((s) => s.setCursor);
  const hasHover = useHasHover();
  const cardRef = useRef<HTMLAnchorElement>(null);

  // 鼠标在卡片内的相对坐标（默认放到 -1000 远离屏幕，避免初始就显示）
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  // 拼接 radial-gradient：让光晕中心跟随鼠标
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, rgb(var(--accent) / 0.22), transparent 70%)`;

  // 鼠标移动：更新光晕中心
  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };
  // 鼠标离开：把光晕推回 -1000（视觉上"消失"）
  const handleLeave = () => {
    mx.set(-1000);
    my.set(-1000);
    setCursor("default");
  };

  return (
    <Magnetic strength={0.15}>
      <motion.a
        ref={cardRef}
        href={item.url}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setCursor("hover-link")}
        onMouseLeave={handleLeave}
        onMouseMove={hasHover ? handleMove : undefined}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE.expo, delay: index * 0.08 }}
        className="group relative flex h-32 items-end justify-between overflow-hidden bg-bg p-6 transition-colors duration-300 hover:bg-card"
      >
        {/* 跟随鼠标的高光层（仅 hover 设备）；放在内容下面（z-0），不影响点击 */}
        {hasHover && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: spotlight }}
          />
        )}
        {/* 内容层（z-10 浮在高光上） */}
        <span className="relative z-10 font-display text-2xl tracking-tight transition-colors group-hover:text-accent md:text-3xl">
          {item.label}
        </span>
        <ArrowUpRight
          size={24}
          className="relative z-10 text-fg/40 transition-all duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
        />
      </motion.a>
    </Magnetic>
  );
}

export default function ContactSection() {
  const profile = useProfile();
  const setCursor = useUIStore((s) => s.setCursor);
  const [toast, setToast] = useState(false);
  const { t } = useT();

  // 复制邮箱
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setToast(true);
      setTimeout(() => setToast(false), 1800);
    } catch {
      // 兜底：浏览器不支持 clipboard
      console.warn("Clipboard not supported");
    }
  };

  return (
    <section
      id={ANCHORS.CONTACT}
      className="relative overflow-hidden px-5 py-24 md:px-12 md:py-40"
    >
      {/* 背景柔和高光：双色径向渐变（跟随主题色） */}
      <div
        className="bg-aurora-contact pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      />

      <div className="ogs-container">
        {/* 内容外壳：实色大白卡（base44 "So what are we building" 同款）
            漂浮在重橙色渐变上，形成强烈反色对比 */}
        <div className="rounded-[28px] bg-card/95 p-8 shadow-[0_40px_100px_-40px_rgb(var(--accent)/0.45)] ring-1 ring-fg/5 backdrop-blur-md md:p-14">
        <SectionHeader
          num="04"
          tag={t("contact.tag")}
          title={
            <>
              {t("contact.titleA")}
              <span className="italic text-accent"> {t("contact.titleB")} </span>
              {t("contact.titleC")}
            </>
          }
        />

        {/* 大字号邮箱 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.9, ease: EASE.expo }}
          className="mb-16 md:mb-24"
        >
          <button
            onClick={copyEmail}
            onMouseEnter={() => setCursor("hover-card", "COPY")}
            onMouseLeave={() => setCursor("default")}
            className="group block w-full text-left"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-fg/40">
              {t("contact.emailLabel")}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="font-display text-[10vw] leading-none tracking-tightest transition-colors duration-500 group-hover:text-accent md:text-[8vw]">
                {profile.email}
              </span>
              <Copy
                size={28}
                className="hidden shrink-0 text-fg/40 transition-colors group-hover:text-accent md:block"
              />
            </div>
          </button>
        </motion.div>

        {/* 社交链接：每张卡都有独立的鼠标跟随高光（SocialCard 子组件） */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-fg/10 bg-fg/10 sm:grid-cols-2 md:grid-cols-4">
          {profile.socials.map((s, i) => (
            <SocialCard key={s.label} item={s} index={i} />
          ))}
        </div>

        {/* 彩蛋小字 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-fg/40"
        >
          <span className="h-px w-8 bg-fg/20" />
          {t("contact.ps")}
        </motion.div>
        </div>
      </div>

      <Toast visible={toast} message={t("contact.copied")} />
    </section>
  );
}
