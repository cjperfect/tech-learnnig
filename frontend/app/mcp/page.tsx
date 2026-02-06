'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from '@/components/layout'
import { ScrollReveal } from '@/components/animations'

interface MCPServer {
  id: string
  name: string
  description: string
  url: string
  icon?: string
  category: string
  clicks: number
}

export default function MCPPage() {
  const [mcps, setMcps] = useState<MCPServer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: 调用API获取MCP服务器列表
    // fetchMcps().then(data => {
    //   setMcps(data)
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
        <h1 className="text-5xl font-bold mb-2 gradient-text">MCP 服务器</h1>
        <p className="text-xl text-gray-600">Model Context Protocol 服务器资源</p>
      </motion.div>

      {/* MCP Servers Grid */}
      {mcps.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">暂无MCP服务器</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mcps.map((mcp) => (
            <ScrollReveal key={mcp.id}>
              <GlassCard glow>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <span className="text-2xl text-white font-bold">
                      {mcp.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{mcp.clicks} 次访问</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{mcp.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{mcp.description}</p>

                <motion.a
                  href={mcp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-medium"
                >
                  访问服务器
                </motion.a>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  )
}
