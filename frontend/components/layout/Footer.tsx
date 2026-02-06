'use client'

import Link from 'next/link'
import { FiGithub, FiTwitter, FiMail } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="glass-nav mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold gradient-text">Tech Learning</span>
            <span className="text-gray-400 text-sm">技术资源学习平台</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Link href="/articles" className="hover:text-primary-400 transition-colors">
              技术文章
            </Link>
            <Link href="/prompts" className="hover:text-primary-400 transition-colors">
              Prompt库
            </Link>
            <Link href="/mcp" className="hover:text-primary-400 transition-colors">
              MCP
            </Link>
            <Link href="/agent-skills" className="hover:text-primary-400 transition-colors">
              Agent Skills
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              <FiGithub className="text-lg" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              <FiTwitter className="text-lg" />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
              <FiMail className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
