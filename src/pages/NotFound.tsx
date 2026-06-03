/**
 * 404 页面：带返回首页的小彩蛋
 */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { ROUTES, EASE } from "@/constants";
// 多语言：t 翻译 UI 文案
import { useT } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useT();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE.expo }}
        className="font-display text-[28vw] leading-none tracking-tightest md:text-[16vw]"
      >
        4<span className="italic text-accent">0</span>4
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 max-w-sm text-fg/70"
      >
        {t("nf.desc")}
      </motion.p>
      <Link to={ROUTES.HOME} className="btn-outline mt-10">
        <ArrowLeft size={14} /> {t("nf.backHome")}
      </Link>
    </div>
  );
}
