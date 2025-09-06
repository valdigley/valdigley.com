import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useSettings } from '../../hooks/useSettings'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { settings, toggleTheme, isDark } = useTheme()
  const { settings: siteSettings } = useSettings()

  const logoUrl = siteSettings.logo_url
  const siteTitle = siteSettings.site_title

  const getThemeIcon = () => {
    switch (settings.theme) {
      case 'light': return Sun
      case 'dark': return Moon
      default: return Monitor
    }
  }

  const ThemeIcon = getThemeIcon()

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm fixed w-full top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={siteTitle}
                className="h-10 w-auto max-w-[200px] object-contain"
              />
            ) : (
              <span className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                {siteTitle}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Início
            </Link>
            <Link to="/portfolio" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Portfólio
            </Link>
            <Link to="/sobre" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Sobre
            </Link>
            <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Blog
            </Link>
            <Link to="/contato" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
              Contato
            </Link>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={`Tema: ${settings.theme === 'system' ? 'Sistema' : settings.theme === 'dark' ? 'Escuro' : 'Claro'}`}
            >
              <ThemeIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ThemeIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? 
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" /> : 
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400" onClick={() => setIsMenuOpen(false)}>
                Início
              </Link>
              <Link to="/portfolio" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400" onClick={() => setIsMenuOpen(false)}>
                Portfólio
              </Link>
              <Link to="/sobre" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400" onClick={() => setIsMenuOpen(false)}>
                Sobre
              </Link>
              <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <Link to="/contato" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400" onClick={() => setIsMenuOpen(false)}>
                Contato
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}