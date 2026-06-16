import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ControlPanel } from '@/components';
import { AnimationState, PlaybackSpeed, Step } from '@/types';
import { quickSortAlgorithm } from '@/algorithms/quickSort';
import { parseIntegerArrayInput } from '@/utils';
import './QuickSortVisualizer.css';

/**
 * 快速排序可视化组件
 */
export const QuickSortVisualizer: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<string>('64,34,25,12,22,11,90');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);

  const currentStep = steps[currentStepIndex];

  // 开始可视化
  const handleStart = () => {
    const result = parseIntegerArrayInput(input, { minLength: 3, maxLength: 20, minValue: 0, maxValue: 999 });

    if (result.error) {
      alert(result.error);
      return;
    }

    const generatedSteps = quickSortAlgorithm.execute(result.values);
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setAnimationState('paused');
  };

  // 生成随机数据
  const handleGenerateRandom = () => {
    const randomData = quickSortAlgorithm.generateTestData();
    setInput(randomData.join(','));
  };

  // 播放/暂停
  const handlePlayPause = useCallback(() => {
    if (animationState === 'playing') {
      setAnimationState('paused');
    } else if (animationState === 'paused' || animationState === 'idle') {
      setAnimationState('playing');
    }
  }, [animationState]);

  // 停止
  const handleStop = () => {
    setAnimationState('idle');
    setCurrentStepIndex(0);
  };

  // 上一步
  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // 下一步
  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  // 重置
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

  // 渲染数组可视化
  const renderVisualization = () => {
    if (!currentStep) {
      return <div className="empty-state">点击"开始可视化"按钮开始</div>;
    }

    const data = currentStep.data as number[];
    const maxValue = Math.max(...data);
    const highlights = currentStep.highlights || [];
    const metadata = currentStep.metadata || {};

    return (
      <div className="visualization-container">
        <div className="bars-container">
          {data.map((value, index) => {
            const isHighlighted = highlights.includes(index);
            const isPivot = metadata.pivotIndex === index || metadata.pivotFinalIndex === index;
            const isCompleted = metadata.completed;
            const isInRange = metadata.range && index >= metadata.range[0] && index <= metadata.range[1];

            let barClass = 'bar';
            if (isCompleted) {
              barClass += ' sorted';
            } else if (isPivot) {
              barClass += ' pivot';
            } else if (isHighlighted && metadata.comparing) {
              barClass += ' comparing';
            } else if (isHighlighted && metadata.swapped) {
              barClass += ' swapped';
            } else if (isInRange && !isPivot) {
              barClass += ' in-range';
            }

            return (
              <div key={index} className="bar-wrapper">
                <div
                  className={barClass}
                  style={{
                    height: `${(value / maxValue) * 100}%`,
                  }}
                >
                  <span className="bar-value">{value}</span>
                </div>
                <span className="bar-index">{index}</span>
              </div>
            );
          })}
        </div>
        <div className="step-info">
          <div className="step-description">{currentStep.description}</div>
          {metadata.depth !== undefined && (
            <div className="depth-info">递归深度: {metadata.depth}</div>
          )}
          {metadata.range && (
            <div className="range-info">
              当前分区: [{metadata.range[0]}, {metadata.range[1]}]
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="quick-sort-visualizer">
      <div className="header-section">
        <button className="back-btn" onClick={() => navigate('/sorting')}>
          ← 返回排序算法列表
        </button>
        <h2>快速排序可视化</h2>
      </div>

      <div className="algorithm-info">
        <div className="info-card">
          <h3>算法信息</h3>
          <p><strong>时间复杂度:</strong> {quickSortAlgorithm.timeComplexity}</p>
          <p><strong>空间复杂度:</strong> {quickSortAlgorithm.spaceComplexity}</p>
          <p><strong>难度:</strong> {quickSortAlgorithm.difficulty === 'medium' ? '中等' : quickSortAlgorithm.difficulty}</p>
          <p className="description">{quickSortAlgorithm.description}</p>
        </div>
      </div>

      <div className="input-section">
        <label htmlFor="array-input">输入数组（3-20个整数，用英文逗号分隔）:</label>
        <div className="input-group">
          <input
            id="array-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例: 64,34,25,12,22,11,90"
            disabled={animationState !== 'idle'}
          />
          <button onClick={handleGenerateRandom} disabled={animationState !== 'idle'}>
            随机生成
          </button>
          <button onClick={handleStart} disabled={animationState !== 'idle'} className="start-btn">
            开始可视化
          </button>
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
