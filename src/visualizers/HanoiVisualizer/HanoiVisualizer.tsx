import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ControlPanel } from '@/components';
import { AnimationState, PlaybackSpeed, Step } from '@/types';
import { hanoiAlgorithm, HanoiInput } from '@/algorithms/hanoi';
import './HanoiVisualizer.css';

/**
 * 汉诺塔可视化组件
 */
export const HanoiVisualizer: React.FC = () => {
  const navigate = useNavigate();
  const [numDisks, setNumDisks] = useState<number>(3);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);

  const currentStep = steps[currentStepIndex];

  // 开始可视化
  const handleStart = () => {
    if (numDisks < 1 || numDisks > 8) {
      alert('请输入1-8之间的圆盘数量');
      return;
    }

    const input: HanoiInput = {
      numDisks,
      from: 'A',
      to: 'C',
      aux: 'B',
    };

    const generatedSteps = hanoiAlgorithm.execute(input);
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setAnimationState('paused');
  };

  // 使用测试用例
  const handleUseTestCase = (testCase: { input: HanoiInput }) => {
    setNumDisks(testCase.input.numDisks);
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

  // 渲染汉诺塔可视化
  const renderVisualization = () => {
    if (!currentStep) {
      return <div className="empty-state">点击"开始可视化"按钮开始</div>;
    }

    const data = currentStep.data;
    const towers = data.towers || { A: [], B: [], C: [] };
    const highlights = currentStep.highlights || [];
    const moveCount = data.moveCount || 0;

    const maxDisks = Math.max(towers.A.length + towers.B.length + towers.C.length, 1);

    // 渲染单个柱子
    const renderTower = (name: 'A' | 'B' | 'C') => {
      const disks = towers[name];
      const isHighlighted = highlights.includes(name);

      return (
        <div key={name} className={`tower ${isHighlighted ? 'highlighted' : ''}`}>
          <div className="tower-label">{name}</div>
          <div className="pole"></div>
          <div className="disks-container">
            {disks.map((diskSize: number, index: number) => {
              const diskWidth = (diskSize / maxDisks) * 180 + 40;
              const colors = [
                '#e74c3c', '#3498db', '#f39c12', '#9b59b6',
                '#1abc9c', '#e67e22', '#2ecc71', '#34495e'
              ];
              const color = colors[(diskSize - 1) % colors.length];

              return (
                <div
                  key={`${name}-${index}-${diskSize}`}
                  className="disk"
                  style={{
                    width: `${diskWidth}px`,
                    backgroundColor: color,
                    bottom: `${40 + index * 25}px`,
                  }}
                >
                  <span className="disk-number">{diskSize}</span>
                </div>
              );
            })}
          </div>
          <div className="base"></div>
        </div>
      );
    };

    return (
      <div className="hanoi-container">
        <div className="move-counter">
          移动次数: <strong>{moveCount}</strong>
          <span className="optimal"> / 最优: {Math.pow(2, numDisks) - 1}</span>
        </div>

        <div className="towers-container">
          {renderTower('A')}
          {renderTower('B')}
          {renderTower('C')}
        </div>

        <div className="step-description">{currentStep.description}</div>
      </div>
    );
  };

  return (
    <div className="hanoi-visualizer">
      <div className="header-section">
        <button className="back-btn" onClick={() => navigate('/recursive')}>
          ← 返回递归算法列表
        </button>
        <h2>汉诺塔可视化</h2>
      </div>

      <div className="algorithm-info">
        <div className="info-card">
          <h3>算法信息</h3>
          <p><strong>时间复杂度:</strong> {hanoiAlgorithm.timeComplexity}</p>
          <p><strong>空间复杂度:</strong> {hanoiAlgorithm.spaceComplexity}</p>
          <p><strong>难度:</strong> {hanoiAlgorithm.difficulty === 'high' ? '高' : hanoiAlgorithm.difficulty}</p>
          <p className="description">{hanoiAlgorithm.description}</p>
        </div>
      </div>

      <div className="input-section">
        <div className="input-group">
          <label htmlFor="disk-count">圆盘数量（1-8）:</label>
          <input
            id="disk-count"
            type="number"
            min="1"
            max="8"
            value={numDisks}
            onChange={(e) => setNumDisks(parseInt(e.target.value) || 1)}
            disabled={animationState !== 'idle'}
          />
          <button onClick={handleStart} disabled={animationState !== 'idle'} className="start-btn">
            开始可视化
          </button>
        </div>

        <div className="test-cases">
          <label>快速选择:</label>
          {hanoiAlgorithm.testCases.slice(0, 5).map((testCase, idx) => (
            <button
              key={idx}
              onClick={() => handleUseTestCase(testCase)}
              disabled={animationState !== 'idle'}
              className="test-case-btn"
            >
              {testCase.input.numDisks}盘
            </button>
          ))}
        </div>

        <div className="hint">
          <strong>提示:</strong> 移动次数 = 2^n - 1，例如3盘需要7次，4盘需要15次
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
