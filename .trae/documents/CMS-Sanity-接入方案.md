# Sanity CMS 接入方案

> 目标：把目前写死在 ts 文件里的所有内容（作品、个人信息、服务、首页文案 / 多语言）
> 全部搬到 Sanity，让你能在一个**像 Notion 一样的可视化后台**里编辑，
> 网站自动同步更新。
>
> 决策记录：
> - 方案：Sanity（Headless CMS）
> - 部署：暂未确定（开发阶段先在本地）
> - 图片：Sanity 自带图床
> - 范围：作品 + 个人信息 + 服务 + 首页文案/i18n

---

## 一、Sanity 是什么（一句话版）

> 一个**网页版后台**（叫 Sanity Studio）+ 一个**云端数据存储 + 图床**。
> 你在 Studio 里点点点编辑内容，网站从云端拉数据展示。
> 完全免费，不需要服务器，不需要数据库。

实际编辑长这样：

```
点击 Works → 新增 → 填表（标题/副标题/标签）→ 拖图 → 发布
                                                ↓
                                         网站几秒后更新
```

---

## 二、整体架构（修改前 vs 修改后）

### 修改前（当前）

```
┌──────────────────────────────────────┐
│  你的 React 网站                      │
│                                      │
│  src/data/works.ts   ← 写死的作品数据 │
│  src/data/profile.ts ← 写死的个人信息 │
│  src/data/services.ts                │
│  src/lib/i18n.ts     ← 写死的多语言   │
│                                      │
│  → 改内容只能改代码 + 重新发布         │
└──────────────────────────────────────┘
```

### 修改后

```
┌──────────────────────┐         ┌──────────────────────┐
│  Sanity Studio       │ 编辑    │  Sanity 云           │
│  （编辑后台 / 网页） │ ──────→ │  （数据 + 图床）     │
└──────────────────────┘         └──────────┬───────────┘
                                             │ HTTP API
                                             ↓
                                  ┌──────────────────────┐
                                  │  你的 React 网站      │
                                  │  hooks 调 Sanity     │
                                  │  拿到数据渲染        │
                                  └──────────────────────┘
```

---

## 三、Schema 设计（你将来在后台看到的字段）

### 1. Work（作品）

| 字段名 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `title` | 多语言文本 | ✅ | 作品标题（中/英/日三个语言版） |
| `slug` | URL 标识 | ✅ | 路径，如 `genius-studio`，自动从标题生成 |
| `subtitle` | 多语言文本 |  | 作品副标题 |
| `client` | 多语言文本 |  | 客户名 |
| `year` | 数字 | ✅ | 年份 |
| `category` | 单选 | ✅ | UX / Brand / Motion / Web 等 |
| `tags` | 文字数组 |  | 标签（如 "logo", "guideline"） |
| `cover` | 图片 | ✅ | 封面图（拖进去就行） |
| `gallery` | 图片数组 |  | 详情页图集 |
| `description` | 富文本（多语言） |  | 详细描述（带格式：粗体、链接、列表等） |
| `accentBg` | 颜色 |  | 卡片背景色（颜色选择器） |
| `link` | URL |  | 外部链接（如有） |
| `featured` | 布尔 |  | 是否为头牌作品（首页大卡） |
| `order` | 数字 |  | 排序权重 |

### 2. Profile（个人信息，单例）

```
basic：
  · name             单语言文本
  · handle           文本
  · email            文本
  · location         多语言文本
  · since            数字（如 2016）

bio：
  · 三段正文         多语言富文本

keywords：
  · 多语言数组（每个关键词中/英/日各一份）

socials：
  · 数组：{ label, url }

timeline：
  · 数组：{ year: 数字, title: 多语言, desc: 多语言 }
```

### 3. Service（服务）

```
· title            多语言文本
· description      多语言文本
· keywords         多语言文本数组
· accent           是否反色卡片
· order            排序
```

### 4. UI Strings（多语言文案，单例）

> Hero CTA、各 section 的 tag/标题/副文案等都放这里
> 用一个大对象，每个 key 对应三种语言

```
hero:
  · ctaPrimary        多语言文本
  · ctaSecondary      多语言文本
  · titleA / titleB   多语言文本
  ...
about:
  · tag, titleA, titleB, titleC, profile, based, since, focus, mood, ...
works:
  · tag, title, ...
contact:
  · tag, titleA, titleB, ...
nav / footer / common ...
```

> ✨ 备注：i18n.ts 现在的所有 key 都对应到这里。Schema 跟 ts 里的结构一致，迁移时一一对应。

---

## 四、实施步骤（每一步都独立可验证）

### Phase 1：搭骨架（我做）

- [ ] 1.1 注册 Sanity 账号（你做：去 sanity.io 注册一个）
- [ ] 1.2 在项目根目录初始化 Sanity Studio（我做）
  - 命令：`npm create sanity@latest`
  - 会在 `studio/` 目录生成 Studio 工程
