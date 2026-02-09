import { mcpsServerApi } from '@/lib/api/mcps-server'
import McpsClient from './mcps-client'

export default async function McpsPage() {
  try {
    const data = await mcpsServerApi.findAll({ page: 1, pageSize: 100 })
    console.log('mcps fetched:', data)
    return <McpsClient initialMcps={data.items || []} />
  } catch (error) {
    console.error('Failed to fetch mcps:', error)
    return <McpsClient initialMcps={[]} />
  }
}
