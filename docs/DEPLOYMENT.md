# 部署指南

本文档说明如何将算法可视化平台部署到 GitHub Pages。

---

## 📋 目录

- [部署前准备](#部署前准备)
- [部署步骤](#部署步骤)
- [自动化部署脚本](#自动化部署脚本)
- [注意事项](#注意事项)
- [常见问题](#常见问题)
- [回滚方法](#回滚方法)

---

## 部署前准备

### 1. 确保代码已提交

```bash
# 查看当前状态
git status

# 如有修改，先提交到 main 分支
git add .
git commit -m "你的修改说明"
git push origin main
```

### 2. ⚠️ 检查环境配置（重要）

**部署到公开网站时，必须使用本地知识库模式，不要暴露 API Key！**

检查 `.env.local` 文件：

```bash
# 正确配置：DeepSeek API 应该被注释掉
# VITE_AI_PROVIDER=openai
# VITE_AI_API_KEY=sk-xxxxxxxx
# VITE_AI_API_BASE_URL=https://api.deepseek.com
# VITE_AI_MODEL=deepseek-v4-pro
```

如果没有 `.env.local` 或配置被注释，构建时会自动使用本地知识库模式（`VITE_AI_PROVIDER=local`）。

**重要提示：**
- ✅ `.env.local` 已在 `.gitignore` 中，不会被提交
- ✅ Vite 构建时只会打包 `import.meta.env.VITE_*` 变量
- ✅ 如果环境变量未设置，代码会自动使用本地模式
- ❌ 不要创建 `.env.production` 并写入真实 API Key
- ❌ 不要在代码中硬编码 API Key

---

## 部署步骤

### 方法一：手动部署（推荐，最可控）

#### 步骤 1：构建项目

```bash
# 确保在项目根目录
cd E:\tyut02\work\algorithm-visualization-platform

# 构建生产版本
npm run build
```

构建成功后，会在 `dist/` 目录生成部署文件：

```
dist/
├── index.html
└── assets/
    ├── index-[hash].css
    └── index-[hash].js
```

#### 步骤 2：切换到 gh-pages 分支

```bash
# 如果 gh-pages 分支不存在，创建它
git checkout -b gh-pages

# 如果已存在，直接切换
git checkout gh-pages
```

#### 步骤 3：清空并复制构建产物

```bash
# 清空当前分支所有文件
git rm -rf .

# 复制 dist 目录内容到根目录
cp -r dist/* .

# 删除不需要的临时文件
rm -rf dist node_modules public tests .env.local .claude
```

#### 步骤 4：提交并推送

```bash
# 添加所有文件
git add -A

# 提交
git commit -m "Deploy v0.3 to gh-pages"

# 强制推送（因为 gh-pages 历史不重要）
git push origin gh-pages --force
```

#### 步骤 5：切回 main 分支

```bash
git checkout main
```

#### 步骤 6：验证部署

等待 1-3 分钟后，访问：

```
https://你的GitHub用户名.github.io/algorithm-visualization-platform/
```

本项目地址：
```
https://xvshifu.github.io/algorithm-visualization-platform/
```

---

### 方法二：使用部署脚本（推荐，最方便）

为了简化部署流程，可以创建一个自动化脚本。

#### Windows 用户（PowerShell）

创建 `deploy.ps1` 文件：

```powershell
# 算法可视化平台部署脚本

Write-Host "开始部署到 GitHub Pages..." -ForegroundColor Green

# 1. 检查是否在 main 分支
$branch = git rev-parse --abbrev-ref HEAD
if ($branch -ne "main") {
    Write-Host "错误：请在 main 分支执行部署" -ForegroundColor Red
    exit 1
}

# 2. 检查是否有未提交的修改
$status = git status --porcelain
if ($status) {
    Write-Host "警告：有未提交的修改，是否继续？(y/n)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -ne "y") {
        Write-Host "部署已取消" -ForegroundColor Red
        exit 1
    }
}

# 3. 构建项目
Write-Host "正在构建项目..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "构建失败" -ForegroundColor Red
    exit 1
}

# 4. 切换到 gh-pages 分支
Write-Host "切换到 gh-pages 分支..." -ForegroundColor Cyan
git checkout gh-pages
if ($LASTEXITCODE -ne 0) {
    git checkout -b gh-pages
}

# 5. 清空并复制
Write-Host "清空旧文件并复制新构建..." -ForegroundColor Cyan
git rm -rf .
Copy-Item -Path "dist\*" -Destination "." -Recurse
Remove-Item -Path "dist", "node_modules", "public", "tests", ".env.local", ".claude" -Recurse -ErrorAction SilentlyContinue

# 6. 提交
Write-Host "提交部署..." -ForegroundColor Cyan
git add -A
$date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Deploy to gh-pages at $date"

# 7. 推送
Write-Host "推送到 GitHub..." -ForegroundColor Cyan
git push origin gh-pages --force

# 8. 切回 main
Write-Host "切回 main 分支..." -ForegroundColor Cyan
git checkout main

Write-Host "部署完成！" -ForegroundColor Green
Write-Host "访问地址：https://xvshifu.github.io/algorithm-visualization-platform/" -ForegroundColor Green
```

**使用方法：**

```powershell
# 给脚本执行权限（首次）
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# 执行部署
.\deploy.ps1
```

#### Linux/Mac 用户（Bash）

创建 `deploy.sh` 文件：

```bash
#!/bin/bash

# 算法可视化平台部署脚本

echo "开始部署到 GitHub Pages..."

# 1. 检查是否在 main 分支
branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$branch" != "main" ]; then
    echo "错误：请在 main 分支执行部署"
    exit 1
fi

# 2. 检查是否有未提交的修改
if [ -n "$(git status --porcelain)" ]; then
    echo "警告：有未提交的修改，是否继续？(y/n)"
    read -r response
    if [ "$response" != "y" ]; then
        echo "部署已取消"
        exit 1
    fi
fi

# 3. 构建项目
echo "正在构建项目..."
npm run build || exit 1

# 4. 切换到 gh-pages 分支
echo "切换到 gh-pages 分支..."
git checkout gh-pages || git checkout -b gh-pages

# 5. 清空并复制
echo "清空旧文件并复制新构建..."
git rm -rf .
cp -r dist/* .
rm -rf dist node_modules public tests .env.local .claude

# 6. 提交
echo "提交部署..."
git add -A
git commit -m "Deploy to gh-pages at $(date '+%Y-%m-%d %H:%M:%S')"

# 7. 推送
echo "推送到 GitHub..."
git push origin gh-pages --force

# 8. 切回 main
echo "切回 main 分支..."
git checkout main

echo "部署完成！"
echo "访问地址：https://xvshifu.github.io/algorithm-visualization-platform/"
```

**使用方法：**

```bash
# 给脚本执行权限（首次）
chmod +x deploy.sh

# 执行部署
./deploy.sh
```

---

### 方法三：使用 gh-pages 工具

如果 npm 权限正常，可以使用 `gh-pages` 自动化工具。

#### 安装 gh-pages

```bash
npm install --save-dev gh-pages
```

#### 添加部署脚本到 package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### 执行部署

```bash
npm run deploy
```

`gh-pages` 工具会自动：
1. 构建项目
2. 将 `dist/` 内容推送到 `gh-pages` 分支
3. 不会切换你的当前分支

---

## 注意事项

### ⚠️ 安全注意事项

#### 1. 不要暴露 API Key

**错误做法：**
```bash
# ❌ 不要这样做
echo "VITE_AI_PROVIDER=openai" > .env.production
echo "VITE_AI_API_KEY=sk-真实密钥" >> .env.production
npm run build
npm run deploy
```

这会把 API Key 打包到 JavaScript 文件中，任何人都能在浏览器中查看！

**正确做法：**
- 部署时不配置 API Key，使用本地知识库模式
- 或者配置后端代理，API Key 由服务器保管

#### 2. .env.local 安全性

- ✅ `.env.local` 已在 `.gitignore` 中，不会被提交
- ✅ Vite 构建时只读取 `.env` 和 `.env.production`
- ✅ 如果这些文件不存在或未设置变量，会使用代码中的默认值（`local` 模式）

#### 3. 验证部署版本

部署后，打开浏览器开发者工具（F12）：

**检查 AI 模式：**
- 应该显示"本地知识库演示"
- Console 应该看到 `[AI Provider] 使用 本地知识库模式`
- Network 标签不应该有发往 `api.deepseek.com` 的请求

**如果发现 API 请求：**
1. 立即回滚部署（见下方回滚方法）
2. 检查 `.env.production` 是否存在并删除
3. 重新构建和部署

### 🔄 basename 配置

项目使用了 `basename="/algorithm-visualization-platform"`，确保：

1. **vite.config.ts** 中 `base` 配置正确：
```typescript
export default defineConfig({
  base: '/algorithm-visualization-platform/',
  // ...
})
```

2. **App.tsx** 中 `BrowserRouter` 的 `basename` 一致：
```typescript
<BrowserRouter basename="/algorithm-visualization-platform">
```

如果部署到根路径（如自定义域名），需要改为：
```typescript
base: '/',  // vite.config.ts
basename="/"  // App.tsx
```

### 📦 构建产物检查

部署前检查 `dist/` 目录：

```bash
# 查看构建文件
ls -la dist/

# 应该包含
dist/
├── index.html          # 入口 HTML
├── assets/
│   ├── index-[hash].css   # 样式文件
│   └── index-[hash].js    # JavaScript 文件
└── algorithm-visualization-platform/  # 如果有 basename，可能有子目录
```

### ⏱️ GitHub Pages 生效时间

- 首次部署：3-5 分钟
- 后续更新：1-3 分钟
- 缓存清理：可能需要强制刷新（Ctrl+Shift+R）

---

## 常见问题

### Q1: 404 错误

**症状：** 访问 `https://xvshifu.github.io/algorithm-visualization-platform/` 显示 404

**可能原因：**
1. GitHub Pages 还未生效（等待 3-5 分钟）
2. 仓库设置中 Pages 未开启
3. gh-pages 分支不存在或为空

**解决方法：**
```bash
# 检查 gh-pages 分支是否存在
git branch -a

# 检查 gh-pages 分支内容
git checkout gh-pages
ls -la

# 应该能看到 index.html 和 assets/
```

在 GitHub 仓库设置中：
1. 进入 **Settings** → **Pages**
2. Source 选择 `gh-pages` 分支
3. 点击 Save

### Q2: 页面空白

**症状：** 页面加载但显示空白

**可能原因：**
1. `basename` 配置错误
2. JavaScript 加载失败
3. 资源路径错误

**解决方法：**
打开浏览器开发者工具（F12）：
1. 查看 Console 是否有错误
2. 查看 Network 是否有 404 请求
3. 检查 `vite.config.ts` 的 `base` 配置

### Q3: AI 助手不工作

**症状：** AI 助手打不开或无法回答问题

**可能原因：**
1. JavaScript 打包错误
2. 服务层代码问题

**解决方法：**
```bash
# 本地验证构建产物
npm run build
npm run preview

# 访问 http://localhost:4173/algorithm-visualization-platform/
# 测试 AI 助手功能
```

如果本地 preview 正常，部署版本不正常，检查缓存：
- 浏览器强制刷新：Ctrl+Shift+R
- 清除浏览器缓存

### Q4: 样式错乱

**症状：** 页面显示但样式不正确

**可能原因：**
1. CSS 文件加载失败
2. `base` 路径配置错误

**解决方法：**
检查 `dist/index.html` 中的资源引用：
```html
<!-- 正确格式 -->
<link rel="stylesheet" href="/algorithm-visualization-platform/assets/index-[hash].css">
<script src="/algorithm-visualization-platform/assets/index-[hash].js"></script>
```

### Q5: 更新后还是旧版本

**症状：** 部署成功但页面显示旧内容

**可能原因：**
1. 浏览器缓存
2. CDN 缓存（GitHub Pages）

**解决方法：**
1. 强制刷新：Ctrl+Shift+R（Windows）或 Cmd+Shift+R（Mac）
2. 清除浏览器缓存
3. 等待 5-10 分钟
4. 使用隐私模式打开

---

## 回滚方法

如果部署出现问题，需要回滚到之前的版本。

### 方法一：回滚到上一个 commit

```bash
# 切换到 gh-pages 分支
git checkout gh-pages

# 查看历史记录
git log --oneline

# 回滚到上一个提交（假设是 abc1234）
git reset --hard abc1234

# 强制推送
git push origin gh-pages --force

# 切回 main
git checkout main
```

### 方法二：重新部署指定版本

```bash
# 切换到指定版本的 main 分支
git checkout v0.2  # 或其他标签/commit

# 构建
npm run build

# 按照正常部署流程部署
# （参考上面的"部署步骤"）

# 完成后切回最新 main
git checkout main
```

---

## 部署检查清单

部署前检查：

- [ ] 代码已提交到 main 分支
- [ ] `.env.local` 中 API Key 已注释或删除
- [ ] `npm run build` 构建成功
- [ ] `npm run lint` 无错误
- [ ] 本地 `npm run preview` 测试通过

部署后验证：

- [ ] 网站能正常访问
- [ ] 首页显示正常
- [ ] 算法可视化功能正常
- [ ] AI 助手能打开
- [ ] AI 助手显示"本地知识库演示"
- [ ] AI 助手能正常回答问题
- [ ] 无 Console 错误
- [ ] Network 无异常请求（特别是无 API 请求）

---

## 版本历史

| 版本 | 部署日期 | 说明 |
|------|---------|------|
| v0.3 | 2026-06-16 | AI 助手集成，本地知识库模式 |
| v0.2 | 2026-06-15 | 漫画风格 UI 优化 |
| v0.1 | 2026-06-15 | 首个完整版本 |

---

**文档最后更新：** 2026年6月16日  
**维护者：** 算法可视化平台开发团队
