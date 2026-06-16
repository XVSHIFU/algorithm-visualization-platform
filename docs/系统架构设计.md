# 系统架构设计文档

## 1. 系统概述

算法可视化平台是一个基于 Web 的交互式教学工具，采用前端单页应用（SPA）架构，使用 React + TypeScript + Vite 技术栈构建。

## 2. 技术架构

### 2.1 技术栈选型

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.2.0 | UI 框架 |
| TypeScript | 5.2.2 | 类型安全 |
| Vite | 5.2.0 | 构建工具 |
| React Router | 6.23.0 | 路由管理 |
| Vitest | 1.5.0 | 单元测试 |

### 2.2 系统分层架构

```
┌─────────────────────────────────────────────┐
│            表现层 (Presentation)              │
│  - Layout 布局组件                            │
│  - Page 页面组件                              │
│  - Visualizer 可视化组件                      │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│            业务层 (Business Logic)            │
│  - Algorithm 算法实现                         │
│  - Animation 动画控制                         │
│  - State Management 状态管理                  │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│            数据层 (Data)                      │
│  - Types 类型定义                             │
│  - Constants 常量配置                         │
└─────────────────────────────────────────────┘
```

## 3. 核心接口设计

### 3.1 AlgorithmModule 接口

所有算法实现必须遵循统一的接口规范：

```typescript
interface AlgorithmModule<TInput = any, TOutput = any> {
  name: string;                    // 算法名称
  category: AlgorithmCategory;     // 算法分类
  difficulty: Difficulty;          // 难度等级
  description: string;             // 算法描述
  timeComplexity: string;          // 时间复杂度
  spaceComplexity: string;         // 空间复杂度
  
  execute: (input: TInput) => Step[];           // 执行算法
  generateTestData: () => TInput;               // 生成测试数据
  testCases: TestCase[];                        // 测试用例
  validateInput?: (input: TInput) => boolean;   // 输入验证
  getDocumentation?: () => string;              // 文档说明
}
```

### 3.2 Step 数据结构

每个算法步骤的数据结构：

```typescript
interface Step {
  stepNumber: number;          // 步骤序号
  data: any;                   // 当前数据状态
  highlights?: number[];       // 高亮元素索引
  description: string;         // 步骤描述
  metadata?: Record<string, any>;  // 额外元数据
}
```

### 3.3 动画控制状态

```typescript
type AnimationState = 'idle' | 'playing' | 'paused' | 'finished';
type PlaybackSpeed = 0.5 | 1 | 1.5 | 2;
```

## 4. 组件架构

### 4.1 组件层次结构

```
App
├── Layout (布局容器)
│   ├── Header (导航栏)
│   ├── Main (内容区)
│   │   ├── Home (首页)
│   │   ├── SortingAlgorithms (算法列表)
│   │   └── Visualizer (可视化器)
│   │       ├── InputSection (输入区)
│   │       ├── VisualizationSection (可视化区)
│   │       └── ControlPanel (控制面板)
│   └── Footer (页脚)
```

### 4.2 核心组件说明

#### Layout 组件
- 提供统一的页面布局
- 包含全局导航和页脚
- 响应式设计

#### ControlPanel 组件
- 统一的算法控制面板
- 支持播放/暂停/步进/重置
- 可调节播放速度
- 显示进度条

#### Visualizer 组件
- 算法特定的可视化实现
- 管理动画状态和步骤
- 处理用户交互

## 5. 数据流设计

### 5.1 单向数据流

```
User Input → Algorithm.execute() → Steps[] → State → Render
                                              ↓
                                        ControlPanel
                                              ↓
                                        Update State
```

### 5.2 状态管理

使用 React Hooks 进行状态管理：

- `useState`: 管理组件局部状态
- `useEffect`: 处理副作用（动画定时器）
- `useCallback`: 优化事件处理函数

## 6. 路由设计

### 6.1 路由结构

```
/                          → Home (首页)
/sorting                   → SortingAlgorithms (排序算法列表)
/sorting/bubble            → BubbleSortVisualizer
/sorting/quick             → QuickSortVisualizer (待实现)
/sorting/merge             → MergeSortVisualizer (待实现)
/graph                     → GraphAlgorithms (图算法列表)
/graph/dijkstra            → DijkstraVisualizer (待实现)
/recursive                 → RecursiveAlgorithms (递归算法列表)
/recursive/hanoi           → HanoiVisualizer (待实现)
/about                     → About (关于页面)
```

## 7. 样式规范

### 7.1 设计原则

- 简洁清晰的界面设计
- 一致的配色方案
- 良好的视觉反馈
- 响应式布局

### 7.2 配色方案

```css
主色调: #3498db (蓝色)
辅助色: #2ecc71 (绿色), #e74c3c (红色)
中性色: #2c3e50 (深灰), #ecf0f1 (浅灰)
背景色: #f5f5f5
```

### 7.3 组件样式组织

- 每个组件有独立的 CSS 文件
- 使用 BEM 命名规范
- 避免全局样式污染

## 8. 性能优化策略

### 8.1 代码优化

- 使用 React.memo 避免不必要的重渲染
- 使用 useCallback 缓存事件处理函数
- 合理控制 Step 数组大小

### 8.2 构建优化

- Vite 的快速热重载
- 生产构建代码分割
- 静态资源压缩

## 9. 扩展性设计

### 9.1 算法模块化

- 标准化的 AlgorithmModule 接口
- 插件式的算法注册机制
- 独立的可视化组件

### 9.2 未来扩展方向

- 支持更多算法类型
- 用户自定义可视化样式
- 算法性能对比功能
- 学习路径推荐
- 用户进度追踪

## 10. 开发规范

### 10.1 代码规范

- 使用 ESLint 进行代码检查
- TypeScript 严格模式
- 统一的命名规范

### 10.2 Git 规范

- 分支策略: main / dev / feature/*
- 提交信息: type(scope): subject
- PR 审核流程

### 10.3 文档规范

- 代码注释使用 JSDoc
- 每个算法提供完整文档
- README 和开发指南

## 11. 测试策略

### 11.1 测试层次

- 单元测试: 算法逻辑正确性
- 组件测试: UI 组件行为
- 集成测试: 完整流程验证

### 11.2 测试覆盖

- 算法核心逻辑: 100%
- UI 组件: > 80%
- 边界情况测试

## 12. 部署方案

### 12.1 构建流程

```bash
npm run build  → dist/
               → 静态资源
               → index.html
```

### 12.2 部署选项

- GitHub Pages
- Vercel
- Netlify
- 自托管服务器

## 13. 技术债务与改进计划

### 当前限制

- 仅支持前端渲染
- 无后端持久化
- 无用户认证系统

### 未来改进

- 添加后端 API
- 用户账户系统
- 算法收藏与分享
- 实时协作功能

---

**文档版本**: v1.0  
**最后更新**: 2026-06-15  
**维护者**: 项目组长
