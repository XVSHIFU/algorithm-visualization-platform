/**
 * 算法执行的单步状态
 */
export interface Step {
  /** 步骤序号 */
  stepNumber: number;
  /** 当前数据状态 */
  data: any;
  /** 高亮的元素索引 */
  highlights?: number[];
  /** 当前操作描述 */
  description: string;
  /** 额外的可视化元数据 */
  metadata?: Record<string, any>;
}

/**
 * 测试用例定义
 */
export interface TestCase {
  /** 用例名称 */
  name: string;
  /** 输入数据 */
  input: any;
  /** 期望输出 */
  expected: any;
  /** 用例描述 */
  description?: string;
}

/**
 * 算法难度等级
 */
export type Difficulty = 'low' | 'medium' | 'high';

/**
 * 算法分类
 */
export type AlgorithmCategory = 'sorting' | 'graph' | 'recursive' | 'other';

/**
 * 标准算法模块接口
 * 所有算法实现必须遵循此接口
 */
export interface AlgorithmModule<TInput = any, TOutput = any> {
  /** 算法名称 */
  name: string;

  /** 算法分类 */
  category: AlgorithmCategory;

  /** 难度等级 */
  difficulty: Difficulty;

  /** 算法描述 */
  description: string;

  /** 时间复杂度 */
  timeComplexity: string;

  /** 空间复杂度 */
  spaceComplexity: string;

  /**
   * 执行算法，返回每一步的状态
   * @param input 输入数据
   * @returns 步骤数组
   */
  execute: (input: TInput) => Step[];

  /**
   * 生成测试数据
   * @returns 随机生成的测试数据
   */
  generateTestData: () => TInput;

  /**
   * 测试用例集
   */
  testCases: TestCase[];

  /**
   * 验证输入数据是否有效
   * @param input 输入数据
   * @returns 是否有效
   */
  validateInput?: (input: TInput) => boolean;

  /**
   * 获取算法的详细说明文档
   */
  getDocumentation?: () => string;
}

/**
 * 可视化器接口
 */
export interface Visualizer<T = any> {
  /**
   * 渲染单个步骤
   * @param step 步骤数据
   * @param containerWidth 容器宽度
   * @param containerHeight 容器高度
   */
  render: (step: Step, containerWidth: number, containerHeight: number) => React.ReactNode;
}

/**
 * 动画控制状态
 */
export type AnimationState = 'idle' | 'playing' | 'paused' | 'finished';

/**
 * 播放速度
 */
export type PlaybackSpeed = 0.5 | 1 | 1.5 | 2;
