import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

/**
 * 首页 - 算法分类导航
 */
export const Home: React.FC = () => {
  const categories = [
    {
      title: '排序算法',
      description: '经典排序算法的动态可视化演示',
      link: '/sorting',
      icon: '📊',
      algorithms: ['冒泡排序', '快速排序', '归并排序'],
    },
    {
      title: '图算法',
      description: '图遍历与最短路径算法可视化',
      link: '/graph',
      icon: '🗺️',
      algorithms: ['Dijkstra最短路径'],
    },
    {
      title: '递归算法',
      description: '递归思想与调用栈的直观展示',
      link: '/recursive',
      icon: '🔄',
      algorithms: ['汉诺塔'],
    },
  ];

  return (
    <div className="home">
      <section className="hero">
        <h1 className="hero-title">算法可视化平台</h1>
        <p className="hero-subtitle">通过动态可视化理解算法原理，让学习更直观、更有趣</p>
      </section>

      <section className="categories">
        {categories.map((category, index) => (
          <Link key={index} to={category.link} className="category-card">
            <div className="category-icon">{category.icon}</div>
            <h2 className="category-title">{category.title}</h2>
            <p className="category-description">{category.description}</p>
            <ul className="algorithm-list">
              {category.algorithms.map((algo, i) => (
                <li key={i}>{algo}</li>
              ))}
            </ul>
            <div className="category-link-text">
              开始学习 →
            </div>
          </Link>
        ))}
      </section>

      <section className="features">
        <h2>平台特点</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <h3>实时可视化</h3>
            <p>动态展示算法执行的每一步</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎮</div>
            <h3>交互式控制</h3>
            <p>支持播放、暂停、步进等操作</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📚</div>
            <h3>详细说明</h3>
            <p>提供算法原理和复杂度分析</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🧪</div>
            <h3>自定义输入</h3>
            <p>可输入自定义数据进行测试</p>
          </div>
        </div>
      </section>
    </div>
  );
};
