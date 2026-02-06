import apiClient from '../api-client'

export interface Prompt {
  id: string
  title: string
  content: string
  description?: string
  categoryId: string
  category: PromptCategory
  tags: string[]
  likes: number
  copies: number
  authorId?: string
  author?: {
    id: string
    nickname: string
    avatar?: string
  }
  createdAt: string
  updatedAt: string
}

export interface PromptCategory {
  id: string
  name: string
  description?: string
  icon?: string
  slug: string
  sort: number
  createdAt: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface QueryPromptsDto {
  categoryId?: string
  page?: number
  pageSize?: number
}

export const promptsApi = {
  // 获取所有分类
  getCategories: () =>
    apiClient.get<any, (PromptCategory & { _count: { prompts: number } })[]>('/prompts/categories'),

  // 获取Prompt列表
  findAll: (params: QueryPromptsDto) =>
    apiClient.get<any, PaginatedResponse<Prompt>>('/prompts', { params }),

  // 获取Prompt详情
  findOne: (id: string) =>
    apiClient.get<any, Prompt>(`/prompts/${id}`),

  // 创建Prompt
  create: (data: Partial<Prompt>) =>
    apiClient.post<any, Prompt>('/prompts', data),

  // 更新Prompt
  update: (id: string, data: Partial<Prompt>) =>
    apiClient.put<any, Prompt>(`/prompts/${id}`, data),

  // 删除Prompt
  delete: (id: string) =>
    apiClient.delete<any, { message: string }>(`/prompts/${id}`),

  // 复制
  copy: (id: string) =>
    apiClient.post<any, { message: string }>(`/prompts/${id}/copy`),

  // 点赞
  like: (id: string) =>
    apiClient.post<any, { likes: number }>(`/prompts/${id}/like`),
}
