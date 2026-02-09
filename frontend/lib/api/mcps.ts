import apiClient from '../api-client'

export interface McpCategory {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  sort: number
  createdAt: string
  updatedAt: string
}

export interface Mcp {
  id: string
  title: string
  description: string
  repository?: string
  documentation?: string
  categoryId: string
  category: McpCategory
  tags: string[]
  downloadCount: number
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

export interface QueryMcpsDto {
  search?: string
  categoryId?: string
  page?: number
  pageSize?: number
}

export interface CreateMcpDto {
  title: string
  description: string
  repository?: string
  documentation?: string
  categoryId: string
  tags: string[]
}

export interface CreateMcpCategoryDto {
  name: string
  slug: string
  description?: string
  icon?: string
  sort?: number
}

export const mcpsApi = {
  // 获取MCP列表
  findAll: (params: QueryMcpsDto) =>
    apiClient.get<any, PaginatedResponse<Mcp>>('/mcps', { params }),

  // 获取MCP详情
  findOne: (id: string) =>
    apiClient.get<any, Mcp>(`/mcps/${id}`),

  // 创建MCP
  create: (data: CreateMcpDto) =>
    apiClient.post<any, Mcp>('/mcps', data),

  // 更新MCP
  update: (id: string, data: Partial<CreateMcpDto>) =>
    apiClient.put<any, Mcp>(`/mcps/${id}`, data),

  // 删除MCP
  delete: (id: string) =>
    apiClient.delete<any, { message: string }>(`/mcps/${id}`),

  // 增加下载次数
  download: (id: string) =>
    apiClient.post<any, { message: string }>(`/mcps/${id}/download`),

  // 获取所有分类
  getCategories: () =>
    apiClient.get<any, McpCategory[]>('/mcps/categories'),

  // 创建分类
  createCategory: (data: CreateMcpCategoryDto) =>
    apiClient.post<any, McpCategory>('/mcps/categories', data),

  // 更新分类
  updateCategory: (id: string, data: Partial<CreateMcpCategoryDto>) =>
    apiClient.put<any, McpCategory>(`/mcps/categories/${id}`, data),

  // 删除分类
  deleteCategory: (id: string) =>
    apiClient.delete<any, { message: string }>(`/mcps/categories/${id}`),
}
