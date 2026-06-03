/**
 * 顶部导航 Header
 * - 半透明吸顶
 * - 桌面端横排锚点 + 主题切换按钮
 * - 移动端汉堡菜单 + 全屏抽屉
 */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";
import { ANCHORS, ROUTES, EASE } from "@/constants";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrolled";
import { useT, type DictKey } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeColorPicker from "@/components/ThemeColorPicker";

// 导航项配置（label 改为 i18n key，避免硬编码）
const NAV_ITEMS: { labelKey: DictKey; anchor: string }[] = [
  { labelKey: "nav.home", anchor: ANCHORS.HOME },
  { labelKey: "nav.about", anchor: ANCHORS.ABOUT },
  { labelKey: "nav.works", anchor: ANCHORS.WORKS },
  { labelKey: "nav.contact", anchor: ANCHORS.CONTACT },
];

export default function Header() {
  const { theme, toggleTheme, menuOpen, setMenuOpen, setCursor } = useUIStore();
  const { t } = useT();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === ROUTES.HOME;
  // 滚动后 header 加上底色，避免和下方文字混在一起
  const scrolled = useScrolled(24);

  // 切换菜单时禁用 body 滚动
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // 点击锚点：如果在首页就 scroll，不在就跳到首页 + hash
  const handleNavClick = (anchor: string) => {
    setMenuOpen(false);
    if (isHome) {
      const el = document.getElementById(anchor);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`${ROUTES.HOME}#${anchor}`);
    }
  };

  // hover 时给鼠标添加状态
  const cursorOnEnter = () => setCursor("hover-link");
  const cursorOnLeave = () => setCursor("default");

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-500 ease-expo",
          scrolled
            ? "bg-bg/75 backdrop-blur-lg"
            : "bg-bg/0 backdrop-blur-md"
        )}
      >
        {/* 顶部细线（柔和分隔） */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-px transition-opacity duration-500",
            scrolled ? "bg-fg/15 opacity-100" : "opacity-0"
          )}
        />
        <nav className="ogs-container flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <Link
            to={ROUTES.HOME}
            onMouseEnter={cursorOnEnter}
            onMouseLeave={cursorOnLeave}
            className="font-display text-lg italic tracking-tight md:text-xl"
          >
            <span className="text-accent">@</span>Old_glasses
          </Link>

          {/* 桌面端导航 */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.anchor}>
                <button
                  onClick={() => handleNavClick(item.anchor)}
                  onMouseEnter={cursorOnEnter}
                  onMouseLeave={cursorOnLeave}
                  aria-label={t(item.labelKey)}
                  className="group relative font-mono text-xs uppercase tracking-widest"
                >
                  <span className="mr-2 text-fg/40">0{i + 1}</span>
                  <span className="transition-colors duration-300 group-hover:text-accent">
                    {t(item.labelKey)}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* 右侧：语言切换 + 主题色切换 + 主题切换 + 移动端菜单 */}
          <div className="flex items-center gap-2">
            {/* 桌面端：完整三段语言胶囊 */}
            <div className="hidden md:block">
              <LanguageSwitcher compact />
            </div>
            {/* 主题色（accent）切换：桌面端显示，移动端在抽屉里显示 */}
            <div className="hidden md:block">
              <ThemeColorPicker />
            </div>
            <button
              onClick={toggleTheme}
              onMouseEnter={cursorOnEnter}
              onMouseLeave={cursorOnLeave}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-fg/20 transition-colors duration-300 hover:bg-fg/5"
              aria-label={t("nav.themeAria")}
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-fg/20 md:hidden"
              aria-label={t("nav.menuAria")}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* 移动端全屏菜单 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE.expo }}
            className="fixed inset-0 z-30 flex flex-col items-start justify-center bg-bg pl-8 md:hidden"
          >
            <ul className="space-y-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.anchor}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, ease: EASE.expo, duration: 0.6 }}
                >
                  <button
                    onClick={() => handleNavClick(item.anchor)}
                    className={cn(
                      "font-display text-5xl italic tracking-tight",
                      "transition-colors duration-300 hover:text-accent"
                    )}
                  >
                    <span className="mr-3 font-mono text-xs not-italic text-fg/40">
                      0{i + 1}
                    </span>
                    {t(item.labelKey)}
                  </button>
                </motion.li>
              ))}
            </ul>
            {/* 移动端菜单底部：完整语言切换 + 主题色切换 */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ease: EASE.expo, duration: 0.6 }}
              className="mt-16 flex items-center gap-3"
            >
              <LanguageSwitcher />
              <ThemeColorPicker />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
