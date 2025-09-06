import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Filter, Eye, Edit, Trash2, Camera } from 'lucide-react'

interface Project {
  id: string
  title: string
  client_names: string
  location: string
  event_date: string
  status: 'published' | 'draft'
  category: string
  cover_image: string
  created_at: string
}

export function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    // Mock data for demo
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'Ana & João',
        client_names: 'Ana Silva & João Santos',
        location: 'Jericoacoara, CE',
        event_date: '2024-01-15',
        status: 'published',
        category: 'Casamento',
        cover_image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=300',
        created_at: '2024-01-10'
      },
      {
        id: '2',
        title: 'Maria & Pedro',
        client_names: 'Maria Oliveira & Pedro Costa',
        location: 'Fortaleza, CE',
        event_date: '2024-02-20',
        status: 'draft',
        category: 'Pré Wedding',
        cover_image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=300',
        created_at: '2024-02-15'
      },
      {
        id: '3',
        title: 'Clara & Lucas',
        client_names: 'Clara Mendes & Lucas Ferreira',
        location: 'Sobral, CE',
        event_date: '2024-03-10',
        status: 'published',
        category: 'Ensaio',
        cover_image: 'https://images.pexels.com/photos/265885/pexels-photo-265885.jpeg?auto=compress&cs=tinysrgb&w=300',
        created_at: '2024-03-05'
      }
    ]
    
    setProjects(mockProjects)
    setLoading(false)
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client_names.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || project.status === statusFilter
    const matchesCategory = !categoryFilter || project.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      setProjects(projects.filter(p => p.id !== id))
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Projetos</h1>
          <p className="text-gray-600">Gerencie seus projetos fotográficos</p>
        </div>
        <Link
          to="/admin/projects/new"
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Novo Projeto
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar projetos..."
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

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
          >
            <option value="">Todas as categorias</option>
            <option value="Casamento">Casamento</option>
            <option value="Pré Wedding">Pré Wedding</option>
            <option value="Ensaio">Ensaio</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-[4/3] relative">
              <img
                src={project.cover_image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  project.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status === 'published' ? 'Publicado' : 'Rascunho'}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center mb-2">
                <Camera className="h-4 w-4 text-amber-600 mr-1" />
                <span className="text-sm text-amber-600 font-medium">{project.category}</span>
              </div>
              
              <h3 className="text-lg font-bold mb-1">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{project.client_names}</p>
              <p className="text-gray-500 text-sm mb-4">{project.location}</p>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {new Date(project.event_date).toLocaleDateString('pt-BR')}
                </span>
                
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 p-1">
                    <Eye className="h-4 w-4" />
                  </button>
                  <Link
                    to={`/admin/projects/${project.id}/edit`}
                    className="text-amber-600 hover:text-amber-800 p-1"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum projeto encontrado
          </h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter || categoryFilter
              ? 'Tente ajustar os filtros de busca.'
              : 'Comece criando seu primeiro projeto.'}
          </p>
        </div>
      )}
    </div>
  )
}