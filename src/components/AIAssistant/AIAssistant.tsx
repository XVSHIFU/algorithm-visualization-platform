import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { createAIProvider, getProviderDisplayName, AIChatMessage, AIChatContext } from '@/services/ai';
import './AIAssistant.css';

/**
 * AI 算法助手组件
 *
 * 功能：
 * - 全局悬浮入口
 * - 聊天窗口
 * - 本地知识库问答
 * - 根据当前页面提供上下文
 * - 快捷问题
 */
export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const provider = createAIProvider();

  // 获取当前页面上下文
  const getContext = (): AIChatContext => {
    const route = location.pathname;
    let algorithmName: string | undefined;
    let category: 'sorting' | 'graph' | 'recursive' | 'general' = 'general';

    if (route.includes('/sorting/bubble')) {
      algorithmName = '冒泡排序';
      category = 'sorting';
    } else if (route.includes('/sorting/quick')) {
      algorithmName = '快速排序';
      category = 'sorting';
    } else if (route.includes('/sorting/merge')) {
      algorithmName = '归并排序';
      category = 'sorting';
    } else if (route.includes('/graph/dijkstra')) {
      algorithmName = 'Dijkstra 最短路径';
      category = 'graph';
    } else if (route.includes('/recursive/hanoi')) {
      algorithmName = '汉诺塔';
      category = 'recursive';
    } else if (route.includes('/sorting')) {
      category = 'sorting';
    } else if (route.includes('/graph')) {
      category = 'graph';
    } else if (route.includes('/recursive')) {
      category = 'recursive';
    }

    return { route, algorithmName, category };
  };

  // 获取快捷问题
  const getQuickQuestions = (): string[] => {
    const context = getContext();

    if (context.algorithmName === '冒泡排序') {
      return [
        '冒泡排序是什么？',
        '为什么是 O(n²)？',
        '如何使用控制面板？'
      ];
    } else if (context.algorithmName === '快速排序') {
      return [
        'pivot 是什么？',
        '快速排序的时间复杂度？',
        '为什么不稳定？'
      ];
    } else if (context.algorithmName === '归并排序') {
      return [
        '归并排序的原理？',
        '为什么需要额外空间？',
        '时间复杂度是多少？'
      ];
    } else if (context.algorithmName === 'Dijkstra 最短路径') {
      return [
        'Dijkstra 为什么不能处理负权边？',
        '距离松弛是什么意思？',
        '最短路径是如何回溯的？'
      ];
    } else if (context.algorithmName === '汉诺塔') {
      return [
        '汉诺塔为什么是递归问题？',
        '为什么 n 个圆盘需要 2^n-1 步？',
        '三根柱子的作用是什么？'
      ];
    } else if (context.category === 'sorting') {
      return [
        '排序算法有哪些？',
        '时间复杂度怎么看？',
        '如何使用控制面板？'
      ];
    } else {
      return [
        '这个平台能做什么？',
        '如何使用播放和步进？',
        '版本演进是怎样的？'
      ];
    }
  };

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 发送消息
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: AIChatMessage = {
      role: 'user',
      content: text.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const context = getContext();
      const response = await provider.sendMessage([...messages, userMessage], context);

      const assistantMessage: AIChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: AIChatMessage = {
        role: 'assistant',
        content: '抱歉，出现了错误。请稍后再试。',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error('[AI Assistant] Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 快捷问题点击
  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  // 清空对话
  const handleClear = () => {
    setMessages([]);
  };

  const context = getContext();
  const quickQuestions = getQuickQuestions();
  const providerDisplayName = getProviderDisplayName();

  return (
    <>
      {/* 悬浮按钮 */}
      <button
        className="ai-assistant-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? '关闭 AI 助手' : '打开 AI 助手'}
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {/* 聊天窗口 */}
      {isOpen && (
        <div className="ai-assistant-panel">
          {/* 头部 */}
          <div className="ai-assistant-header">
            <div className="ai-assistant-title">
              <span className="ai-icon">🤖</span>
              <span>AI 算法助手 · v0.3</span>
            </div>
            <button className="ai-close-btn" onClick={() => setIsOpen(false)} aria-label="关闭">
              ✕
            </button>
          </div>

          {/* 模式提示 */}
          <div className="ai-assistant-mode">
            <span className="mode-badge">{providerDisplayName}</span>
            {context.algorithmName && (
              <span className="context-badge">当前：{context.algorithmName}</span>
            )}
          </div>

          {/* 消息列表 */}
          <div className="ai-assistant-messages">
            {messages.length === 0 && (
              <div className="ai-welcome">
                <p>👋 你好！我是算法助手。</p>
                <p>你可以问我关于算法、复杂度、可视化操作的问题。</p>
                <p>试试点击下方的快捷问题吧！</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className={`ai-message ai-message-${msg.role}`}>
                <div className="ai-message-avatar">
                  {msg.role === 'user' ? '👤' : '🤖'}
                </div>
                <div className="ai-message-content">
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i}>{line || ' '}</p>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="ai-message ai-message-assistant">
                <div className="ai-message-avatar">🤖</div>
                <div className="ai-message-content ai-loading">思考中...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 快捷问题 */}
          <div className="ai-quick-questions">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                className="ai-quick-btn"
                onClick={() => handleQuickQuestion(q)}
                disabled={isLoading}
              >
                {q}
              </button>
            ))}
          </div>

          {/* 输入区 */}
          <div className="ai-assistant-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder="输入你的问题..."
              disabled={isLoading}
            />
            <button
              className="ai-send-btn"
              onClick={() => handleSendMessage(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              aria-label="发送"
            >
              发送
            </button>
            {messages.length > 0 && (
              <button
                className="ai-clear-btn"
                onClick={handleClear}
                disabled={isLoading}
                aria-label="清空对话"
              >
                清空
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
