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
  const progress = totalSteps > 0 ? Math.round(((currentStep + 1) / totalSteps) * 100) : 0;
  const stateLabelMap: Record<AnimationState, string> = {
    idle: '待开始',
    playing: '播放中',
    paused: '已暂停',
    finished: '已完成',
  };

  return (
    <div className="control-panel">
      <div className="control-status" aria-live="polite">
        <span className="status-badge">状态：{stateLabelMap[animationState]}</span>
        <span className="status-badge accent">进度：{progress}%</span>
      </div>

      <div className="control-group">
        <button
          className="control-btn"
          onClick={onPrevious}
          disabled={isPlaying || currentStep === 0}
          title="上一步"
          aria-label="上一步"
        >
          ⏮
        </button>

        <button
          className="control-btn primary"
          onClick={onPlayPause}
          disabled={isFinished}
          title={isPlaying ? '暂停' : '播放'}
          aria-label={isPlaying ? '暂停动画' : '播放动画'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <button
          className="control-btn"
          onClick={onNext}
          disabled={isPlaying || currentStep >= totalSteps - 1}
          title="下一步"
          aria-label="下一步"
        >
          ⏭
        </button>

        <button
          className="control-btn"
          onClick={onStop}
          disabled={isIdle}
          title="停止"
          aria-label="停止动画"
        >
          ⏹
        </button>

        <button
          className="control-btn"
          onClick={onReset}
          title="重置"
          aria-label="重置动画"
        >
          ↻
        </button>
      </div>

      <div className="progress-info">
        <span className="step-counter">
          步骤: {totalSteps > 0 ? currentStep + 1 : 0} / {totalSteps}
        </span>
        <div className="progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
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
