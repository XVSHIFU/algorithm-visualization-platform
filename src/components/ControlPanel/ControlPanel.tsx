import React from 'react';
import { AnimationState, PlaybackSpeed } from '@/types';
import './ControlPanel.css';

interface ControlPanelProps {
  /** 当前动画状态 */
  animationState: AnimationState;
  /** 当前步骤 */
  currentStep: number;
  /** 总步骤数 */
  totalSteps: number;
  /** 播放速度 */
  speed: PlaybackSpeed;
  /** 播放/暂停回调 */
  onPlayPause: () => void;
  /** 停止回调 */
  onStop: () => void;
  /** 上一步回调 */
  onPrevious: () => void;
  /** 下一步回调 */
  onNext: () => void;
  /** 重置回调 */
  onReset: () => void;
  /** 速度变化回调 */
  onSpeedChange: (speed: PlaybackSpeed) => void;
}

/**
 * 算法控制面板组件
 * 提供播放、暂停、步进、重置等控制功能
 */
export const ControlPanel: React.FC<ControlPanelProps> = ({
  animationState,
  currentStep,
  totalSteps,
  speed,
  onPlayPause,
  onStop,
  onPrevious,
  onNext,
  onReset,
  onSpeedChange,
}) => {
  const isPlaying = animationState === 'playing';
  const isFinished = animationState === 'finished';
  const isIdle = animationState === 'idle';

  return (
    <div className="control-panel">
      <div className="control-group">
        <button
          className="control-btn"
          onClick={onPrevious}
          disabled={isPlaying || currentStep === 0}
          title="上一步"
        >
          ⏮
        </button>

        <button
          className="control-btn primary"
          onClick={onPlayPause}
          disabled={isFinished}
          title={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <button
          className="control-btn"
          onClick={onNext}
          disabled={isPlaying || currentStep >= totalSteps - 1}
          title="下一步"
        >
          ⏭
        </button>

        <button
          className="control-btn"
          onClick={onStop}
          disabled={isIdle}
          title="停止"
        >
          ⏹
        </button>

        <button
          className="control-btn"
          onClick={onReset}
          title="重置"
        >
          ↻
        </button>
      </div>

      <div className="progress-info">
        <span className="step-counter">
          步骤: {currentStep + 1} / {totalSteps}
        </span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="speed-control">
        <label htmlFor="speed-select">速度:</label>
        <select
          id="speed-select"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value) as PlaybackSpeed)}
          disabled={isPlaying}
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
      </div>
    </div>
  );
};
