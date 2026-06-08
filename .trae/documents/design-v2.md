# Design v2 设计宪法

> 灵感来源：[base44 Superagents](https://base44.com/superagents)（首页 + 子产品页）
> 应用范围：本作品集 redesign-v2 分支的视觉与交互系统
> 编写日期：2026-06-08

本文是后续所有视觉/动效改造的"参考标尺"。所有 UI 决策都必须能在本文找到依据。

---

## 一、核心设计语言（Design Principles）

| 原则 | 描述 |
|---|---|
| **暖白底 + 多层渐变** | 主背景是暖米白色 `#FAF9F7`，每个 section 各自叠加垂直渐变制造节奏 |
| **大尺寸标题，紧凑行高** | 衬线/手作风的大字号标题（68 / 40px），行高紧 1.1~1.2，制造海报感 |
| **几乎无圆角的"硬"卡片** | 圆角是非常小的 `borderRadius: 0px ~ 12px`，告别大圆角玻璃 |
| **不依赖阴影分层** | 主流卡片无投影 (`box-shadow: none`)，靠渐变 + 描边切分 |
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

我们采用**"暖米白底 + 多 section 各自垂直渐变"**的策略：

- **底色**：`bg-cream` `#FAF9F7`（整页通铺）
- **文字**：`#232529`
- **CTA**：`#FF983B`（橙）
- **章节渐变**：每个 section 都用一组**自上而下的 linear-gradient** 制造节奏，详见第 5 节实证渐变库

---

### 5. 渐变实证库（直接从 base44 主页 DOM 抓取）

> **重要**：base44 整站确实是渐变驱动的，但跟 v1 的"中央漂浮光球"完全不同。它是
> "**section 上半段同色 → 下半段涌现新色**"的**垂直渐变**。色彩在底部聚集，制造"沉淀感"。

下面是 5 段可直接复制使用的实证渐变 CSS（已从 base44 真实页面抓取）：

#### 🌅 渐变 A：Hero 顶部光晕（从画面外洒下的青蓝光）
```css
background:
  radial-gradient(42.4% 36.95% at 50% 50%, rgba(250, 249, 247, 0.7) 0%, rgba(250, 249, 247, 0) 100%),
  radial-gradient(97.22% 78.13% at 50% -17.36%, rgb(93, 179, 207) 22.39%, rgba(145, 201, 220, 0.56) 58.43%, rgba(250, 249, 247, 0) 85.73%);
background-color: #FAF9F7;
```
**心法**：光源 `at 50% -17.36%` 在画面**外的上方**，所以你看到的不是中央光球，而是从天上洒下来的光晕。下面再叠一层中心透明的暖白晕做提亮。

#### 🌸 渐变 B：内容卡块"灰 → 粉紫 → 淡青蓝"
```css
background: linear-gradient(
  rgb(240, 240, 240) 42.34%,
  rgb(240, 195, 236) 91.67%,
  rgb(204, 231, 233) 104.12%
);
```
**心法**：前 42% 几乎是同色（灰），到 91% 才出第二色（粉紫），到 104% 涌现第三色（淡青蓝）。这是 base44 招牌"色彩在底部聚集"配方。

#### 🌿 渐变 C：内容卡块"米 → 灰 → 亮黄绿"
```css
background: linear-gradient(
  rgb(242, 241, 237) 42.49%,
  rgb(213, 223, 224) 93.98%,
  rgb(229, 255, 148) 104.08%
);
```

#### ☀️ 渐变 D：内容卡块"米 → 淡黄 → 明黄"
```css
background: linear-gradient(
  rgb(237, 234, 228) 42.62%,
  rgb(249, 251, 201) 94.17%,
  rgb(254, 233, 105) 104.07%
);
```

#### 🔥 渐变 E：内容卡块"米 → 灰 → 红橙"（最戏剧）
```css
background: linear-gradient(
  0deg,
  rgb(255, 85, 0) -13.02%,
  rgb(219, 221, 218) 9.58%,
  rgb(245, 242, 236) 83.05%
);
```
**心法**：方向 `0deg` 是从下往上，所以红橙堆在底部。前 83% 都是米白，最后一段才"砰"地出现红橙，海报感拉满。

#### 🍊 渐变 F：Sendoff 大块橙色（CTA 区）
```css
background: radial-gradient(
  180.74% 100% at 50% 0%,
  rgb(255, 85, 0) 0%,
  rgb(255, 196, 148) 100%
);
```
**心法**：用 radial 但放大尺寸到 180.74%，从顶部铺开整页，效果接近"日落天空"。

---

### 6. 章节色彩规划（v2 各段用哪种渐变）

| Section | 背景策略 | 用哪段渐变 |
|---|---|---|
| **Hero** | 暖米白 + 顶部青蓝光晕 | 渐变 A |
| **About** | 米白 → 粉紫 → 淡青蓝 | 渐变 B |
| **Works (列表区)** | 米 → 淡黄 → 明黄（暖调暗中和卡片图） | 渐变 D |
| **Services** | 米 → 灰 → 红橙（戏剧化转场） | 渐变 E |
| **Contact** | 米白 → 亮黄绿（强调收尾） | 渐变 C |
| **Footer** | 大块红橙 → 蜜桃（情绪收尾） | 渐变 F |

> 这种"每段一个渐变"的节奏感，比 v1 的"整页通铺一种渐变"丰富 5 倍。

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

### 3. 反色色块（Inverse Block）— 可选

base44 部分子页（如 superagents）有大块深色 `#0F0F0F` 配亮色文字。**主页则没有用**。
v2 主线方案中 Services 段已改用**渐变 E（米 → 灰 → 红橙）**，所以反色色块仅作"备选样式"保留，未来若要做单独详情页或暗色子页时可启用：

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
│  - 渐变 A：暖米白 + 顶部青蓝光晕  │
│  - 极简：左对齐大标题 + CTA       │
│                                  │
├─────────────────────────────────┤
│ About（渐变 B：粉紫 → 青蓝）      │ <- py-32
│  - 双栏：左标题 + 右文案          │
│  - 渐变在底部聚集做"色彩沉淀"     │
├─────────────────────────────────┤
│ Works（渐变 D：淡黄 → 明黄）      │ <- py-40
│  - 头牌大卡 + 3 列网格            │
│  - 渐变暖底中和卡片图色           │
├─────────────────────────────────┤
│ Services（渐变 E：灰 → 红橙）     │ <- py-32
│  - 最戏剧化转场                   │
│  - 红橙堆在底部                   │
├─────────────────────────────────┤
│ Contact（渐变 C：灰 → 黄绿）      │ <- py-32
│  - 大字 + 邮箱 link              │
├─────────────────────────────────┤
│ Footer（渐变 F：橙 → 蜜桃）       │ <- 大块情绪收尾
└─────────────────────────────────┘
```

### 核心节奏：**"每段一组垂直渐变"** —— 章节自带"色彩呼吸"

base44 整页**不是**单调的米白通铺，而是"**每个 section 顶部都是相对中性的暖米/灰，到底部才涌现一抹强色**"。
连续多个 section 这样做，就形成了"米 → 粉紫 → 米 → 黄 → 米 → 红橙"这种**色彩节拍**，但每个交界处又是平滑的（因为新 section 顶部又回到中性色）。

**v2 实操要点**：
1. **每段独立**：每个 `<section>` 单独承载一组 `linear-gradient`，不要让渐变跨 section 流。
2. **底部聚色**：渐变停止点参考 base44 配方——前 42% 同色，91% 出第二色，104% 涌现第三色。
3. **Hero 例外**：Hero 用 `radial-gradient at 50% -17.36%`（光源在画面外上方），而不是 linear。
4. **不要中央光球**：v1 的"漂浮 blob + mix-blend"已经被 base44 模式取代，不需要保留。

---

## 八、改造路线图（Migration Roadmap）

下面是 v1 → v2 的具体改造任务清单。**每完成一项 push 一次**，让 Vercel 自动出预览。

### Phase 1：地基重置（Foundation）⚙️
- [ ] [tailwind.config.js](file:///Users/bytedance/Documents/trae_code/OGS_website/tailwind.config.js) 替换调色板为 v2 全套（含 6 色家族）
- [ ] [src/index.css](file:///Users/bytedance/Documents/trae_code/OGS_website/src/index.css) 把旧的 `bg-aurora-*` 渐变类**替换**为 base44 实证渐变 A~F（注册成新工具类如 `bg-grad-hero` / `bg-grad-about` 等）
- [ ] body 底色改成 `#FAF9F7`（暖米白），文字默认 `#232529`
- [ ] [HeroInteractiveBg.tsx](file:///Users/bytedance/Documents/trae_code/OGS_website/src/components/HeroInteractiveBg.tsx) 改造方向：**移除三球漂浮**，替换为 Hero 顶部 `radial-gradient`（渐变 A）实现的青蓝光晕；保留组件壳但内容简化
- [ ] 圆角 token 全局缩到 0~12px（卡片 4px，按钮 6-8px）

### Phase 2：核心组件（Components）🧱
- [ ] Button：改成方角小圆角 `rounded-md`（6-8px），主 CTA 用 `#FF983B`，无投影
- [ ] Card：去阴影、去玻璃，改硬卡 `bg-white border border-line-gray rounded-sm`（或承载段落渐变直接铺底）
- [ ] Header：背景透明，滚动时变 `bg-cream/80 backdrop-blur-sm`
- [ ] LanguageSwitcher / ThemeColorPicker：圆角缩到 6px

### Phase 3：Section 重做（Sections）🎨
- [ ] HeroSection：`bg-grad-hero`（渐变 A：米白 + 顶部青蓝 radial），左对齐巨大标题 + 单 CTA
- [ ] AboutSection：去掉白卡，整段铺 `bg-grad-about`（渐变 B：灰 → 粉紫 → 淡青蓝），双栏排版
- [ ] WorksSection：整段铺 `bg-grad-works`（渐变 D：米 → 淡黄 → 明黄），卡片改硬卡
- [ ] ServicesSection：整段铺 `bg-grad-services`（渐变 E：米 → 灰 → 红橙，最戏剧），文字用近黑
- [ ] ContactSection：整段铺 `bg-grad-contact`（渐变 C：灰 → 黄绿）+ 巨字邮箱
- [ ] Footer：整段铺 `bg-grad-footer`（渐变 F：橙 radial 收尾）

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
