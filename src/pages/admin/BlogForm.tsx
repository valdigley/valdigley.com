import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Upload, Save, Eye } from 'lucide-react'

interface BlogFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  is_published: boolean
}

export function BlogForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    is_published: false
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isEditing) {
      // Mock data for editing
      setFormData({
        title: '10 Dicas Essenciais para o Seu Casamento em Jericoacoara',
        slug: '10-dicas-casamento-jericoacoara',
        excerpt: 'Descubra as melhores dicas para ter um casamento perfeito nas dunas de Jericoacoara, desde a escolha do horário até os cuidados com o vento.',
        content: `# 10 Dicas Essenciais para o Seu Casamento em Jericoacoara

Jericoacoara é um dos destinos mais procurados para casamentos no Brasil. Com suas dunas douradas, lagoas cristalinas e o famoso pôr do sol, oferece cenários únicos para o seu grande dia.

## 1. Escolha o Horário Ideal

O melhor horário para a cerimônia é no final da tarde, entre 16h e 17h. Assim você aproveita a luz dourada do golden hour e termina com o espetacular pôr do sol de Jericoacoara.

## 2. Cuidado com o Vento

Jericoacoara é conhecida pelos ventos constantes. Considere isso na escolha do penteado, decoração e até mesmo do vestido da noiva.

## 3. Planeje a Logística

O acesso a Jericoacoara é feito apenas por veículos 4x4. Organize o transporte dos convidados com antecedência.

## 4. Escolha o Local Certo

Existem várias opções: na praia, nas dunas, na lagoa do paraíso ou em pousadas charmosas. Cada local oferece uma atmosfera única.

## 5. Contrate Profissionais Locais

Fotógrafos e fornecedores locais conhecem os melhores ângulos e horários para cada tipo de foto.

*Continue lendo para descobrir as outras 5 dicas essenciais...*`,
        featured_image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
        is_published: true
      })
    }
  }, [isEditing])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Here you would save to Supabase
      console.log('Saving blog post:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      navigate('/admin/blog')
    } catch (error) {
      console.error('Error saving blog post:', error)
    }

    setLoading(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Mock image upload - in real app, upload to Supabase Storage
    const mockUrl = `https://images.pexels.com/photos/${Date.now()}/mock-image.jpeg`
    setFormData(prev => ({ ...prev, featured_image: mockUrl }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/admin/blog')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Editar Post' : 'Novo Post'}
          </h1>
          <p className="text-gray-600">
            {isEditing ? 'Atualize as informações do post' : 'Crie um novo post para o blog'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Informações Básicas</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título do Post *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  title: e.target.value,
                  slug: generateSlug(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="Ex: 10 Dicas para Casamento em Jericoacoara"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug (URL)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="10-dicas-casamento-jericoacoara"
              />
              <p className="text-sm text-gray-500 mt-1">
                URL do post: /blog/{formData.slug}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resumo/Excerpt *
              </label>
              <textarea
                rows={3}
                required
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="Breve descrição do post que aparecerá na listagem..."
              />
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Imagem Destacada</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL da Imagem
              </label>
              <input
                type="url"
                value={formData.featured_image}
                onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-2">ou</p>
              <label className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                Fazer Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {formData.featured_image && (
              <div className="mt-4">
                <img
                  src={formData.featured_image}
                  alt="Preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Conteúdo</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conteúdo do Post *
            </label>
            <textarea
              rows={20}
              required
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent font-mono text-sm"
              placeholder="Escreva o conteúdo do post em Markdown..."
            />
            <p className="text-sm text-gray-500 mt-2">
              Você pode usar Markdown para formatação (# para títulos, **negrito**, *itálico*, etc.)
            </p>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Configurações</h2>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_published"
              checked={formData.is_published}
              onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
            />
            <label htmlFor="is_published" className="ml-2 text-sm text-gray-700">
              Publicar post (visível no blog)
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/admin/blog')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          
          <div className="flex space-x-4">
            {formData.slug && (
              <a
                href={`/blog/${formData.slug}`}
                target="_blank"
                className="inline-flex items-center px-6 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </a>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-amber-400 inline-flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar Post')}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}