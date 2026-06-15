import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GraphAlgorithms.css';

/**
 * 图算法列表页
 */
export const GraphAlgorithms: React.FC = () => {
  const navigate = useNavigate();

  const algorithms = [
    {
      name: 'Dijkstra最短路径',
      path: '/graph/dijkstra',
      difficulty: 'medium',
      description: '用于在加权图中找到从起点到终点的最短路径',
      timeComplexity: 'O((V+E)logV)',
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
    <div className="graph-algorithms-page">
      <div className="page-header">
        <h1>图算法可视化</h1>
        <p className="page-description">
          图算法用于处理图结构数据，包括最短路径、最小生成树、网络流等问题。
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
