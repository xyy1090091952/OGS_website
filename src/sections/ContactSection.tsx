/**
 * 联系方式 Section（v2：base44 风）
 * - 整段铺渐变 C：米 → 灰 → 亮黄绿（强调收尾）
 * - 大字号邮箱（点击复制）
 * - 社交链接：方角硬卡，hover 仅 transform，无光斑
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, ArrowUpRight } from "lucide-react";
import { useProfile } from "@/hooks/useWorks";
import SectionHeader from "@/components/SectionHeader";
import Toast from "@/components/Toast";
import { ANCHORS, EASE } from "@/constants";
import { useUIStore } from "@/store/uiStore";
// 多语言：t 翻译 UI 文案
import { useT } from "@/lib/i18n";

// 社交链接的类型（来自 profile.socials 的元素）
type SocialItem = {
  label: string;
  url: string;
};

/**
 * 单张社交卡片（v2：方角硬卡 + hover 上移）
 *  - 删除了原来的"鼠标跟随高光"光斑（base44 不用这种装饰）
 */
function SocialCard({
  item,
  index,
}: {
  item: SocialItem;
  index: number;
}) {
  const setCursor = useUIStore((s) => s.setCursor);

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setCursor("hover-link")}
      onMouseLeave={() => setCursor("default")}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.6, ease: EASE.expo, delay: index * 0.08 }}
      className="group relative flex h-32 items-end justify-between overflow-hidden border border-fg/15 bg-card p-6 transition-colors duration-300"
    >
      <span className="relative z-10 font-display text-2xl tracking-tight transition-colors group-hover:text-accent md:text-3xl">
        {item.label}
      </span>
      <ArrowUpRight
        size={24}
        className="relative z-10 text-fg/40 transition-all duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
      />
    </motion.a>
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
      // bg-grad-contact：渐变 C 米 → 灰 → 亮黄绿（强调收尾）
      className="bg-grad-contact relative overflow-hidden px-5 py-24 md:px-12 md:py-40"
    >
      <div className="ogs-container">
        {/* v2：去掉旧的"玻璃卡"包裹，让段落渐变直接透出 */}
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

        {/* 社交链接：方角硬卡 + 细分隔 */}
        <div className="grid grid-cols-1 gap-px bg-fg/15 sm:grid-cols-2 md:grid-cols-4">
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

      <Toast visible={toast} message={t("contact.copied")} />
    </section>
  );
}
