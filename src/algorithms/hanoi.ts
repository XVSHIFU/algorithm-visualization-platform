import { AlgorithmModule, Step } from '@/types';

/**
 * 汉诺塔输入类型
 */
export interface HanoiInput {
  numDisks: number;
  from: 'A' | 'B' | 'C';
  to: 'A' | 'B' | 'C';
  aux: 'A' | 'B' | 'C';
}

/**
 * 汉诺塔状态类型
 */
export interface HanoiState {
  towers: {
    A: number[];
    B: number[];
    C: number[];
  };
  moveCount: number;
}

/**
 * 汉诺塔递归算法实现
 * 时间复杂度: O(2^n)
 * 空间复杂度: O(n)
 */
export const hanoiAlgorithm: AlgorithmModule<HanoiInput> = {
  name: '汉诺塔',
  category: 'recursive',
  difficulty: 'high',
  description: '汉诺塔是一个经典的递归问题，目标是将所有圆盘从起始柱移动到目标柱，每次只能移动一个圆盘，且大圆盘不能放在小圆盘上面。',
  timeComplexity: 'O(2^n)',
  spaceComplexity: 'O(n)',

  execute: (input: HanoiInput): Step[] => {
    const steps: Step[] = [];
    const { numDisks, from, to, aux } = input;

    // 初始化塔
    const towers: HanoiState['towers'] = {
      A: [],
      B: [],
      C: [],
    };

    // 初始化圆盘（数字越大，圆盘越大）
    for (let i = numDisks; i >= 1; i--) {
      towers[from].push(i);
    }

    let moveCount = 0;
    let stepNumber = 0;

    // 初始状态
    steps.push({
      stepNumber: stepNumber++,
      data: { towers: JSON.parse(JSON.stringify(towers)), moveCount },
      description: `初始状态：${numDisks}个圆盘在柱${from}`,
      highlights: [from],
      metadata: { init: true },
    });

    /**
     * 递归移动圆盘
     * @param n 要移动的圆盘数量
     * @param source 源柱
     * @param target 目标柱
     * @param auxiliary 辅助柱
     */
    const moveDisk = (n: number, source: 'A' | 'B' | 'C', target: 'A' | 'B' | 'C', auxiliary: 'A' | 'B' | 'C') => {
      if (n === 1) {
        // 基本情况：移动一个圆盘
        const disk = towers[source].pop()!;
        towers[target].push(disk);
        moveCount++;

        steps.push({
          stepNumber: stepNumber++,
          data: { towers: JSON.parse(JSON.stringify(towers)), moveCount },
          description: `移动圆盘${disk}：从 ${source} → ${target}`,
          highlights: [source, target],
          metadata: { move: { disk, from: source, to: target }, moveCount },
        });
      } else {
        // 递归情况
        // 1. 将 n-1 个圆盘从 source 移动到 auxiliary（使用 target 作为辅助）
        moveDisk(n - 1, source, auxiliary, target);

        // 2. 将最大的圆盘从 source 移动到 target
        const disk = towers[source].pop()!;
        towers[target].push(disk);
        moveCount++;

        steps.push({
          stepNumber: stepNumber++,
          data: { towers: JSON.parse(JSON.stringify(towers)), moveCount },
          description: `移动圆盘${disk}：从 ${source} → ${target}`,
          highlights: [source, target],
          metadata: { move: { disk, from: source, to: target }, moveCount, keyMove: true },
        });

        // 3. 将 n-1 个圆盘从 auxiliary 移动到 target（使用 source 作为辅助）
        moveDisk(n - 1, auxiliary, target, source);
      }
    };

    // 执行汉诺塔算法
    moveDisk(numDisks, from, to, aux);

    // 最终状态
    steps.push({
      stepNumber: stepNumber,
      data: { towers: JSON.parse(JSON.stringify(towers)), moveCount },
      description: `完成！共移动了${moveCount}次（理论最优值：${Math.pow(2, numDisks) - 1}次）`,
      highlights: [to],
      metadata: { completed: true, moveCount, optimal: Math.pow(2, numDisks) - 1 },
    });

    return steps;
  },

  generateTestData: (): HanoiInput => {
    const numDisks = Math.floor(Math.random() * 3) + 3; // 3-5个圆盘
    return {
      numDisks,
      from: 'A',
      to: 'C',
      aux: 'B',
    };
  },

  testCases: [
    {
      name: '3个圆盘 (A→C)',
      input: { numDisks: 3, from: 'A', to: 'C', aux: 'B' },
      expected: { moveCount: 7 },
      description: '经典的3盘汉诺塔问题',
    },
    {
      name: '1个圆盘 (A→C)',
      input: { numDisks: 1, from: 'A', to: 'C', aux: 'B' },
      expected: { moveCount: 1 },
      description: '最简单情况：只需移动一次',
    },
    {
      name: '4个圆盘 (A→C)',
      input: { numDisks: 4, from: 'A', to: 'C', aux: 'B' },
      expected: { moveCount: 15 },
      description: '中等复杂度：15步',
    },
    {
      name: '5个圆盘 (A→C)',
      input: { numDisks: 5, from: 'A', to: 'C', aux: 'B' },
      expected: { moveCount: 31 },
      description: '较高复杂度：31步',
    },
    {
      name: '3个圆盘 (A→B)',
      input: { numDisks: 3, from: 'A', to: 'B', aux: 'C' },
      expected: { moveCount: 7 },
      description: '不同的目标柱',
    },
    {
      name: '6个圆盘 (A→C)',
      input: { numDisks: 6, from: 'A', to: 'C', aux: 'B' },
      expected: { moveCount: 63 },
      description: '高复杂度：63步',
    },
  ],

  validateInput: (input: HanoiInput): boolean => {
    const { numDisks, from, to, aux } = input;

    if (!Number.isInteger(numDisks) || numDisks < 1 || numDisks > 8) {
      return false;
    }

    const poles = new Set([from, to, aux]);
    if (poles.size !== 3) {
      return false; // 三个柱子必须不同
    }

    if (!['A', 'B', 'C'].includes(from) || !['A', 'B', 'C'].includes(to) || !['A', 'B', 'C'].includes(aux)) {
      return false;
    }

    return true;
  },

  getDocumentation: (): string => {
    return `
# 汉诺塔算法

## 问题起源
汉诺塔（Tower of Hanoi）是由法国数学家爱德华·卢卡斯在1883年发明的一个数学游戏。
传说古印度有一座寺庙，里面有三根柱子和64个大小不同的金盘，僧侣们需要将这些盘子从一根柱子移动到另一根柱子。

## 游戏规则
1. 有三根柱子：源柱、目标柱和辅助柱
2. 初始时所有圆盘按大小顺序堆放在源柱上（大盘在下，小盘在上）
3. 目标是将所有圆盘移动到目标柱
4. 每次只能移动一个圆盘
5. 大圆盘不能放在小圆盘上面

## 递归解法思路
要移动n个圆盘从A到C（使用B作为辅助）：
1. 将上面的n-1个圆盘从A移动到B（使用C作为辅助）
2. 将最大的圆盘从A移动到C
3. 将n-1个圆盘从B移动到C（使用A作为辅助）

## 复杂度分析
- **时间复杂度**: O(2^n) - 需要2^n - 1次移动
- **空间复杂度**: O(n) - 递归调用栈的深度
- **移动次数**: 对于n个圆盘，最少需要2^n - 1次移动

## 移动次数公式
- n = 1: 1次
- n = 2: 3次
- n = 3: 7次
- n = 4: 15次
- n = 5: 31次
- n = 6: 63次
- n = 64: 18,446,744,073,709,551,615次（传说中的数字）

## 数学之美
如果僧侣们每秒移动一个盘子，要完成64个盘子的移动，需要大约5840亿年！

## 应用场景
- 递归算法教学的经典例子
- 递归思想的完美体现
- 分治策略的应用
- 数学归纳法的实践

## 编程技巧
- 理解递归的基本情况和递归情况
- 注意递归调用的参数传递
- 可以使用栈模拟递归过程
    `;
  },
};
