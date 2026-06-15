import React from 'react';
import { Link } from 'react-router-dom';
import './SortingAlgorithms.css';

/**
 * 排序算法列表页
 */
export const SortingAlgorithms: React.FC = () => {
  const algorithms = [
    {
      name: '冒泡排序',
      path: '/sorting/bubble',
      difficulty: 'low',
      timeComplexity: 'O(n²)',
      description: '简单直观的排序算法，通过相邻元素的比较和交换来实现排序',
      status: 'available',
    },
    {
      name: '快速排序',
      path: '/sorting/quick',
      difficulty: 'medium',
      timeComplexity: 'O(n log n)',
      description: '分治算法，选择基准元素进行分区，递归排序',
      status: 'coming',
    },
    {
      name: '归并排序',
      path: '/sorting/merge',
      difficulty: 'medium',
      timeComplexity: 'O(n log n)',
      description: '分治算法，将数组分成小块排序后合并',
      status: 'coming',
    },
  ];

  const getDifficultyBadge = (difficulty: string) => {
    const badges = {
      low: { text: '简单', className: 'badge-easy' },
      medium: { text: '中等', className: 'badge-medium' },
      high: { text: '困难', className: 'badge-hard' },
    };
    return badges[difficulty as keyof typeof badges] || badges.low;
  };

  return (
    <div className="sorting-algorithms">
      <h1>排序算法</h1>
      <p className="page-description">
        排序算法是将一串数据依照特定顺序进行排列的一种算法。
        通过可视化可以清楚地看到不同算法的执行过程和效率差异。
      </p>

      <div className="algorithms-grid">
        {algorithms.map((algo, index) => {
          const badge = getDifficultyBadge(algo.difficulty);
          const isAvailable = algo.status === 'available';

          return (
            <div key={index} className={`algorithm-card ${!isAvailable ? 'disabled' : ''}`}>
              <div className="card-header">
                <h2>{algo.name}</h2>
                <span className={`difficulty-badge ${badge.className}`}>
                  {badge.text}
                </span>
              </div>

              <div className="card-body">
                <p className="algorithm-description">{algo.description}</p>
                <div className="complexity-info">
                  <span className="complexity-label">时间复杂度:</span>
                  <span className="complexity-value">{algo.timeComplexity}</span>
                </div>
              </div>

              <div className="card-footer">
                {isAvailable ? (
                  <Link to={algo.path} className="start-btn">
                    开始学习 →
                  </Link>
                ) : (
                  <button className="start-btn disabled" disabled>
                    即将推出
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
