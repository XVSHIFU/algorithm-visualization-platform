import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ControlPanel } from '@/components';
import { AnimationState, PlaybackSpeed, Step } from '@/types';
import { dijkstraAlgorithm, Graph, DijkstraInput } from '@/algorithms/dijkstra';
import './DijkstraVisualizer.css';

/**
 * Dijkstra最短路径可视化组件
 */
export const DijkstraVisualizer: React.FC = () => {
  const navigate = useNavigate();

  // 预设图数据
  const defaultGraph: Graph = {
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
  };

  const [graph] = useState<Graph>(defaultGraph);
  const [startNode, setStartNode] = useState<string>('A');
  const [endNode, setEndNode] = useState<string>('E');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);

  const currentStep = steps[currentStepIndex];

  // 开始可视化
  const handleStart = () => {
    if (!dijkstraAlgorithm.validateInput?.({ graph, start: startNode, end: endNode })) {
      alert('请选择有效的起点和终点');
      return;
    }

    const input: DijkstraInput = { graph, start: startNode, end: endNode };
    const generatedSteps = dijkstraAlgorithm.execute(input);
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setAnimationState('paused');
  };

  // 使用测试用例
  const handleUseTestCase = (testCase: { input: { graph: Graph; start: string; end: string } }) => {
    // 简化：直接使用默认图，只改变起点终点
    setStartNode(testCase.input.start);
    setEndNode(testCase.input.end);
  };

  // 控制函数
  const handlePlayPause = useCallback(() => {
    if (animationState === 'playing') {
      setAnimationState('paused');
    } else if (animationState === 'paused' || animationState === 'idle') {
      setAnimationState('playing');
    }
  }, [animationState]);

  const handleStop = () => {
    setAnimationState('idle');
    setCurrentStepIndex(0);
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setAnimationState('idle');
    setSteps([]);
  };

  // 自动播放
  useEffect(() => {
    if (animationState !== 'playing') return;

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          setAnimationState('finished');
          return prev;
        }
        return prev + 1;
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [animationState, speed, steps.length]);

  // 渲染图可视化
  const renderVisualization = () => {
    if (!currentStep) {
      return <div className="empty-state">点击"开始可视化"按钮开始</div>;
    }

    const data = currentStep.data;
    const distances = data.distances || {};
    const visited = new Set(data.visited || []);
    const highlights = currentStep.highlights || [];
    const path = data.path || [];
    const isCompleted = currentStep.metadata?.completed;

    // 节点位置（简单布局）
    const nodePositions: Record<string, { x: number; y: number }> = {
      A: { x: 100, y: 150 },
      B: { x: 250, y: 50 },
      C: { x: 250, y: 250 },
      D: { x: 400, y: 150 },
      E: { x: 550, y: 150 },
    };

    return (
      <div className="graph-container">
        <svg width="700" height="400" className="graph-svg">
          {/* 渲染边 */}
          {graph.edges.map((edge, idx) => {
            const fromPos = nodePositions[edge.from];
            const toPos = nodePositions[edge.to];
            if (!fromPos || !toPos) return null;

            const isInPath = isCompleted &&
              path.includes(edge.from) &&
              path.includes(edge.to) &&
              Math.abs(path.indexOf(edge.from) - path.indexOf(edge.to)) === 1;

            return (
              <g key={idx}>
                <line
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke={isInPath ? '#27ae60' : '#95a5a6'}
                  strokeWidth={isInPath ? 4 : 2}
                  markerEnd="url(#arrowhead)"
                />
                <text
                  x={(fromPos.x + toPos.x) / 2}
                  y={(fromPos.y + toPos.y) / 2 - 10}
                  fill="#2c3e50"
                  fontSize="14"
                  fontWeight="bold"
                >
                  {edge.weight}
                </text>
              </g>
            );
          })}

          {/* 箭头定义 */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#95a5a6" />
            </marker>
          </defs>

          {/* 渲染节点 */}
          {graph.nodes.map(node => {
            const pos = nodePositions[node.id];
            if (!pos) return null;

            const isVisited = visited.has(node.id);
            const isHighlighted = highlights.includes(node.id);
            const isInFinalPath = isCompleted && path.includes(node.id);
            const distance = distances[node.id];

            let fillColor = '#ecf0f1';
            if (isInFinalPath) fillColor = '#27ae60';
            else if (isVisited) fillColor = '#3498db';
            else if (isHighlighted) fillColor = '#e74c3c';

            return (
              <g key={node.id}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="30"
                  fill={fillColor}
                  stroke="#2c3e50"
                  strokeWidth="2"
                />
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#2c3e50"
                  fontSize="20"
                  fontWeight="bold"
                >
                  {node.label}
                </text>
                <text
                  x={pos.x}
                  y={pos.y + 50}
                  textAnchor="middle"
                  fill="#7f8c8d"
                  fontSize="14"
                >
                  {distance === Infinity ? '∞' : distance}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="step-description">{currentStep.description}</div>
      </div>
    );
  };

  return (
    <div className="dijkstra-visualizer">
      <div className="header-section">
        <button className="back-btn" onClick={() => navigate('/graph')}>
          ← 返回图算法列表
        </button>
        <h2>Dijkstra最短路径可视化</h2>
      </div>

      <div className="algorithm-info">
        <div className="info-card">
          <h3>算法信息</h3>
          <p><strong>时间复杂度:</strong> {dijkstraAlgorithm.timeComplexity}</p>
          <p><strong>空间复杂度:</strong> {dijkstraAlgorithm.spaceComplexity}</p>
          <p><strong>难度:</strong> {dijkstraAlgorithm.difficulty === 'medium' ? '中等' : dijkstraAlgorithm.difficulty}</p>
          <p className="description">{dijkstraAlgorithm.description}</p>
        </div>
      </div>

      <div className="input-section">
        <div className="node-selector">
          <label>起点:</label>
          <select value={startNode} onChange={(e) => setStartNode(e.target.value)} disabled={animationState !== 'idle'}>
            {graph.nodes.map(node => (
              <option key={node.id} value={node.id}>{node.label}</option>
            ))}
          </select>

          <label>终点:</label>
          <select value={endNode} onChange={(e) => setEndNode(e.target.value)} disabled={animationState !== 'idle'}>
            {graph.nodes.map(node => (
              <option key={node.id} value={node.id}>{node.label}</option>
            ))}
          </select>

          <button onClick={handleStart} disabled={animationState !== 'idle'} className="start-btn">
            开始可视化
          </button>
        </div>

        <div className="test-cases">
          <label>测试用例:</label>
          {dijkstraAlgorithm.testCases.slice(0, 3).map((testCase, idx) => (
            <button
              key={idx}
              onClick={() => handleUseTestCase(testCase)}
              disabled={animationState !== 'idle'}
              className="test-case-btn"
            >
              {testCase.name}
            </button>
          ))}
        </div>
      </div>

      <div className="visualization-section">
        {renderVisualization()}
      </div>

      {steps.length > 0 && (
        <div className="control-section">
          <ControlPanel
            animationState={animationState}
            currentStep={currentStepIndex}
            totalSteps={steps.length}
            speed={speed}
            onPlayPause={handlePlayPause}
            onStop={handleStop}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onReset={handleReset}
            onSpeedChange={setSpeed}
          />
        </div>
      )}
    </div>
  );
};
