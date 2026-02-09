'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiTag, FiHeart, FiSearch, FiFolder, FiExternalLink } from 'react-icons/fi'
import { GlassCard, ViewToggle } from '@/components/layout'
import { ScrollReveal } from '@/components/animations'
import Link from 'next/link'
import { aiHotspotApi, AiHotspot, AiHotspotCategory } from '@/lib/api/ai-hotspot'

interface AiHotspotClientProps {
  initialHotspots: AiHotspot[]
}

export default function AiHotspotClient({ initialHotspots }: AiHotspotClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState<AiHotspotCategory[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set())

  // 从 localStorage 读取视图模式
  useEffect(() => {
    const savedView = localStorage.getItem('ai-hotspot-view-mode')
    if (savedView === 'grid' || savedView === 'list') {
      setViewMode(savedView)
    }
  }, [])

  // 保存视图模式到 localStorage
  const handleViewChange = (view: 'grid' | 'list') => {
    setViewMode(view)
    localStorage.setItem('ai-hotspot-view-mode', view)
  }

  // 确保 initialHotspots 是数组
  const hotspots = Array.isArray(initialHotspots) ? initialHotspots : []

  // 客户端获取 categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true)
        const data = await aiHotspotApi.getCategories()
        setCategories(data || [])
      } catch (error) {
        console.warn('Failed to fetch categories:', error)
        setCategories([])
      } finally {
        setCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const filteredHotspots = hotspots.filter((hotspot) => {
    const matchesCategory = !selectedCategory || hotspot.categoryId === selectedCategory
    const matchesSearch = !searchQuery ||
      hotspot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (hotspot.summary && hotspot.summary.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const handleLike = async (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      await aiHotspotApi.like(id)
      setLikedIds(prev => new Set([...prev, id]))
    } catch (error) {
      console.error('Failed to like hotspot:', error)
    }
  }

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
                AI 热点
              </h1>
              <p className="text-xl text-gray-600">
                探索最新的AI行业动态和热点信息
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
                placeholder="搜索 AI 热点..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white/70 backdrop-blur-md border-2 border-gray-200/50 rounded-2xl text-gray-700 placeholder-gray-400 text-lg focus:outline-none focus:border-primary-400 focus:bg-white/90 focus:shadow-xl focus:shadow-primary-500/20 transition-all duration-300"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur-md" />
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* 分类筛选区域 */}
        <ScrollReveal delay={0.15}>
          <GlassCard className="mb-8 p-6">
            <div className="flex items-center gap-3 mb-4">
              <FiFolder className="text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-700">按分类筛选</h3>
            </div>
            <div className="flex gap-3 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                  !selectedCategory
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-white/70 backdrop-blur-sm text-gray-600 hover:bg-white/90 border border-gray-200/50'
                }`}
              >
                全部
              </motion.button>
              {categoriesLoading ? (
                <span className="text-gray-500 text-sm px-4">加载分类中...</span>
              ) : (
                categories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium flex items-center gap-2 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                        : 'bg-white/70 backdrop-blur-sm text-gray-600 hover:bg-white/90 border border-gray-200/50'
                    }`}
                  >
                    {category.icon && <span className="text-lg">{category.icon}</span>}
                    {category.name}
                  </motion.button>
                ))
              )}
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* AI 热点列表 */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotspots.map((hotspot, index) => (
              <ScrollReveal key={hotspot.id} delay={index * 0.05}>
                <Link href={`/ai-hotspot/${hotspot.id}`}>
                  <GlassCard glow className="hover:scale-[1.02] transition-transform cursor-pointer">
                    <h2 className="text-xl font-bold mb-3 text-gray-900 hover:text-primary-500 transition-colors">
                      {hotspot.title}
                    </h2>
                    {hotspot.summary && (
                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                        {hotspot.summary}
                      </p>
                    )}
                    <div className="flex items-center justify-between mb-3">
                      {hotspot.source && (
                        <span className="text-sm text-gray-500">{hotspot.source}</span>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleLike(hotspot.id, e)}
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          likedIds.has(hotspot.id)
                            ? 'text-red-500'
                            : 'text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <FiHeart className={likedIds.has(hotspot.id) ? 'fill-current' : ''} />
                        <span>{hotspot.likeCount + (likedIds.has(hotspot.id) ? 1 : 0)}</span>
                      </motion.button>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <FiCalendar />
                        <span>{new Date(hotspot.createdAt).toLocaleDateString('zh-CN')}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hotspot.tags.slice(0, 3).map((tag) => (
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
            {filteredHotspots.map((hotspot, index) => (
              <ScrollReveal key={hotspot.id} delay={index * 0.05}>
                <Link href={`/ai-hotspot/${hotspot.id}`}>
                  <GlassCard className="p-6 hover:scale-[1.02] transition-transform cursor-pointer">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-3 text-gray-900 hover:text-primary-500 transition-colors">
                          {hotspot.title}
                        </h2>
                        {hotspot.summary && (
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {hotspot.summary}
                          </p>
                        )}
                        <div className="flex items-center justify-between mb-4">
                          {hotspot.source && (
                            <span className="text-sm text-gray-500">{hotspot.source}</span>
                          )}
                          <div className="flex items-center gap-4">
                            {hotspot.sourceUrl && (
                              <a
                                href={hotspot.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-500 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                原文链接 <FiExternalLink />
                              </a>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => handleLike(hotspot.id, e)}
                              className={`flex items-center gap-1 text-sm transition-colors ${
                                likedIds.has(hotspot.id)
                                  ? 'text-red-500'
                                  : 'text-gray-400 hover:text-red-400'
                              }`}
                            >
                              <FiHeart className={likedIds.has(hotspot.id) ? 'fill-current' : ''} />
                              <span>{hotspot.likeCount + (likedIds.has(hotspot.id) ? 1 : 0)}</span>
                            </motion.button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <FiCalendar />
                            <span>{new Date(hotspot.createdAt).toLocaleDateString('zh-CN')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiTag />
                            <div className="flex gap-2">
                              {hotspot.tags.map((tag) => (
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

        {filteredHotspots.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">没有找到相关 AI 热点</p>
          </div>
        )}
      </div>
    </div>
  )
}
