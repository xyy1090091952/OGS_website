/**
 * 联系方式 Section
 * - 大字号邮箱（点击复制）
 * - 社交链接
 * - 底部彩蛋小动画
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, ArrowUpRight } from "lucide-react";
import { useProfile } from "@/hooks/useWorks";
import SectionHeader from "@/components/SectionHeader";
import Toast from "@/components/Toast";
import Magnetic from "@/components/Magnetic";
import { ANCHORS, EASE } from "@/constants";
import { useUIStore } from "@/store/uiStore";

export default function ContactSection() {
  const profile = useProfile();
  const setCursor = useUIStore((s) => s.setCursor);
  const [toast, setToast] = useState(false);

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
      {/* 背景柔和高光 */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 50% at 50% 100%, rgb(var(--accent) / 0.15) 0%, transparent 70%)",
        }}
      />

      <div className="ogs-container">
        <SectionHeader
          num="04"
          tag="Get In Touch"
          title={
            <>
              喜欢就
              <span className="italic text-accent"> 来聊聊 </span>?
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
              Email · Click to copy
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

        {/* 社交链接 */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-fg/10 bg-fg/10 sm:grid-cols-2 md:grid-cols-4">
          {profile.socials.map((s, i) => (
            <Magnetic key={s.label} strength={0.15}>
              <motion.a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setCursor("hover-link")}
                onMouseLeave={() => setCursor("default")}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE.expo, delay: i * 0.08 }}
                className="group relative flex h-32 items-end justify-between bg-bg p-6 transition-colors duration-300 hover:bg-card"
              >
                <span className="font-display text-2xl tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                  {s.label}
                </span>
                <ArrowUpRight
                  size={24}
                  className="text-fg/40 transition-all duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                />
              </motion.a>
            </Magnetic>
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
          P.S. 我也喜欢看猫的视频，欢迎一起分享。
        </motion.div>
      </div>

      <Toast visible={toast} message="邮箱已复制 · 期待你的消息" />
    </section>
  );
}
