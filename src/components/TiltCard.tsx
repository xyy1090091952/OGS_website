/**
 * 鼠标 3D 倾斜卡片（Tilt Card）
 * - 鼠标在卡片内移动时，整张卡按鼠标位置做轻微 3D 倾斜
 * - 鼠标离开时平滑回到水平
 * - 灵感来源：Apple 产品页 / Awwwards 设计奖站
 *
 * 实现要点：
 * - useMotionValue 持续跟踪鼠标位置百分比 (-0.5 ~ 0.5)
 * - useTransform 把百分比映射到 X/Y 轴旋转角度
 * - useSpring 让旋转过渡更柔和
 * - perspective 让 3D 真实可见
 */
import { type ReactNode, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  // 最大倾斜角度（度），默认 8°
  maxTilt?: number;
  // 透视距离（越大越柔和），默认 1000
  perspective?: number;
  // 是否启用悬停时整体微缩放
  scale?: boolean;
  style?: MotionStyle;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  perspective = 1000,
  scale = true,
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  // 鼠标在卡片内的相对位置（-0.5 ~ 0.5）
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // spring 让运动更柔和、有惯性
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  // 把 -0.5 ~ 0.5 映射到旋转角度
  // 注意 X 轴方向相反：鼠标在上半 → 卡片往后仰
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // 计算鼠标在卡片内的百分比，再减 0.5 让 0 点位于卡片中心
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // perspective 必须放在父级，让 3D 旋转可见
      style={{ perspective, ...style }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={scale ? { scale: 1.02 } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
