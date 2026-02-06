'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiCalendar, FiTag, FiEye, FiEdit, FiLoader } from 'react-icons/fi'
import { GlassCard } from '@/components/layout'
import { ScrollReveal } from '@/components/animations'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { articlesApi, Article } from '@/lib/api/articles'

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [articleId, setArticleId] = useState<string | null>(null)

  useEffect(() => {
    const initParams = async () => {
      const resolvedParams = await params
      setArticleId(resolvedParams.id)
    }

    initParams()
  }, [params])

  useEffect(() => {
    if (!articleId) return

    const fetchArticle = async () => {
      try {
        setLoading(true)
        const data = await articlesApi.findOne(articleId)
        setArticle(data)
      } catch (error) {
        console.error('Failed to fetch article:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [articleId])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex justify-center items-center py-20">
          <FiLoader className="text-4xl text-primary-500 animate-spin" />
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl">文章不存在</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Back Button */}
      <Link href="/articles">
        <motion.button
          whileHover={{ x: -5 }}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          返回文章列表
        </motion.button>
      </Link>

      {/* Article Header */}
      <ScrollReveal>
        <GlassCard className="mb-8">
          <h1 className="text-4xl font-bold mb-4 gradient-text">{article.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
            <span className="flex items-center">
              <FiEdit className="mr-2" />
              {article.author.nickname}
            </span>
            <span className="flex items-center">
              <FiCalendar className="mr-2" />
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <FiEye className="mr-2" />
              {article.viewCount} 次阅读
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {(article.tags || []).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-primary-100 text-primary-700 flex items-center"
              >
                <FiTag className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </GlassCard>
      </ScrollReveal>

      {/* Article Content */}
      <ScrollReveal>
        <GlassCard className="mb-8">
          <div className="prose prose-slate prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>
        </GlassCard>
      </ScrollReveal>
    </div>
  )
}
