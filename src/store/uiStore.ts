/**
 * 全局状态：主题 / 菜单 / 自定义鼠标
 * 使用 zustand 集中管理，避免多组件 prop drilling
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";
// 鼠标交互状态：default = 默认；hover-link = 悬停链接；hover-card = 悬停作品卡
type CursorVariant = "default" | "hover-link" | "hover-card";

interface UIState {
  // 主题
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;

  // 移动端菜单开关
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;

  // 自定义鼠标
  cursorVariant: CursorVariant;
  cursorLabel: string; // 鼠标悬停作品卡时显示的小文字（如 "VIEW"）
  setCursor: (variant: CursorVariant, label?: string) => void;
}

// 检测系统深浅色偏好（作为初始默认）
const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: getSystemTheme(),
      setTheme: (t) => set({ theme: t }),
      toggleTheme: () =>
        set({ theme: get().theme === "light" ? "dark" : "light" }),

      menuOpen: false,
      setMenuOpen: (v) => set({ menuOpen: v }),

      cursorVariant: "default",
      cursorLabel: "",
      setCursor: (variant, label = "") =>
        set({ cursorVariant: variant, cursorLabel: label }),
    }),
    {
      // 仅持久化主题偏好，菜单和鼠标状态不持久化
      name: "ogs-ui",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
