import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Upload, X, Plus } from 'lucide-react'

interface ProjectFormData {
  title: string
  client_names: string
  location: string
  event_date: string
  description: string
  category_id: string
  cover_image: string
  is_featured: boolean
  is_published: boolean
  media: Array<{
    id?: string
    media_url: string
    media_type: 'image' | 'video'
    video_url?: string
    thumbnail_url?: string
    alt_text: string
    sort_order: number
  }>
}

export function ProjectForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    client_names: '',
    location: '',
    event_date: '',
    description: '',
    category_id: '',
    cover_image: '',
    is_featured: false,
    is_published: false,
    media: []
  })

  const [categories] = useState([
    { id: '1', name: 'Casamento' },
    { id: '2', name: 'Pré Wedding' },
    { id: '3', name: 'Ensaio' }
  ])

  const [loading, setLoading] = useState(false)
  const [imageUploadLoading, setImageUploadLoading] = useState(false)

  useEffect(() => {
    if (isEditing) {
      // Mock data for editing
      setFormData({
        title: 'Ana & João',
        client_names: 'Ana Silva & João Santos',
        location: 'Jericoacoara, CE',
        event_date: '2024-01-15',
        description: 'Um casamento mágico nas dunas de Jericoacoara.',
        category_id: '1',
        cover_image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
        is_featured: true,
        is_published: true,
        media: [
          {
            id: '1',
            media_url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
            media_type: 'image',
            alt_text: 'Ana & João - Foto 1',
            sort_order: 1
          },
          {
            id: '2',
            media_url: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
            media_type: 'image',
            alt_text: 'Ana & João - Foto 2',
            sort_order: 2
          },
          {
            id: '3',
            media_url: 'https://player.vimeo.com/video/123456789',
            media_type: 'video',
            thumbnail_url: 'https://images.pexels.com/photos/265885/pexels-photo-265885.jpeg',
            alt_text: 'Ana & João - Vídeo do Casamento',
            sort_order: 3
          }
        ]
      })
    }
  }, [isEditing])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Here you would save to Supabase
      console.log('Saving project:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      navigate('/admin/projects')
    } catch (error) {
      console.error('Error saving project:', error)
    }

    setLoading(false)
  }

  const [mediaType, setMediaType] = useState<'image' | 'video'>('image')
  const [videoUrl, setVideoUrl] = useState('')

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setImageUploadLoading(true)

    // Mock image upload - in real app, upload to Supabase Storage
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const mockUrl = `https://images.pexels.com/photos/${Date.now() + i}/mock-media.jpeg`
      
      const newMedia = {
        media_url: mockUrl,
        media_type: 'image' as const,
        alt_text: `${formData.title} - Foto ${formData.media.length + i + 1}`,
        sort_order: formData.media.length + i + 1
      }

      setFormData(prev => ({
        ...prev,
        media: [...prev.media, newMedia]
      }))
    }

    setImageUploadLoading(false)
  }

  const addVideo = () => {
    if (!videoUrl.trim()) return

    const newVideo = {
      media_url: videoUrl,
      media_type: 'video' as const,
      thumbnail_url: `https://images.pexels.com/photos/${Date.now()}/video-thumb.jpeg`,
      alt_text: `${formData.title} - Vídeo ${formData.media.length + 1}`,
      sort_order: formData.media.length + 1
    }

    setFormData(prev => ({
      ...prev,
      media: [...prev.media, newVideo]
    }))

    setVideoUrl('')
  }

  const removeMedia = (index: number) => {
    setFormData(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }))
  }

  const setCoverImage = (mediaUrl: string) => {
    setFormData(prev => ({
      ...prev,
      cover_image: mediaUrl
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/admin/projects')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditing ? 'Editar Projeto' : 'Novo Projeto'}
          </h1>
          <p className="text-gray-600">
            {isEditing ? 'Atualize as informações do projeto' : 'Crie um novo projeto fotográfico'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Informações Básicas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título do Projeto *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="Ex: Ana & João"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomes dos Clientes *
              </label>
              <input
                type="text"
                required
                value={formData.client_names}
                onChange={(e) => setFormData(prev => ({ ...prev, client_names: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="Ex: Ana Silva & João Santos"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Local do Evento
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="Ex: Jericoacoara, CE"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data do Evento
              </label>
              <input
                type="date"
                value={formData.event_date}
                onChange={(e) => setFormData(prev => ({ ...prev, event_date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria *
              </label>
              <select
                required
                value={formData.category_id}
                onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="Descreva o projeto..."
              />
            </div>
          </div>
        </div>

        {/* Media (Images & Videos) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Mídia do Projeto</h2>
          
          {/* Media Type Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Mídia
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setMediaType('image')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mediaType === 'image'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Imagens
              </button>
              <button
                type="button"
                onClick={() => setMediaType('video')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mediaType === 'video'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Vídeos
              </button>
            </div>
          </div>

          {/* Upload/Add Area */}
          <div className="mb-6">
            {mediaType === 'image' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adicionar Imagens
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-gray-600">Arraste e solte suas imagens aqui ou</p>
                    <label className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 cursor-pointer">
                      <Plus className="h-4 w-4 mr-2" />
                      Selecionar Arquivos
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleMediaUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Formatos aceitos: JPG, PNG, WebP (máx. 10MB cada)
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adicionar Vídeo
                </label>
                <div className="flex space-x-2">
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="URL do vídeo (YouTube, Vimeo, etc.)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addVideo}
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Suporte para YouTube, Vimeo e outros players de vídeo
                </p>
              </div>
            )}
          </div>

          {/* Media Grid */}
          {formData.media.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.media.map((item, index) => (
                <div key={index} className="relative group">
                  {item.media_type === 'image' ? (
                    <img
                      src={item.media_url}
                      alt={item.alt_text}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  ) : (
                    <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      {item.thumbnail_url ? (
                        <img
                          src={item.thumbnail_url}
                          alt={item.alt_text}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <div className="text-center">
                            <div className="text-4xl mb-2">🎥</div>
                            <div className="text-xs text-gray-600">Vídeo</div>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-2">
                          <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setCoverImage(item.media_url)}
                        className="bg-amber-600 text-white px-3 py-1 rounded text-sm hover:bg-amber-700"
                      >
                        Capa
                      </button>
                      <button
                        type="button"
                        onClick={() => removeMedia(index)}
                        className="bg-red-600 text-white p-1 rounded hover:bg-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Cover indicator */}
                  {formData.cover_image === item.media_url && (
                    <div className="absolute top-2 left-2 bg-amber-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      Capa
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {imageUploadLoading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Enviando mídia...</p>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Configurações</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label htmlFor="is_featured" className="ml-2 text-sm text-gray-700">
                Projeto em destaque (aparecerá na página inicial)
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_published"
                checked={formData.is_published}
                onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label htmlFor="is_published" className="ml-2 text-sm text-gray-700">
                Publicar projeto (visível no site)
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-amber-400"
          >
            {loading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar Projeto')}
          </button>
        </div>
      </form>
    </div>
  )
}