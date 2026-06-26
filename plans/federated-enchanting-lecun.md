# 个人作品集网站 — 实施计划

## Context

为一位跨学科设计师构建个人作品集网站，覆盖社会设计、艺术与科技、平面设计、产品设计四个方向。目标受众为学术机构和展览策展人。核心交互特色：轮盘转盘式项目浏览（鼠标滚轮驱动旋转）。

---

## 美学方向

**立场**：新粗野主义 + 档案馆式（Brutalist × Archival）
- 强对比、刻意的排版张力，有学术严肃感但不失实验精神
- 奶油色纸质底色，近黑前景，橙红色点缀

**字体组合**（Google Fonts）：
- 标题/展示：**Unbounded**（几何感强，不落俗套）
- 正文：**Crimson Pro**（人文主义衬线，学术气息）
- 标签/数据：**DM Mono**

**色彩 tokens**：
```css
--background: #111214;       /* 深炭黑，近似印刷墨底 */
--foreground: #E8E6E1;       /* 冷灰白，非纯白 */
--card: #1A1C1F;
--card-foreground: #E8E6E1;
--primary: #E8E6E1;
--primary-foreground: #111214;
--accent: #4A6FA5;           /* 冷钢蓝，学术档案感 */
--accent-foreground: #E8E6E1;
--muted: #252729;
--muted-foreground: #7A7A82;
--border: rgba(232,230,225,0.1);
--ring: #4A6FA5;
--radius: 0;                 /* 无圆角，硬边 */
```

---

## 页面结构

### 1. 固定导航栏（Nav）
- 左：设计师姓名（Unbounded，小字）
- 右：About / Contact 锚点链接
- 极薄，1px 底边线，背景透明后 `backdrop-blur`

### 2. Hero Section
- 全屏，中央显示设计师名字（大号 Unbounded）
- 副标题：4 个学科方向以 DM Mono 横排，逗号分隔
- 右下角：向下箭头 + "SCROLL" 提示，引导进入轮盘区

### 3. 轮盘项目区（核心交互）
- **布局**：全屏固定高度容器（`overflow: hidden`）
- **轮盘机制**：
  - 8-12 个项目卡片排列在一个大圆周上
  - 用 `useRef` + `wheel` 事件累计 `rotation` 角度（state）
  - 每个卡片的 transform：`rotate(itemAngle + rotation) translateX(radius) rotate(-(itemAngle + rotation))`
  - 卡片始终正向面对用户（反向旋转抵消）
  - 最近"12点方向"的卡片判定为 active，放大并高亮
- **卡片内容**：项目图片（Unsplash）、项目名、所属学科标签（DM Mono）、年份
- **类别筛选**：轮盘上方4个 tab，点击过滤显示该类别项目，轮盘重新定位
- **项目详情**：点击 active 卡片展开 modal，显示项目描述、研究背景、图片集

### 4. About Section
- 左栏：个人简介文本（Crimson Pro，大行距）
- 右栏：研究方向列表，每个方向配简短描述，编号（01 / 02 / 03...）
- 背景：略深于页面底色的分隔感

### 5. Contact Section
- 简洁：邮箱地址 + 社交/学术链接（ResearchGate / LinkedIn / Instagram）
- 一句话合作邀请语
- 页脚：版权年份

---

## 关键文件

| 文件 | 操作 |
|------|------|
| `src/app/App.tsx` | 全部替换，写入完整实现 |
| `src/styles/fonts.css` | 写入 Google Fonts import（Unbounded, Crimson Pro, DM Mono）|
| `src/styles/theme.css` | 更新 `:root` 中的 token 值，保留 `.dark` 和 `@theme inline` 结构 |

---

## 轮盘实现细节

```tsx
// 核心逻辑（伪代码）
const [rotation, setRotation] = useState(0);
const ITEM_COUNT = projectsFiltered.length;
const ANGLE_STEP = 360 / ITEM_COUNT;
const RADIUS = 520; // px

// scroll handler
onWheel(e) => setRotation(r => r - e.deltaY * 0.15);

// 每个卡片
const angle = index * ANGLE_STEP + rotation;
const normalizedAngle = ((angle % 360) + 360) % 360;
const isActive = Math.abs(normalizedAngle - 270) < ANGLE_STEP / 2; // 270° = 顶部

style={{ transform: `rotate(${angle}deg) translateX(${RADIUS}px) rotate(${-angle}deg)` }}
```

使用 `motion/react` 的 `animate` 给 rotation 加弹性过渡，或直接用 CSS `transition: transform 0.1s ease-out`。

---

## 占位内容（虚构但真实感的项目数据）

```
社会设计：
- "边境织物" (2023) — 难民社区共创纺织品系统
- "城市降温协议" (2024) — 热岛效应社区干预设计

艺术与科技：
- "神经花园" (2023) — 生成式AI装置
- "声景地图" (2022) — 城市声音数据可视化

平面设计：
- "解构语法" (2024) — 实验性字体排印展览视觉
- "碳档案" (2023) — 环境议题出版物系列

产品设计：
- "共感触觉器" (2024) — 跨障碍沟通辅助设备
- "迁徙日志" (2022) — 难民记录工具包
```

Unsplash 图片用 `search_photos` 工具获取真实图片ID。

---

## 验证方式

1. 启动开发服务器（`npm run dev`）
2. 验证轮盘在鼠标滚动时流畅旋转，active 卡片正确判定
3. 验证4个类别 tab 可以筛选并重置轮盘
4. 验证 About、Contact 锚点导航正常
5. 验证 ~1000px 以下响应式布局（轮盘转为垂直滚动列表或缩小半径）
6. 检查字体是否正确加载（Unbounded 标题明显宽体几何感）
