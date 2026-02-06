'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiCode, FiCopy, FiHeart, FiTrendingUp, FiLoader } from 'react-icons/fi'
import { GlassCard, ViewToggle } from '@/components/layout'
import { ScrollReveal } from '@/components/animations'
import { promptsApi, PromptCategory, Prompt } from '@/lib/api/prompts'

export default function PromptsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [categories, setCategories] = useState<(PromptCategory & { _count: { prompts: number } })[]>([])
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(true)

  // 从 localStorage 读取视图模式
  useEffect(() => {
    const savedView = localStorage.getItem('prompts-view-mode')
    if (savedView === 'grid' || savedView === 'list') {
      setViewMode(savedView)
    }
  }, [])

  // 保存视图模式到 localStorage
  const handleViewChange = (view: 'grid' | 'list') => {
    setViewMode(view)
    localStorage.setItem('prompts-view-mode', view)
  }

  // 获取分类和Prompt列表
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [categoriesRes, promptsRes] = await Promise.all([
          promptsApi.getCategories(),
          promptsApi.findAll({
            categoryId: selectedCategory || undefined,
            page: 1,
            pageSize: 100,
          }),
        ])
        // 处理可能返回 { data: [...] } 或直接返回数组的情况
        const categoriesData = Array.isArray(categoriesRes) ? categoriesRes : (categoriesRes?.data || [])
        setCategories(categoriesData)
        setPrompts(promptsRes.items || [])
      } catch (error) {
        console.error('Failed to fetch prompts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedCategory])

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-5xl font-bold mb-2 gradient-text">Prompt 模板库</h1>
            <p className="text-xl text-gray-600">精心设计的AI提示词，提升你的工作效率</p>
          </div>
          <ViewToggle view={viewMode} onViewChange={handleViewChange} />
        </div>
      </motion.div>

      {/* Categories */}
      <div className="mb-12">
        <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className={`flex-shrink-0 px-6 py-4 rounded-xl transition-all ${
              !selectedCategory
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                : 'glass-card text-gray-700 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <FiCode className="text-xl" />
              <div className="text-left">
                <div className="font-semibold">全部</div>
                <div className="text-xs opacity-75">{prompts?.length || 0} 个模板</div>
              </div>
            </div>
          </motion.button>
          {(categories || []).map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-6 py-4 rounded-xl transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                  : 'glass-card text-gray-700 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <FiCode className="text-xl" />
                <div className="text-left">
                  <div className="font-semibold">{category.name}</div>
                  <div className="text-xs opacity-75">{category._count.prompts} 个模板</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <FiLoader className="text-4xl text-primary-500 animate-spin" />
        </div>
      ) : (
        <>
          {/* Prompts Grid or List */}
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(prompts || []).map((prompt) => (
                <ScrollReveal key={prompt.id}>
                  <Link href={`/prompts/${prompt.id}`}>
                    <GlassCard glow>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                          <FiCode className="text-2xl text-white" />
                        </div>
                        <div className="flex space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-600 hover:text-red-500 transition-colors"
                          >
                            <FiHeart className="text-lg" />
                          </motion.button>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">{prompt.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{prompt.description}</p>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center">
                          <FiHeart className="mr-1" />
                          {prompt.likes}
                        </span>
                        <span className="flex items-center">
                          <FiCopy className="mr-1" />
                          {prompt.copies}
                        </span>
                      </div>
                    </GlassCard>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {(prompts || []).map((prompt) => (
                <ScrollReveal key={prompt.id}>
                  <Link href={`/prompts/${prompt.id}`}>
                    <GlassCard glow>
                      <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                          <FiCode className="text-2xl text-white" />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{prompt.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{prompt.description}</p>

                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <FiHeart className="mr-1" />
                                {prompt.likes}
                              </span>
                              <span className="flex items-center">
                                <FiCopy className="mr-1" />
                                {prompt.copies}
                              </span>
                            </div>
                          </div>
                        </div>

                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-primary-600 flex-shrink-0"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </div>
                    </GlassCard>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}

          {prompts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">该分类暂无模板</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
