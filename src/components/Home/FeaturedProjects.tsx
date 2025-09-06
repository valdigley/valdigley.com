import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Eye, MapPin, Calendar } from 'lucide-react'

interface Project {
  id: string
  title: string
  slug: string
  client_names: string
  location: string
  event_date: string
  cover_image: string
  categories: { name: string; slug: string }
}

// Mock data for demo purposes
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
  }
]

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeaturedProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select(`
            id, title, slug, client_names, location, event_date, cover_image,
            categories:category_id (name, slug)
          `)
          .eq('is_featured', true)
          .eq('is_published', true)
          .limit(6)

        if (!error && data && data.length > 0) {
          setProjects(data)
        } else {
          // Use mock data if no data from Supabase
          setProjects(mockProjects)
        }
      } catch (error) {
        // Use mock data if Supabase connection fails
        setProjects(mockProjects)
      }
      setLoading(false)
    }

    fetchFeaturedProjects()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Trabalhos Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-300 aspect-[4/5] rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Trabalhos Recentes</h2>
        <p className="text-gray-600 text-center mb-16 text-lg">
          Confira alguns dos nossos trabalhos mais especiais
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-lg shadow-lg bg-white">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={project.cover_image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Link
                    to={`/portfolio/${project.categories.slug}/${project.slug}`}
                    className="inline-flex items-center bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver mais
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                  {project.categories.name}
                </span>
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
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/portfolio"
            className="inline-block bg-gray-900 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors"
          >
            Ver Todo Portfólio
          </Link>
        </div>
      </div>
    </section>
  )
}