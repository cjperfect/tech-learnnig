'use client'

import { motion } from 'framer-motion'
import { FiGrid, FiList } from 'react-icons/fi'
import { cn } from '@/lib/utils'

interface ViewToggleProps {
  view: 'grid' | 'list'
  onViewChange: (view: 'grid' | 'list') => void
  className?: string
}

export default function ViewToggle({ view, onViewChange, className = '' }: ViewToggleProps) {
  return (
    <div className={cn('flex items-center bg-white/50 rounded-lg p-1 shadow-sm', className)}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'linear' }}
        onClick={() => onViewChange('grid')}
        className={`relative px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-300 ${
          view === 'grid' ? 'text-white' : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {view === 'grid' && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-md"
            transition={{ duration: 0.3, ease: 'linear' }}
          />
        )}
        <span className="relative z-10 flex items-center space-x-2">
          <FiGrid className="text-lg" />
          <span className="hidden sm:inline">卡片</span>
        </span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'linear' }}
        onClick={() => onViewChange('list')}
        className={`relative px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-300 ${
          view === 'list' ? 'text-white' : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        {view === 'list' && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-md"
            transition={{ duration: 0.3, ease: 'linear' }}
          />
        )}
        <span className="relative z-10 flex items-center space-x-2">
          <FiList className="text-lg" />
          <span className="hidden sm:inline">列表</span>
        </span>
      </motion.button>
    </div>
  )
}
