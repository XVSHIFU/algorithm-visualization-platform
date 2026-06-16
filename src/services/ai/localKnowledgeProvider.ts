/**
 * 本地知识库 AI Provider
 *
 * 提供离线可用的算法问答能力，无需 API Key
 * 基于关键字匹配和上下文识别返回预设答案
 */

import { AIProvider, AIChatMessage, AIChatContext } from './aiTypes';

interface KnowledgeEntry {
  keywords: string[];
  answer: string;
  context?: string[];
}

const knowledgeBase: KnowledgeEntry[] = [
  // 平台相关
  {
    keywords: ['平台', '能做什么', '功能', '介绍'],
    answer: '这是一个算法可视化学习平台，可以：\n\n✨ 实时展示算法执行过程\n🎮 通过播放、暂停、步进控制动画\n📊 学习冒泡排序、快速排序、归并排序\n🗺️ 学习 Dijkstra 最短路径算法\n🔄 学习汉诺塔递归问题\n📚 查看每一步的详细说明和复杂度分析'
  },
  {
    keywords: ['使用', '操作', '播放', '步进', '控制'],
    answer: '控制面板使用方法：\n\n▶️ 播放：自动播放算法步骤\n⏸️ 暂停：暂停播放\n⏮️ 上一步：回到上一步\n⏭️ 下一步：前进一步\n⏹️ 停止：停止并重置到开始\n🔄 重置：重置到初始状态\n🎚️ 速度：调节播放速度 0.5x-2x'
  },
  {
    keywords: ['版本', 'v0.1', 'v0.2', 'v0.3', '演进'],
    answer: '版本演进：\n\nv0.1：首个完整版本，实现 5 个算法、可视化组件、控制面板和测试用例\n\nv0.2：漫画风格优化版，升级 UI、修复 Bug、优化性能和增强功能\n\nv0.3：内置 AI 算法助手（当前版本），支持本地知识库演示，预留 OpenAI/Claude 接入形式'
  },

  // 复杂度通用
  {
    keywords: ['时间复杂度', '空间复杂度', '复杂度'],
    answer: '算法复杂度说明：\n\n⏱️ 时间复杂度：衡量算法执行步骤随数据规模增长的趋势\n💾 空间复杂度：衡量算法额外空间开销\n\n常见复杂度从小到大：\nO(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n)\n\n你可以询问具体算法的复杂度。'
  },

  // 冒泡排序
  {
    keywords: ['冒泡', '冒泡排序', 'bubble'],
    answer: '冒泡排序（Bubble Sort）：\n\n原理：重复比较相邻元素，如果顺序错误就交换，使较大元素逐步"冒泡"到数组末尾\n\n⏱️ 时间复杂度：O(n²)，最优 O(n)\n💾 空间复杂度：O(1)\n\n特点：稳定排序，实现简单，但效率较低',
    context: ['sorting', 'bubble']
  },
  {
    keywords: ['冒泡', 'O(n²)', '为什么'],
    answer: '冒泡排序为什么是 O(n²)？\n\n因为需要两层循环：\n- 外层循环：n 轮\n- 内层循环：每轮最多比较 n-i 次\n\n总比较次数约为 n×(n-1)/2，因此时间复杂度是 O(n²)',
    context: ['sorting', 'bubble']
  },

  // 快速排序
  {
    keywords: ['快速', '快速排序', 'quick', 'pivot', '基准'],
    answer: '快速排序（Quick Sort）：\n\n原理：选择基准值 pivot，通过分区操作将数组分为左右两部分，再递归排序\n\n⏱️ 时间复杂度：平均 O(n log n)，最坏 O(n²)\n💾 空间复杂度：O(log n)\n\n特点：不稳定排序，实际应用广泛，平均性能优秀',
    context: ['sorting', 'quick']
  },
  {
    keywords: ['pivot', '基准', '是什么', '作用'],
    answer: 'Pivot（基准值）：\n\n作用：快速排序的核心，用于分区操作\n\n选择方式：通常选择第一个、最后一个或中间元素\n\n分区过程：将小于 pivot 的放左边，大于 pivot 的放右边，pivot 归位\n\n选择策略会影响性能：随机选择可以避免最坏情况',
    context: ['sorting', 'quick']
  },

  // 归并排序
  {
    keywords: ['归并', '归并排序', 'merge'],
    answer: '归并排序（Merge Sort）：\n\n原理：递归分解数组为较小子数组，再将有序子数组合并\n\n⏱️ 时间复杂度：O(n log n)\n💾 空间复杂度：O(n)\n\n特点：稳定排序，性能稳定，但需要额外空间',
    context: ['sorting', 'merge']
  },
  {
    keywords: ['归并', '额外空间', '为什么需要'],
    answer: '归并排序为什么需要额外空间？\n\n合并操作需要临时数组：\n- 将两个有序子数组合并时，需要额外空间存储结果\n- 空间复杂度 O(n)，n 为数组长度\n\n这是稳定性和性能的代价，但保证了 O(n log n) 时间复杂度',
    context: ['sorting', 'merge']
  },

  // Dijkstra
  {
    keywords: ['dijkstra', '最短路径', '迪杰斯特拉'],
    answer: 'Dijkstra 最短路径算法：\n\n原理：贪心策略，每次选择距离最小的未访问节点，更新相邻节点距离\n\n⏱️ 时间复杂度：O((V+E) log V)\n💾 空间复杂度：O(V)\n\n限制：不能处理负权边\n\n应用：导航、网络路由、游戏 AI 寻路',
    context: ['graph', 'dijkstra']
  },
  {
    keywords: ['dijkstra', '负权', '不能', '为什么'],
    answer: 'Dijkstra 为什么不能处理负权边？\n\n因为贪心策略假设：\n- 一旦节点被标记为已访问，其最短距离就已确定\n- 但负权边可能让已确定的距离变得更小\n\n如果图中有负权边，应使用 Bellman-Ford 算法',
    context: ['graph', 'dijkstra']
  },
  {
    keywords: ['松弛', '距离松弛', '更新距离'],
    answer: '距离松弛（Relaxation）：\n\n含义：尝试通过当前节点更新相邻节点的最短距离\n\n判断条件：\ndist[v] > dist[u] + weight(u, v)\n\n如果成立，更新 dist[v] = dist[u] + weight(u, v)\n\n这是 Dijkstra 算法的核心操作',
    context: ['graph', 'dijkstra']
  },
  {
    keywords: ['路径', '回溯', '怎么找到'],
    answer: '最短路径回溯方法：\n\n记录前驱节点：\n- 松弛时记录 prev[v] = u\n- 从终点回溯到起点\n- 反转得到正向路径\n\n可视化中的高亮路径就是这样生成的',
    context: ['graph', 'dijkstra']
  },

  // 汉诺塔
  {
    keywords: ['汉诺塔', 'hanoi', '递归'],
    answer: '汉诺塔（Tower of Hanoi）：\n\n原理：递归分治，将 n 个圆盘从源柱移到目标柱\n\n⏱️ 时间复杂度：O(2^n)\n💾 空间复杂度：O(n)\n\n移动次数：2^n - 1\n\n特点：经典递归问题，体现分治思想',
    context: ['recursive', 'hanoi']
  },
  {
    keywords: ['汉诺塔', '为什么', '递归'],
    answer: '汉诺塔为什么是递归问题？\n\n分治思想：\n1. 先把 n-1 个圆盘从 A 移到 B（借助 C）\n2. 把最大圆盘从 A 移到 C\n3. 再把 n-1 个圆盘从 B 移到 C（借助 A）\n\n每一步都是规模更小的相同问题，因此适合递归',
    context: ['recursive', 'hanoi']
  },
  {
    keywords: ['汉诺塔', '2^n', '步数', '为什么'],
    answer: '为什么 n 个圆盘需要 2^n-1 步？\n\n递推关系：\nT(n) = 2×T(n-1) + 1\n\n解释：\n- 移动 n-1 个圆盘到辅助柱：T(n-1)\n- 移动最大圆盘：1 步\n- 移动 n-1 个圆盘到目标柱：T(n-1)\n\n解得 T(n) = 2^n - 1',
    context: ['recursive', 'hanoi']
  },
  {
    keywords: ['汉诺塔', '三根', '柱子', '作用'],
    answer: '汉诺塔三根柱子的作用：\n\nA（源柱）：初始圆盘位置\nB（辅助柱）：临时存放圆盘\nC（目标柱）：最终目标位置\n\n辅助柱是关键：\n- 没有辅助柱，大圆盘下的小圆盘无处存放\n- 递归过程中，三根柱子的角色会互换',
    context: ['recursive', 'hanoi']
  },

  // AI 助手相关
  {
    keywords: ['ai', 'ai 助手', '你是谁', '你能做什么'],
    answer: '我是算法可视化平台的 AI 助手 🤖\n\n我可以帮你：\n✅ 解答算法原理和复杂度问题\n✅ 解释可视化步骤含义\n✅ 说明平台使用方法\n✅ 介绍版本演进\n\n当前模式：本地知识库演示（离线可用）\n\n你也可以询问当前页面的算法相关问题！'
  },
  {
    keywords: ['本地', '离线', 'api', '联网'],
    answer: '当前 AI 助手模式：\n\n🔒 本地知识库演示\n- 无需网络\n- 无需 API Key\n- 离线可用\n- 回答内容可控\n\n🔌 可扩展接入真实模型：\n用户可从 GitHub 拉取源码后，自行配置代理接口或本地模型服务，接入 OpenAI、Claude 等模型\n\n详见项目文档 docs/AI_ASSISTANT.md'
  },

  // 默认回复
  {
    keywords: ['你好', 'hello', 'hi'],
    answer: '你好！我是算法助手 👋\n\n你可以问我：\n- 算法原理和复杂度\n- 可视化操作方法\n- 平台功能介绍\n- 当前算法的具体问题\n\n试试点击下方的快捷问题吧！'
  }
];

