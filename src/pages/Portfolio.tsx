import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { MapPin, Calendar, Grid } from 'lucide-react'

interface Project {
  id: string
  title: string
  slug: string
  client_names: string
  location: string
  event_date: string
  cover_image: string
  categories: { name: string; slug: string } | null
}

interface Category {
  id: string
  name: string
  slug: string
}

// Mock data for demo
const mockCategories = [
  { id: '1', name: 'Casamento', slug: 'casamento' },
  { id: '2', name: 'Pré Wedding', slug: 'pre-wedding' },
  { id: '3', name: 'Ensaio', slug: 'ensaio' }
]

const mockProjects = [
  {
    id: '1',
    title: 'Ana & João',
    slug: 'ana-joao',
    client_names: 'Ana & João',
    location: 'Jericoacoara, CE',
    event_date: '2024-01-15',
    cover_image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    categories: { name: 'Casamento', slug: 'casamento' }
  },
  {
    id: '2',
    title: 'Maria & Pedro',
    slug: 'maria-pedro',
    client_names: 'Maria & Pedro',
    location: 'Fortaleza, CE',
    event_date: '2024-02-20',
    cover_image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    categories: { name: 'Pré Wedding', slug: 'pre-wedding' }
  },
  {
    id: '3',
    title: 'Clara & Lucas',
    slug: 'clara-lucas',
    client_names: 'Clara & Lucas',
    location: 'Sobral, CE',
    event_date: '2024-03-10',
    cover_image: 'https://images.pexels.com/photos/265885/pexels-photo-265885.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    categories: { name: 'Ensaio', slug: 'ensaio' }
  },
  {
    id: '4',
    title: 'Beatriz & Rafael',
    slug: 'beatriz-rafael',
    client_names: 'Beatriz & Rafael',
    location: 'Jericoacoara, CE',
    event_date: '2024-04-05',
    cover_image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    categories: { name: 'Casamento', slug: 'casamento' }
  },
  {
    id: '5',
    title: 'Fernanda & Diego',
    slug: 'fernanda-diego',
    client_names: 'Fernanda & Diego',
    location: 'Fortaleza, CE',
    event_date: '2024-05-12',
    cover_image: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    categories: { name: 'Pré Wedding', slug: 'pre-wedding' }
  },
  {
    id: '6',
    title: 'Isabella & Thiago',
    slug: 'isabella-thiago',
    client_names: 'Isabella & Thiago',
    location: 'Sobral, CE',
    event_date: '2024-06-18',
    cover_image: 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    categories: { name: 'Ensaio', slug: 'ensaio' }
  },
  {
    id: '7',
    title: 'Camila & André',
    slug: 'camila-andre',
    client_names: 'Camila & André',
    location: 'Jericoacoara, CE',
    event_date: '2024-07-22',
    cover_image: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    categories: { name: 'Casamento', slug: 'casamento' }
  },
  {
    id: '8',
    title: 'Juliana & Roberto',
    slug: 'juliana-roberto',
    client_names: 'Juliana & Roberto',
    location: 'Fortaleza, CE',
    event_date: '2024-08-14',
    cover_image: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    categories: { name: 'Pré Wedding', slug: 'pre-wedding' }
  },
  {
    id: '9',
    title: 'Patrícia & Marcos',
    slug: 'patricia-marcos',
    client_names: 'Patrícia & Marcos',
    location: 'Sobral, CE',
    event_date: '2024-09-30',
    cover_image: 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    categories: { name: 'Ensaio', slug: 'ensaio' }
  }
]

export function Portfolio() {
  const { category: categorySlug } = useParams()
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>(categorySlug || '')

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [selectedCategory])

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      if (!error && data && data.length > 0) {
        setCategories(data)
      } else {
        setCategories(mockCategories)
      }
    } catch (error) {
      setCategories(mockCategories)
    }
  }

  async function fetchProjects() {
    try {
      let query = supabase
        .from('projects')
        .select(`
          id, title, slug, client_names, location, event_date, cover_image,
          categories:category_id (name, slug)
        `)
        .eq('is_published', true)
        .order('event_date', { ascending: false })

      if (selectedCategory) {
        query = query.eq('category_id.slug', selectedCategory)
      }

      const { data, error } = await query

      if (!error && data && data.length > 0) {
        // Filter out projects with null categories
        const validProjects = data.filter(project => project.categories !== null)
        setProjects(validProjects)
      } else {
        // Filter mock projects by category if selected
        const filteredProjects = selectedCategory 
          ? mockProjects.filter(p => p.categories.slug === selectedCategory)
          : mockProjects
        setProjects(filteredProjects)
      }
    } catch (error) {
      const filteredProjects = selectedCategory 
        ? mockProjects.filter(p => p.categories.slug === selectedCategory)
        : mockProjects
      setProjects(filteredProjects)
    }
    setLoading(false)
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Portfólio</h1>
        <p className="text-gray-600 text-center mb-12 text-lg">
          Explore nossos trabalhos organizados por categoria
        </p>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-full p-1 flex-wrap gap-1">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.slug
                    ? 'bg-white shadow-sm text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-gray-300 aspect-[4/5] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/portfolio/${project.categories.slug}/${project.slug}`}
                className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  {project.categories && (
                    <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                      {project.categories.name}
                    </span>
                  )}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-amber-600 transition-colors">
                    {project.client_names}
                  </h3>
                  <div className="space-y-1 text-gray-600 text-sm">
                    {project.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {project.location}
                      </div>
                    )}
                    {project.event_date && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(project.event_date).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {projects.length === 0 && !loading && (
          <div className="text-center py-20">
            <Grid className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-gray-600">
              {selectedCategory 
                ? 'Não há projetos nesta categoria ainda.'
                : 'Nenhum projeto foi publicado ainda.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}