import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { 
  Palette, 
  Type, 
  Settings, 
  Sun, 
  Moon, 
  Monitor,
  X,
  RotateCcw,
  Zap,
  Layout,
  Eye
} from 'lucide-react'

export function ThemeCustomizer() {
  const { settings, updateSettings, isDark, resetToDefaults } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'theme' | 'colors' | 'typography' | 'layout'>('theme')

  const colorPresets = [
    { name: 'Amber (Padrão)', primary: '#d97706', secondary: '#1f2937', accent: '#059669' },
    { name: 'Blue Ocean', primary: '#2563eb', secondary: '#1e40af', accent: '#0891b2' },
    { name: 'Purple Sunset', primary: '#9333ea', secondary: '#7c3aed', accent: '#c026d3' },
    { name: 'Green Nature', primary: '#059669', secondary: '#047857', accent: '#0d9488' },
    { name: 'Rose Gold', primary: '#e11d48', secondary: '#be185d', accent: '#f59e0b' },
    { name: 'Slate Modern', primary: '#475569', secondary: '#334155', accent: '#0ea5e9' }
  ]

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    updateSettings({
      colors: {
        ...settings.colors,
        primary: preset.primary,
        secondary: preset.secondary,
        accent: preset.accent
      }
    })
  }

  if (!isOpen) {
    return (
      null // Removido o botão flutuante, agora está no painel admin
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
      
      <div className="absolute right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 shadow-xl overflow-y-auto">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Personalização
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex space-x-1 mt-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {[
              { id: 'theme', label: 'Tema', icon: Sun },
              { id: 'colors', label: 'Cores', icon: Palette },
              { id: 'typography', label: 'Texto', icon: Type },
              { id: 'layout', label: 'Layout', icon: Layout }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === id
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 mr-1" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-6">
          {activeTab === 'theme' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Modo de Tema
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'light', label: 'Claro', icon: Sun },
                    { value: 'dark', label: 'Escuro', icon: Moon },
                    { value: 'system', label: 'Sistema', icon: Monitor }
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => updateSettings({ theme: value as any })}
                      className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                        settings.theme === value
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <Icon className="h-5 w-5 mb-1" />
                      <span className="text-xs font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Animações
                </label>
                <button
                  onClick={() => updateSettings({ animations: !settings.animations })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.animations ? 'bg-amber-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.animations ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Modo Compacto
                </label>
                <button
                  onClick={() => updateSettings({ compactMode: !settings.compactMode })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.compactMode ? 'bg-amber-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.compactMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Presets de Cores
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyColorPreset(preset)}
                      className="flex items-center p-3 rounded-lg border hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                    >
                      <div className="flex space-x-1 mr-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: preset.secondary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: preset.accent }}
                        />
                      </div>
                      <span className="text-sm font-medium">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cor Primária
                  </label>
                  <input
                    type="color"
                    value={settings.colors.primary}
                    onChange={(e) => updateSettings({
                      colors: { ...settings.colors, primary: e.target.value }
                    })}
                    className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cor Secundária
                  </label>
                  <input
                    type="color"
                    value={settings.colors.secondary}
                    onChange={(e) => updateSettings({
                      colors: { ...settings.colors, secondary: e.target.value }
                    })}
                    className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cor de Destaque
                  </label>
                  <input
                    type="color"
                    value={settings.colors.accent}
                    onChange={(e) => updateSettings({
                      colors: { ...settings.colors, accent: e.target.value }
                    })}
                    className="w-full h-10 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'typography' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Tamanho da Fonte
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'small', label: 'Pequena' },
                    { value: 'medium', label: 'Média' },
                    { value: 'large', label: 'Grande' }
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => updateSettings({ fontSize: value as any })}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        settings.fontSize === value
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Família da Fonte
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'inter', label: 'Inter (Padrão)', preview: 'Aa' },
                    { value: 'playfair', label: 'Playfair Display', preview: 'Aa' },
                    { value: 'roboto', label: 'Roboto', preview: 'Aa' },
                    { value: 'montserrat', label: 'Montserrat', preview: 'Aa' }
                  ].map(({ value, label, preview }) => (
                    <button
                      key={value}
                      onClick={() => updateSettings({ fontFamily: value as any })}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                        settings.fontFamily === value
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-sm font-medium">{label}</span>
                      <span 
                        className="text-lg font-bold"
                        style={{ fontFamily: value === 'inter' ? 'Inter' : value === 'playfair' ? 'Playfair Display' : value === 'roboto' ? 'Roboto' : 'Montserrat' }}
                      >
                        {preview}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Raio das Bordas
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'none', label: 'Nenhum' },
                    { value: 'small', label: 'Pequeno' },
                    { value: 'medium', label: 'Médio' },
                    { value: 'large', label: 'Grande' }
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => updateSettings({ borderRadius: value as any })}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        settings.borderRadius === value
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                      style={{ 
                        borderRadius: value === 'none' ? '0px' : value === 'small' ? '4px' : value === 'medium' ? '8px' : '16px' 
                      }}
                    >
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </h4>
                <div className="space-y-2">
                  <div 
                    className="p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                    style={{ borderRadius: `var(--border-radius)` }}
                  >
                    <div className="text-sm font-medium">Card de Exemplo</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Com bordas personalizadas</div>
                  </div>
                  <button 
                    className="w-full p-2 bg-amber-600 text-white font-medium"
                    style={{ borderRadius: `var(--border-radius)` }}
                  >
                    Botão de Exemplo
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t dark:border-gray-700">
            <button
              onClick={resetToDefaults}
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Restaurar Padrões
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}