'use client'

import { useState, useEffect } from 'react'
import { FiCalendar, FiTag, FiEye, FiSearch } from 'react-icons/fi'
import { GlassCard } from '@/components/layout'
import { ScrollReveal } from '@/components/animations'
import Link from 'next/link'
import { articlesApi, Article } from '@/lib/api/articles'

interface ArticlesClientProps {
  initialArticles: Article[]
}

export default function ArticlesClient({ initialArticles }: ArticlesClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagsLoading, setTagsLoading] = useState(true)

  // 确保 initialArticles 是数组
  const articles = Array.isArray(initialArticles) ? initialArticles : []

  // 客户端获取 tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setTagsLoading(true)
        const data = await articlesApi.getTags()
        setTags(data || [])
      } catch (error) {
        console.warn('Failed to fetch tags:', error)
        setTags([])
      } finally {
        setTagsLoading(false)
      }
    }

    fetchTags()
  }, [])

  const filteredArticles = articles.filter((article) => {
    const matchesTag = !selectedTag || (article.tags && article.tags.includes(selectedTag))
    const matchesSearch = !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.content && article.content.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTag && matchesSearch
  })

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              技术文章
            </h1>
            <p className="text-gray-400 text-lg">
              探索前端、后端、DevOps 等技术领域的深度文章
            </p>
          </div>
        </ScrollReveal>

        {/* 搜索和筛选 */}
        <ScrollReveal delay={0.1}>
          <GlassCard className="mb-8 p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索文章..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    !selectedTag
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  全部
                </button>
                {tagsLoading ? (
                  <span className="text-gray-400 text-sm">加载标签中...</span>
                ) : (
                  tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        selectedTag === tag
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {tag}
                    </button>
                  ))
                )}
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* 文章列表 */}
        <div className="grid gap-6">
          {filteredArticles.map((article, index) => (
            <ScrollReveal key={article.id} delay={index * 0.05}>
              <Link href={`/articles/${article.id}`}>
                <GlassCard className="p-6 hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="flex flex-col md:flex-row gap-6">
                    {article.coverImage && (
                      <div className="md:w-48 h-32 flex-shrink-0">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-3 text-white hover:text-blue-400 transition-colors">
                        {article.title}
                      </h2>
                      {article.summary && (
                        <p className="text-gray-300 mb-4 line-clamp-2">
                          {article.summary}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <FiCalendar />
                          <span>{new Date(article.createdAt).toLocaleDateString('zh-CN')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiEye />
                          <span>{article.viewCount} 次浏览</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiTag />
                          <div className="flex gap-2">
                            {article.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">没有找到相关文章</p>
          </div>
        )}
      </div>
    </div>
  )
}
