# Tech Learning - 技术资源学习平台

<div align="center">
  <h3>🚀 包含技术文章、Prompt模板库、MCP/Agent Skill导航的综合技术资源平台</h3>

  ![Next.js](https://img.shields.io/badge/Next.js-15.1.3-black?style=flat-square&logo=next.js)
  ![NestJS](https://img.shields.io/badge/NestJS-10.0.0-red?style=flat-square&logo=nestjs)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

## ✨ 特性

- 🎨 **玻璃态设计风格** - 独特的视觉效果，半透明背景 + 模糊效果
- 🌈 **绿色/青色系主题** - 清新自然的配色方案
- ✨ **丰富的动画效果** - 微交互、页面转场、滚动触发动画
- 📱 **完全响应式** - 完美适配PC、平板、手机
- 🚀 **高性能** - 60fps流畅动画，快速加载
- 🔐 **微信扫码登录** - 便捷的认证方式（待实现）

## 📦 功能模块

### 1. 技术文章
- 文章列表展示
- 搜索和筛选功能
- 文章详情页
- 相关文章推荐

### 2. Prompt模板库
- 按用途分类（写作辅助、代码开发、数据分析等）
- 一键复制Prompt
- 点赞功能
- 相关模板推荐

### 3. 资源导航
- MCP服务器资源
- Agent Skills资源
- 开发工具推荐
- 学习资源汇总

## 🛠️ 技术栈

### 前端
- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS
- **动画**: Framer Motion
- **图标**: React Icons
- **HTTP客户端**: Axios

### 后端
- **框架**: NestJS 10
- **语言**: TypeScript
- **ORM**: Prisma
- **数据库**: PostgreSQL
- **认证**: JWT

## 📁 项目结构

```
tech-learning/
├── frontend/                 # 前端项目
│   ├── app/                 # Next.js App Router
│   │   ├── articles/        # 文章模块
│   │   ├── prompts/         # Prompt模板库
│   │   ├── navigation/      # 资源导航
│   │   └── login/           # 登录页面
│   ├── components/          # 组件目录
│   │   ├── layout/          # 布局组件
│   │   └── animations/      # 动画组件
│   ├── lib/                 # 工具函数
│   └── styles/              # 样式文件
│
├── backend/                 # 后端项目
│   ├── src/
│   │   ├── modules/         # 功能模块
│   │   │   ├── auth/        # 认证模块
│   │   │   ├── articles/    # 文章模块
│   │   │   ├── prompts/     # Prompt模块
│   │   │   └── navigation/  # 导航模块
│   │   └── main.ts          # 应用入口
│   └── prisma/              # 数据库模型
│
└── docs/                    # 项目文档
    └── 需求文档.md
```

## 🚀 快速开始

### 前置要求
- Node.js 18+
- PostgreSQL 14+
- npm 或 yarn

### 安装依赖

#### 前端
```bash
cd frontend
npm install
```

#### 后端
```bash
cd backend
npm install
```

### 配置环境变量

#### 后端 (.env)
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/tech_learning?schema=public"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# WeChat
WECHAT_APP_ID="your-wechat-app-id"
WECHAT_APP_SECRET="your-wechat-app-secret"

# App
PORT=3001
NODE_ENV=development
FRONTEND_URL="http://localhost:3000"
```

### 数据库初始化

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### 运行项目

#### 启动前端
```bash
cd frontend
npm run dev
```
访问: http://localhost:3000

#### 启动后端
```bash
cd backend
npm run start:dev
```
访问: http://localhost:3001

## 📸 页面预览

### 首页
- 动态背景光斑效果
- 三大模块入口卡片
- 玻璃态设计风格

### 技术文章
- 文章卡片网格布局
- 搜索和标签筛选
- 文章详情页

### Prompt模板库
- 分类标签切换
- 模板卡片展示
- 一键复制功能

### 资源导航
- Tab分类切换
- 资源卡片展示
- 外链跳转

## 🎨 设计特点

### 玻璃态效果
- 半透明背景
- 背景模糊 (backdrop-filter)
- 细腻的边框和阴影
- 渐变叠加层

### 动画效果
1. **微交互**
   - 按钮悬停动画
   - 卡片上浮效果
   - 输入框聚焦动画

2. **页面转场**
   - 路由切换动画
   - 渐入渐出效果

3. **滚动触发**
   - 元素渐入动画
   - 卡片交错显现

## 📝 待开发功能

- [ ] 后端API完整实现
- [ ] 数据库集成
- [ ] 微信扫码登录
- [ ] 用户个人中心
- [ ] 评论系统
- [ ] 内容管理后台
- [ ] 数据统计分析

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👥 作者

Tech Learning Team

---

**⭐ 如果这个项目对你有帮助，请给个Star支持一下！**
