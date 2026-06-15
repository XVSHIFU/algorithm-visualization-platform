# 项目启动文档

## 当前状态 (2026-06-15)

### ✅ 已完成

#### 1. 项目配置与环境搭建
- [x] package.json - 项目依赖配置
- [x] tsconfig.json - TypeScript 配置
- [x] vite.config.ts - Vite 构建配置
- [x] .eslintrc.cjs - ESLint 代码规范
- [x] .gitignore - Git 忽略文件

#### 2. 核心类型定义
- [x] src/types/algorithm.ts - 标准算法模块接口
  - AlgorithmModule 接口
  - Step 数据结构
  - TestCase 接口
  - AnimationState 和 PlaybackSpeed 类型

#### 3. 通用 UI 组件
- [x] src/components/Layout - 页面布局组件
  - 全局导航栏
  - 响应式布局
  - 页脚信息
- [x] src/components/ControlPanel - 算法控制面板
  - 播放/暂停/步进/重置控制
  - 进度条显示
  - 速度调节

#### 4. 路由系统
- [x] src/App.tsx - 主应用和路由配置
- [x] src/main.tsx - 应用入口
- [x] index.html - HTML 模板

#### 5. 页面组件
- [x] src/pages/Home - 首页（算法分类导航）
- [x] src/pages/SortingAlgorithms - 排序算法列表页

#### 6. 冒泡排序实现（作为模板）
- [x] src/algorithms/bubbleSort.ts - 算法实现
  - 完整的步骤记录
  - 6个测试用例
  - 输入验证
  - 算法文档
- [x] src/visualizers/BubbleSortVisualizer - 可视化组件
  - 柱状图可视化
  - 动画控制
  - 用户输入处理

#### 7. 文档
- [x] README.md - 项目说明文档
- [x] docs/ARCHITECTURE.md - 系统架构设计
- [x] docs/CONTRIBUTING.md - 开发指南

### 🚧 待实现（其他成员任务）

#### 成员2 - 图算法专家
- [ ] src/algorithms/dijkstra.ts - Dijkstra 算法实现
- [ ] src/visualizers/DijkstraVisualizer - 图可视化组件
- [ ] src/components/GraphEditor - 图编辑器组件
- [ ] src/pages/GraphAlgorithms - 图算法列表页

#### 成员3 - 递归算法专家
- [ ] src/algorithms/hanoi.ts - 汉诺塔算法实现
- [ ] src/visualizers/HanoiVisualizer - 汉诺塔可视化
- [ ] src/pages/RecursiveAlgorithms - 递归算法列表页
- [ ] 动画系统优化

#### 成员4 - 排序与测试专家
- [ ] src/algorithms/quickSort.ts - 快速排序实现
- [ ] src/algorithms/mergeSort.ts - 归并排序实现
- [ ] src/visualizers/QuickSortVisualizer - 快排可视化
- [ ] src/visualizers/MergeSortVisualizer - 归并可视化
- [ ] tests/ - 测试用例编写

## 项目结构

```
algorithm-visualization-platform/
├── src/
│   ├── algorithms/          ✅ 已建立，含冒泡排序模板
│   │   ├── bubbleSort.ts   ✅
│   │   └── index.ts        ✅
│   ├── components/          ✅ 核心组件完成
│   │   ├── Layout/         ✅
│   │   ├── ControlPanel/   ✅
│   │   └── index.ts        ✅
│   ├── visualizers/         ✅ 已建立，含冒泡排序示例
│   │   ├── BubbleSortVisualizer/  ✅
│   │   └── index.ts        ✅
│   ├── pages/              ✅ 基础页面完成
│   │   ├── Home/           ✅
│   │   ├── SortingAlgorithms/  ✅
│   │   └── index.ts        ✅
│   ├── types/              ✅ 类型定义完成
│   │   ├── algorithm.ts    ✅
│   │   └── index.ts        ✅
│   ├── App.tsx             ✅
│   ├── App.css             ✅
│   └── main.tsx            ✅
├── docs/                   ✅ 文档齐全
│   ├── ARCHITECTURE.md     ✅
│   └── CONTRIBUTING.md     ✅
├── public/                 📁 静态资源目录
├── tests/                  📁 测试目录（待成员4完善）
├── index.html              ✅
├── package.json            ✅
├── tsconfig.json           ✅
├── vite.config.ts          ✅
├── .eslintrc.cjs           ✅
├── .gitignore              ✅
└── README.md               ✅
```

