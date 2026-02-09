import { agentSkillsServerApi } from '@/lib/api/agent-skills-server'
import AgentSkillsClient from './agent-skills-client'

export default async function AgentSkillsPage() {
  try {
    const data = await agentSkillsServerApi.findAll({ page: 1, pageSize: 100 })
    console.log('agent-skills fetched:', data)
    return <AgentSkillsClient initialSkills={data.items || []} />
  } catch (error) {
    console.error('Failed to fetch agent-skills:', error)
    return <AgentSkillsClient initialSkills={[]} />
  }
}
