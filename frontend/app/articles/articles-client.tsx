'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiTag, FiEye, FiSearch } from 'react-icons/fi'
import { GlassCard, ViewToggle } from '@/components/layout'
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  // 从 localStorage 读取视图模式
  useEffect(() => {
    const savedView = localStorage.getItem('articles-view-mode')
    if (savedView === 'grid' || savedView === 'list') {
      setViewMode(savedView)
    }
  }, [])

  // 保存视图模式到 localStorage
  const handleViewChange = (view: 'grid' | 'list') => {
    setViewMode(view)
    localStorage.setItem('articles-view-mode', view)
  }

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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Orbs Background */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-5xl font-bold mb-2 gradient-text">
                技术文章
              </h1>
              <p className="text-xl text-gray-600">
                探索前端、后端、DevOps 等技术领域的深度文章
              </p>
            </div>
            <ViewToggle view={viewMode} onViewChange={handleViewChange} />
          </div>
        </ScrollReveal>

        {/* 搜索区域 */}
        <ScrollReveal delay={0.1}>
          <GlassCard className="mb-6 p-6">
            <div className="relative group">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-500 text-xl transition-colors group-focus-within:text-primary-600" />
              <input
                type="text"
                placeholder="搜索文章标题、内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/70 backdrop-blur-md border-2 border-gray-200/50 rounded-2xl text-gray-700 placeholder-gray-400 text-lg focus:outline-none focus:border-primary-400 focus:bg-white/90 focus:shadow-xl focus:shadow-primary-500/20 transition-all duration-300"
              />
              {/* 搜索时的高亮边框动画 */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur-md" />
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* 标签筛选区域 */}
        <ScrollReveal delay={0.15}>
          <GlassCard className="mb-8 p-6">
            <div className="flex items-center gap-3 mb-4">
              <FiTag className="text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-700">按标签筛选</h3>
            </div>
            <div className="flex gap-3 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTag(null)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                  !selectedTag
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-white/70 backdrop-blur-sm text-gray-600 hover:bg-white/90 border border-gray-200/50'
                }`}
              >
                全部
              </motion.button>
              {tagsLoading ? (
                <span className="text-gray-500 text-sm px-4">加载标签中...</span>
              ) : (
                tags.map((tag) => (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                      selectedTag === tag
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                        : 'bg-white/70 backdrop-blur-sm text-gray-600 hover:bg-white/90 border border-gray-200/50'
                    }`}
                  >
                    {tag}
                  </motion.button>
                ))
              )}
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* 文章列表 */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <ScrollReveal key={article.id} delay={index * 0.05}>
                <Link href={`/articles/${article.id}`}>
                  <GlassCard glow className="hover:scale-[1.02] transition-transform cursor-pointer">
                    {article.coverImage && (
                      <div className="h-48 mb-4">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <h2 className="text-xl font-bold mb-3 text-gray-900 hover:text-primary-500 transition-colors">
                      {article.title}
                    </h2>
                    {article.summary && (
                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                        {article.summary}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <FiCalendar />
                        <span>{new Date(article.createdAt).toLocaleDateString('zh-CN')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiEye />
                        <span>{article.viewCount}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-primary-500/10 text-primary-600 rounded text-xs border border-primary-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
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
                        <h2 className="text-2xl font-bold mb-3 text-gray-900 hover:text-primary-500 transition-colors">
                          {article.title}
                        </h2>
                        {article.summary && (
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {article.summary}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
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
                                  className="px-2 py-0.5 bg-primary-500/10 text-primary-600 rounded border border-primary-200"
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
        )}

        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">没有找到相关文章</p>
          </div>
        )}
      </div>
    </div>
  )
}
