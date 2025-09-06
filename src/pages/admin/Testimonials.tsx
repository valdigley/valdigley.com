import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, MessageSquare, Star, Save, X } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface Testimonial {
  id: string
  client_name: string
  content: string
  rating: number
  is_featured: boolean
  created_at: string
}

export function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    client_name: '',
    content: '',
    rating: 5,
    is_featured: false
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setTestimonials(data)
      } else {
        // Mock data
        setTestimonials([
          {
            id: '1',
            client_name: 'Ana & João',
            content: 'Valdigley conseguiu capturar cada momento do nosso casamento com uma sensibilidade única. As fotos ficaram simplesmente perfeitas!',
            rating: 5,
            is_featured: true,
            created_at: '2024-01-15'
          },
          {
            id: '2',
            client_name: 'Maria & Pedro',
            content: 'Profissional incrível! Nos deixou super à vontade durante todo o ensaio. O resultado superou nossas expectativas.',
            rating: 5,
            is_featured: true,
            created_at: '2024-02-20'
          },
          {
            id: '3',
            client_name: 'Clara & Lucas',
            content: 'A qualidade das fotos é impressionante. Valdigley tem um olhar artístico excepcional.',
            rating: 5,
            is_featured: false,
            created_at: '2024-03-10'
          }
        ])
      }
    } catch (error) {
      setTestimonials([
        {
          id: '1',
          client_name: 'Ana & João',
          content: 'Valdigley conseguiu capturar cada momento do nosso casamento com uma sensibilidade única. As fotos ficaram simplesmente perfeitas!',
          rating: 5,
          is_featured: true,
          created_at: '2024-01-15'
        },
        {
          id: '2',
          client_name: 'Maria & Pedro',
          content: 'Profissional incrível! Nos deixou super à vontade durante todo o ensaio. O resultado superou nossas expectativas.',
          rating: 5,
          is_featured: true,
          created_at: '2024-02-20'
        }
      ])
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingId) {
        // Update existing testimonial
        const updatedTestimonials = testimonials.map(test => 
          test.id === editingId ? { ...test, ...formData } : test
        )
        setTestimonials(updatedTestimonials)
      } else {
        // Create new testimonial
        const newTestimonial = {
          id: Date.now().toString(),
          ...formData,
          created_at: new Date().toISOString()
        }
        setTestimonials([newTestimonial, ...testimonials])
      }

      setFormData({ client_name: '', content: '', rating: 5, is_featured: false })
      setEditingId(null)
    } catch (error) {
      console.error('Error saving testimonial:', error)
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setFormData({
      client_name: testimonial.client_name,
      content: testimonial.content,
      rating: testimonial.rating,
      is_featured: testimonial.is_featured
    })
    setEditingId(testimonial.id)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este depoimento?')) {
      setTestimonials(testimonials.filter(test => test.id !== id))
    }
  }

  const handleCancel = () => {
    setFormData({ client_name: '', content: '', rating: 5, is_featured: false })
    setEditingId(null)
  }

  const toggleFeatured = async (id: string) => {
    const updatedTestimonials = testimonials.map(test => 
      test.id === id ? { ...test, is_featured: !test.is_featured } : test
    )
    setTestimonials(updatedTestimonials)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Depoimentos</h1>
        <p className="text-gray-600">Gerencie os depoimentos dos seus clientes</p>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? 'Editar Depoimento' : 'Novo Depoimento'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Cliente *
              </label>
              <input
                type="text"
                required
                value={formData.client_name}
                onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                placeholder="Ex: Ana & João"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avaliação *
              </label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              >
                <option value={5}>5 estrelas</option>
                <option value={4}>4 estrelas</option>
                <option value={3}>3 estrelas</option>
                <option value={2}>2 estrelas</option>
                <option value={1}>1 estrela</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Depoimento *
            </label>
            <textarea
              rows={4}
              required
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              placeholder="Escreva o depoimento do cliente..."
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
            />
            <label htmlFor="is_featured" className="ml-2 text-sm text-gray-700">
              Destacar na página inicial
            </label>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {editingId ? 'Atualizar' : 'Criar'}
            </button>
            
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center"
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold text-gray-900">{testimonial.client_name}</h3>
                {testimonial.is_featured && (
                  <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
                    Destaque
                  </span>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleFeatured(testimonial.id)}
                  className={`p-1 rounded ${
                    testimonial.is_featured 
                      ? 'text-amber-600 hover:text-amber-800' 
                      : 'text-gray-400 hover:text-amber-600'
                  }`}
                  title={testimonial.is_featured ? 'Remover destaque' : 'Destacar'}
                >
                  <Star className={`h-4 w-4 ${testimonial.is_featured ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex mb-3">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
              ))}
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">{testimonial.content}</p>

            <div className="text-sm text-gray-500">
              {new Date(testimonial.created_at).toLocaleDateString('pt-BR')}
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum depoimento encontrado
          </h3>
          <p className="text-gray-600">
            Adicione o primeiro depoimento usando o formulário acima.
          </p>
        </div>
      )}
    </div>
  )
}