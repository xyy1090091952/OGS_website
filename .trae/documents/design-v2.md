# Design v2 设计宪法

> 灵感来源：[base44 Superagents](https://base44.com/superagents)（首页 + 子产品页）
> 应用范围：本作品集 redesign-v2 分支的视觉与交互系统
> 编写日期：2026-06-08

本文是后续所有视觉/动效改造的"参考标尺"。所有 UI 决策都必须能在本文找到依据。

---

## 一、核心设计语言（Design Principles）

| 原则 | 描述 |
|---|---|
| **暖白底 + 实色块** | 主背景是暖米白色 `#FAF9F7`，靠"色块"而非"渐变"切分节奏 |
| **大尺寸标题，紧凑行高** | 衬线/手作风的大字号标题（68 / 40px），行高紧 1.1~1.2，制造海报感 |
| **几乎无圆角的"硬"卡片** | 圆角是非常小的 `borderRadius: 0px ~ 4px`，强调编辑设计感 |
| **不依赖阴影分层** | 主流卡片无投影 (`box-shadow: none`)，靠色块 + 描边切分 |
| **限定色但用得克制** | 调色板很丰富，但每个 section 只用 1-2 种主色，避免视觉杂乱 |
| **大量留白** | section 之间间距 96~160px，内容之间间距 32~48px |
| **图片优先于装饰** | 每个 section 都配有真实的产品截图/示意 mock，而非纯文字 |

---

## 二、色彩系统（Color Tokens）

实际从 base44 抓取的完整调色板（共 6 套色彩家族 + 中性色 + 交互色）。**redesign-v2 不需要全部用上**，挑选部分作为我们的主调。

### 1. 中性色（Neutrals）—— 必用

| 名称 | HEX | 用途 |
|---|---|---|
| `bg-cream` | `#FAF9F7` | **主背景**：整站底色（替代当前的纯白） |
| `bg-white` | `#FFFFFF` | 卡片底 / 高亮区域 |
| `ink-near-black` | `#232529` | **主文字**（不是纯黑，更柔和） |
| `ink-pure-black` | `#000000` | 强调标题 / 按钮文字 |
| `mute-gray` | `#727272` | 次级文字 / 说明 |
| `line-gray` | `#B0B0B0` | 描边 / 分隔线 |

### 2. 强调色（Accent）—— 我们的"主题色"

| 名称 | HEX | 用途 |
|---|---|---|
| `accent-orange` | `#FF983B` | **主 CTA 按钮**（hover 状态保持同色） |
| `accent-orange-deep` | `#FF631F` | 文字 / icon 强调（base44 logo 同款） |
| `accent-orange-burnt` | `#C94001` | 极少量重点强调 |
| `accent-orange-light` | `#FFE9DF` | 大色块背景（"色卡"section） |

### 3. 配色家族（Color Families）—— 用作"色块章节"

每个 section 可以选一个家族给整段铺色：

#### 🟦 蓝色家族（Sky）
| 名称 | HEX |
|---|---|
| `sky-50` | `#DCE8FF` |
| `sky-200` | `#95B9FF` |
| `sky-700` | `#094BCC` |
| `sky-900` | `#082F7B` |

#### 🟩 绿色家族（Sage）
| 名称 | HEX |
|---|---|
| `sage-50` | `#F3F8F0` |
| `sage-200` | `#D2E4C7` |
| `sage-500` | `#92B079` |
| `sage-700` | `#618741` |
| `sage-900` | `#39641D` |

#### 🟫 棕色家族（Earth）
| 名称 | HEX |
|---|---|
| `earth-50` | `#F2EAE7` |
| `earth-200` | `#E5CEC0` |
| `earth-500` | `#A9806F` |
| `earth-700` | `#8B614F` |
| `earth-900` | `#633C2B` |

#### 🟧 橙色家族（Sunset）
| 名称 | HEX |
|---|---|
| `sunset-50` | `#FFE9DF` |
| `sunset-200` | `#FFBFA1` |
| `sunset-500` | `#FA854F` |
| `sunset-700` | `#FF631F` |
| `sunset-900` | `#C94001` |

#### 🟡 装饰色（点缀）
- `lime-pop` `#EBFFB1`（用于"小标签 / 高亮卡 / 引号块"）

### 4. 主题色应用建议（v2 配色策略）

我们采用**"暖米白 + 暖橙强调 + 多家族色块章节"**的策略：

- **底色**：`bg-cream` `#FAF9F7`
- **文字**：`#232529`
- **CTA**：`#FF983B`（橙）
- **章节色块**（按 section 轮换）：
  - Hero → 暖米白 + 大幅留白
  - About → `sage-50` 浅绿底
  - Works → 暖米白 + 卡片用 `sky-50` / `earth-50` / `sunset-50` 三色循环
  - Services → 实色 `#000000` 反色块
  - Contact → `lime-pop` `#EBFFB1` 高饱和小色块

---

## 三、字体系统（Typography）

base44 用了 **Miso（衬线感几何字体）+ Wix Madefor Text（无衬线正文）**。我们换成可访问的等价字体：

| 角色 | base44 实际 | v2 替代 |
|---|---|---|
| 大标题 H1 | Miso Regular | **Instrument Serif** / Fraunces / DM Serif Display |
| 副标题 H2~H4 | Miso Light | 同上（更细字重） |
| 正文 / UI | Wix Madefor Text | **Inter** / IBM Plex Sans |
| 数字 / 等宽 | （无） | **Geist Mono** / JetBrains Mono（用于年份、坐标） |

> 当前项目已经在用衬线大字（Playfair Display / Instrument Serif），只需要把字号 / 行高调整成 base44 风格。

### 字号阶梯（基于 1920 viewport）

| 角色 | font-size | line-height | font-weight |
|---|---|---|---|
| **Hero H1** | clamp(56px, 6vw, **88px**) | **1.05** | 400 |
| **Section H2** | clamp(40px, 4vw, **64px**) | **1.1** | 400 |
| **Card H3** | clamp(24px, 2vw, **40px**) | **1.15** | 400 |
| **Subheading** | 24px | 1.3 | 400 |
| **Body Large** | 20px | 1.4 | 400 |
| **Body** | 16~18px | 1.4 | 400 |
| **Caption** | 12~14px | 1.4 | 400 / uppercase |

### 字符样式
- 大标题**不使用 letter-spacing**（normal）
- 小号 caption / label 用 `letter-spacing: 0.08em` + `text-transform: uppercase`

---

## 四、几何系统（Radius & Spacing）

### 圆角（Radius）

base44 几乎不使用圆角。卡片 `border-radius: 0`，按钮 `border-radius: 4-8px`。**这是 v2 与 v1 最大的区别**——告别"大圆角玻璃卡"。

| 元素 | v1（当前） | v2（新） |
|---|---|---|
| 大卡片 | 28~32px | **0px 或 4px**（直角硬卡） |
| 小按钮 | 圆角药丸 | **4-8px**（轻微圆角） |
| 输入框 | 12px | **4px** |
| 头像 / icon 容器 | 16px | **0px / 完整圆**（极端化） |
| pill / 标签 | 999px | **999px**（保留药丸） |

### 间距（Spacing）

| 用途 | px | tailwind |
|---|---|---|
| Section 上下 padding | 120~160px | py-32 / py-40 |
| 内容块间距 | 64~96px | gap-16 / gap-24 |
| 卡片内 padding | 32~48px | p-8 / p-12 |
| 图文标题间距 | 24px | gap-6 |
| 容器最大宽度 | 1280~1440px | max-w-7xl |

---

## 五、组件规范（Component Specs）

### 1. 按钮（Button）

#### 主按钮（CTA）
```css
background: #FF983B;
color: #FFFFFF;
border-radius: 6px;
padding: 16px 32px;
font-size: 16px;
font-weight: 500;
border: none;
box-shadow: none;
transition: transform 200ms ease;

/* hover */
transform: translateY(-2px);
background: #FF983B; /* 不变色 */
```

#### 副按钮（Secondary）
```css
background: transparent;
color: #232529;
border: 1px solid #232529;
border-radius: 6px;
padding: 15px 31px; /* 减 1px 给 border */
```

### 2. 卡片（Card）

```css
background: #FFFFFF;        /* 或家族色 */
border: 1px solid #B0B0B0;  /* 可选 */
border-radius: 4px;          /* 几乎没圆角 */
padding: 32px;
box-shadow: none;            /* 无投影！ */
```

**hover 仅做轻微 transform**，不要加阴影：
```css
transition: transform 300ms ease, border-color 300ms ease;
&:hover {
  transform: translateY(-4px);
  border-color: #232529;
}
```

### 3. 反色色块（Inverse Block）

base44 有几个 section 用大块深色 `#0F0F0F` 配亮色文字。我们可以在 Services 段使用：

```css
background: #0F0F0F;
color: #FFFFFF;

/* 内部强调元素 */
.accent {
  color: #EBFFB1; /* lime-pop */
}
```

### 4. 章节标题排版（Section Header）

```jsx
<header className="space-y-4">
  <p className="text-xs uppercase tracking-[0.12em] text-[#727272]">
    Section / 02
  </p>
  <h2 className="font-serif text-5xl md:text-6xl leading-[1.1]">
    Section title.
  </h2>
</header>
```

---

## 六、动效规范（Motion）

base44 整体动效**克制冷静**，主要靠：

- 入场：`opacity` 0 → 1 + `translateY(20px)` → 0，时长 600ms
- hover：纯 transform（translateY(-4px) / scale(1.02)）
- 没有视差、没有粘性鼠标跟随、没有夸张倾斜

**v2 动效原则**：
- 删除所有"鼠标跟随光斑 / spotlight"
- 删除所有"3D 倾斜 tilt"
- 保留：滚动入场 fade-up、按钮 hover lift、磁吸（弱化）
- 新增：图片 hover 时**轻微放大 1.04**（带 800ms ease-out 缓动）

---

## 七、布局节奏（Layout Rhythm）

### 全局布局
```
┌─────────────────────────────────┐
│ Header（固定，背景 transparent）   │ <- 64px 高
├─────────────────────────────────┤
│                                  │
│ Hero（全屏）                     │ <- min-h-[80vh]
│  - 极简：左对齐大标题 + CTA       │
│  - 不要复杂动效，留白制胜         │
│                                  │
├─────────────────────────────────┤
│ About（暖米白）                  │ <- py-32
│  - 双栏：左标题 + 右文案          │
│  - 不再是"大白卡"，直接铺底       │
├─────────────────────────────────┤
│ Works（暖米白 + 彩色卡片）        │ <- py-40
│  - 头牌大卡 + 3 列网格            │
│  - 卡片用家族色循环（蓝/棕/绿）    │
├─────────────────────────────────┤
│ Services（深色反色块）            │ <- py-32
│  - 全黑背景 + 亮色文字            │
│  - 6 张图标卡片                   │
├─────────────────────────────────┤
│ Contact（lime-pop 亮黄绿）        │ <- py-32
│  - 大字 + 邮箱 link              │
├─────────────────────────────────┤
│ Footer（深色）                    │
└─────────────────────────────────┘
```

### 核心节奏：**"颜色块 → 颜色块"** 不是"渐变 → 渐变"

base44 整页是"米白 → 米白 → 米白 → 黑 → 黄绿 → 黑"这种**硬切**的节奏，不像 v1 是渐变背景一路融合。我们要**拥抱硬切**。

---

## 八、改造路线图（Migration Roadmap）

下面是 v1 → v2 的具体改造任务清单。**每完成一项 push 一次**，让 Vercel 自动出预览。

### Phase 1：地基重置（Foundation）⚙️
- [ ] [tailwind.config.js](file:///Users/bytedance/Documents/trae_code/OGS_website/tailwind.config.js) 替换调色板为 v2 全套
- [ ] [src/index.css](file:///Users/bytedance/Documents/trae_code/OGS_website/src/index.css) 删除所有 `bg-aurora-*` 渐变类
- [ ] body 底色改成 `#FAF9F7`
- [ ] 删除 [HeroInteractiveBg.tsx](file:///Users/bytedance/Documents/trae_code/OGS_website/src/components/HeroInteractiveBg.tsx)（v2 不要漂浮球）
- [ ] 圆角 token 全局缩到 4px

### Phase 2：核心组件（Components）🧱
- [ ] Button：改成方角小圆角 `rounded`，主 CTA 用 `#FF983B`
- [ ] Card：去阴影、去玻璃、改硬卡 `bg-white border border-line-gray rounded-sm`
- [ ] Header：背景透明，滚动时变 `bg-cream/80 backdrop-blur-sm`
- [ ] LanguageSwitcher / ThemeColorPicker：圆角缩到 6px

### Phase 3：Section 重做（Sections）🎨
- [ ] HeroSection：删互动背景，纯暖米白底 + 巨大左对齐标题 + 单 CTA
- [ ] AboutSection：去掉白卡，直接铺 `sage-50` 底，双栏排版
- [ ] WorksSection：卡片改硬卡，按 family 循环上色（sky/earth/sunset）
- [ ] ServicesSection：整段反色 `#0F0F0F`，亮色字 + lime-pop 强调
- [ ] ContactSection：大块 `lime-pop` 黄绿底 + 巨字邮箱

### Phase 4：动效收敛（Motion Cleanup）🎬
- [ ] 删除 SpotlightCard / TiltCard 用法
- [ ] 删除 WorkCard 的 3D tilt
- [ ] 保留 fadeUp / button lift / image scale
- [ ] 磁吸效果减弱（max 6px → max 3px）

### Phase 5：细节打磨（Polish）✨
- [ ] 标题首字母 `font-feature-settings: "ss01"`（如果字体支持花式开头）
- [ ] 数字 / 年份用等宽字体 `font-mono`
- [ ] 滚动时显示左侧细线进度条（base44 风格）
- [ ] 404 / 详情页按 v2 重做

---

## 九、不变的（Inheritance）

以下 v1 功能保留，不做大改：

- ✅ 多语言（中/英/日）切换
- ✅ 暗色模式（v2 暗色版色板待补充）
- ✅ Lenis 平滑滚动
- ✅ React Router 多页路由
- ✅ Zustand 全局状态
- ✅ 现有所有数据结构（Work / Profile / Service / TimelineItem）

---

## 十、参考链接

- 原型：https://base44.com/superagents
- base44 主站（更多 section 风格参考）：https://base44.com
- 字体：[Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) / [Inter](https://fonts.google.com/specimen/Inter)
- 抓取自实际 DOM 的色值已在第二节列出，可以信任作为最终设计 token
