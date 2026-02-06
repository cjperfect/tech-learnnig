import apiClient from '../api-client'

export interface Article {
  id: string
  title: string
  content: string
  summary?: string
  coverImage?: string
  tags: string[]
  viewCount: number
  authorId: string
  author: {
    id: string
    nickname: string
    avatar?: string
  }
  createdAt: string
  updatedAt: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface QueryArticlesDto {
  search?: string
  tag?: string
  page?: number
  pageSize?: number
}

export const articlesApi = {
  // 获取文章列表
  findAll: (params: QueryArticlesDto) =>
    apiClient.get<any, PaginatedResponse<Article>>('/articles', { params }),

  // 获取文章详情
  findOne: (id: string) =>
    apiClient.get<any, Article>(`/articles/${id}`),

  // 创建文章
  create: (data: Partial<Article>) =>
    apiClient.post<any, Article>('/articles', data),

  // 更新文章
  update: (id: string, data: Partial<Article>) =>
    apiClient.put<any, Article>(`/articles/${id}`, data),

  // 删除文章
  delete: (id: string) =>
    apiClient.delete<any, { message: string }>(`/articles/${id}`),

  // 获取所有标签
  getTags: () =>
    apiClient.get<any, string[]>('/articles/tags'),
}
