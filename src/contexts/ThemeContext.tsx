import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
}

export interface ThemeSettings {
  theme: Theme
  colors: ThemeColors
  fontSize: 'small' | 'medium' | 'large'
  fontFamily: 'inter' | 'playfair' | 'roboto' | 'montserrat'
  borderRadius: 'none' | 'small' | 'medium' | 'large'
  animations: boolean
  compactMode: boolean
}

interface ThemeContextType {
  settings: ThemeSettings
  updateSettings: (settings: Partial<ThemeSettings>) => void
  isDark: boolean
  toggleTheme: () => void
  resetToDefaults: () => void
}

const defaultSettings: ThemeSettings = {
  theme: 'system',
  colors: {
    primary: '#d97706', // amber-600
    secondary: '#1f2937', // gray-800
    accent: '#059669', // emerald-600
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb'
  },
  fontSize: 'medium',
  fontFamily: 'inter',
  borderRadius: 'medium',
  animations: true,
  compactMode: false
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('theme-settings')
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings
  })

  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedSettings = localStorage.getItem('theme-settings')
    if (savedSettings) {
      setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme-settings', JSON.stringify(settings))
    applyTheme(settings)
  }, [settings])

  useEffect(() => {
    const updateTheme = () => {
      if (settings.theme === 'system') {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDark(systemDark)
        document.documentElement.classList.toggle('dark', systemDark)
      } else {
        const dark = settings.theme === 'dark'
        setIsDark(dark)
        document.documentElement.classList.toggle('dark', dark)
      }
    }

    updateTheme()

    if (settings.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', updateTheme)
      return () => mediaQuery.removeEventListener('change', updateTheme)
    }
  }, [settings.theme])

  const applyTheme = (themeSettings: ThemeSettings) => {
    const root = document.documentElement
    
    // Apply colors
    Object.entries(themeSettings.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })

    // Apply font size
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px'
    }
    root.style.setProperty('--base-font-size', fontSizes[themeSettings.fontSize])

    // Apply font family
    const fontFamilies = {
      inter: "'Inter', system-ui, sans-serif",
      playfair: "'Playfair Display', serif",
      roboto: "'Roboto', system-ui, sans-serif",
      montserrat: "'Montserrat', system-ui, sans-serif"
    }
    root.style.setProperty('--font-family', fontFamilies[themeSettings.fontFamily])

    // Apply border radius
    const borderRadii = {
      none: '0px',
      small: '4px',
      medium: '8px',
      large: '16px'
    }
    root.style.setProperty('--border-radius', borderRadii[themeSettings.borderRadius])

    // Apply animations
    root.style.setProperty('--animation-duration', themeSettings.animations ? '0.3s' : '0s')

    // Apply compact mode
    root.classList.toggle('compact-mode', themeSettings.compactMode)
  }

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : settings.theme === 'dark' ? 'system' : 'light'
    updateSettings({ theme: newTheme })
  }

  const resetToDefaults = () => {
    setSettings(defaultSettings)
    localStorage.removeItem('theme-settings')
  }

  return (
    <ThemeContext.Provider value={{
      settings,
      updateSettings,
      isDark,
      toggleTheme,
      resetToDefaults
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}