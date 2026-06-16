# AI 助手使用说明

## 概述

v0.3 版本新增内置 AI 算法助手，用户可以在任意页面通过右下角悬浮按钮打开聊天窗口，询问算法相关问题。

## 功能特性

### ✅ 本地知识库演示（默认）

- **离线可用**：无需网络，无需 API Key
- **回答稳定**：基于预设知识库，内容可控
- **上下文识别**：根据当前页面提供相关算法问答
- **快捷问题**：智能推荐常见问题

### ✅ 支持的问答内容

1. **平台使用**：功能介绍、控制面板操作、版本演进
2. **算法原理**：冒泡排序、快速排序、归并排序、Dijkstra、汉诺塔
3. **复杂度分析**：时间复杂度、空间复杂度
4. **具体问题**：为什么 O(n²)？pivot 是什么？为什么不能处理负权边？

### ✅ 上下文感知

AI 助手会根据你所在页面自动识别算法上下文：

- 在冒泡排序页面询问"为什么是 O(n²)"，会返回冒泡排序相关回答
- 在 Dijkstra 页面询问"为什么不能处理负权边"，会返回 Dijkstra 相关回答
- 快捷问题按钮也会根据当前页面动态变化

## 使用方法

### 1. 打开 AI 助手

点击右下角蓝色悬浮按钮 🤖

### 2. 询问问题

- **输入问题**：在输入框中输入你的问题，按回车或点击"发送"
- **快捷问题**：点击快捷问题按钮，快速发送常见问题

### 3. 查看回答

AI 助手会根据你的问题和当前页面上下文返回答案。

### 4. 清空对话

点击"清空"按钮可以清除当前对话历史。

## 扩展接入真实模型

### 为什么默认不直接接入 OpenAI / Claude？

**安全原因：**

- 前端环境变量会被打包到浏览器端
- 直接在前端暴露 API Key 会导致密钥泄露
- 可能遭受额度滥用和跨域问题

### ⚠️ 安全警告

**生产环境部署时，请务必注意：**

1. **不要把带有真实 API Key 的 .env.local 提交到 GitHub**
2. **不要使用带有真实 API Key 的配置进行 `npm run build` 并部署到公开网站**
3. **真实 API Key 应该只在你本地开发环境使用**
4. **如果要部署到公开环境，建议使用方式三（后端代理）**

### 三种接入方式

#### 方式一：本地知识库（默认，推荐演示）

无需配置，开箱即用，适合课程设计答辩演示。

#### 方式二：直接配置 API Key（仅限本地测试）

⚠️ **仅用于本地开发测试，不要部署到公开环境！**

适用场景：

- 你从 GitHub 克隆了源码到本地
- 你想在本地测试真实 AI 模型
- 你不会把这个配置提交到 GitHub 或部署到公开网站

支持的 API：

- OpenAI（gpt-5.5, gpt-5.4 等）
- DeepSeek（deepseek-v4-pro,deepseek-v4-flash）
- 智谱 GLM（glm-5.1）
- 任何兼容 OpenAI Chat Completions 格式的 API

#### 方式三：后端代理（推荐生产环境）

API Key 由后端服务器保管，前端不暴露。适合部署到公开环境。

### 方式二配置步骤（本地测试）

#### 1. 创建本地配置文件

```bash
# 在项目根目录
cd E:\tyut02\work\algorithm-visualization-platform

# 复制示例配置
cp .env.example .env.local
```

**重要：** `.env.local` 已在 `.gitignore` 中，不会被提交到 GitHub。

#### 2. 编辑 .env.local

##### 示例一：OpenAI 配置

```env
VITE_AI_PROVIDER=openai
VITE_AI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_AI_API_BASE_URL=https://api.openai.com/v1
VITE_AI_MODEL=gpt-5.5
```

##### 示例二：DeepSeek 配置（推荐，便宜好用）

```env
VITE_AI_PROVIDER=openai
VITE_AI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_AI_API_BASE_URL=https://api.deepseek.com
VITE_AI_MODEL=deepseek-v4-pro
```

**DeepSeek 特点：**

- 价格便宜（0.14元/百万tokens 输入，0.28元/百万tokens 输出）
- 中文效果好
- 兼容 OpenAI API 格式
- 官网：https://platform.deepseek.com/

##### 示例三：智谱 GLM 配置

```env
VITE_AI_PROVIDER=openai
VITE_AI_API_KEY=你的智谱API密钥
VITE_AI_API_BASE_URL=https://open.bigmodel.cn/api/paas/v4
VITE_AI_MODEL=glm-4
```

#### 3. 重启开发服务器

```bash
# 停止当前服务器（Ctrl+C）

# 重新启动
npm run dev
```

现在 AI 助手会使用你配置的真实模型进行回答。

#### 4. 测试验证

打开浏览器，点击右下角 AI 助手按钮，输入问题测试：

