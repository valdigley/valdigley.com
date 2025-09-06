import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Edit, Trash2, FileText, Eye, Calendar, User } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image: string
  is_published: boolean
  created_at: string
  updated_at: string
}

export function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setPosts(data)
      } else {
        // Mock data
        setPosts([
          {
            id: '1',
            title: '10 Dicas Essenciais para o Seu Casamento em Jericoacoara',
            slug: '10-dicas-casamento-jericoacoara',
            excerpt: 'Descubra as melhores dicas para ter um casamento perfeito nas dunas de Jericoacoara.',
            featured_image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
            is_published: true,
            created_at: '2024-01-15',
            updated_at: '2024-01-15'
          },
          {
            id: '2',
            title: 'Tendências de Fotografia de Casamento em 2024',
            slug: 'tendencias-fotografia-casamento-2024',
            excerpt: 'Conheça as principais tendências que estão dominando a fotografia de casamento este ano.',
            featured_image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
            is_published: false,
            created_at: '2024-01-20',
            updated_at: '2024-01-20'
          },
          {
            id: '3',
            title: 'Os Melhores Locais para Pré Wedding no Ceará',
            slug: 'melhores-locais-pre-wedding-ceara',
            excerpt: 'Uma seleção cuidadosa dos locais mais românticos para seu ensaio pré-casamento.',
            featured_image: 'https://images.pexels.com/photos/265885/pexels-photo-265885.jpeg',
            is_published: true,
            created_at: '2024-02-01',
            updated_at: '2024-02-01'
          }
        ])
      }
    } catch (error) {
      setPosts([
        {
          id: '1',
          title: '10 Dicas Essenciais para o Seu Casamento em Jericoacoara',
          slug: '10-dicas-casamento-jericoacoara',
          excerpt: 'Descubra as melhores dicas para ter um casamento perfeito nas dunas de Jericoacoara.',
          featured_image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
          is_published: true,
          created_at: '2024-01-15',
          updated_at: '2024-01-15'
        }
      ])
    }
    setLoading(false)
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || 
                         (statusFilter === 'published' && post.is_published) ||
                         (statusFilter === 'draft' && !post.is_published)
    
    return matchesSearch && matchesStatus
  })

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      setPosts(posts.filter(p => p.id !== id))
    }
  }

  const togglePublished = async (id: string) => {
    const updatedPosts = posts.map(post => 
      post.id === id ? { ...post, is_published: !post.is_published } : post
    )
    setPosts(updatedPosts)
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
          <p className="text-gray-600">Gerencie os posts do seu blog</p>
        </div>
        <Link
          to="/admin/blog/new"
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Post
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
          >
            <option value="">Todos os status</option>
            <option value="published">Publicado</option>
            <option value="draft">Rascunho</option>
          </select>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Post
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-16 h-12 object-cover rounded mr-4"
                      />
                      <div>
                        <div className="font-medium text-gray-900 line-clamp-1">{post.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2 max-w-md">{post.excerpt}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => togglePublished(post.id)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer ${
                        post.is_published
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      }`}
                    >
                      {post.is_published ? 'Publicado' : 'Rascunho'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/admin/blog/${post.id}/edit`}
                        className="text-amber-600 hover:text-amber-900"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum post encontrado
            </h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter
                ? 'Tente ajustar os filtros de busca.'
                : 'Comece criando seu primeiro post.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}