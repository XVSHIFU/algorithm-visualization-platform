# 团队协作指南

## 👥 团队成员与分工

### 成员1：组长 & 系统架构师 ✅ 已完成
**负责人**: [姓名]  
**主要任务**:
- ✅ 项目整体架构设计
- ✅ 框架搭建与配置
- ✅ 通用组件开发（Layout, ControlPanel）
- ✅ 路由系统实现
- ✅ 冒泡排序算法模板
- ✅ 项目文档编写
- 🔄 代码审查与集成
- 🔄 项目进度管理

**Git 分支**: `main` (已完成初始提交)

---

### 成员2：图算法专家 🚧 进行中
**负责人**: [姓名]  
**主要任务**:
- 📝 Dijkstra 最短路径算法实现
- 📝 图数据结构设计
- 📝 图可视化引擎开发
- 📝 交互式图编辑器组件
- 📝 Canvas/SVG 渲染逻辑
- 📝 图算法测试用例
- 📝 图算法文档编写

**Git 分支**: `feature/dijkstra`  
**开始时间**: 2026-06-15  
**预计完成**: 2026-06-21

**参考文件**:
- `src/algorithms/bubbleSort.ts` - 算法实现模板
- `src/types/algorithm.ts` - 接口规范

**需要创建的文件**:
```
src/algorithms/dijkstra.ts
src/visualizers/DijkstraVisualizer/
  ├── DijkstraVisualizer.tsx
  └── DijkstraVisualizer.css
src/components/GraphEditor/
  ├── GraphEditor.tsx
  └── GraphEditor.css
src/pages/GraphAlgorithms/
  ├── GraphAlgorithms.tsx
  └── GraphAlgorithms.css
tests/dijkstra.test.ts
```

---

### 成员3：递归算法专家 🚧 进行中
**负责人**: [姓名]  
**主要任务**:
- 📝 汉诺塔算法实现
- 📝 递归调用栈可视化
- 📝 圆盘移动动画系统
- 📝 动画时序控制优化
- 📝 递归算法测试用例
- 📝 递归算法文档编写

**Git 分支**: `feature/hanoi`  
**开始时间**: 2026-06-15  
**预计完成**: 2026-06-22

**参考文件**:
- `src/algorithms/bubbleSort.ts` - 算法模板
- `src/visualizers/BubbleSortVisualizer/` - 可视化模板
- `src/components/ControlPanel/` - 控制面板复用

**需要创建的文件**:
```
src/algorithms/hanoi.ts
src/visualizers/HanoiVisualizer/
  ├── HanoiVisualizer.tsx
  └── HanoiVisualizer.css
src/pages/RecursiveAlgorithms/
  ├── RecursiveAlgorithms.tsx
  └── RecursiveAlgorithms.css
tests/hanoi.test.ts
```

---

### 成员4：排序与测试专家 🚧 进行中
**负责人**: [姓名]  
**主要任务**:
- 📝 快速排序算法实现
- 📝 归并排序算法实现
- 📝 快速排序可视化
- 📝 归并排序可视化
- 📝 测试框架搭建
- 📝 所有算法的测试用例编写
- 📝 性能基准测试

**Git 分支**: `feature/sorting-algorithms`  
**开始时间**: 2026-06-15  
**预计完成**: 2026-06-23

**参考文件**:
- `src/algorithms/bubbleSort.ts` - 排序算法模板
- `src/visualizers/BubbleSortVisualizer/` - 排序可视化模板

**需要创建的文件**:
```
src/algorithms/quickSort.ts
src/algorithms/mergeSort.ts
src/visualizers/QuickSortVisualizer/
  ├── QuickSortVisualizer.tsx
  └── QuickSortVisualizer.css
src/visualizers/MergeSortVisualizer/
  ├── MergeSortVisualizer.tsx
  └── MergeSortVisualizer.css
tests/bubbleSort.test.ts
tests/quickSort.test.ts
tests/mergeSort.test.ts
tests/integration.test.ts
```

---

## 📅 时间线

### 第一阶段：框架搭建 (6月15日) ✅
- ✅ 成员1 完成整体框架
- ✅ Git 仓库初始化
- ✅ 文档体系建立

### 第二阶段：并行开发 (6月16-24日) 🚧
- 🔄 成员2: Dijkstra 算法
- 🔄 成员3: 汉诺塔算法
- 🔄 成员4: 快排 + 归并

**每日站会**: 每天 9:00 AM，15分钟
- 昨天完成了什么
- 今天计划做什么
- 遇到的问题

### 第三阶段：集成测试 (6月25日)
- 代码合并到 `dev` 分支
- 集成测试
- Bug 修复

### 第四阶段：文档与优化 (6月26-27日)
- 完善项目文档
- 优化 UI/UX
- 性能优化

### 第五阶段：答辩准备 (6月28-29日)
- 制作演示文稿
- 录制演示视频
- 答辩排练

---

## 🔄 Git 工作流程

### 分支策略

```
main (主分支，保护)
  └── dev (开发集成分支)
       ├── feature/dijkstra (成员2)
       ├── feature/hanoi (成员3)
       └── feature/sorting-algorithms (成员4)
```

### 每日工作流程

#### 1. 早上开始工作

```bash
# 切换到你的功能分支
git checkout feature/your-algorithm

# 拉取最新的 dev 分支
git checkout dev
git pull origin dev

# 合并到你的分支
git checkout feature/your-algorithm
git merge dev

# 解决冲突（如有）
```

#### 2. 开发过程中

