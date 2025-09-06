import { useState, useEffect } from 'react'
import { Save, Image, Globe, Mail, Phone, MapPin, Instagram, Upload, X } from 'lucide-react'

interface Settings {
  site_title: string
  site_description: string
  contact_email: string
  contact_phone: string
  contact_address: string
  instagram_url: string
  logo_url: string
  hero_images: string[]
  seo_keywords: string
}

export function AdminSettings() {
  const [settings, setSettings] = useState<Settings>({
    site_title: 'Valdigley Fotografia',
    site_description: 'Fotógrafo especializado em casamentos e pré-weddings em Jericoacoara, Sobral e Fortaleza',
    contact_email: 'contato@valdigley.com',
    contact_phone: '+55 85 99999-9999',
    contact_address: 'Fortaleza, Ceará - Atendemos Jericoacoara, Sobral e região',
    instagram_url: 'https://instagram.com/valdigleyfoto',
    logo_url: '',
    hero_images: [
      'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
      'https://images.pexels.com/photos/265885/pexels-photo-265885.jpeg'
    ],
    seo_keywords: 'fotografia casamento, Jericoacoara, Sobral, Fortaleza, pré wedding, ensaio casal'
  })

  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [logoPreview, setLogoPreview] = useState('')

  useEffect(() => {
    setLogoPreview(settings.logo_url)
  }, [settings.logo_url])
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Here you would save to Supabase or your settings storage
      console.log('Saving settings:', settings)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
    }

    setLoading(false)
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Mock upload - em uma implementação real, você faria upload para Supabase Storage
    const mockUrl = `https://images.pexels.com/photos/${Date.now()}/logo.png`
    setSettings(prev => ({ ...prev, logo_url: mockUrl }))
    setLogoPreview(mockUrl)
  }

  const removeLogo = () => {
    setSettings(prev => ({ ...prev, logo_url: '' }))
    setLogoPreview('')
  }
  const addHeroImage = () => {
    const url = prompt('URL da imagem:')
    if (url) {
      setSettings(prev => ({
        ...prev,
        hero_images: [...prev.hero_images, url]
      }))
    }
  }

  const removeHeroImage = (index: number) => {
    setSettings(prev => ({
      ...prev,
      hero_images: prev.hero_images.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações gerais do site</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Site Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Globe className="h-6 w-6 text-amber-600 mr-2" />
            <h2 className="text-xl font-bold">Informações do Site</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título do Site
              </label>
              <input
                type="text"
                value={settings.site_title}
                onChange={(e) => setSettings(prev => ({ ...prev, site_title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo do Site
              </label>
              
              {logoPreview ? (
                <div className="space-y-3">
                  <div className="relative inline-block">
                    <img 
                      src={logoPreview} 
                      alt="Logo Preview" 
                      className="h-16 w-auto max-w-[200px] object-contain border border-gray-300 rounded-lg p-2 bg-white"
                    />
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={settings.logo_url}
                      onChange={(e) => {
                        setSettings(prev => ({ ...prev, logo_url: e.target.value }))
                        setLogoPreview(e.target.value)
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                      placeholder="https://exemplo.com/logo.png"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="url"
                    value={settings.logo_url}
                    onChange={(e) => {
                      setSettings(prev => ({ ...prev, logo_url: e.target.value }))
                      setLogoPreview(e.target.value)
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                    placeholder="https://exemplo.com/logo.png"
                  />
                  <div className="text-center">
                    <p className="text-gray-600 mb-2">ou</p>
                    <label className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Fazer Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição do Site
              </label>
              <textarea
                rows={3}
                value={settings.site_description}
                onChange={(e) => setSettings(prev => ({ ...prev, site_description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Palavras-chave SEO
              </label>
              <input
                type="text"
                value={settings.seo_keywords}
                onChange={(e) => setSettings(prev => ({ ...prev, seo_keywords: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="palavra1, palavra2, palavra3"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Phone className="h-6 w-6 text-amber-600 mr-2" />
            <h2 className="text-xl font-bold">Informações de Contato</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings(prev => ({ ...prev, contact_email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone/WhatsApp
              </label>
              <input
                type="tel"
                value={settings.contact_phone}
                onChange={(e) => setSettings(prev => ({ ...prev, contact_phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram
              </label>
              <input
                type="url"
                value={settings.instagram_url}
                onChange={(e) => setSettings(prev => ({ ...prev, instagram_url: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endereço
              </label>
              <input
                type="text"
                value={settings.contact_address}
                onChange={(e) => setSettings(prev => ({ ...prev, contact_address: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Hero Images */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image className="h-6 w-6 text-amber-600 mr-2" />
              <h2 className="text-xl font-bold">Imagens do Hero</h2>
            </div>
            <button
              type="button"
              onClick={addHeroImage}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Adicionar Imagem
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {settings.hero_images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Hero ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeHeroImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          {settings.hero_images.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              Nenhuma imagem adicionada. Clique em "Adicionar Imagem" para começar.
            </p>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-bold inline-flex items-center transition-colors ${
              saved
                ? 'bg-green-600 text-white'
                : 'bg-amber-600 hover:bg-amber-700 text-white disabled:bg-amber-400'
            }`}
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar Configurações'}
          </button>
        </div>
      </form>
    </div>
  )
}