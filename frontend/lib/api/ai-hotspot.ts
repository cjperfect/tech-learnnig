import apiClient from '../api-client'

export interface AiHotspotCategory {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  sort: number
  createdAt: string
  updatedAt: string
}

export interface AiHotspot {
  id: string
  title: string
  content: string
  summary?: string
  source?: string
  sourceUrl?: string
  categoryId: string
  category: AiHotspotCategory
  tags: string[]
  likeCount: number
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

export interface QueryAiHotspotsDto {
  search?: string
  categoryId?: string
  page?: number
  pageSize?: number
}

export interface CreateAiHotspotDto {
  title: string
  content: string
  summary?: string
  source?: string
  sourceUrl?: string
  categoryId: string
  tags: string[]
}

export interface CreateAiHotspotCategoryDto {
  name: string
  slug: string
  description?: string
  icon?: string
  sort?: number
}

export const aiHotspotApi = {
  // 获取AI热点列表
  findAll: (params: QueryAiHotspotsDto) =>
    apiClient.get<any, PaginatedResponse<AiHotspot>>('/ai-hotspot', { params }),

  // 获取AI热点详情
  findOne: (id: string) =>
    apiClient.get<any, AiHotspot>(`/ai-hotspot/${id}`),

  // 创建AI热点
  create: (data: CreateAiHotspotDto) =>
    apiClient.post<any, AiHotspot>('/ai-hotspot', data),

  // 更新AI热点
  update: (id: string, data: Partial<CreateAiHotspotDto>) =>
    apiClient.put<any, AiHotspot>(`/ai-hotspot/${id}`, data),

  // 删除AI热点
  delete: (id: string) =>
    apiClient.delete<any, { message: string }>(`/ai-hotspot/${id}`),

  // 点赞
  like: (id: string) =>
    apiClient.post<any, { message: string }>(`/ai-hotspot/${id}/like`),

  // 获取所有分类
  getCategories: () =>
    apiClient.get<any, AiHotspotCategory[]>('/ai-hotspot/categories'),

  // 创建分类
  createCategory: (data: CreateAiHotspotCategoryDto) =>
    apiClient.post<any, AiHotspotCategory>('/ai-hotspot/categories', data),

  // 更新分类
  updateCategory: (id: string, data: Partial<CreateAiHotspotCategoryDto>) =>
    apiClient.put<any, AiHotspotCategory>(`/ai-hotspot/categories/${id}`, data),

  // 删除分类
  deleteCategory: (id: string) =>
    apiClient.delete<any, { message: string }>(`/ai-hotspot/categories/${id}`),
}
