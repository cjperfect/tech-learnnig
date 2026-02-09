import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as childProcess from 'child_process';

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseInitService.name);
  private prisma = new PrismaClient();

  async onModuleInit() {
    // 只在开发环境下自动初始化数据库
    if (process.env.NODE_ENV !== 'production') {
      await this.initializeDatabase();
    }
  }

  private async initializeDatabase() {
    try {
      this.logger.log('开始初始化数据库...');

      // 1. 同步数据库结构 (创建表)
      await this.syncDatabase();

      // 2. 插入测试数据
      await this.seedDatabase();

      this.logger.log('数据库初始化完成!');
    } catch (error) {
      this.logger.error('数据库初始化失败:', error);
      // 不抛出错误，允许应用继续启动
    }
  }

  private async syncDatabase() {
    return new Promise<void>((resolve, reject) => {
      this.logger.log('同步数据库结构...');
      const prismaProcess = childProcess.spawn('npx', ['prisma', 'db', 'push', '--skip-generate'], {
        stdio: 'inherit',
        shell: true,
        cwd: process.cwd(),
      });

      prismaProcess.on('close', (code) => {
        if (code === 0) {
          this.logger.log('数据库结构同步完成');
          resolve();
        } else {
          reject(new Error(`数据库同步失败，退出码: ${code}`));
        }
      });

      prismaProcess.on('error', (error) => {
        reject(error);
      });
    });
  }

  private async seedDatabase() {
    // 检查是否已有数据
    const userCount = await this.prisma.user.count();
    if (userCount > 0) {
      this.logger.log('数据库已有数据，跳过种子数据插入');
      return;
    }

    this.logger.log('开始插入测试数据...');

    // 创建用户
    const user = await this.prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        nickname: '测试用户',
        openid: 'test_openid_' + Date.now(),
      },
    });

    this.logger.log(`创建用户: ${user.email} (ID: ${user.id})`);

    // 创建文章
    const articles = await Promise.all([
      this.prisma.article.create({
        data: {
          title: 'Next.js 14 App Router 完全指南',
          content: `# Next.js 14 App Router 完全指南

Next.js 14 带来了许多令人兴奋的新特性，本文将深入探讨这些特性。

## 什么是 App Router？

App Router 是 Next.js 13 引入的新路由系统，基于 React Server Components 构建。

## 主要特性

1. **Server Components**: 默认使用服务端组件，提升性能
2. **Streaming**: 支持渐进式渲染
3. **Suspense**: 更好的加载状态管理

## 代码示例

\`\`\`typescript
// app/page.tsx
export default async function Home() {
  const data = await fetchData();
  return <div>{data}</div>;
}
\`\`\`

## 总结

Next.js 14 的 App Router 为我们提供了更强大的工具来构建现代 Web 应用。`,
          summary: '深入了解Next.js 14的新特性，包括App Router、Server Components和Suspense等核心概念。',
          tags: ['Next.js', 'React', '前端框架'],
          authorId: user.id,
          viewCount: 1234,
        },
      }),
      this.prisma.article.create({
        data: {
          title: 'NestJS微服务架构实践',
          content: `# NestJS微服务架构实践

从零开始构建一个可扩展的微服务架构。

## 为什么选择微服务？

微服务架构提供了：
- 独立部署
- 技术栈灵活
- 更好的扩展性

## NestJS 微服务

NestJS 提供了强大的微支持，可以使用 TCP、Redis、NATS 等传输层。

\`\`\`typescript
// main.ts
const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  AppModule,
  {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 8877 },
  },
);
await app.listen();
\`\`\`

## Docker 部署

使用 Docker 容器化部署微服务...`,
          summary: '从零开始构建一个可扩展的微服务架构，使用NestJS、gRPC和Docker。',
          tags: ['NestJS', '微服务', '后端架构'],
          authorId: user.id,
          viewCount: 987,
        },
      }),
      this.prisma.article.create({
        data: {
          title: 'TypeScript 高级类型技巧',
          content: `# TypeScript 高级类型技巧

掌握 TypeScript 的高级类型可以让你的代码更加类型安全和易于维护。

## 泛型

泛型是 TypeScript 中最强大的特性之一。

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

## 条件类型

根据条件选择类型：

\`\`\`typescript
type IsArray<T> = T extends any[] ? true : false;
\`\`\`

## 映射类型

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
\`\`\``,
          summary: '探索TypeScript的高级类型系统，包括泛型、条件类型、映射类型等。',
          tags: ['TypeScript', '前端开发', '类型系统'],
          authorId: user.id,
          viewCount: 2341,
        },
      }),
      this.prisma.article.create({
        data: {
          title: 'Vue 3 Composition API 详解',
          content: `# Vue 3 Composition API 详解

Composition API 是 Vue 3 最重要的新特性之一。

## setup() 函数

\`\`\`typescript
import { ref, computed } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const doubled = computed(() => count.value * 2);
    return { count, doubled };
  }
};
\`\`\`

## 响应式原理

Vue 3 使用 Proxy 实现响应式，相比 Vue 2 的 Object.defineProperty 有更好的性能。

## 总结

Composition API 提供了更好的代码组织和复用能力。`,
          summary: '深入了解Vue 3的Composition API，包括setup函数、响应式系统和生命周期钩子。',
          tags: ['Vue', '前端框架', 'JavaScript'],
          authorId: user.id,
          viewCount: 1876,
        },
      }),
      this.prisma.article.create({
        data: {
          title: 'Docker 容器化最佳实践',
          content: `# Docker 容器化最佳实践

Docker 已经成为现代应用部署的标准工具。

## Dockerfile 最佳实践

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## 多阶段构建

使用多阶段构建减小镜像体积：

\`\`\`dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
COPY --from=builder /app/dist ./dist
\`\`\`

## docker-compose

使用 docker-compose 管理多容器应用。`,
          summary: '学习Docker容器化的最佳实践，包括镜像优化、多阶段构建和容器编排。',
          tags: ['Docker', 'DevOps', '容器化'],
          authorId: user.id,
          viewCount: 1543,
        },
      }),
    ]);

    this.logger.log(`创建 ${articles.length} 篇文章`);

    // 创建 Prompt 分类
    const categories = await Promise.all([
      this.prisma.promptCategory.create({
        data: {
          name: '代码开发',
          slug: 'coding',
          description: '代码相关的Prompt模板',
          icon: 'FiCode',
          sort: 0,
        },
      }),
      this.prisma.promptCategory.create({
        data: {
          name: '写作辅助',
          slug: 'writing',
          description: '写作相关的Prompt模板',
          icon: 'FiTrendingUp',
          sort: 1,
        },
      }),
    ]);

    this.logger.log(`创建 ${categories.length} 个Prompt分类`);

    // 创建 Prompt
    const prompts = await Promise.all([
      this.prisma.prompt.create({
        data: {
          title: '代码审查助手',
          content: `你是一位经验丰富的代码审查专家。请按照以下步骤审查提供的代码：

1. 代码质量分析
2. 潜在问题识别
3. 改进建议

请给出具体的改进建议和最佳实践。`,
          description: '帮助审查代码，发现潜在问题和改进建议',
          categoryId: categories[0].id,
          tags: ['代码审查', '最佳实践', '质量保证'],
          likes: 156,
          copies: 342,
          authorId: user.id,
        },
      }),
      this.prisma.prompt.create({
        data: {
          title: '文章写作助手',
          content: `请协助我撰写一篇结构清晰的技术博客文章。

要求：
1. 标题吸引人且准确
2. 结构清晰，有目录
3. 包含代码示例
4. 有总结和延伸阅读`,
          description: '协助撰写结构清晰的技术博客文章',
          categoryId: categories[1].id,
          tags: ['写作', '博客', '技术文章'],
          likes: 234,
          copies: 456,
          authorId: user.id,
        },
      }),
    ]);

    this.logger.log(`创建 ${prompts.length} 个Prompt`);

    // 创建导航分类
    const navCategories = await Promise.all([
      this.prisma.navCategory.create({
        data: {
          name: '开发工具',
          slug: 'dev-tools',
          icon: 'FiCode',
          sort: 0,
        },
      }),
      this.prisma.navCategory.create({
        data: {
          name: '学习资源',
          slug: 'learning',
          icon: 'FiBookOpen',
          sort: 1,
        },
      }),
    ]);

    this.logger.log(`创建 ${navCategories.length} 个导航分类`);

    // 创建导航链接
    const navLinks = await Promise.all([
      this.prisma.navLink.create({
        data: {
          title: 'GitHub',
          url: 'https://github.com',
          description: '代码托管平台',
          icon: 'FiGithub',
          categoryId: navCategories[0].id,
          clicks: 1234,
        },
      }),
      this.prisma.navLink.create({
        data: {
          title: 'MDN Web Docs',
          url: 'https://developer.mozilla.org',
          description: 'Web开发权威文档',
          icon: 'FiBook',
          categoryId: navCategories[1].id,
          clicks: 567,
        },
      }),
      this.prisma.navLink.create({
        data: {
          title: 'Stack Overflow',
          url: 'https://stackoverflow.com',
          description: '程序员问答社区',
          icon: 'FiMessageSquare',
          categoryId: navCategories[1].id,
          clicks: 892,
        },
      }),
    ]);

    this.logger.log(`创建 ${navLinks.length} 个导航链接`);
    this.logger.log('测试数据插入完成!');
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}