export class LocalKnowledgeProvider implements AIProvider {
  name = '本地知识库';
  type = 'local' as const;

  async sendMessage(messages: AIChatMessage[], context: AIChatContext): Promise<string> {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
      return '请输入你的问题。';
    }

    const userInput = lastMessage.content.toLowerCase();

    // 尝试匹配知识库
    const matches = knowledgeBase.filter(entry => {
      // 关键字匹配
      const keywordMatch = entry.keywords.some(kw => userInput.includes(kw.toLowerCase()));
      if (!keywordMatch) return false;

      // 上下文匹配（如果定义了上下文，优先匹配当前页面）
      if (entry.context && entry.context.length > 0) {
        const contextMatch = entry.context.some(ctx =>
          context.route.includes(ctx) ||
          context.category === ctx ||
          context.algorithmName?.toLowerCase().includes(ctx)
        );
        return contextMatch;
      }

      return true;
    });

    // 返回最匹配的答案
    if (matches.length > 0) {
      return matches[0].answer;
    }

    // 根据当前页面上下文返回引导
    if (context.algorithmName) {
      return `你当前正在学习 ${context.algorithmName}。\n\n你可以问我：\n- "${context.algorithmName}的时间复杂度是多少？"\n- "这一步为什么要这样操作？"\n- "这个算法有什么特点？"\n\n或者点击下方的快捷问题按钮！`;
    }

    return '抱歉，我暂时无法回答这个问题。\n\n你可以尝试：\n- 询问具体算法的原理和复杂度\n- 询问平台使用方法\n- 询问可视化控制操作\n- 点击快捷问题按钮获取建议';
  }
}

export const localKnowledgeProvider = new LocalKnowledgeProvider();
