import { useState, useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { 
  Palette, 
  Type, 
  Settings, 
  Sun, 
  Moon, 
  Monitor,
  RotateCcw,
  Save,
  Eye,
  Layout
} from 'lucide-react'

export function AdminThemeSettings() {
  const { settings, updateSettings, resetToDefaults } = useTheme()
  const [saved, setSaved] = useState(false)

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

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Configurações de Tema</h1>
        <p className="text-gray-600 dark:text-gray-400">Personalize a aparência do site</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Configurações de Tema */}
        <div className="space-y-6">
          {/* Modo de Tema */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Sun className="h-6 w-6 text-amber-600 mr-2" />
              <h2 className="text-xl font-bold">Modo de Tema</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'light', label: 'Claro', icon: Sun },
                { value: 'dark', label: 'Escuro', icon: Moon },
                { value: 'system', label: 'Sistema', icon: Monitor }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => updateSettings({ theme: value as any })}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                    settings.theme === value
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Presets de Cores */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Palette className="h-6 w-6 text-amber-600 mr-2" />
              <h2 className="text-xl font-bold">Presets de Cores</h2>
            </div>
            
            <div className="space-y-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyColorPreset(preset)}
                  className="w-full flex items-center p-3 rounded-lg border hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                >
                  <div className="flex space-x-1 mr-3">
                    <div 
                      className="w-5 h-5 rounded-full border border-gray-200" 
                      style={{ backgroundColor: preset.primary }}
                    />
                    <div 
                      className="w-5 h-5 rounded-full border border-gray-200" 
                      style={{ backgroundColor: preset.secondary }}
                    />
                    <div 
                      className="w-5 h-5 rounded-full border border-gray-200" 
                      style={{ backgroundColor: preset.accent }}
                    />
                  </div>
                  <span className="font-medium">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cores Personalizadas */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Cores Personalizadas</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cor Primária
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.colors.primary}
                    onChange={(e) => updateSettings({
                      colors: { ...settings.colors, primary: e.target.value }
                    })}
                    className="w-12 h-10 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    value={settings.colors.primary}
                    onChange={(e) => updateSettings({
                      colors: { ...settings.colors, primary: e.target.value }
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cor Secundária
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.colors.secondary}
                    onChange={(e) => updateSettings({
                      colors: { ...settings.colors, secondary: e.target.value }
                    })}
                    className="w-12 h-10 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    value={settings.colors.secondary}
                    onChange={(e) => updateSettings({
                      colors: { ...settings.colors, secondary: e.target.value }
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cor de Destaque
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.colors.accent}
                    onChange={(e) => updateSettings({
                      colors: { ...settings.colors, accent: e.target.value }
                    })}
                    className="w-12 h-10 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    value={settings.colors.accent}
                    onChange={(e) => updateSettings({
                      colors: { ...settings.colors, accent: e.target.value }
                    })}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configurações de Layout e Tipografia */}
        <div className="space-y-6">
          {/* Tipografia */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Type className="h-6 w-6 text-amber-600 mr-2" />
              <h2 className="text-xl font-bold">Tipografia</h2>
            </div>
            
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
                    { value: 'inter', label: 'Inter (Padrão)' },
                    { value: 'playfair', label: 'Playfair Display' },
                    { value: 'roboto', label: 'Roboto' },
                    { value: 'montserrat', label: 'Montserrat' }
                  ].map(({ value, label }) => (
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
                        style={{ 
                          fontFamily: value === 'inter' ? 'Inter' : 
                                     value === 'playfair' ? 'Playfair Display' : 
                                     value === 'roboto' ? 'Roboto' : 'Montserrat' 
                        }}
                      >
                        Aa
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Layout */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Layout className="h-6 w-6 text-amber-600 mr-2" />
              <h2 className="text-xl font-bold">Layout</h2>
            </div>
            
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
                        borderRadius: value === 'none' ? '0px' : 
                                      value === 'small' ? '4px' : 
                                      value === 'medium' ? '8px' : '16px' 
                      }}
                    >
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
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
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Eye className="h-6 w-6 text-amber-600 mr-2" />
              <h3 className="text-lg font-bold">Preview</h3>
            </div>
            
            <div className="space-y-3">
              <div 
                className="p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                style={{ borderRadius: `var(--border-radius)` }}
              >
                <div className="text-lg font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                  Título de Exemplo
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Este é um exemplo de como o conteúdo aparecerá com as configurações atuais.
                </div>
                <button 
                  className="px-4 py-2 text-white font-medium transition-colors"
                  style={{ 
                    backgroundColor: 'var(--color-primary)',
                    borderRadius: `var(--border-radius)` 
                  }}
                >
                  Botão de Exemplo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-6 border-t dark:border-gray-700">
        <button
          onClick={resetToDefaults}
          className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Restaurar Padrões
        </button>

        <button
          onClick={handleSave}
          className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
            saved
              ? 'bg-green-600 text-white'
              : 'bg-amber-600 hover:bg-amber-700 text-white'
          }`}
        >
          <Save className="h-4 w-4 mr-2" />
          {saved ? 'Salvo!' : 'Salvar Configurações'}
        </button>
      </div>
    </div>
  )
}