# 快速启动指南

## 🚀 立即开始

### 第一步：安装依赖

```bash
npm install
```

**如遇权限问题**，尝试以下方法之一：

#### 方法1：清理缓存后重试
```bash
npm cache clean --force
npm install
```

#### 方法2：以管理员身份运行
- 右键点击终端
- 选择"以管理员身份运行"
- 再执行 `npm install`

#### 方法3：更改 npm 缓存目录
```bash
npm config set cache "C:\npm-cache" --global
npm install
```

### 第二步：启动开发服务器

```bash
npm run dev
```

应该看到类似输出：
```
VITE v5.2.0  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### 第三步：访问应用

在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 🎯 验证框架是否正常

### 检查清单

1. **首页加载** - 应该看到三个算法分类卡片
   - 排序算法 📊
   - 图算法 🗺️
   - 递归算法 🔄

2. **导航功能** - 点击"排序算法"
   - 进入排序算法列表页
   - 看到冒泡排序卡片

3. **冒泡排序** - 点击"开始学习"
   - 输入框默认值：`64,34,25,12,22,11,90`
   - 点击"开始可视化"
   - 应该看到柱状图动画

4. **控制面板** - 测试所有按钮
   - ▶ 播放：动画自动播放
   - ⏸ 暂停：暂停动画
   - ⏭ 下一步：手动前进
   - ⏮ 上一步：返回上一步
   - ⏹ 停止：停止播放
   - ↻ 重置：回到初始状态

5. **速度调节** - 切换播放速度
   - 0.5x - 1x - 1.5x - 2x

## 📝 开发你的算法

### 成员2：Dijkstra 最短路径

```bash
# 创建功能分支
git checkout -b feature/dijkstra

# 创建算法文件
# src/algorithms/dijkstra.ts

# 创建可视化组件
# src/visualizers/DijkstraVisualizer/

# 参考冒泡排序的实现
# src/algorithms/bubbleSort.ts
# src/visualizers/BubbleSortVisualizer/
```

### 成员3：汉诺塔

```bash
git checkout -b feature/hanoi

# src/algorithms/hanoi.ts
# src/visualizers/HanoiVisualizer/
```

### 成员4：快速排序 & 归并排序

```bash
git checkout -b feature/sorting-algorithms

# src/algorithms/quickSort.ts
# src/algorithms/mergeSort.ts
# src/visualizers/QuickSortVisualizer/
# src/visualizers/MergeSortVisualizer/
```

## 📚 参考文档

- **接口规范**: `src/types/algorithm.ts`
- **实现示例**: `src/algorithms/bubbleSort.ts`
- **可视化示例**: `src/visualizers/BubbleSortVisualizer/`
- **开发指南**: `docs/CONTRIBUTING.md`
- **架构设计**: `docs/ARCHITECTURE.md`

## 🛠️ 常用命令

```bash
# 启动开发服务器
npm run dev

# 代码检查
npm run lint

# 运行测试
npm run test

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 🐛 常见问题

### Q: npm install 失败，权限错误
**A**: 参考上面"安装依赖"部分的解决方案

### Q: 端口 3000 被占用
**A**: 修改 `vite.config.ts` 中的端口号
```typescript
server: {
  port: 3001,  // 改为其他端口
}
```

### Q: TypeScript 报错找不到模块
**A**: 确保使用了路径别名 `@/`
```typescript
import { Layout } from '@/components';  // ✅ 正确
import { Layout } from '../components'; // ❌ 避免
```

### Q: 热重载不工作
**A**: 重启开发服务器
```bash
Ctrl+C  # 停止
npm run dev  # 重启
```

## 📞 需要帮助？

1. 查看 `docs/PROJECT_STATUS.md` - 了解项目当前状态
2. 查看 `docs/CONTRIBUTING.md` - 开发指南
3. 查看冒泡排序实现 - 完整的参考代码
4. 询问组长 - 技术问题随时沟通

## ✅ 下一步

- [ ] 验证框架运行正常
- [ ] 熟悉冒泡排序的实现
- [ ] 开始开发自己的算法
- [ ] 频繁提交，保持同步

---

**祝开发顺利！** 🎉
