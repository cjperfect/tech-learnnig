'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiTag, FiSearch, FiFolder, FiCode } from 'react-icons/fi'
import { GlassCard, ViewToggle } from '@/components/layout'
import { ScrollReveal } from '@/components/animations'
import Link from 'next/link'
import { agentSkillsApi, AgentSkill, AgentSkillCategory, AgentSkillDifficulty } from '@/lib/api/agent-skills'

interface AgentSkillsClientProps {
  initialSkills: AgentSkill[]
}

const difficultyLabels: Record<AgentSkillDifficulty, string> = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
}

const difficultyColors: Record<AgentSkillDifficulty, string> = {
  beginner: 'bg-green-500/10 text-green-600 border-green-200',
  intermediate: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
  advanced: 'bg-red-500/10 text-red-600 border-red-200',
}

export default function AgentSkillsClient({ initialSkills }: AgentSkillsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<AgentSkillDifficulty | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState<AgentSkillCategory[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  // 从 localStorage 读取视图模式
  useEffect(() => {
    const savedView = localStorage.getItem('agent-skills-view-mode')
    if (savedView === 'grid' || savedView === 'list') {
      setViewMode(savedView)
    }
  }, [])

  // 保存视图模式到 localStorage
  const handleViewChange = (view: 'grid' | 'list') => {
    setViewMode(view)
    localStorage.setItem('agent-skills-view-mode', view)
  }

  // 确保 initialSkills 是数组
  const skills = Array.isArray(initialSkills) ? initialSkills : []

  // 客户端获取 categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true)
        const data = await agentSkillsApi.getCategories()
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

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = !selectedCategory || skill.categoryId === selectedCategory
    const matchesDifficulty = !selectedDifficulty || skill.difficulty === selectedDifficulty
    const matchesSearch = !searchQuery ||
      skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesDifficulty && matchesSearch
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
                Agent 技能
              </h1>
              <p className="text-xl text-gray-600">
                探索 Claude Agent 技能资源库
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
                placeholder="搜索 Agent 技能..."
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
          <GlassCard className="mb-6 p-6">
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

        {/* 难度筛选区域 */}
        <ScrollReveal delay={0.2}>
          <GlassCard className="mb-8 p-6">
            <div className="flex items-center gap-3 mb-4">
              <FiCode className="text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-700">按难度筛选</h3>
            </div>
            <div className="flex gap-3 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDifficulty(null)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                  !selectedDifficulty
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-white/70 backdrop-blur-sm text-gray-600 hover:bg-white/90 border border-gray-200/50'
                }`}
              >
                全部
              </motion.button>
              {(['beginner', 'intermediate', 'advanced'] as AgentSkillDifficulty[]).map((difficulty) => (
                <motion.button
                  key={difficulty}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                    selectedDifficulty === difficulty
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/30'
                      : 'bg-white/70 backdrop-blur-sm text-gray-600 hover:bg-white/90 border border-gray-200/50'
                  }`}
                >
                  {difficultyLabels[difficulty]}
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Agent Skills 列表 */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <ScrollReveal key={skill.id} delay={index * 0.05}>
                <Link href={`/agent-skills/${skill.id}`}>
                  <GlassCard glow className="hover:scale-[1.02] transition-transform cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <h2 className="text-xl font-bold text-gray-900 hover:text-primary-500 transition-colors">
                        {skill.title}
                      </h2>
                      <span className={`px-2 py-1 text-xs rounded border ${difficultyColors[skill.difficulty]}`}>
                        {difficultyLabels[skill.difficulty]}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                      {skill.description}
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <FiCalendar />
                        <span>{new Date(skill.createdAt).toLocaleDateString('zh-CN')}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.tags.slice(0, 3).map((tag) => (
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
            {filteredSkills.map((skill, index) => (
              <ScrollReveal key={skill.id} delay={index * 0.05}>
                <Link href={`/agent-skills/${skill.id}`}>
                  <GlassCard className="p-6 hover:scale-[1.02] transition-transform cursor-pointer">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <h2 className="text-2xl font-bold text-gray-900 hover:text-primary-500 transition-colors">
                            {skill.title}
                          </h2>
                          <span className={`px-3 py-1 text-sm rounded border ${difficultyColors[skill.difficulty]}`}>
                            {difficultyLabels[skill.difficulty]}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {skill.description}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <FiCalendar />
                            <span>{new Date(skill.createdAt).toLocaleDateString('zh-CN')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FiTag />
                            <div className="flex gap-2">
                              {skill.tags.map((tag) => (
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

        {filteredSkills.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">没有找到相关 Agent 技能</p>
          </div>
        )}
      </div>
    </div>
  )
}
