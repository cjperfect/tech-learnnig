import Link from 'next/link';
import { FiBookOpen, FiCode, FiNavigation, FiZap, FiArrowRight } from 'react-icons/fi';
import { GlassCard } from '@/components/layout';
import { ScrollReveal } from '@/components/animations';
import { articlesApi } from '@/lib/api/articles';
import { promptsApi } from '@/lib/api/prompts';

async function getInitialData() {
  try {
    const [articlesData, promptsData] = await Promise.all([
      articlesApi.findAll({ page: 1, pageSize: 3 }).catch(() => ({ items: [] })),
      promptsApi.findAll({ page: 1, pageSize: 3 }).catch(() => ({ items: [] }))
    ]);
    return {
      articles: articlesData.items || [],
      prompts: promptsData.items || []
    };
  } catch {
    return { articles: [], prompts: [] };
  }
}

const features = [
  {
    title: '技术文章',
    description: '探索前端、后端、DevOps 等技术领域的深度文章',
    href: '/articles',
    icon: FiBookOpen,
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    title: 'Prompt 库',
    description: '精心收集的 AI 提示词模板，提升你的 AI 使用效率',
    href: '/prompts',
    icon: FiCode,
    gradient: 'from-orange-500 to-amber-600'
  },
  {
    title: 'MCP',
    description: 'Model Context Protocol 相关资源与工具',
    href: '/mcp',
    icon: FiNavigation,
    gradient: 'from-green-500 to-teal-600'
  },
  {
    title: 'Agent Skills',
    description: 'AI Agent 技能库，扩展 AI 能力边界',
    href: '/agent-skills',
    icon: FiZap,
    gradient: 'from-pink-500 to-rose-600'
  }
];

export default async function HomePage() {
  const { articles, prompts } = await getInitialData();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Animated Orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="gradient-text">Tech Learning</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                技术资源学习平台 - 包含技术文章、Prompt 模板库、MCP 和 Agent Skill 导航
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/articles"
                  className="glow-button px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold text-lg"
                >
                  开始探索
                  <FiArrowRight className="inline ml-2" />
                </Link>
                <Link
                  href="/prompts"
                  className="glow-button px-8 py-4 bg-white/80 text-gray-700 rounded-xl font-semibold text-lg border border-orange-200"
                >
                  浏览 Prompt
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal delay={0.1}>
            <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
              探索我们的资源
            </h2>
            <p className="text-gray-600 text-center mb-12 text-lg">
              精心整理的技术资源，助力你的学习之旅
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.href} delay={0.1 + index * 0.05}>
                <Link href={feature.href}>
                  <GlassCard className="p-6 h-full hover:scale-[1.03] transition-transform cursor-pointer">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4`}>
                      <feature.icon className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </GlassCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      {articles.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold gradient-text">最新文章</h2>
                  <p className="text-gray-600 mt-2">探索最新的技术文章和教程</p>
                </div>
                <Link
                  href="/articles"
                  className="hidden md:flex items-center gap-2 px-6 py-3 bg-white/80 text-gray-700 rounded-xl font-medium border border-orange-200 hover:scale-105 transition-transform"
                >
                  查看全部
                  <FiArrowRight />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(0, 3).map((article: any, index: number) => (
                <ScrollReveal key={article.id} delay={index * 0.05}>
                  <Link href={`/articles/${article.id}`}>
                    <GlassCard className="p-6 h-full hover:scale-[1.02] transition-transform cursor-pointer">
                      <h3 className="text-xl font-bold mb-3 hover:text-orange-600 transition-colors">
                        {article.title}
                      </h3>
                      {article.summary && (
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                          {article.summary}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{new Date(article.createdAt).toLocaleDateString('zh-CN')}</span>
                        <span>·</span>
                        <span>{article.viewCount} 次浏览</span>
                      </div>
                    </GlassCard>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 text-gray-700 rounded-xl font-medium border border-orange-200"
              >
                查看全部文章
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Latest Prompts Section */}
      {prompts.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold gradient-text">热门 Prompt</h2>
                  <p className="text-gray-600 mt-2">精选 AI 提示词模板</p>
                </div>
                <Link
                  href="/prompts"
                  className="hidden md:flex items-center gap-2 px-6 py-3 bg-white/80 text-gray-700 rounded-xl font-medium border border-orange-200 hover:scale-105 transition-transform"
                >
                  查看全部
                  <FiArrowRight />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prompts.slice(0, 3).map((prompt: any, index: number) => (
                <ScrollReveal key={prompt.id} delay={index * 0.05}>
                  <Link href={`/prompts/${prompt.id}`}>
                    <GlassCard className="p-6 h-full hover:scale-[1.02] transition-transform cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold hover:text-orange-600 transition-colors">
                          {prompt.title}
                        </h3>
                      </div>
                      {prompt.description && (
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                          {prompt.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{prompt.likes} 点赞</span>
                        <span>·</span>
                        <span>{prompt.copies} 复制</span>
                      </div>
                    </GlassCard>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link
                href="/prompts"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 text-gray-700 rounded-xl font-medium border border-orange-200"
              >
                查看全部 Prompt
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <GlassCard className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4 gradient-text">开始你的学习之旅</h2>
              <p className="text-gray-600 mb-8 text-lg">
                加入我们，探索无限可能
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  href="/mcp"
                  className="glow-button px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold"
                >
                  探索 MCP
                </Link>
                <Link
                  href="/agent-skills"
                  className="glow-button px-8 py-4 bg-white/80 text-gray-700 rounded-xl font-semibold border border-orange-200"
                >
                  Agent Skills
                </Link>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
