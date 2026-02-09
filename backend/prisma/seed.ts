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
    prisma.promptCategory.upsert({
      where: { slug: 'coding' },
      update: {},
      create: {
        name: '代码开发',
        slug: 'coding',
        description: '代码相关的Prompt模板',
        icon: 'FiCode',
        sort: 0,
      },
    }),
    prisma.promptCategory.upsert({
      where: { slug: 'writing' },
      update: {},
      create: {
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
    prisma.navCategory.upsert({
      where: { slug: 'dev-tools' },
      update: {},
      create: {
        name: '开发工具',
        slug: 'dev-tools',
        icon: 'FiCode',
        sort: 0,
      },
    }),
    prisma.navCategory.upsert({
      where: { slug: 'learning' },
      update: {},
      create: {
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

  // 创建 MCP 分类
  const mcpCategories = await Promise.all([
    prisma.mcpCategory.upsert({
      where: { slug: 'filesystem' },
      update: {},
      create: {
        name: '文件系统',
        slug: 'filesystem',
        description: '文件系统相关的 MCP 服务器',
        icon: 'FiFolder',
        sort: 0,
      },
    }),
    prisma.mcpCategory.upsert({
      where: { slug: 'database' },
      update: {},
      create: {
        name: '数据库',
        slug: 'database',
        description: '数据库相关的 MCP 服务器',
        icon: 'FiDatabase',
        sort: 1,
      },
    }),
    prisma.mcpCategory.upsert({
      where: { slug: 'api' },
      update: {},
      create: {
        name: 'API 集成',
        slug: 'api',
        description: '第三方 API 集成',
        icon: 'FiCloud',
        sort: 2,
      },
    }),
  ])

  console.log(`创建 ${mcpCategories.length} 个 MCP 分类`)

  // 创建 MCP
  const mcps = await Promise.all([
    prisma.mcp.create({
      data: {
        title: 'Filesystem MCP',
        description: '一个功能强大的文件系统 MCP 服务器，支持文件读写、目录操作等功能。',
        repository: 'https://github.com/modelcontextprotocol/servers',
        documentation: 'https://modelcontextprotocol.io/servers/filesystem/',
        categoryId: mcpCategories[0].id,
        tags: ['filesystem', 'file-operations', 'local'],
        stars: 2345,
        downloads: 12500,
        authorId: user.id,
      },
    }),
    prisma.mcp.create({
      data: {
        title: 'PostgreSQL MCP',
        description: 'PostgreSQL 数据库 MCP 服务器，支持查询、更新等数据库操作。',
        repository: 'https://github.com/modelcontextprotocol/servers',
        documentation: 'https://modelcontextprotocol.io/servers/postgres/',
        categoryId: mcpCategories[1].id,
        tags: ['postgresql', 'database', 'sql'],
        stars: 1876,
        downloads: 8900,
        authorId: user.id,
      },
    }),
    prisma.mcp.create({
      data: {
        title: 'GitHub MCP',
        description: 'GitHub API 集成的 MCP 服务器，支持仓库、PR、Issues 等操作。',
        repository: 'https://github.com/modelcontextprotocol/servers',
        documentation: 'https://modelcontextprotocol.io/servers/github/',
        categoryId: mcpCategories[2].id,
        tags: ['github', 'api', 'git'],
        stars: 3421,
        downloads: 15600,
        authorId: user.id,
      },
    }),
  ])

  console.log(`创建 ${mcps.length} 个 MCP`)

  // 创建 Agent Skill 分类
  const skillCategories = await Promise.all([
    prisma.agentSkillCategory.upsert({
      where: { slug: 'data-analysis' },
      update: {},
      create: {
        name: '数据分析',
        slug: 'data-analysis',
        description: '数据分析相关技能',
        icon: 'FiBarChart',
        sort: 0,
      },
    }),
    prisma.agentSkillCategory.upsert({
      where: { slug: 'code-generation' },
      update: {},
      create: {
        name: '代码生成',
        slug: 'code-generation',
        description: '代码生成相关技能',
        icon: 'FiCode',
        sort: 1,
      },
    }),
    prisma.agentSkillCategory.upsert({
      where: { slug: 'image-processing' },
      update: {},
      create: {
        name: '图像处理',
        slug: 'image-processing',
        description: '图像处理相关技能',
        icon: 'FiImage',
        sort: 2,
      },
    }),
  ])

  console.log(`创建 ${skillCategories.length} 个 Agent Skill 分类`)

  // 创建 Agent Skills
  const agentSkills = await Promise.all([
    prisma.agentSkill.create({
      data: {
        title: 'CSV 数据分析',
        description: '分析 CSV 文件中的数据，生成统计报告和可视化建议。',
        code: `async function analyzeCSV(filePath) {
  const data = await readCSV(filePath);
  const stats = calculateStatistics(data);
  return generateReport(stats);
}`,
        config: '{"timeout": 30000, "maxFileSize": "10MB"}',
        categoryId: skillCategories[0].id,
        tags: ['csv', '数据分析', '统计'],
        difficulty: 'beginner',
        usage: 456,
        authorId: user.id,
      },
    }),
    prisma.agentSkill.create({
      data: {
        title: 'React 组件生成器',
        description: '根据描述自动生成 React 组件代码，支持 TypeScript 和 Tailwind CSS。',
        code: `function generateComponent(description) {
  const schema = parseDescription(description);
  return generateReactCode(schema);
}`,
        config: '{"framework": "react", "language": "typescript"}',
        categoryId: skillCategories[1].id,
        tags: ['react', '组件', '生成器'],
        difficulty: 'intermediate',
        usage: 789,
        authorId: user.id,
      },
    }),
    prisma.agentSkill.create({
      data: {
        title: '图像格式转换',
        description: '批量转换图像格式，支持 PNG、JPEG、WebP 等主流格式。',
        code: `async function convertImages(inputDir, outputDir, format) {
  const images = await findImages(inputDir);
  return Promise.all(images.map(img => convertImage(img, format)));
}`,
        config: '{"supportedFormats": ["png", "jpeg", "webp", "gif"]}',
        categoryId: skillCategories[2].id,
        tags: ['图像', '转换', '批量处理'],
        difficulty: 'beginner',
        usage: 234,
        authorId: user.id,
      },
    }),
  ])

  console.log(`创建 ${agentSkills.length} 个 Agent Skill`)

  // 创建 AI 热点分类
  const hotspotCategories = await Promise.all([
    prisma.aiHotspotCategory.upsert({
      where: { slug: 'llm' },
      update: {},
      create: {
        name: '大模型',
        slug: 'llm',
        description: '大型语言模型相关资讯',
        icon: 'FiCpu',
        sort: 0,
      },
    }),
    prisma.aiHotspotCategory.upsert({
      where: { slug: 'autonomous-driving' },
      update: {},
      create: {
        name: '自动驾驶',
        slug: 'autonomous-driving',
        description: '自动驾驶技术相关资讯',
        icon: 'FiNavigation',
        sort: 1,
      },
    }),
    prisma.aiHotspotCategory.upsert({
      where: { slug: 'ai-applications' },
      update: {},
      create: {
        name: 'AI 应用',
        slug: 'ai-applications',
        description: 'AI 应用相关资讯',
        icon: 'FiZap',
        sort: 2,
      },
    }),
  ])

  console.log(`创建 ${hotspotCategories.length} 个 AI 热点分类`)

  // 创建 AI 热点
  const aiHotspots = await Promise.all([
    prisma.aiHotspot.create({
      data: {
        title: 'GPT-5 即将发布：传闻中的多模态能力',
        content: `# GPT-5 即将发布

据可靠消息源透露，OpenAI 正在开发 GPT-5，预计将在明年发布。新版本将拥有更强大的多模态能力...`,
        summary: 'OpenAI 的 GPT-5 据称将拥有突破性的多模态能力和更长的上下文窗口。',
        source: 'TechCrunch',
        sourceUrl: 'https://techcrunch.com/gpt5-rumors',
        categoryId: hotspotCategories[0].id,
        tags: ['GPT-5', 'OpenAI', '多模态'],
        viewCount: 12450,
        likes: 876,
        authorId: user.id,
      },
    }),
    prisma.aiHotspot.create({
      data: {
        title: 'Tesla FSD V12 正式推向全球市场',
        content: `# Tesla FSD V12

特斯拉正式向全球市场推出 FSD (Full Self-Driving) V12 版本，采用端到端神经网络...`,
        summary: '特斯拉 FSD V12 使用端到端神经网络，标志着自动驾驶技术的重要突破。',
        source: 'Electrek',
        sourceUrl: 'https://electrek.co/tesla-fsd-v12',
        categoryId: hotspotCategories[1].id,
        tags: ['Tesla', 'FSD', '自动驾驶'],
        viewCount: 8920,
        likes: 543,
        authorId: user.id,
      },
    }),
    prisma.aiHotspot.create({
      data: {
        title: 'AI 编程助手 GitHub Copilot Workspace 发布',
        content: `# Copilot Workspace

GitHub 发布了 Copilot Workspace，这是一个全新的 AI 驱动开发环境...`,
        summary: 'GitHub Copilot Workspace 将 AI 助手集成到完整的开发工作流中。',
        source: 'GitHub Blog',
        sourceUrl: 'https://github.blog/copilot-workspace',
        categoryId: hotspotCategories[2].id,
        tags: ['GitHub', 'Copilot', '编程助手'],
        viewCount: 6780,
        likes: 423,
        authorId: user.id,
      },
    }),
  ])

  console.log(`创建 ${aiHotspots.length} 个 AI 热点`)
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
