import { useState } from 'react'
import { Save, Building, Phone, Mail, MapPin, Instagram, FileText, Globe } from 'lucide-react'
import { useBusinessInfo } from '../../hooks/useBusinessInfo'

export function AdminBusinessInfo() {
  const { businessInfo, updateBusinessInfo } = useBusinessInfo()
  const [formData, setFormData] = useState(businessInfo)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    const success = await updateBusinessInfo(formData)
    
    if (success) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } else {
      alert('Erro ao salvar informações. Tente novamente.')
    }

    setIsSaving(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Informações do Negócio</h1>
        <p className="text-gray-600">Gerencie as informações básicas do seu negócio</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informações Básicas */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Building className="h-6 w-6 text-amber-600 mr-2" />
            <h2 className="text-xl font-bold">Informações Básicas</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Negócio *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="Ex: Valdigley Fotografia"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CPF/CNPJ
              </label>
              <input
                type="text"
                name="document"
                value={formData.document}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="000.000.000-00 ou 00.000.000/0001-00"
              />
            </div>
          </div>
        </div>

        {/* Contato */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Phone className="h-6 w-6 text-amber-600 mr-2" />
            <h2 className="text-xl font-bold">Informações de Contato</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp *
              </label>
              <input
                type="tel"
                name="whatsapp"
                required
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="+55 85 99999-9999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="contato@exemplo.com"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram
              </label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="https://instagram.com/seuusuario"
              />
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <MapPin className="h-6 w-6 text-amber-600 mr-2" />
            <h2 className="text-xl font-bold">Endereço</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endereço Completo
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="Rua das Flores, 123 - Centro"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cidade *
              </label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="Fortaleza"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado *
              </label>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="CE"
                maxLength={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CEP
              </label>
              <input
                type="text"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="60000-000"
              />
            </div>
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={`px-6 py-2 rounded-lg font-bold inline-flex items-center transition-colors ${
              saved
                ? 'bg-green-600 text-white'
                : 'bg-amber-600 hover:bg-amber-700 text-white disabled:bg-amber-400'
            }`}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar Informações'}
          </button>
        </div>
      </form>
    </div>
  )
}