/**
 * 章节标题：包含编号 + 标签 + 大字标题
 * 在多个 Section 中复用，避免代码重复
 */
import { motion } from "framer-motion";
import { EASE } from "@/constants";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  num: string; // 编号，如 "01"
  tag: string; // 小标签，如 "ABOUT"
  title: React.ReactNode; // 大标题
  className?: string;
}

export default function SectionHeader({
  num,
  tag,
  title,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-20", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE.expo }}
        className="mb-4 flex items-center gap-4"
      >
        <span className="font-mono text-xs tracking-widest text-fg/40">{num}</span>
        <span className="h-px w-8 bg-fg/30" />
        <span className="font-mono text-xs uppercase tracking-widest text-fg/60">
          {tag}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE.expo, delay: 0.1 }}
        className="font-display text-4xl leading-[1.05] tracking-tightest md:text-6xl lg:text-7xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
