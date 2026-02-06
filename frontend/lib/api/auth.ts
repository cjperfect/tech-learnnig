import apiClient from '../api-client'

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
  nickname?: string
}

export interface AuthResponse {
  access_token: string
  user: {
    id: string
    email: string
    nickname: string
    avatar?: string
  }
}

export const authApi = {
  // 邮箱登录
  login: (data: LoginDto) =>
    apiClient.post<any, AuthResponse>('/auth/login', data),

  // 注册
  register: (data: RegisterDto) =>
    apiClient.post<any, AuthResponse>('/auth/register', data),

  // 获取微信登录二维码
  getWechatQRCode: () =>
    apiClient.get<any, { qrcodeUrl: string; state: string }>('/auth/wechat/qrcode'),

  // 微信登录回调
  wechatCallback: (code: string, state: string) =>
    apiClient.post<any, AuthResponse>('/auth/wechat/callback', { code, state }),

  // 获取当前用户信息
  getProfile: () =>
    apiClient.get<any, AuthResponse['user']>('/auth/profile'),
}
