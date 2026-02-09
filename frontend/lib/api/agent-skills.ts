import apiClient from '../api-client'

export type AgentSkillDifficulty = 'beginner' | 'intermediate' | 'advanced'

export interface AgentSkillCategory {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  sort: number
  createdAt: string
  updatedAt: string
}

export interface AgentSkill {
  id: string
  title: string
  description: string
  code: string
  config?: string
  categoryId: string
  category: AgentSkillCategory
  tags: string[]
  difficulty: AgentSkillDifficulty
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

export interface QueryAgentSkillsDto {
  search?: string
  categoryId?: string
  difficulty?: AgentSkillDifficulty
  page?: number
  pageSize?: number
}

export interface CreateAgentSkillDto {
  title: string
  description: string
  code: string
  config?: string
  categoryId: string
  tags: string[]
  difficulty: AgentSkillDifficulty
}

export interface CreateAgentSkillCategoryDto {
  name: string
  slug: string
  description?: string
  icon?: string
  sort?: number
}

export const agentSkillsApi = {
  // 获取Agent Skill列表
  findAll: (params: QueryAgentSkillsDto) =>
    apiClient.get<any, PaginatedResponse<AgentSkill>>('/agent-skills', { params }),

  // 获取Agent Skill详情
  findOne: (id: string) =>
    apiClient.get<any, AgentSkill>(`/agent-skills/${id}`),

  // 创建Agent Skill
  create: (data: CreateAgentSkillDto) =>
    apiClient.post<any, AgentSkill>('/agent-skills', data),

  // 更新Agent Skill
  update: (id: string, data: Partial<CreateAgentSkillDto>) =>
    apiClient.put<any, AgentSkill>(`/agent-skills/${id}`, data),

  // 删除Agent Skill
  delete: (id: string) =>
    apiClient.delete<any, { message: string }>(`/agent-skills/${id}`),

  // 获取所有分类
  getCategories: () =>
    apiClient.get<any, AgentSkillCategory[]>('/agent-skills/categories'),

  // 创建分类
  createCategory: (data: CreateAgentSkillCategoryDto) =>
    apiClient.post<any, AgentSkillCategory>('/agent-skills/categories', data),

  // 更新分类
  updateCategory: (id: string, data: Partial<CreateAgentSkillCategoryDto>) =>
    apiClient.put<any, AgentSkillCategory>(`/agent-skills/categories/${id}`, data),

  // 删除分类
  deleteCategory: (id: string) =>
    apiClient.delete<any, { message: string }>(`/agent-skills/categories/${id}`),
}