- [ ] 1.3 写 schema 文件（我做）
  - `studio/schemas/work.ts`
  - `studio/schemas/profile.ts`
  - `studio/schemas/service.ts`
  - `studio/schemas/uiStrings.ts`
- [ ] 1.4 启动 Studio（你做：`cd studio && npm run dev`，浏览器打开 localhost:3333）
  - **验证**：你能看到一个空的可视化后台

### Phase 2：迁移数据（我做）

- [ ] 2.1 写一个 Node 迁移脚本，把 `works.ts/profile.ts/services.ts/i18n.ts` 的内容
       自动批量导入到 Sanity（用 `@sanity/client`）
- [ ] 2.2 图片：先把 `public/works/*` 里现有的封面图通过脚本上传到 Sanity 图床
- [ ] 2.3 你登录 Studio 后会看到：所有作品 / 个人信息 / 服务 / 文案都在了
  - **验证**：在 Studio 里随便改一个标题，保存

### Phase 3：前端接线（我做）

- [ ] 3.1 安装 `@sanity/client` + `@sanity/image-url`
- [ ] 3.2 新建 `src/lib/sanityClient.ts`：封装 client + 拼图片 URL 的函数
- [ ] 3.3 改 `src/hooks/useWorks.ts`：从 import 本地 ts 改成
       `useEffect` 调 Sanity API，状态用 React state 持有
- [ ] 3.4 同样改 profile / services / i18n 的 hooks
- [ ] 3.5 处理 Loader：数据未到时显示 Loading
  - **验证**：网站打开能正常显示，跟之前一样，但内容来自 Sanity

### Phase 4：日常使用（你做）

- [ ] 4.1 浏览器收藏 Studio 地址（开发阶段是 `localhost:3333`）
- [ ] 4.2 教学：怎么新增作品、怎么改文案
- [ ] 4.3 可选：写一份操作手册放在文档目录

### Phase 5（以后再说）：把 Studio 部署到线上

- [ ] 5.1 跑 `npx sanity deploy`，给 Studio 一个公网网址（如 `old-glasses.sanity.studio`）
- [ ] 5.2 这样你**手机上也能改内容**了
- [ ] 5.3 这步可以等你网站正式部署时一起做

---

## 五、文件结构变化

### 新增

```
studio/                          ← Sanity 后台工程（独立 npm 项目）
  schemas/
    work.ts
    profile.ts
    service.ts
    uiStrings.ts
    index.ts                     ← 导出所有 schema
  sanity.config.ts
  package.json
  ...

src/lib/sanityClient.ts          ← 前端调 Sanity API 的封装
```

### 修改

```
src/hooks/useWorks.ts            ← 数据源换成 Sanity API
src/lib/i18n.ts                  ← dict 改成动态从 Sanity 拉
.env.local                       ← 新增 SANITY_PROJECT_ID 等环境变量
```

### 保留（短期）

```
src/data/works.ts                ← 暂不删，作为数据迁移参考
src/data/profile.ts              ← 同上
src/data/services.ts             ← 同上
```

> 验证全部 OK 后再删 data 目录。

---

## 六、几个需要事先约定的小事

### 1. 多语言怎么存？
Sanity 官方推荐两种：
- **A. 文档级**（每个语言一份完整文档）：复杂，不推荐
- **B. 字段级**（一个文档，每个字段是 `{zh, en, ja}` 对象）：简单，**我们用这个**

### 2. 富文本怎么处理？
Sanity 的富文本叫 **Portable Text**（不是 Markdown）。
富文本字段在 React 里用 `@portabletext/react` 渲染。
作品详情的多段文字会受益（可以加粗、加链接、嵌图）。

### 3. 内容拉数据策略
两个选择：
- **A. 客户端实时拉**（开发简单，每次访问都请求 Sanity）
- **B. 构建时拉 + 静态生成**（性能最好，但 Vite 不直接支持，需 SSG 改造）

> **建议先用 A**，等部署后量大了再升级到 B。

### 4. Sanity 免费额度
- 用户数：3 个
- 数据存储：500K 个 document
- 图床：5GB
- API 请求：100K / 月（个人作品集完全够）

### 5. 备份
Sanity 有内建的版本历史 + 一键导出 ndjson。
重要数据丢了也能找回。

---

## 七、风险与应对

| 风险 | 应对 |
|---|---|
| Sanity 服务挂了 / 跑路 | 数据可一键导出 ndjson，迁移到任何 CMS |
| 免费额度超了 | 单人网站基本不可能超；超了升级 39 美元/月 |
| 网络访问慢（国内） | Sanity 全球 CDN，国内一般 200ms 内；如果不行可前置 Cloudflare 缓存 |
| 学习成本 | Studio UI 像 Notion，10 分钟上手；schema 写一次后基本不用动 |

---

## 八、下一步

请你：
1. 通读这份方案，看看哪里有疑问 / 不同意的
2. 去 https://www.sanity.io/ 注册一个账号（用 GitHub 登录最快）
3. 告诉我"OK 开始"，我就启动 Phase 1
