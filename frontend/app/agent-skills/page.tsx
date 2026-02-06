'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/layout'
import { ScrollReveal } from '@/components/animations'

interface AgentSkill {
  id: string
  name: string
  description: string
  category: string
  icon?: string
  url?: string
  clicks: number
}

export default function AgentSkillsPage() {
  const [skills, setSkills] = useState<AgentSkill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: 调用API获取Agent Skills列表
    // fetchAgentSkills().then(data => {
    //   setSkills(data)
    //   setLoading(false)
    // })
    setLoading(false)
  }, [])

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
        <h1 className="text-5xl font-bold mb-2 gradient-text">Agent Skills</h1>
        <p className="text-xl text-gray-600">Claude Agent 技能资源库</p>
      </motion.div>

      {/* Skills Grid */}
      {skills.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">暂无Agent Skills</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <ScrollReveal key={skill.id}>
              <GlassCard glow>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <span className="text-2xl text-white font-bold">
                      {skill.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{skill.clicks} 次访问</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{skill.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{skill.description}</p>

                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 text-xs rounded-full bg-primary-100 text-primary-700">
                    {skill.category}
                  </span>
                  {skill.url && (
                    <motion.a
                      href={skill.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-medium"
                    >
                      查看详情
                    </motion.a>
                  )}
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  )
}
