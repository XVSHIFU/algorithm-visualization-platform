import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Layout } from './components';
import { Home, SortingAlgorithms, GraphAlgorithms, RecursiveAlgorithms } from './pages';
import {
  BubbleSortVisualizer,
  QuickSortVisualizer,
  MergeSortVisualizer,
  DijkstraVisualizer,
  HanoiVisualizer,
} from './visualizers';
import './App.css';

/**
 * 主应用组件
 * 配置路由和整体布局
 */
const App: React.FC = () => {
  return (
    <BrowserRouter basename="/algorithm-visualization-platform">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sorting" element={<SortingAlgorithms />} />
          <Route path="/sorting/bubble" element={<BubbleSortVisualizer />} />
          <Route path="/sorting/quick" element={<QuickSortVisualizer />} />
          <Route path="/sorting/merge" element={<MergeSortVisualizer />} />
          <Route path="/graph" element={<GraphAlgorithms />} />
          <Route path="/graph/dijkstra" element={<DijkstraVisualizer />} />
          <Route path="/recursive" element={<RecursiveAlgorithms />} />
          <Route path="/recursive/hanoi" element={<HanoiVisualizer />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

/**
 * 关于页面
 */
const About: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>关于本项目</h1>
      <div style={{ lineHeight: '1.8', color: '#34495e' }}>
        <h2>项目简介</h2>
        <p>
          算法可视化平台是一个基于Web技术的教育工具，旨在通过动态可视化帮助学生和开发者
          更好地理解算法的执行过程和内在原理。
        </p>

        <h2>技术栈</h2>
        <ul>
          <li>前端框架: React 18</li>
          <li>开发语言: TypeScript</li>
          <li>构建工具: Vite</li>
          <li>路由管理: React Router v6</li>
        </ul>

        <h2>项目特点</h2>
        <ul>
          <li>✨ 实时动画展示算法执行过程</li>
          <li>🎮 交互式控制面板（播放/暂停/步进）</li>
          <li>📊 多种经典算法实现</li>
          <li>🧪 支持自定义数据输入</li>
          <li>📚 详细的算法说明和复杂度分析</li>
        </ul>

        <h2>当前版本</h2>
        <p>
          当前版本为 <strong>v0.2 漫画风格优化版</strong>。该版本在 v0.1 首个完整版本基础上，
          重点完成 UI/UX 优化、输入校验增强、Dijkstra 测试用例修复和响应式体验改进。
        </p>
        <ul>
          <li>v0.1：完成 5 个算法、可视化组件、路由系统和测试用例。</li>
          <li>v0.2：升级漫画风格界面，优化控制面板状态展示，修复已知交互问题。</li>
          <li>v0.3：计划用于答辩前最终检查和稳定性完善。</li>
        </ul>

        <h2>团队成员</h2>
        <p>本项目由4人小组共同完成，作为课程设计项目。</p>

        <h2>开源协议</h2>
        <p>本项目采用 MIT 协议开源。</p>
      </div>
    </div>
  );
};

/**
 * 404页面
 */
const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '6rem', margin: 0 }}>404</h1>
      <h2>页面未找到</h2>
      <p style={{ color: '#7f8c8d', fontSize: '1.2rem' }}>抱歉，您访问的页面不存在。</p>
      <Link to="/" style={{ color: '#111827', fontSize: '1.1rem', textDecoration: 'none', fontWeight: 800 }}>
        返回首页 →
      </Link>
    </div>
  );
};

export default App;
