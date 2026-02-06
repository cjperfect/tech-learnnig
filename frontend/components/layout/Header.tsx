'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiSearch, FiUser, FiHome, FiBookOpen, FiCode, FiCpu, FiLayers, FiTrendingUp, FiLogOut } from 'react-icons/fi'
import { cn } from '@/lib/utils'
import LoginModal from '@/components/auth/LoginModal'

const navItems = [
  { name: '首页', href: '/', icon: FiHome },
  { name: '技术文章', href: '/articles', icon: FiBookOpen },
  { name: 'Prompt库', href: '/prompts', icon: FiCode },
  { name: 'MCP', href: '/mcp', icon: FiCpu },
  { name: 'Agent Skills', href: '/agent-skills', icon: FiLayers },
  { name: 'AI热点', href: '/ai-hotspot', icon: FiTrendingUp },
]

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 检查本地存储的用户信息
  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      try {
        setUser(JSON.parse(userStr))
      } catch (e) {
        console.error('Failed to parse user from localStorage')
      }
    }
  }, [])

  // 检查当前路径是否匹配导航项
  const isActivePath = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'glass-nav py-3 shadow-lg' : 'bg-transparent py-5'
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'linear' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center space-x-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:inline">Tech Learning</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const isActive = isActivePath(item.href)
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 relative transition-colors duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.05,
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <item.icon className="text-lg" />
                    <span>{item.name}</span>
                    {!isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-500 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2, ease: 'linear' }}
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <motion.button
              className="hidden md:flex p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2, ease: 'linear' }}
            >
              <FiSearch className="text-xl" />
            </motion.button>

            {/* User Button */}
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-gray-700">{user.nickname}</span>
                <motion.button
                  onClick={() => {
                    localStorage.removeItem('user')
                    localStorage.removeItem('access_token')
                    setUser(null)
                  }}
                  className="p-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2, ease: 'linear' }}
                  title="退出登录"
                >
                  <FiLogOut className="text-xl" />
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={() => setIsLoginModalOpen(true)}
                className="hidden md:flex p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, ease: 'linear' }}
                title="登录"
              >
                <FiUser className="text-xl" />
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-primary-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden mt-4 glass rounded-xl overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'linear' }}
            >
              <nav className="py-4 space-y-2">
                {navItems.map((item, index) => {
                  const isActive = isActivePath(item.href)
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.08, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <item.icon className="text-lg" />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </motion.header>
  )
}
