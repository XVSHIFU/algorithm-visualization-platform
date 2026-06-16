/**
 * AI 服务类型定义
 * 支持本地知识库和扩展 API 接入
 */

export type AIProviderType = 'local' | 'openai' | 'claude' | 'proxy';

export interface AIChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}

export interface AIChatContext {
  route: string;
  algorithmName?: string;
  category?: 'sorting' | 'graph' | 'recursive' | 'general';
}

export interface AIProvider {
  name: string;
  type: AIProviderType;
  sendMessage: (messages: AIChatMessage[], context: AIChatContext) => Promise<string>;
}

export interface AIConfig {
  provider: AIProviderType;
  proxyUrl?: string;
  apiKey?: string;
  apiBaseUrl?: string;
  model?: string;
}