```bash
# 频繁提交
git add .
git commit -m "feat(algorithm): 实现XX功能"

# 推送到远程
git push origin feature/your-algorithm
```

#### 3. 下班前

```bash
# 确保推送到远程
git push origin feature/your-algorithm
```

### 提交信息规范

```
<type>(<scope>): <subject>

类型 (type):
- feat: 新功能
- fix: 修复 bug
- docs: 文档更新
- style: 代码格式（不影响功能）
- refactor: 重构
- test: 测试相关
- chore: 构建工具或辅助工具

范围 (scope):
- algorithm: 算法实现
- visualizer: 可视化组件
- component: UI 组件
- docs: 文档
- test: 测试

示例:
feat(algorithm): 实现 Dijkstra 最短路径算法
fix(visualizer): 修复动画卡顿问题
docs(readme): 添加 Dijkstra 使用说明
test(algorithm): 添加边界情况测试
```

### 创建 Pull Request

当你的功能完成后：

```bash
# 确保代码最新
git checkout dev
git pull origin dev
git checkout feature/your-algorithm
git merge dev

# 推送
git push origin feature/your-algorithm
```

然后在 GitHub 上创建 PR：
- **标题**: 简明扼要描述功能
- **描述**: 
  - 实现了什么功能
  - 如何测试
  - 相关截图（可视化效果）
- **Reviewers**: 添加成员1（组长）

---

## 💬 沟通渠道

### 技术讨论
- **GitHub Issues**: 用于 bug 报告和功能讨论
- **PR Comments**: 代码审查和技术细节
- **微信群**: 日常沟通和问题快速解答

### 会议安排
- **每日站会**: 9:00 AM, 15分钟, 线上
- **周中回顾**: 6月19日, 1小时, 回顾进度
- **最终集成**: 6月25日, 半天, 现场

---

## 🎯 质量标准

### 代码质量
- ✅ 通过 ESLint 检查（无错误）
- ✅ TypeScript 严格模式无错误
- ✅ 遵循项目代码风格
- ✅ 函数和组件有 JSDoc 注释

### 算法实现
- ✅ 实现 `AlgorithmModule` 接口
- ✅ 至少 5 个测试用例
- ✅ 包含边界情况
- ✅ 输入验证函数
- ✅ 算法文档说明

### 可视化组件
- ✅ 使用 `ControlPanel` 组件
- ✅ 响应式设计
- ✅ 清晰的视觉反馈
- ✅ 错误处理
- ✅ 性能优化（大数据）

### 文档
- ✅ README 中添加算法说明
- ✅ 代码注释完整
- ✅ 使用示例清晰
- ✅ 复杂度分析准确

---

## 🐛 问题解决流程

### 1. 遇到技术问题

**步骤**:
1. 查看项目文档（`docs/`）
2. 查看参考代码（冒泡排序）
3. 搜索类似问题（Google, Stack Overflow）
4. 在群里询问
5. 创建 GitHub Issue

### 2. Git 冲突

```bash
# 发生冲突时
git status  # 查看冲突文件

# 手动解决冲突
# 编辑冲突文件，删除冲突标记

# 标记为已解决
git add <resolved-file>
git commit -m "fix: 解决合并冲突"
```

### 3. 代码审查反馈

- 认真阅读审查意见
- 修改代码
- 回复评论说明修改
- 重新请求审查

---

## 📊 进度追踪

### 每日更新进度

在 `docs/PROJECT_STATUS.md` 中更新你的进度：

```markdown
### 成员2 - 图算法专家
- [x] 创建 Dijkstra 算法文件
- [x] 实现基本算法逻辑
- [ ] 实现可视化组件
- [ ] 编写测试用例
- [ ] 完成文档
```

### 周中检查点 (6月19日)

每个成员应完成：
- 算法核心逻辑实现
- 基本可视化展示
- 至少 3 个测试用例

---

## 🎓 学习资源

### 算法学习
- VisuAlgo: https://visualgo.net/
- GeeksforGeeks: https://www.geeksforgeeks.org/
- LeetCode: https://leetcode.com/

### React 学习
- React 官方文档: https://react.dev/
- TypeScript 手册: https://www.typescriptlang.org/docs/

### 可视化技巧
- Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- CSS 动画: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations

---

## 🏆 成功标准

### 个人层面
- ✅ 按时完成分配的算法
- ✅ 代码质量达标
- ✅ 积极参与代码审查
- ✅ 文档完整

### 团队层面
- ✅ 所有 5 个算法实现完成
- ✅ 集成测试通过
- ✅ 用户体验流畅
- ✅ 答辩顺利完成

---

## 💡 最佳实践

### 1. 频繁提交
- 小步快跑
- 每完成一个小功能就提交
- 提交信息清晰

### 2. 代码复用
- 使用现有的 `ControlPanel`
- 参考冒泡排序的实现结构
- 避免重复造轮子

### 3. 及时沟通
- 遇到问题及时提出
- 分享有用的资源
- 互相帮助

### 4. 注重质量
- 不要为了速度牺牲质量
- 代码要可读可维护
- 测试覆盖重要场景

---

## 📞 联系方式

### 组长（成员1）
- 微信: [微信号]
- GitHub: [GitHub 用户名]
- 邮箱: [邮箱]

### 紧急联系
如遇紧急问题（如：系统崩溃、Git 问题）
→ 立即联系组长

---

**最后更新**: 2026-06-15  
**维护者**: 项目组长

祝大家合作愉快，项目成功！🎉
