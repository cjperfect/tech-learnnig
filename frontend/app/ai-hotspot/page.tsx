import { aiHotspotServerApi } from '@/lib/api/ai-hotspot-server'
import AiHotspotClient from './ai-hotspot-client'

export default async function AiHotspotPage() {
  try {
    const data = await aiHotspotServerApi.findAll({ page: 1, pageSize: 100 })
    console.log('ai-hotspot fetched:', data)
    return <AiHotspotClient initialHotspots={data.items || []} />
  } catch (error) {
    console.error('Failed to fetch ai-hotspot:', error)
    return <AiHotspotClient initialHotspots={[]} />
  }
}
