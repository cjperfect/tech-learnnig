import { serverApi } from '../api-server'
import { AgentSkill, PaginatedResponse, QueryAgentSkillsDto } from './agent-skills'

// 服务端 Agent Skill API (用于 Next.js 服务器组件)
export const agentSkillsServerApi = {
  // 获取Agent Skill列表
  findAll: (params: QueryAgentSkillsDto) =>
    serverApi.get<PaginatedResponse<AgentSkill>>('/agent-skills', params),

  // 获取Agent Skill详情
  findOne: (id: string) =>
    serverApi.get<AgentSkill>(`/agent-skills/${id}`),

  // 获取所有分类
  getCategories: () =>
    serverApi.get<AgentSkill[]>('/agent-skills/categories'),
}