- "冒泡排序的时间复杂度是多少？"
- "Dijkstra 为什么不能处理负权边？"

你应该能看到真实 AI 模型的回答（不再是预设的本地知识库回答）。

#### 5. 查看控制台

打开浏览器开发者工具（F12），查看 Console 标签页：

- 如果看到 `[AI Provider] 使用 OpenAI Compatible Provider`，说明配置成功
- 如果看到 `[AI Provider] 回退到本地知识库模式`，说明配置有问题

#### 常见问题

**Q: 显示 "API Key 未配置"？**
A: 检查 `.env.local` 文件中 `VITE_AI_API_KEY` 是否填写，重启开发服务器。

**Q: 显示 "API 请求失败: 401"？**
A: API Key 错误或已过期，请检查密钥是否正确。

**Q: 显示 "API 请求失败: 403"？**
A: API Key 没有权限或账户余额不足。

**Q: 显示网络错误？**
A: 检查网络连接，或者 API 基础地址是否正确。

**Q: 修改 .env.local 后没有生效？**
A: 必须重启开发服务器（Ctrl+C 停止，然后 `npm run dev` 重新启动）。

### 方式三配置步骤（后端代理）

⚠️ **推荐用于生产环境部署**，API Key 由后端保管，前端不暴露。

#### 1. 配置前端

编辑 `.env.local`：

```env
VITE_AI_PROVIDER=proxy
VITE_AI_PROXY_URL=http://localhost:3001/api/ai-chat
```

或部署时使用你的后端地址：

```env
VITE_AI_PROVIDER=proxy
VITE_AI_PROXY_URL=https://your-backend.com/api/ai-chat
```

#### 2. 实现后端代理

**Node.js + Express 示例：**

```javascript
// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/ai-chat', async (req, res) => {
  const { messages, context } = req.body;

  // 从服务器环境变量读取 API Key
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    // 转发到 OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500
      })
    });

    const data = await response.json();
    res.json({ content: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('AI 代理服务运行在 http://localhost:3001');
});
```

**运行代理：**

```bash
# 在服务器端设置 API Key
export OPENAI_API_KEY=sk-your-real-api-key-here

# 启动代理服务
node server.js
```

#### 4. 重启前端开发服务器

```bash
npm run dev
```

现在 AI 助手会请求你配置的代理地址，由代理服务转发到真实模型 API。

### 其他接入方式

#### Vercel Serverless Function

在 `api/ai-chat.ts` 中实现：

```typescript
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { messages } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  // 转发逻辑
  // ...

  res.json({ content: '...' });
}
```

#### 本地模型服务

如果你本地运行兼容 OpenAI Chat Completions 格式的模型服务（如 Ollama、LocalAI），可以直接配置其地址：

```env
VITE_AI_PROVIDER=proxy
VITE_AI_PROXY_URL=http://localhost:11434/v1/chat/completions
```

## 注意事项

1. **不要提交 API Key**：`.env.local` 和真实密钥不应提交到 GitHub
2. **不要部署带密钥的构建**：使用方式二配置 API Key 后，不要执行 `npm run build` 并部署到公开网站
3. **默认离线可用**：即使不配置任何 API，本地知识库模式也能正常演示
4. **课程设计演示**：答辩时建议使用默认本地模式，避免网络不稳定影响演示
5. **测试真实模型**：如需测试真实模型效果，在本地使用方式二配置即可
6. **生产环境部署**：如需部署到公开网站，使用方式三（后端代理）
7. **扩展性预留**：Provider 接口已预留，用户可自行实现 `claudeProvider.ts` 或其他 Provider

## 开发者说明

### 添加新的知识条目

编辑 `src/services/ai/localKnowledgeProvider.ts`：

```typescript
{
  keywords: ['新关键字', '问题'],
  answer: '答案内容',
  context: ['算法页面标识']  // 可选
}
```

### 实现新的 Provider

实现 `AIProvider` 接口：

```typescript
export class MyCustomProvider implements AIProvider {
  name = '我的 Provider';
  type = 'custom' as const;

  async sendMessage(messages: AIChatMessage[], context: AIChatContext): Promise<string> {
    // 实现逻辑
    return '回答内容';
  }
}
```

在 `providerFactory.ts` 中注册即可。

## 常见问题

**Q: 为什么默认不联网？**
A: 保证离线演示稳定，避免 API Key 泄露风险。

**Q: 如何接入 Claude API？**
A: 参考上述"实现后端代理"步骤，将 OpenAI API 替换为 Claude API 即可。

**Q: 本地知识库能回答所有问题吗？**
A: 本地知识库覆盖项目内 5 个算法和平台使用相关问题，无法回答的会给出引导提示。

**Q: 可以用其他模型吗？**
A: 可以。只要你的代理服务返回文本格式的回答，前端不限制后端使用什么模型。

---

**最后更新：** 2026年6月16日
**版本：** v0.3
