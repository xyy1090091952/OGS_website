/**
 * 服务能力数据
 * 集中维护，组件只负责渲染
 */
import type { ServiceItem } from "./types";

export const services: ServiceItem[] = [
  {
    id: "experience",
    num: "01",
    title: "体验设计",
    desc: "从信息架构到细节交互，让产品好用又有温度。",
    bullets: ["UX 研究", "用户旅程", "交互设计", "设计系统"],
  },
  {
    id: "ui",
    num: "02",
    title: "界面与品牌",
    desc: "为不同行业的品牌建立独特的视觉语言。",
    bullets: ["UI 视觉", "品牌识别", "Logo / VI", "插画系统"],
  },
  {
    id: "motion",
    num: "03",
    title: "动画与动效",
    desc: "让品牌动起来——从 Logo 演绎到产品过场。",
    bullets: ["品牌动画", "UI 动效", "Loading", "过渡效果"],
  },
  {
    id: "video",
    num: "04",
    title: "视频与剪辑",
    desc: "短片、纪录片、产品宣传片的全流程创作。",
    bullets: ["短片", "宣传片", "纪录片", "剪辑/调色"],
  },
];
