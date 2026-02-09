// 服务器端 API 调用函数（用于 Next.js 服务器组件）
// 服务端需要直接调用后端 API，不能使用相对路径
import axios from 'axios'

const BASE_URL = process.env.API_URL || 'http://localhost:6666'

const serverApiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
serverApiClient.interceptors.request.use(
  (config) => {
    console.log('[Server API Request]', config.method?.toUpperCase(), config.url, {
      params: config.params,
      data: config.data,
    })
    return config
  },
  (error) => {
    console.error('[Server API Request Error]', error)
    return Promise.reject(error)
  },
)

// 响应拦截器 - 解包后端的 {code, msg, data} 格式
serverApiClient.interceptors.response.use(
  (response) => {
    console.log('[Server API Response]', response.status, response.data)
    // 后端返回格式: {code: 200, msg: "success", data: ...}
    // 我们需要返回 data 字段
    return response.data.data
  },
  (error) => {
    console.error('[Server API Error]', {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      params: error.config?.params,
    })
    return Promise.reject(error.response?.data || error)
  },
)

// 导出服务器端 API 函数
export const serverApi = {
  get: <T>(endpoint: string, params?: any) =>
    serverApiClient.get<T>(endpoint, { params }),

  post: <T>(endpoint: string, data: any) =>
    serverApiClient.post<T>(endpoint, data),

  put: <T>(endpoint: string, data: any) =>
    serverApiClient.put<T>(endpoint, data),

  delete: <T>(endpoint: string) =>
    serverApiClient.delete<T>(endpoint),
}
