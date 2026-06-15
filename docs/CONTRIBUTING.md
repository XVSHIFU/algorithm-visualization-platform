# 开发指南

## 为项目添加新算法

本文档说明如何为平台添加新的算法实现。

### 1. 创建算法实现文件

在 `src/algorithms/` 目录下创建新的算法文件，例如 `quickSort.ts`。

所有算法必须遵循 `AlgorithmModule` 接口规范：

```typescript
import { AlgorithmModule, Step, TestCase } from '@/types';

export const yourAlgorithm: AlgorithmModule<InputType, OutputType> = {
  name: '算法名称',
  category: 'sorting', // 'sorting' | 'graph' | 'recursive' | 'other'
  difficulty: 'medium', // 'low' | 'medium' | 'high'
  description: '算法的简短描述',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(log n)',

  execute: (input: InputType): Step[] => {
    const steps: Step[] = [];
    
    // 实现算法逻辑
    // 在每个关键步骤记录状态
    steps.push({
      stepNumber: 0,
      data: /* 当前数据状态 */,
      description: '步骤描述',
      highlights: [/* 需要高亮的索引 */],
      metadata: { /* 额外信息 */ },
    });

    return steps;
  },

  generateTestData: (): InputType => {
    // 生成随机测试数据
    return /* 随机数据 */;
  },

  testCases: [
    {
      name: '测试用例名称',
      input: /* 输入 */,
      expected: /* 期望输出 */,
      description: '测试用例描述',
    },
    // 至少提供 3-5 个测试用例
  ],

  validateInput: (input: InputType): boolean => {
    // 验证输入数据的有效性
    return true;
  },

  getDocumentation: (): string => {
    return `
# 算法文档

## 算法原理
...

## 算法步骤
...

## 复杂度分析
...
    `;
  },
};
```

### 2. 创建可视化组件

在 `src/visualizers/` 目录下创建可视化组件文件夹，例如 `QuickSortVisualizer/`。

组件结构参考 `BubbleSortVisualizer`：

```typescript
import React, { useState, useEffect, useCallback } from 'react';
import { ControlPanel } from '@/components';
import { AnimationState, PlaybackSpeed, Step } from '@/types';
import { yourAlgorithm } from '@/algorithms/yourAlgorithm';

export const YourAlgorithmVisualizer: React.FC = () => {
  // 状态管理
  const [input, setInput] = useState<string>('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);

  const currentStep = steps[currentStepIndex];

  // 控制逻辑实现
  // ...

  // 可视化渲染
  const renderVisualization = () => {
    if (!currentStep) return <div>准备中...</div>;

    // 根据算法特点自定义可视化方式
    return (
      <div className="visualization">
        {/* 你的可视化实现 */}
      </div>
    );
  };

  return (
    <div className="algorithm-visualizer">
      {/* 输入区域 */}
      {/* 可视化区域 */}
      {/* 控制面板 */}
      <ControlPanel
        animationState={animationState}
        currentStep={currentStepIndex}
        totalSteps={steps.length}
        speed={speed}
        onPlayPause={handlePlayPause}
        onStop={handleStop}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onReset={handleReset}
        onSpeedChange={setSpeed}
      />
    </div>
  );
};
```

### 3. 添加路由

在 `src/App.tsx` 中添加新算法的路由：

```typescript
import { YourAlgorithmVisualizer } from './visualizers/YourAlgorithmVisualizer/YourAlgorithmVisualizer';

// 在 Routes 中添加
<Route path="/sorting/your-algorithm" element={<YourAlgorithmVisualizer />} />
```

### 4. 更新算法列表页

在相应的算法列表页（如 `SortingAlgorithms.tsx`）添加新算法卡片：

```typescript
{
  name: '你的算法',
  path: '/sorting/your-algorithm',
  difficulty: 'medium',
  timeComplexity: 'O(n log n)',
  description: '算法描述',
  status: 'available',
}
```

### 5. 编写测试用例

在 `tests/` 目录下创建测试文件：

```typescript
import { describe, it, expect } from 'vitest';
import { yourAlgorithm } from '@/algorithms/yourAlgorithm';

describe('YourAlgorithm', () => {
  it('should sort array correctly', () => {
    const input = [3, 1, 4, 1, 5];
    const steps = yourAlgorithm.execute(input);
    const result = steps[steps.length - 1].data;
    expect(result).toEqual([1, 1, 3, 4, 5]);
  });

  // 更多测试用例
});
```

## 最佳实践

### Step 数据结构设计

- **stepNumber**: 从 0 开始递增的步骤序号
- **data**: 当前步骤的完整数据状态（建议使用深拷贝）
- **highlights**: 需要高亮显示的元素索引数组
- **description**: 清晰描述当前步骤的操作
- **metadata**: 存储额外的可视化信息（如是否交换、轮次等）

### 性能考虑

- 对大数据量输入进行合理限制（建议 < 100 个元素）
- 避免在 `execute` 中进行不必要的深拷贝
- 使用 `React.memo` 优化不必要的组件重渲染

### 样式规范

- 使用独立的 CSS 文件
- 遵循 BEM 命名规范
- 保持与现有组件风格一致

## 调试技巧

1. 使用浏览器开发工具的 React DevTools
2. 在关键步骤添加 `console.log` 输出
3. 检查 `steps` 数组的完整性
4. 验证 `highlights` 索引是否正确

## 需要帮助？

参考现有实现：
- 排序算法示例：`src/algorithms/bubbleSort.ts`
- 可视化组件示例：`src/visualizers/BubbleSortVisualizer/`
