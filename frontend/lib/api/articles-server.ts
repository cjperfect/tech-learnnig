import { serverApi } from '../api-server'
import { Article, PaginatedResponse, QueryArticlesDto } from './articles'

// 服务端文章 API (用于 Next.js 服务器组件)
export const articlesServerApi = {
  // 获取文章列表
  findAll: (params: QueryArticlesDto) =>
    serverApi.get<PaginatedResponse<Article>>('/articles', params),

  // 获取文章详情
  findOne: (id: string) =>
    serverApi.get<Article>(`/articles/${id}`),
}
