'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiCopy, FiHeart, FiCheck, FiCode, FiLoader } from 'react-icons/fi'
import { GlassCard } from '@/components/layout'
import { ScrollReveal } from '@/components/animations'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { promptsApi, Prompt } from '@/lib/api/prompts'

export default function PromptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [relatedPrompts, setRelatedPrompts] = useState<Prompt[]>([])
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [promptId, setPromptId] = useState<string | null>(null)

  useEffect(() => {
    const initParams = async () => {
      const resolvedParams = await params
      setPromptId(resolvedParams.id)
    }

    initParams()
  }, [params])

  useEffect(() => {
    if (!promptId) return

    const fetchPrompt = async () => {
      try {
        setLoading(true)
        const data = await promptsApi.findOne(promptId)
        setPrompt(data)

        // 获取相关Prompt（同分类的其他Prompt）
        const relatedData = await promptsApi.findAll({
          categoryId: data.categoryId,
          page: 1,
          pageSize: 3,
        })
        setRelatedPrompts(relatedData.items.filter((p) => p.id !== data.id))
      } catch (error) {
        console.error('Failed to fetch prompt:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPrompt()
  }, [promptId])

  const handleCopy = async () => {
    if (prompt) {
      await navigator.clipboard.writeText(prompt.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)

      // 调用复制API
      try {
        await promptsApi.copy(prompt.id)
      } catch (error) {
        console.error('Failed to record copy:', error)
      }
    }
  }

  const handleLike = async () => {
    if (prompt) {
      setLiked(!liked)
      try {
        await promptsApi.like(prompt.id)
      } catch (error) {
        console.error('Failed to like:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex justify-center items-center py-20">
          <FiLoader className="text-4xl text-primary-500 animate-spin" />
        </div>
      </div>
    )
  }

  if (!prompt) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">Prompt不存在</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Back Button */}
      <Link href="/prompts">
        <motion.button
          whileHover={{ x: -5 }}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          返回模板库
        </motion.button>
      </Link>

      {/* Prompt Header */}
      <ScrollReveal>
        <GlassCard className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <FiCode className="text-3xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{prompt.title}</h1>
                <p className="text-gray-600">{prompt.description}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="px-3 py-1 text-sm rounded-full bg-primary-500/20 text-primary-400">
              {prompt.category?.name}
            </span>
            {(prompt.tags || []).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-accent-500/20 text-accent-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-6 text-gray-600">
            <span className="flex items-center">
              <FiHeart className={`mr-2 ${liked ? 'text-red-500' : ''}`} />
              {prompt.likes + (liked ? 1 : 0)}
            </span>
            <span className="flex items-center">
              <FiCopy className="mr-2" />
              {prompt.copies + (copied ? 1 : 0)}
            </span>
            {prompt.author && <span>by {prompt.author.nickname}</span>}
          </div>
        </GlassCard>
      </ScrollReveal>

      {/* Prompt Content */}
      <ScrollReveal>
        <GlassCard className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Prompt 内容</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                copied
                  ? 'bg-accent-600 text-white'
                  : 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
              }`}
            >
              {copied ? (
                <>
                  <FiCheck className="mr-2" />
                  已复制
                </>
              ) : (
                <>
                  <FiCopy className="mr-2" />
                  复制Prompt
                </>
              )}
            </motion.button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="prose prose-sm prose-orange max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {prompt.content}
              </ReactMarkdown>
            </div>
          </div>
        </GlassCard>
      </ScrollReveal>

      {/* Action Buttons */}
      <ScrollReveal>
        <div className="flex justify-center space-x-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className={`flex items-center px-8 py-3 rounded-xl transition-all ${
              copied
                ? 'bg-accent-600 text-white'
                : 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
            }`}
          >
            {copied ? (
              <>
                <FiCheck className="mr-2 text-xl" />
                复制成功
              </>
            ) : (
              <>
                <FiCopy className="mr-2 text-xl" />
                复制到剪贴板
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            className={`flex items-center px-8 py-3 rounded-xl transition-all ${
              liked
                ? 'bg-red-500 text-white'
                : 'glass-card text-gray-700 hover:text-gray-900'
            }`}
          >
            <FiHeart className={`mr-2 text-xl ${liked ? 'text-white' : ''}`} />
            {liked ? '已点赞' : '点赞'}
          </motion.button>
        </div>
      </ScrollReveal>

      {/* Related Prompts */}
      {relatedPrompts.length > 0 && (
        <ScrollReveal>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">相关模板</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {(relatedPrompts || []).map((relatedPrompt) => (
              <Link key={relatedPrompt.id} href={`/prompts/${relatedPrompt.id}`}>
                <GlassCard>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{relatedPrompt.title}</h3>
                  <p className="text-gray-600 text-sm">{relatedPrompt.description}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      )}
    </div>
  )
}