## 技术栈

- **React**: 18.2.0
- **TypeScript**: 5.2.2
- **Vite**: 5.2.0
- **React Router**: 6.23.0
- **Vitest**: 1.5.0

## 如何开始开发

### 1. 安装依赖

```bash
npm install
```

如遇权限问题，尝试：
```bash
# 清理缓存
npm cache clean --force

# 以管理员身份运行
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 3. 开发新算法

参考 `docs/CONTRIBUTING.md` 中的详细指南。

核心步骤：
1. 在 `src/algorithms/` 创建算法文件
2. 实现 `AlgorithmModule` 接口
3. 在 `src/visualizers/` 创建可视化组件
4. 在 `src/App.tsx` 添加路由
5. 更新算法列表页

### 4. 查看冒泡排序模板

- 算法实现: `src/algorithms/bubbleSort.ts`
- 可视化组件: `src/visualizers/BubbleSortVisualizer/`

这是完整的参考实现，其他成员可以参照这个模板开发。

## 团队协作

### Git 工作流

```bash
# 1. 创建功能分支
git checkout -b feature/your-algorithm

# 2. 开发你的功能
# ...

# 3. 提交代码
git add .
git commit -m "feat(algorithm): 实现XX算法"

# 4. 推送到远程
git push origin feature/your-algorithm

# 5. 创建 Pull Request
```

### 分工明确

- **成员1（组长）**: ✅ 框架已搭建完成
- **成员2**: 实现 Dijkstra 最短路径算法
- **成员3**: 实现汉诺塔递归算法
- **成员4**: 实现快速排序和归并排序

### 注意事项

1. **遵循接口规范**: 所有算法必须实现 `AlgorithmModule` 接口
2. **保持代码风格**: 参考现有代码的命名和结构
3. **编写测试用例**: 每个算法至少 5 个测试用例
4. **添加文档注释**: 使用 JSDoc 格式
5. **频繁提交**: 小步快跑，及时提交

## 关键接口说明

### AlgorithmModule 接口

```typescript
interface AlgorithmModule<TInput, TOutput> {
  name: string;                    // 算法名称
  category: AlgorithmCategory;     // 'sorting' | 'graph' | 'recursive'
  difficulty: Difficulty;          // 'low' | 'medium' | 'high'
  description: string;             // 简短描述
  timeComplexity: string;          // 如 'O(n²)'
  spaceComplexity: string;         // 如 'O(1)'
  
  execute: (input: TInput) => Step[];
  generateTestData: () => TInput;
  testCases: TestCase[];
  validateInput?: (input: TInput) => boolean;
  getDocumentation?: () => string;
}
```

### Step 数据结构

```typescript
interface Step {
  stepNumber: number;              // 步骤序号
  data: any;                       // 当前数据状态（深拷贝）
  highlights?: number[];           // 需要高亮的索引
  description: string;             // 步骤描述
  metadata?: Record<string, any>;  // 额外信息
}
```

## 下一步行动

### 优先级 P0（本周完成）

1. ✅ 框架搭建（组长完成）
2. 🔄 安装依赖并验证运行
3. 🔄 各成员开始各自算法实现

### 优先级 P1（下周完成）

1. 完成所有 5 个算法实现
2. 集成测试
3. 文档完善

### 优先级 P2（最后阶段）

1. UI 优化和美化
2. 性能优化
3. 答辩准备

## 问题与支持

- 技术问题: 查看 `docs/CONTRIBUTING.md`
- 架构问题: 查看 `docs/ARCHITECTURE.md`
- 接口疑问: 参考 `src/types/algorithm.ts`
- 实现参考: 查看 `src/algorithms/bubbleSort.ts`

---

**项目启动时间**: 2026-06-15  
**预计完成时间**: 2026-06-29  
**项目状态**: 🟢 框架搭建完成，进入开发阶段
