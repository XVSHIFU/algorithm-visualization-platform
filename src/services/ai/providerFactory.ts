/**
 * AI Provider 工厂
 *
 * 根据配置选择合适的 Provider
 * 默认使用本地知识库，保证离线可用
 */

import { AIProvider, AIProviderType, AIConfig } from './aiTypes';
import { localKnowledgeProvider } from './localKnowledgeProvider';
import { OpenAIProvider } from './openaiProvider';

/**
 * 获取当前配置
 * 从 Vite 环境变量读取，默认为 local
 */
export function getAIConfig(): AIConfig {
  const providerType = (import.meta.env.VITE_AI_PROVIDER || 'local') as AIProviderType;
  const proxyUrl = import.meta.env.VITE_AI_PROXY_URL;
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_AI_API_BASE_URL;
  const model = import.meta.env.VITE_AI_MODEL;

  return {
    provider: providerType,
    proxyUrl,
    apiKey,
    apiBaseUrl,
    model
  };
}

/**
 * 获取 Provider 显示名称
 */
export function getProviderDisplayName(): string {
  const config = getAIConfig();

  if (config.provider === 'local') {
    return '本地知识库演示';
  }

  if (config.provider === 'openai' && config.model) {
    return config.model;
  }

  if (config.provider === 'openai') {
    return 'OpenAI API';
  }

  if (config.provider === 'proxy') {
    return '代理服务';
  }

  return config.provider;
}

/**
 * 创建 AI Provider
 *
 * v0.3 支持 local 和 openai（兼容格式）
 */
export function createAIProvider(config?: AIConfig): AIProvider {
  const finalConfig = config || getAIConfig();

  switch (finalConfig.provider) {
    case 'local':
      return localKnowledgeProvider;

    case 'openai':
      try {
        return new OpenAIProvider(finalConfig);
      } catch (error) {
        console.error('[AI Provider] OpenAI Provider 初始化失败:', error);
        console.warn('[AI Provider] 回退到本地知识库模式');
        return localKnowledgeProvider;
      }

    // 预留扩展：用户可自行实现 claude/proxy provider
    case 'claude':
    case 'proxy':
      console.warn(
        `[AI Provider] "${finalConfig.provider}" 类型暂未实现，回退到本地知识库模式。\n` +
        `如需接入真实模型，请参考 docs/AI_ASSISTANT.md 配置代理服务。`
      );
      return localKnowledgeProvider;

    default:
      console.warn(`[AI Provider] 未知类型 "${finalConfig.provider}"，使用本地知识库。`);
      return localKnowledgeProvider;
  }
}
