import { AlgorithmModule, Step } from '@/types';

/**
 * 归并排序算法实现
 * 时间复杂度: O(n log n)
 * 空间复杂度: O(n)
 */
export const mergeSortAlgorithm: AlgorithmModule<number[]> = {
  name: '归并排序',
  category: 'sorting',
  difficulty: 'medium',
  description: '归并排序是一种稳定的分治排序算法，通过递归地将数组分成两半，分别排序后再合并。',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(n)',

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
     * 合并两个已排序的子数组
     */
    const merge = (left: number, mid: number, right: number, depth: number) => {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);

      steps.push({
        stepNumber: stepCount++,
        data: [...arr],
        description: `合并子数组 [${left}, ${mid}] 和 [${mid + 1}, ${right}]`,
        highlights: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        metadata: {
          merging: true,
          leftRange: [left, mid],
          rightRange: [mid + 1, right],
          depth
        },
      });

      let i = 0;
      let j = 0;
      let k = left;

      // 合并过程
      while (i < leftArr.length && j < rightArr.length) {
        steps.push({
          stepNumber: stepCount++,
          data: [...arr],
          description: `比较 ${leftArr[i]} 和 ${rightArr[j]}`,
          highlights: [left + i, mid + 1 + j],
          metadata: {
            comparing: true,
            leftValue: leftArr[i],
            rightValue: rightArr[j],
            depth
          },
        });

        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i];
          steps.push({
            stepNumber: stepCount++,
            data: [...arr],
            description: `将 ${leftArr[i]} 放入位置 ${k}`,
            highlights: [k],
            metadata: { placing: true, value: leftArr[i], depth },
          });
          i++;
        } else {
          arr[k] = rightArr[j];
          steps.push({
            stepNumber: stepCount++,
            data: [...arr],
            description: `将 ${rightArr[j]} 放入位置 ${k}`,
            highlights: [k],
            metadata: { placing: true, value: rightArr[j], depth },
          });
          j++;
        }
        k++;
      }

      // 复制左侧剩余元素
      while (i < leftArr.length) {
        arr[k] = leftArr[i];
        steps.push({
          stepNumber: stepCount++,
          data: [...arr],
          description: `复制剩余元素 ${leftArr[i]} 到位置 ${k}`,
          highlights: [k],
          metadata: { placing: true, value: leftArr[i], depth },
        });
        i++;
        k++;
      }

      // 复制右侧剩余元素
      while (j < rightArr.length) {
        arr[k] = rightArr[j];
        steps.push({
          stepNumber: stepCount++,
          data: [...arr],
          description: `复制剩余元素 ${rightArr[j]} 到位置 ${k}`,
          highlights: [k],
          metadata: { placing: true, value: rightArr[j], depth },
        });
        j++;
        k++;
      }

      steps.push({
        stepNumber: stepCount++,
        data: [...arr],
        description: `子数组 [${left}, ${right}] 合并完成`,
        highlights: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        metadata: { merged: true, range: [left, right], depth },
      });
    };

    /**
     * 归并排序递归函数
     */
    const mergeSort = (left: number, right: number, depth: number = 0) => {
      if (left < right) {
        steps.push({
          stepNumber: stepCount++,
          data: [...arr],
          description: `分解数组 [${left}, ${right}]，深度=${depth}`,
          highlights: Array.from({ length: right - left + 1 }, (_, i) => left + i),
          metadata: { dividing: true, range: [left, right], depth },
        });

        const mid = Math.floor((left + right) / 2);

        // 递归排序左半部分
        mergeSort(left, mid, depth + 1);

        // 递归排序右半部分
        mergeSort(mid + 1, right, depth + 1);

        // 合并两个已排序的子数组
        merge(left, mid, right, depth);
      }
    };

    // 执行归并排序
    mergeSort(0, n - 1);

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
      description: '数组已排序，测试最优情况',
    },
    {
      name: '逆序数组',
      input: [5, 4, 3, 2, 1],
      expected: [1, 2, 3, 4, 5],
      description: '数组完全逆序',
    },
    {
      name: '包含重复元素',
      input: [3, 5, 3, 7, 5, 1, 3],
      expected: [1, 3, 3, 3, 5, 5, 7],
      description: '数组包含重复元素',
    },
    {
      name: '奇数个元素',
      input: [8, 3, 5, 4, 7, 6, 1, 2, 9],
      expected: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      description: '奇数个元素的数组',
    },
    {
      name: '两个元素',
      input: [2, 1],
      expected: [1, 2],
      description: '最小的非平凡情况',
    },
  ],

  validateInput: (input: number[]): boolean => {
    return Array.isArray(input) && input.length > 0 && input.every(num => typeof num === 'number');
  },

  getDocumentation: (): string => {
    return `
# 归并排序算法

## 算法原理
归并排序是建立在归并操作上的一种有效、稳定的排序算法，该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。
由美国计算机科学家约翰·冯·诺伊曼在1945年发明。

## 算法步骤
1. **分解（Divide）**：将待排序的n个元素分成各包含n/2个元素的子序列
2. **递归求解（Conquer）**：递归地对两个子序列进行归并排序
3. **合并（Merge）**：合并两个已排序的子序列以产生已排序的答案

## 合并过程详解
合并两个已排序的子数组的步骤：
1. 创建临时数组分别存储两个子数组
2. 使用两个指针分别指向两个子数组的起始位置
3. 比较两个指针指向的元素，将较小的元素放入原数组
4. 移动对应指针，重复步骤3
5. 将剩余元素全部复制到原数组

## 复杂度分析
- **时间复杂度**:
  - 最优: O(n log n)
  - 平均: O(n log n)
  - 最坏: O(n log n)
  - 在所有情况下都是O(n log n)，非常稳定
- **空间复杂度**: O(n) - 需要额外的存储空间来存储临时数组
- **稳定性**: 稳定 - 相同元素的相对顺序不会改变

## 算法特点

**优点**:
- 时间复杂度稳定在O(n log n)，不受输入数据影响
- 是稳定排序，适合对稳定性有要求的场景
- 适合处理大数据集
- 可以进行外部排序（处理无法一次性装入内存的大文件）

**缺点**:
- 需要额外的O(n)空间
- 对小数组性能不如插入排序
- 递归实现可能导致栈溢出

## 优化技巧
1. **小数组优化**：当子数组小于某个阈值时（如15），使用插入排序
2. **判断是否已排序**：合并前检查左子数组最大值是否小于等于右子数组最小值
3. **原地归并**：使用更复杂的算法实现原地归并，节省空间
4. **自底向上**：使用迭代而非递归，避免栈空间开销

## 应用场景
- 需要稳定排序的场景
- 外部排序（如大文件排序）
- 数据库排序操作
- 链表排序（归并排序特别适合链表）
- 并行排序（易于并行化）

## 与快速排序的比较
- **归并排序**：时间稳定但需要额外空间，稳定排序
- **快速排序**：平均更快且原地排序，但不稳定且最坏O(n²)

选择建议：
- 需要稳定性 → 归并排序
- 内存受限 → 快速排序
- 数据量大且随机 → 快速排序
- 链表排序 → 归并排序
    `;
  },
};
