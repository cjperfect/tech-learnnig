import { serverApi } from '../api-server'
import { Mcp, PaginatedResponse, QueryMcpsDto } from './mcps'

// 服务端 MCP API (用于 Next.js 服务器组件)
export const mcpsServerApi = {
  // 获取MCP列表
  findAll: (params: QueryMcpsDto) =>
    serverApi.get<PaginatedResponse<Mcp>>('/mcps', params),

  // 获取MCP详情
  findOne: (id: string) =>
    serverApi.get<Mcp>(`/mcps/${id}`),

  // 获取所有分类
  getCategories: () =>
    serverApi.get<Mcp[]>('/mcps/categories'),
}
