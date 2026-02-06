'use client'

import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
}: GlassCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: 'linear'
      }}
      whileHover={hover ? {
        y: -4,
        scale: 1.01,
        transition: {
          duration: 0.12,
          ease: 'linear'
        }
      } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        'glass-card rounded-2xl p-5 cursor-pointer h-full flex flex-col',
        glow && 'transition-all duration-120',
        glow && isHovered && 'shadow-[0_0_40px_rgba(249,115,22,0.35)]',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
