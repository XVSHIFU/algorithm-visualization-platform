/**
 * OpenAI 兼容 Provider
 * 支持 OpenAI、DeepSeek、GLM 等兼容 OpenAI Chat Completions API 的服务
 */

import { AIProvider, AIChatMessage, AIChatContext, AIConfig } from './aiTypes';

export class OpenAIProvider implements AIProvider {
  name = 'OpenAI Compatible Provider';
  type = 'openai' as const;

  private apiKey: string;
  private apiBaseUrl: string;
  private model: string;

  constructor(config: AIConfig) {
    this.apiKey = config.apiKey || '';
    this.apiBaseUrl = config.apiBaseUrl || 'https://api.openai.com/v1';
    this.model = config.model || 'gpt-3.5-turbo';

    if (!this.apiKey) {
      throw new Error('API Key 未配置，请在 .env.local 中设置 VITE_AI_API_KEY');
    }
  }

  async sendMessage(messages: AIChatMessage[], context: AIChatContext): Promise<string> {
    try {
      // 构建系统提示，加入算法上下文
      const systemPrompt = this.buildSystemPrompt(context);

      const requestMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ];

      const response = await fetch(`${this.apiBaseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: requestMessages,
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[OpenAI Provider] API 错误:', errorText);
        throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.choices || data.choices.length === 0) {
        throw new Error('API 返回数据格式错误');
      }

      return data.choices[0].message.content;

    } catch (error) {
      console.error('[OpenAI Provider] 请求失败:', error);

      if (error instanceof Error) {
        return `抱歉，AI 助手遇到问题：${error.message}\n\n请检查：\n1. API Key 是否正确\n2. 网络连接是否正常\n3. API 基础地址是否正确`;
      }

      return '抱歉，AI 助手遇到未知错误，请稍后再试。';
    }
  }

  private buildSystemPrompt(context: AIChatContext): string {
    let prompt = `你是一个算法可视化平台的 AI 助手，专门帮助用户理解算法原理和操作。

当前平台支持的算法：
- 冒泡排序（Bubble Sort）：O(n²)
- 快速排序（Quick Sort）：O(n log n)
- 归并排序（Merge Sort）：O(n log n)
- Dijkstra 最短路径：O((V+E)logV)
- 汉诺塔（Tower of Hanoi）：O(2^n)

回答要求：
1. 回答简洁明了，300字以内
2. 使用中文
3. 解释算法原理时可以结合具体步骤
4. 回答复杂度问题时要说明原因`;

    if (context.algorithmName) {
      prompt += `\n\n用户当前正在查看：${context.algorithmName}`;
      prompt += `\n请优先结合 ${context.algorithmName} 的特点回答问题。`;
    }

    return prompt;
  }
}
