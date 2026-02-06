import { articlesApi, Article } from '@/lib/api/articles'
import ArticlesClient from './articles-client'

export default async function ArticlesPage() {
  const data = await articlesApi.findAll({ page: 1, pageSize: 100 })

  return <ArticlesClient initialArticles={data.items || []} />
}
