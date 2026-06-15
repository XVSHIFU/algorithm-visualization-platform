import { AlgorithmModule, Step, TestCase } from '@/types';

/**
 * 冒泡排序算法实现
 * 时间复杂度: O(n²)
 * 空间复杂度: O(1)
 */
export const bubbleSortAlgorithm: AlgorithmModule<number[], number[]> = {
  name: '冒泡排序',
  category: 'sorting',
  difficulty: 'low',
  description: '冒泡排序是一种简单的排序算法，重复遍历数列，比较相邻元素并交换位置，直到没有需要交换的元素为止。',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',

  execute: (input: number[]): Step[] => {
    const steps: Step[] = [];
    const arr = [...input];
    const n = arr.length;

    // 初始状态
    steps.push({
      stepNumber: 0,
      data: [...arr],
      description: '初始数组',
      highlights: [],
    });

    let stepCount = 1;

    // 冒泡排序主循环
    for (let i = 0; i < n - 1; i++) {
      let swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        // 比较相邻元素
        steps.push({
          stepNumber: stepCount++,
          data: [...arr],
          description: `比较 arr[${j}]=${arr[j]} 和 arr[${j + 1}]=${arr[j + 1]}`,
          highlights: [j, j + 1],
          metadata: { comparing: true, pass: i + 1 },
        });

        // 如果前面的元素大于后面的元素，交换它们
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;

          steps.push({
            stepNumber: stepCount++,
            data: [...arr],
            description: `交换 ${arr[j + 1]} 和 ${arr[j]}`,
            highlights: [j, j + 1],
            metadata: { swapped: true, pass: i + 1 },
          });
        }
      }

      // 每轮结束后，最大的元素已经到达正确位置
      steps.push({
        stepNumber: stepCount++,
        data: [...arr],
        description: `第 ${i + 1} 轮结束，arr[${n - i - 1}]=${arr[n - i - 1]} 已就位`,
        highlights: [n - i - 1],
        metadata: { roundComplete: true, pass: i + 1, sortedIndex: n - i - 1 },
      });

      // 如果没有发生交换，说明数组已经有序
      if (!swapped) {
        break;
      }
    }

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
    const size = Math.floor(Math.random() * 8) + 5; // 5-12个元素
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
      description: '最优情况，数组已经排序',
    },
    {
      name: '逆序数组',
      input: [5, 4, 3, 2, 1],
      expected: [1, 2, 3, 4, 5],
      description: '最坏情况，数组完全逆序',
    },
    {
      name: '包含重复元素',
      input: [3, 5, 3, 7, 5, 1],
      expected: [1, 3, 3, 5, 5, 7],
      description: '数组包含重复元素',
    },
    {
      name: '单个元素',
      input: [42],
      expected: [42],
      description: '边界情况：只有一个元素',
    },
    {
      name: '两个元素',
      input: [2, 1],
      expected: [1, 2],
      description: '边界情况：两个元素需要交换',
    },
  ],

  validateInput: (input: number[]): boolean => {
    return Array.isArray(input) && input.length > 0 && input.every(num => typeof num === 'number');
  },

  getDocumentation: (): string => {
    return `
# 冒泡排序算法

## 算法原理
冒泡排序通过重复遍历待排序的数列，比较相邻两个元素的大小，如果顺序错误就交换它们。
遍历过程会一直持续，直到没有需要交换的元素为止。

## 算法步骤
1. 比较相邻的元素。如果第一个比第二个大，就交换它们两个
2. 对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对
3. 这步做完后，最后的元素会是最大的数
4. 针对所有的元素重复以上步骤，除了最后已经排好序的元素
5. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较

## 复杂度分析
- **时间复杂度**:
  - 最优: O(n) - 当数组已经有序时
  - 平均: O(n²)
  - 最坏: O(n²) - 当数组逆序时
- **空间复杂度**: O(1) - 只需要常数级别的额外空间
- **稳定性**: 稳定 - 相同元素的相对顺序不会改变

## 优缺点
**优点**:
- 实现简单，容易理解
- 不需要额外的存储空间

**缺点**:
- 效率较低，不适合大规模数据
- 时间复杂度较高

## 适用场景
- 数据量较小的排序
- 教学演示
- 数据基本有序的情况
    `;
  },
};
