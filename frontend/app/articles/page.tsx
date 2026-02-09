import { articlesServerApi } from '@/lib/api/articles-server'
import ArticlesClient from './articles-client'

export default async function ArticlesPage() {
  try {
    const data = await articlesServerApi.findAll({ page: 1, pageSize: 100 })
    console.log('articles fetched:', data)
    return <ArticlesClient initialArticles={data.items || []} />
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    // 返回空数据而不是抛出错误
    return <ArticlesClient initialArticles={[]} />
  }
}
