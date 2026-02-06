'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiArrowLeft, FiQrCode, FiSmartphone, FiMail } from 'react-icons/fi'
import { GlassCard } from '@/components/layout'

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<'wechat' | 'email'>('wechat')
  const [qrCodeLoaded, setQrCodeLoaded] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* 背景光斑 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Back Button */}
      <Link href="/" className="absolute top-24 left-8 z-10">
        <motion.button
          whileHover={{ x: -5 }}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          返回首页
        </motion.button>
      </Link>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'linear' }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">欢迎登录</h1>
            <p className="text-gray-400">选择你喜欢的登录方式</p>
          </div>

          {/* Login Methods */}
          <div className="flex space-x-2 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLoginMethod('wechat')}
              className={`flex-1 py-3 rounded-lg transition-all ${
                loginMethod === 'wechat'
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                  : 'glass-card text-gray-300 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <FiQrCode className="text-lg" />
                <span>微信扫码</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-3 rounded-lg transition-all ${
                loginMethod === 'email'
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                  : 'glass-card text-gray-300 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <FiMail className="text-lg" />
                <span>邮箱登录</span>
              </div>
            </motion.button>
          </div>

          {/* WeChat QR Code */}
          {loginMethod === 'wechat' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'linear' }}
            >
              <div className="bg-white rounded-xl p-6 mb-6">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                  {!qrCodeLoaded ? (
                    <div className="text-center">
                      <FiQrCode className="text-6xl text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">二维码加载中...</p>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {/* 实际应用中这里会显示真实的二维码 */}
                      <FiQrCode className="text-8xl text-gray-800" />
                    </div>
                  )}

                  {/* 扫描动画线 */}
                  {qrCodeLoaded && (
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent"
                      animate={{
                        top: ['0%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  )}
                </div>

                <div className="text-center text-gray-600">
                  <p className="text-sm font-medium mb-1">使用微信扫描二维码登录</p>
                  <p className="text-xs text-gray-500">请确保已关注我们的公众号</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3 text-gray-400">
                <FiSmartphone className="text-lg" />
                <span className="text-sm">打开微信扫一扫</span>
              </div>

              {/* 模拟二维码加载 */}
              {!qrCodeLoaded && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setQrCodeLoaded(true)}
                  className="w-full mt-4 py-2 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                >
                  点击加载二维码
                </motion.button>
              )}
            </motion.div>
          )}

          {/* Email Login */}
          {loginMethod === 'email' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'linear' }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    邮箱地址
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    密码
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-gray-400">
                    <input type="checkbox" className="mr-2" />
                    记住我
                  </label>
                  <a href="#" className="text-primary-400 hover:text-primary-300">
                    忘记密码？
                  </a>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold"
                >
                  登录
                </motion.button>

                <div className="text-center text-sm text-gray-400">
                  还没有账号？
                  <a href="#" className="text-primary-400 hover:text-primary-300 ml-1">
                    立即注册
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </GlassCard>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, ease: 'linear' }}
          className="text-center mt-6 text-gray-400 text-sm"
        >
          登录即表示同意我们的
          <a href="#" className="text-primary-400 hover:text-primary-300 mx-1">
            服务条款
          </a>
          和
          <a href="#" className="text-primary-400 hover:text-primary-300 ml-1">
            隐私政策
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}
