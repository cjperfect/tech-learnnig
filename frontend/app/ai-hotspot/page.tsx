'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiTrendingUp, FiExternalLink } from 'react-icons/fi'
import { GlassCard } from '@/components/layout'
import { ScrollReveal } from '@/components/animations'

interface AIHotspot {
  id: string
  title: string
  description: string
  url: string
  source: string
  publishedAt: string
  category: string
  clicks: number
}

export default function AIHotspotPage() {
  const [hotspots, setHotspots] = useState<AIHotspot[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ['大模型', '工具', '应用', '研究', '资讯']

  useEffect(() => {
    // TODO: 调用API获取AI热点信息
    // fetchAIHotspots().then(data => {
    //   setHotspots(data)
    //   setLoading(false)
    // })
    setLoading(false)
  }, [])

  const filteredHotspots = selectedCategory
    ? hotspots.filter(h => h.category === selectedCategory)
    : hotspots

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">加载中...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold mb-2 gradient-text">AI 热点</h1>
        <p className="text-xl text-gray-600">最新的AI行业动态和热点信息</p>
      </motion.div>

      {/* Category Filter */}
      <div className="mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg mr-2 mb-2 transition-all ${
            !selectedCategory
              ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
              : 'glass-card text-gray-700 hover:text-gray-900'
          }`}
        >
          全部
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg mr-2 mb-2 transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                : 'glass-card text-gray-700 hover:text-gray-900'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Hotspots List */}
      {filteredHotspots.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">暂无热点信息</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHotspots.map((hotspot) => (
            <ScrollReveal key={hotspot.id}>
              <GlassCard glow>
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 text-xs rounded-full bg-primary-100 text-primary-700">
                        {hotspot.category}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <FiCalendar className="mr-1" />
                        {new Date(hotspot.publishedAt).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <FiTrendingUp className="mr-1" />
                        {hotspot.clicks}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{hotspot.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{hotspot.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{hotspot.source}</span>
                      <motion.a
                        href={hotspot.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-medium"
                      >
                        查看详情
                        <FiExternalLink className="ml-2" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  )
}
