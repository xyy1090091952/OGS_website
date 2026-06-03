/**
 * Toast 提示（轻量级，仅用于复制邮箱反馈）
 */
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { EASE } from "@/constants";

interface ToastProps {
  visible: boolean;
  message: string;
}

export default function Toast({ visible, message }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: EASE.expo }}
          className="fixed bottom-8 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-2 rounded-full bg-fg px-5 py-3 text-sm text-bg shadow-xl"
        >
          <Check size={16} />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
