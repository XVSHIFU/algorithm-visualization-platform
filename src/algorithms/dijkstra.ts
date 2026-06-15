import { AlgorithmModule, Step } from '@/types';

/**
 * 图数据结构定义
 */
export interface Graph {
  nodes: { id: string; label: string }[];
  edges: { from: string; to: string; weight: number }[];
}

/**
 * Dijkstra输入类型
 */
export interface DijkstraInput {
  graph: Graph;
  start: string;
  end: string;
}

/**
 * Dijkstra最短路径算法实现
 * 时间复杂度: O((V+E)logV)
 * 空间复杂度: O(V)
 */
export const dijkstraAlgorithm: AlgorithmModule<DijkstraInput> = {
  name: 'Dijkstra最短路径',
  category: 'graph',
  difficulty: 'medium',
  description: 'Dijkstra算法是一种用于在加权图中找到从起点到终点最短路径的贪心算法。',
  timeComplexity: 'O((V+E)logV)',
  spaceComplexity: 'O(V)',

  execute: (input: DijkstraInput): Step[] => {
    const steps: Step[] = [];
    const { graph, start, end } = input;
    const { nodes, edges } = graph;

    // 初始化距离和前驱节点
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const visited = new Set<string>();
    const unvisited = new Set<string>();

    // 初始化
    nodes.forEach(node => {
      distances[node.id] = node.id === start ? 0 : Infinity;
      previous[node.id] = null;
      unvisited.add(node.id);
    });

    steps.push({
      stepNumber: 0,
      data: { distances: { ...distances }, visited: Array.from(visited), current: null },
      description: `初始化：起点${start}距离为0，其他节点距离为∞`,
      highlights: [start],
      metadata: { distances, previous: { ...previous } },
    });

    let stepCount = 1;

    while (unvisited.size > 0) {
      // 找到未访问节点中距离最小的
      let current: string | null = null;
      let minDistance = Infinity;

      unvisited.forEach(nodeId => {
        if (distances[nodeId] < minDistance) {
          minDistance = distances[nodeId];
          current = nodeId;
        }
      });

      if (current === null || distances[current] === Infinity) {
        break; // 无法到达剩余节点
      }

      steps.push({
        stepNumber: stepCount++,
        data: { distances: { ...distances }, visited: Array.from(visited), current },
        description: `选择未访问节点中距离最小的节点: ${current} (距离=${distances[current]})`,
        highlights: [current],
        metadata: { distances: { ...distances }, previous: { ...previous }, selecting: true },
      });

      // 标记为已访问
      visited.add(current);
      unvisited.delete(current);

      // 如果到达终点，可以提前结束
      if (current === end) {
        steps.push({
          stepNumber: stepCount++,
          data: { distances: { ...distances }, visited: Array.from(visited), current },
          description: `到达目标节点 ${end}！`,
          highlights: [end],
          metadata: { distances: { ...distances }, previous: { ...previous }, reached: true },
        });
        break;
      }

      // 更新相邻节点的距离
      const neighbors = edges.filter(e => e.from === current);

      for (const edge of neighbors) {
        const neighbor = edge.to;
        if (visited.has(neighbor)) continue;

        const newDistance = distances[current] + edge.weight;

        steps.push({
          stepNumber: stepCount++,
          data: { distances: { ...distances }, visited: Array.from(visited), current },
          description: `检查边 ${current}→${neighbor} (权重=${edge.weight})`,
          highlights: [current, neighbor],
          metadata: { distances: { ...distances }, previous: { ...previous }, checking: true, edge },
        });

        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = current;

          steps.push({
            stepNumber: stepCount++,
            data: { distances: { ...distances }, visited: Array.from(visited), current },
            description: `更新 ${neighbor} 的距离: ${distances[neighbor]} (通过${current})`,
            highlights: [neighbor],
            metadata: { distances: { ...distances }, previous: { ...previous }, updated: true },
          });
        }
      }
    }

    // 构建最短路径
    const path: string[] = [];
    let current: string | null = end;
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }

    const finalDistance = distances[end];
    const reachable = finalDistance !== Infinity;

    steps.push({
      stepNumber: stepCount,
      data: { distances: { ...distances }, visited: Array.from(visited), path, finalDistance },
      description: reachable
        ? `找到最短路径: ${path.join(' → ')}，总距离 = ${finalDistance}`
        : `无法从 ${start} 到达 ${end}`,
      highlights: path,
      metadata: { completed: true, path, distance: finalDistance, reachable },
    });

    return steps;
  },

  generateTestData: (): DijkstraInput => {
    const nodes = [
      { id: 'A', label: 'A' },
      { id: 'B', label: 'B' },
      { id: 'C', label: 'C' },
      { id: 'D', label: 'D' },
      { id: 'E', label: 'E' },
    ];

    const edges = [
      { from: 'A', to: 'B', weight: 4 },
      { from: 'A', to: 'C', weight: 2 },
      { from: 'B', to: 'C', weight: 1 },
      { from: 'B', to: 'D', weight: 5 },
      { from: 'C', to: 'D', weight: 8 },
      { from: 'C', to: 'E', weight: 10 },
      { from: 'D', to: 'E', weight: 2 },
    ];

    return {
      graph: { nodes, edges },
      start: 'A',
      end: 'E',
    };
  },

  testCases: [
    {
      name: '基本测试 - 5节点图',
      input: {
        graph: {
          nodes: [
            { id: 'A', label: 'A' },
            { id: 'B', label: 'B' },
            { id: 'C', label: 'C' },
            { id: 'D', label: 'D' },
            { id: 'E', label: 'E' },
          ],
          edges: [
            { from: 'A', to: 'B', weight: 4 },
            { from: 'A', to: 'C', weight: 2 },
            { from: 'B', to: 'D', weight: 5 },
            { from: 'C', to: 'D', weight: 8 },
            { from: 'C', to: 'E', weight: 10 },
            { from: 'D', to: 'E', weight: 2 },
          ],
        },
        start: 'A',
        end: 'E',
      },
      expected: { path: ['A', 'C', 'D', 'E'], distance: 12 },
      description: '标准的加权有向图',
    },
    {
      name: '单源单目标 - 直接路径',
      input: {
        graph: {
          nodes: [
            { id: 'A', label: 'A' },
            { id: 'B', label: 'B' },
          ],
          edges: [
            { from: 'A', to: 'B', weight: 5 },
          ],
        },
        start: 'A',
        end: 'B',
      },
      expected: { path: ['A', 'B'], distance: 5 },
      description: '最简单情况：两个节点一条边',
    },
    {
      name: '不连通图 - 无法到达',
      input: {
        graph: {
          nodes: [
            { id: 'A', label: 'A' },
            { id: 'B', label: 'B' },
            { id: 'C', label: 'C' },
          ],
          edges: [
            { from: 'A', to: 'B', weight: 3 },
          ],
        },
        start: 'A',
        end: 'C',
      },
      expected: { path: [], distance: Infinity },
      description: '不连通图，无法从A到达C',
    },
    {
      name: '起点等于终点',
      input: {
        graph: {
          nodes: [
            { id: 'A', label: 'A' },
            { id: 'B', label: 'B' },
          ],
          edges: [
            { from: 'A', to: 'B', weight: 5 },
          ],
        },
        start: 'A',
        end: 'A',
      },
      expected: { path: ['A'], distance: 0 },
      description: '边界情况：起点就是终点',
    },
    {
      name: '复杂图 - 多条路径',
      input: {
        graph: {
          nodes: [
            { id: 'A', label: 'A' },
            { id: 'B', label: 'B' },
            { id: 'C', label: 'C' },
            { id: 'D', label: 'D' },
            { id: 'E', label: 'E' },
            { id: 'F', label: 'F' },
          ],
          edges: [
            { from: 'A', to: 'B', weight: 7 },
            { from: 'A', to: 'C', weight: 9 },
            { from: 'A', to: 'F', weight: 14 },
            { from: 'B', to: 'C', weight: 10 },
            { from: 'B', to: 'D', weight: 15 },
            { from: 'C', to: 'D', weight: 11 },
            { from: 'C', to: 'F', weight: 2 },
            { from: 'D', to: 'E', weight: 6 },
            { from: 'F', to: 'E', weight: 9 },
          ],
        },
        start: 'A',
        end: 'E',
      },
      expected: { path: ['A', 'C', 'F', 'E'], distance: 20 },
      description: '复杂图，有多条可能路径',
    },
  ],

  validateInput: (input: DijkstraInput): boolean => {
    const { graph, start, end } = input;
    if (!graph || !graph.nodes || !graph.edges) return false;
    if (graph.nodes.length === 0) return false;

    const nodeIds = new Set(graph.nodes.map(n => n.id));
    if (!nodeIds.has(start) || !nodeIds.has(end)) return false;

    // 验证边的节点都存在
    for (const edge of graph.edges) {
      if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) return false;
      if (edge.weight < 0) return false; // Dijkstra不支持负权重
    }

    return true;
  },

  getDocumentation: (): string => {
    return `
# Dijkstra最短路径算法

## 算法原理
Dijkstra算法是由荷兰计算机科学家艾兹赫尔·戴克斯特拉在1956年提出的。
它是一种贪心算法，用于计算带权图中单源最短路径问题。

## 算法步骤
1. 初始化：将起点距离设为0，其他所有节点距离设为无穷大
2. 选择：从未访问节点中选择距离最小的节点作为当前节点
3. 更新：遍历当前节点的所有邻居，更新它们的距离
4. 标记：将当前节点标记为已访问
5. 重复：重复步骤2-4，直到访问完所有节点或到达目标节点

## 复杂度分析
- **时间复杂度**:
  - 使用邻接矩阵: O(V²)
  - 使用优先队列: O((V+E)logV)
- **空间复杂度**: O(V) - 存储距离和前驱节点
- **稳定性**: 确定性算法，结果唯一

## 限制条件
- **不支持负权重边**: 算法假设所有边权重非负
- **适用于稀疏图**: 使用优先队列优化后效率更高

## 优缺点
**优点**:
- 能找到最优解
- 算法相对简单易理解
- 广泛应用于路由协议

**缺点**:
- 不能处理负权重边
- 需要访问所有节点（效率问题）

## 应用场景
- GPS导航系统（寻找最短路径）
- 网络路由协议（OSPF）
- 社交网络分析
- 游戏AI寻路
    `;
  },
};
