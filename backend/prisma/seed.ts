import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('开始种子数据...')

  // 创建用户
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      nickname: 'Test User',
      openid: 'hashed_password_here',
    },
  })

  console.log('创建用户:', user.email)

  // 创建文章
  const articles = await Promise.all([
    prisma.article.create({
      data: {
        title: 'Next.js 14 App Router 完全指南',
        content: `# Next.js 14 App Router 完全指南\n\nNext.js 14 带来了许多令人兴奋的新特性...`,
        summary: '深入了解Next.js 14的新特性，包括App Router、Server Components和Suspense等核心概念。',
        tags: ['Next.js', 'React', '前端框架'],
        authorId: user.id,
        viewCount: 1234,
      },
    }),
    prisma.article.create({
      data: {
        title: 'NestJS微服务架构实践',
        content: `# NestJS微服务架构实践\n\n从零开始构建一个可扩展的微服务架构...`,
        summary: '从零开始构建一个可扩展的微服务架构，使用NestJS、gRPC和Docker。',
        tags: ['NestJS', '微服务', '后端架构'],
        authorId: user.id,
        viewCount: 987,
      },
    }),
  ])

  console.log(`创建 ${articles.length} 篇文章`)

  // 创建Prompt分类
  const categories = await Promise.all([
    prisma.promptCategory.create({
      data: {
        name: '代码开发',
        slug: 'coding',
        description: '代码相关的Prompt模板',
        icon: 'FiCode',
        sort: 0,
      },
    }),
    prisma.promptCategory.create({
      data: {
        name: '写作辅助',
        slug: 'writing',
        description: '写作相关的Prompt模板',
        icon: 'FiTrendingUp',
        sort: 1,
      },
    }),
  ])

  console.log(`创建 ${categories.length} 个Prompt分类`)

  // 创建Prompt
  const prompts = await Promise.all([
    prisma.prompt.create({
      data: {
        title: '代码审查助手',
        content: `你是一位经验丰富的代码审查专家。请按照以下步骤审查提供的代码：\n\n1. 代码质量分析\n2. 潜在问题识别\n3. 改进建议`,
        description: '帮助审查代码，发现潜在问题和改进建议',
        categoryId: categories[0].id,
        tags: ['代码审查', '最佳实践', '质量保证'],
        likes: 156,
        copies: 342,
        authorId: user.id,
      },
    }),
    prisma.prompt.create({
      data: {
        title: '文章写作助手',
        content: `请协助我撰写一篇结构清晰的技术博客文章...`,
        description: '协助撰写结构清晰的技术博客文章',
        categoryId: categories[1].id,
        tags: ['写作', '博客', '技术文章'],
        likes: 234,
        copies: 456,
        authorId: user.id,
      },
    }),
  ])

  console.log(`创建 ${prompts.length} 个Prompt`)

  // 创建导航分类
  const navCategories = await Promise.all([
    prisma.navCategory.create({
      data: {
        name: '开发工具',
        slug: 'dev-tools',
        icon: 'FiCode',
        sort: 0,
      },
    }),
    prisma.navCategory.create({
      data: {
        name: '学习资源',
        slug: 'learning',
        icon: 'FiBookOpen',
        sort: 1,
      },
    }),
  ])

  console.log(`创建 ${navCategories.length} 个导航分类`)

  // 创建导航链接
  const navLinks = await Promise.all([
    prisma.navLink.create({
      data: {
        title: 'GitHub',
        url: 'https://github.com',
        description: '代码托管平台',
        icon: 'FiGithub',
        categoryId: navCategories[0].id,
        clicks: 1234,
      },
    }),
    prisma.navLink.create({
      data: {
        title: 'MDN Web Docs',
        url: 'https://developer.mozilla.org',
        description: 'Web开发权威文档',
        icon: 'FiBook',
        categoryId: navCategories[1].id,
        clicks: 567,
      },
    }),
  ])

  console.log(`创建 ${navLinks.length} 个导航链接`)
  console.log('种子数据创建完成!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
