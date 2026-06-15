import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecursiveAlgorithms.css';

/**
 * 递归算法列表页
 */
export const RecursiveAlgorithms: React.FC = () => {
  const navigate = useNavigate();

  const algorithms = [
    {
      name: '汉诺塔',
      path: '/recursive/hanoi',
      difficulty: 'high',
      description: '经典的递归问题，将圆盘从一根柱子移动到另一根柱子',
      timeComplexity: 'O(2^n)',
      available: true,
    },
  ];

  const getDifficultyBadge = (difficulty: string) => {
    const colors: Record<string, string> = {
      low: '#27ae60',
      medium: '#f39c12',
      high: '#e74c3c',
    };
    const labels: Record<string, string> = {
      low: '低',
      medium: '中',
      high: '高',
    };
    return (
      <span className="difficulty-badge" style={{ backgroundColor: colors[difficulty] }}>
        {labels[difficulty]}
      </span>
    );
  };

  return (
    <div className="recursive-algorithms-page">
      <div className="page-header">
        <h1>递归算法可视化</h1>
        <p className="page-description">
          递归算法通过函数调用自身来解决问题，是分治思想的重要体现。
        </p>
      </div>

      <div className="algorithms-grid">
        {algorithms.map((algo, index) => (
          <div key={index} className="algorithm-card">
            <div className="card-header">
              <h3>{algo.name}</h3>
              {getDifficultyBadge(algo.difficulty)}
            </div>
            <p className="algorithm-description">{algo.description}</p>
            <div className="algorithm-meta">
              <span className="complexity">时间: {algo.timeComplexity}</span>
            </div>
            {algo.available ? (
              <button
                className="start-btn"
                onClick={() => navigate(algo.path)}
              >
                开始学习 →
              </button>
            ) : (
              <button className="coming-soon-btn" disabled>
                即将推出
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="back-section">
        <button className="back-home-btn" onClick={() => navigate('/')}>
          ← 返回首页
        </button>
      </div>
    </div>
  );
};
