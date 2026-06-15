![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF)
![License](https://img.shields.io/badge/License-MIT-green)

# 算法可视化平台

基于 React + TypeScript + Vite 构建的算法可视化教学平台，通过动态可视化帮助理解算法原理。

## 📚 项目简介

本项目是一个 Web 应用程序，旨在通过可视化方式展示经典算法的执行过程，帮助学生和开发者更直观地理解算法的工作原理。

### 核心功能

- 🎯 **多类算法支持**: 排序、图、递归等多种算法类型
- 🎬 **动态可视化**: 实时展示算法每一步的执行过程
- 🎮 **交互式控制**: 播放/暂停/步进/重置等精细控制
- 📊 **数据自定义**: 支持自定义输入或随机生成测试数据
- 📖 **详细说明**: 提供算法原理、复杂度分析和实现文档

## 🎨 已实现算法

### 排序算法
- ✅ **冒泡排序** (Bubble Sort) - 简单 - O(n²)
- 🚧 **快速排序** (Quick Sort) - 中等 - O(n log n) - 即将推出
- 🚧 **归并排序** (Merge Sort) - 中等 - O(n log n) - 即将推出

### 图算法
- 🚧 **Dijkstra最短路径** - 中等 - 即将推出

### 递归算法
- 🚧 **汉诺塔** (Tower of Hanoi) - 中高 - 即将推出

## 🛠️ 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite
- **路由管理**: React Router v6
- **样式方案**: CSS Modules

## 📦 安装说明

### 前置要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0

### 安装步骤

1. **克隆仓库**
```bash
git clone https://github.com/your-team/algorithm-visualization-platform.git
cd algorithm-visualization-platform
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
```

3. **启动开发服务器**
```bash
npm run dev
# 或
yarn dev
```

4. **访问应用**
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 🎯 使用指南

### 基本操作

1. **选择算法**: 在首页选择感兴趣的算法分类，进入算法列表页
2. **输入数据**: 
   - 手动输入：在输入框中输入数据（用逗号分隔）
   - 随机生成：点击"随机生成"按钮
3. **开始可视化**: 点击"开始可视化"按钮
4. **控制播放**:
   - ▶ 播放：自动播放动画
   - ⏸ 暂停：暂停动画
   - ⏭ 下一步：手动前进一步
   - ⏮ 上一步：返回上一步
   - ⏹ 停止：停止播放
   - ↻ 重置：重置到初始状态
5. **调整速度**: 使用速度选择器调整播放速度（0.5x - 2x）

### 示例输入格式

**排序算法**:
```
64,34,25,12,22,11,90
```

## 📁 项目结构

```
algorithm-visualization-platform/
├── src/
│   ├── algorithms/          # 算法实现
│   │   └── bubbleSort.ts
│   ├── components/          # 可复用UI组件
│   │   ├── Layout/
│   │   └── ControlPanel/
│   ├── visualizers/         # 可视化组件
│   │   └── BubbleSortVisualizer/
│   ├── pages/               # 页面组件
│   │   ├── Home/
│   │   └── SortingAlgorithms/
│   ├── types/               # TypeScript类型定义
│   │   └── algorithm.ts
│   ├── App.tsx              # 主应用组件
│   └── main.tsx             # 应用入口
├── public/                  # 静态资源
├── docs/                    # 项目文档
├── tests/                   # 测试用例
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🧪 测试

```bash
# 运行测试
npm run test

# 运行代码检查
npm run lint
```

## 🏗️ 构建部署

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

构建产物将生成在 `dist/` 目录中，可部署到任何静态托管服务。

## 👥 团队成员与分工

本项目由 4 人小组协作完成：

- **成员1 (组长)**: 系统架构、框架搭建、冒泡排序、项目集成
- **成员2**: 图算法（Dijkstra）、图可视化引擎
- **成员3**: 递归算法（汉诺塔）、动画系统
- **成员4**: 排序算法（快速排序、归并排序）、测试框架

## 🤝 协作规范

### Git 提交规范

```
<type>(<scope>): <subject>

类型:
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 代码重构
- test: 测试相关
- chore: 构建/工具链相关

示例:
feat(bubble-sort): 实现冒泡排序算法
fix(control-panel): 修复播放按钮状态错误
docs(readme): 更新安装说明
```

### 分支策略

- `main`: 主分支，保护分支
- `dev`: 开发集成分支
- `feature/*`: 功能开发分支

## 📄 许可证

MIT License

## 📮 联系方式

- 项目仓库: [GitHub](https://github.com/your-team/algorithm-visualization-platform)
- 问题反馈: [Issues](https://github.com/your-team/algorithm-visualization-platform/issues)

---

**课程设计项目** | 2026年6月
