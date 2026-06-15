import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * 主布局组件
 * 提供统一的页面结构和导航
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="container">
          <h1 className="logo">
            <Link to="/">算法可视化平台</Link>
          </h1>
          <nav className="main-nav">
            <Link to="/" className="nav-link">首页</Link>
            <Link to="/sorting" className="nav-link">排序算法</Link>
            <Link to="/graph" className="nav-link">图算法</Link>
            <Link to="/recursive" className="nav-link">递归算法</Link>
            <Link to="/about" className="nav-link">关于</Link>
          </nav>
        </div>
      </header>

      <main className="layout-main">
        <div className="container">
          {children}
        </div>
      </main>

      <footer className="layout-footer">
        <div className="container">
          <p>&copy; 2026 算法可视化平台 | 课程设计项目</p>
        </div>
      </footer>
    </div>
  );
};
