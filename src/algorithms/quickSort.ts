import { AlgorithmModule, Step } from '@/types';

/**
 * 快速排序算法实现
 * 时间复杂度: O(n log n) 平均，O(n²) 最坏
 * 空间复杂度: O(log n)
 */
export const quickSortAlgorithm: AlgorithmModule<number[]> = {
  name: '快速排序',
  category: 'sorting',
  difficulty: 'medium',
  description: '快速排序是一种高效的分治排序算法，通过选择基准元素将数组分成两部分，递归排序。',
  timeComplexity: 'O(n log n) 平均',
  spaceComplexity: 'O(log n)',

  execute: (input: number[]): Step[] => {
    const steps: Step[] = [];
    const arr = [...input];
    const n = arr.length;
    let stepCount = 0;

    // 初始状态
    steps.push({
      stepNumber: stepCount++,
      data: [...arr],
      description: '初始数组',
      highlights: [],
      metadata: { depth: 0 },
    });

    /**
     * 分区函数
     */
    const partition = (low: number, high: number, depth: number): number => {
      const pivot = arr[high];
      steps.push({
        stepNumber: stepCount++,
        data: [...arr],
        description: `选择基准值 pivot = ${pivot}（索引${high}）`,
        highlights: [high],
        metadata: { pivot, pivotIndex: high, range: [low, high], depth },
      });

      let i = low - 1;

      for (let j = low; j < high; j++) {
        steps.push({
          stepNumber: stepCount++,
          data: [...arr],
          description: `比较 arr[${j}]=${arr[j]} 与 pivot=${pivot}`,
          highlights: [j, high],
          metadata: { comparing: true, range: [low, high], depth },
        });

        if (arr[j] < pivot) {
          i++;
          if (i !== j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            steps.push({
              stepNumber: stepCount++,
              data: [...arr],
              description: `交换 arr[${i}]=${arr[i]} 和 arr[${j}]=${arr[j]}`,
              highlights: [i, j],
              metadata: { swapped: true, range: [low, high], depth },
            });
          }
        }
      }

      // 将基准元素放到正确位置
      i++;
      [arr[i], arr[high]] = [arr[high], arr[i]];
      steps.push({
        stepNumber: stepCount++,
        data: [...arr],
        description: `基准值${pivot}归位到索引${i}`,
        highlights: [i],
        metadata: { pivotPlaced: true, pivotFinalIndex: i, range: [low, high], depth },
      });

      return i;
    };

    /**
     * 快速排序递归函数
     */
    const quickSort = (low: number, high: number, depth: number = 0) => {
      if (low < high) {
        steps.push({
          stepNumber: stepCount++,
          data: [...arr],
          description: `开始排序子数组 [${low}, ${high}]，深度=${depth}`,
          highlights: Array.from({ length: high - low + 1 }, (_, i) => low + i),
          metadata: { range: [low, high], depth, sorting: true },
        });

        const pi = partition(low, high, depth);

        quickSort(low, pi - 1, depth + 1);
        quickSort(pi + 1, high, depth + 1);
      }
    };

    // 执行快速排序
    quickSort(0, n - 1);

    // 最终状态
    steps.push({
      stepNumber: stepCount,
      data: [...arr],
      description: '排序完成！',
      highlights: Array.from({ length: n }, (_, i) => i),
      metadata: { completed: true },
    });

    return steps;
  },

  generateTestData: (): number[] => {
    const size = Math.floor(Math.random() * 8) + 5;
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  },

  testCases: [
    {
      name: '基本测试',
      input: [64, 34, 25, 12, 22, 11, 90],
      expected: [11, 12, 22, 25, 34, 64, 90],
      description: '标准的无序数组',
    },
    {
      name: '已排序数组',
      input: [1, 2, 3, 4, 5],
      expected: [1, 2, 3, 4, 5],
      description: '最坏情况之一，数组已排序',
    },
    {
      name: '逆序数组',
      input: [5, 4, 3, 2, 1],
      expected: [1, 2, 3, 4, 5],
      description: '最坏情况，数组完全逆序',
    },
    {
      name: '包含重复元素',
      input: [3, 5, 3, 7, 5, 1, 3],
      expected: [1, 3, 3, 3, 5, 5, 7],
      description: '数组包含重复元素',
    },
    {
      name: '大数据集',
      input: [89, 12, 45, 67, 23, 56, 78, 34, 90, 11, 22, 44, 66, 88, 33, 55, 77, 99, 10, 20],
      expected: [10, 11, 12, 20, 22, 23, 33, 34, 44, 45, 55, 56, 66, 67, 77, 78, 88, 89, 90, 99],
      description: '较大数据集',
    },
  ],

  validateInput: (input: number[]): boolean => {
    return Array.isArray(input) && input.length > 0 && input.every(num => typeof num === 'number');
  },

  getDocumentation: (): string => {
    return `
# 快速排序算法

## 算法原理
快速排序由英国计算机科学家托尼·霍尔在1960年提出，是目前应用最广泛的排序算法之一。
它采用分治策略，通过一趟排序将待排序记录分隔成独立的两部分。

## 算法步骤
1. **选择基准**：从数组中选择一个元素作为基准（pivot），通常选择最后一个元素
2. **分区操作**：重新排列数组，所有比基准小的元素放在基准前面，大的放后面
3. **递归排序**：递归地对基准左右两侧的子数组进行快速排序

## 分区过程详解
- 维护一个指针i，表示小于基准的区域边界
- 遍历数组，如果当前元素小于基准，将其交换到i位置，i前进
- 最后将基准元素放到i的位置，完成分区

## 复杂度分析
- **时间复杂度**:
  - 最优: O(n log n) - 每次分区都平分数组
  - 平均: O(n log n)
  - 最坏: O(n²) - 数组已排序，每次分区极不平衡
- **空间复杂度**: O(log n) - 递归调用栈
- **稳定性**: 不稳定 - 相同元素的相对顺序可能改变

## 优化技巧
1. **三数取中法**：选择首、中、尾三个元素的中位数作为基准
2. **随机化**：随机选择基准，避免最坏情况
3. **小数组优化**：当子数组较小时，改用插入排序
4. **三路快排**：针对大量重复元素的优化

## 优缺点
**优点**:
- 平均性能优秀，通常比归并排序快
- 原地排序，空间效率高
- 缓存友好，实际应用中表现好

**缺点**:
- 最坏情况性能差
- 不稳定排序
- 递归实现可能栈溢出

## 应用场景
- 大规模数据排序
- 系统库函数（如C语言的qsort）
- 数据库查询优化
- Top K问题（通过分区快速定位）
    `;
  },
};
