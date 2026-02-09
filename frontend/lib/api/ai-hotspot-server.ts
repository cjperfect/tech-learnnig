import { serverApi } from '../api-server'
import { AiHotspot, PaginatedResponse, QueryAiHotspotsDto } from './ai-hotspot'

// 服务端 AI Hotspot API (用于 Next.js 服务器组件)
export const aiHotspotServerApi = {
  // 获取AI热点列表
  findAll: (params: QueryAiHotspotsDto) =>
    serverApi.get<PaginatedResponse<AiHotspot>>('/ai-hotspot', params),

  // 获取AI热点详情
  findOne: (id: string) =>
    serverApi.get<AiHotspot>(`/ai-hotspot/${id}`),

  // 获取所有分类
  getCategories: () =>
    serverApi.get<AiHotspot[]>('/ai-hotspot/categories'),
}
