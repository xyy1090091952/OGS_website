/**
 * Marquee 横向滚动条：滚动展示关键词
 * 在 Hero 与作品集之间作为视觉过渡
 */
import { motion } from "framer-motion";
import { Asterisk } from "lucide-react";

const ITEMS = [
  "Experience Design",
  "UI / UX",
  "Brand Identity",
  "Motion Graphics",
  "Video Production",
  "Illustration",
  "Editorial",
  "Creative Coding",
];

export default function Marquee() {
  // 通过重复 + 无限平移实现循环
  const list = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-fg/10 py-6 md:py-8">
      <motion.div
        className="flex shrink-0 items-center gap-10 whitespace-nowrap"
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {list.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-3xl italic tracking-tight md:text-5xl"
          >
            {item}
            <Asterisk size={20} className="text-accent" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
