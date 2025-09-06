import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { ArrowLeft, MapPin, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ProjectImage {
  id: string
  media_url: string
  media_type: 'image' | 'video'
  thumbnail_url?: string
  alt_text: string
  sort_order: number
}

interface ProjectDetail {
  id: string
  title: string
  client_names: string
  location: string
  event_date: string
  description: string
  cover_image: string
  categories: { name: string; slug: string }
  project_media: ProjectImage[]
}

// Mock data for demo
const mockProjectData: { [key: string]: ProjectDetail } = {
  'ana-joao': {
    id: '1',
    title: 'Ana & João',
    client_names: 'Ana & João',
    location: 'Jericoacoara, CE',
    event_date: '2024-01-15',
    description: 'Um casamento mágico nas dunas de Jericoacoara, com o pôr do sol mais lindo como cenário.',
    cover_image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    categories: { name: 'Casamento', slug: 'casamento' },
    project_media: [
      {
        id: '1',
        media_url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200',
        media_type: 'image',
        alt_text: 'Ana & João - Foto 1',
        sort_order: 1
      },
      {
        id: '2',
        media_url: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200',
        media_type: 'image',
        alt_text: 'Ana & João - Foto 2',
        sort_order: 2
      },
      {
        id: '3',
        media_url: 'https://player.vimeo.com/video/123456789',
        media_type: 'video',
        thumbnail_url: 'https://images.pexels.com/photos/265885/pexels-photo-265885.jpeg?auto=compress&cs=tinysrgb&w=400',
        alt_text: 'Ana & João - Foto 3',
        sort_order: 3
      },
      {
        id: '4',
        media_url: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=1200',
        media_type: 'image',
        alt_text: 'Ana & João - Foto 4',
        sort_order: 4
      },
      {
        id: '5',
        media_url: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=1200',
        media_type: 'image',
        alt_text: 'Ana & João - Foto 5',
        sort_order: 5
      },
      {
        id: '6',
        media_url: 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&w=1200',
        media_type: 'image',
        alt_text: 'Ana & João - Foto 6',
        sort_order: 6
      }
    ]
  },
  'maria-pedro': {
    id: '2',
    title: 'Maria & Pedro',
    client_names: 'Maria & Pedro',
    location: 'Fortaleza, CE',
    event_date: '2024-02-20',
    description: 'Um ensaio pré-wedding romântico nas praias de Fortaleza, capturando a essência do amor.',
    cover_image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    categories: { name: 'Pré Wedding', slug: 'pre-wedding' },
    project_media: [
      {
        id: '7',
        media_url: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1200',
        media_type: 'image',
        alt_text: 'Maria & Pedro - Foto 1',
        sort_order: 1
      },
      {
        id: '8',
        media_url: 'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg?auto=compress&cs=tinysrgb&w=1200',
        media_type: 'image',
        alt_text: 'Maria & Pedro - Foto 2',
        sort_order: 2
      },
      {
        id: '9',
        media_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        media_type: 'video',
        thumbnail_url: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=400',
        alt_text: 'Maria & Pedro - Foto 3',
        sort_order: 3
      },
      {
        id: '10',
        media_url: 'https://images.pexels.com/photos/2253842/pexels-photo-2253842.jpeg?auto=compress&cs=tinysrgb&w=1200',
        media_type: 'image',
        alt_text: 'Maria & Pedro - Foto 4',
        sort_order: 4
      }
    ]
  }
}

export function ProjectDetail() {
  const { category, slug } = useParams()
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    fetchProject()
  }, [slug])

  async function fetchProject() {
    if (!slug) return

    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          id, title, client_names, location, event_date, description, cover_image,
          categories:category_id (name, slug),
          project_media:project_images (id, media_url, media_type, thumbnail_url, alt_text, sort_order)
        `)
        .eq('slug', slug)
        .eq('is_published', true)
        .single()

      if (!error && data) {
        data.project_media.sort((a, b) => a.sort_order - b.sort_order)
        setProject(data)
      } else {
        // Use mock data if no data from Supabase
        const mockProject = mockProjectData[slug]
        if (mockProject) {
          setProject(mockProject)
        }
      }
    } catch (error) {
      // Use mock data if Supabase connection fails
      const mockProject = mockProjectData[slug]
      if (mockProject) {
        setProject(mockProject)
      }
    }
    setLoading(false)
  }

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    if (project) {
      setCurrentImageIndex((prev) => (prev + 1) % project.project_media.length)
    }
  }

  const prevImage = () => {
    if (project) {
      setCurrentImageIndex((prev) => (prev - 1 + project.project_media.length) % project.project_media.length)
    }
  }

  if (loading) {
    return (
      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-8"></div>
            <div className="h-12 bg-gray-300 rounded w-96 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-48 mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Projeto não encontrado</h1>
          <Link to="/portfolio" className="text-amber-600 hover:underline">
            Voltar ao portfólio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link 
              to="/portfolio" 
              className="inline-flex items-center text-gray-600 hover:text-amber-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Portfólio
            </Link>
          </nav>

          {/* Project Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              {project.categories.name}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.client_names}</h1>
            <div className="flex flex-wrap justify-center gap-6 text-gray-600">
              {project.location && (
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {project.location}
                </div>
              )}
              {project.event_date && (
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {new Date(project.event_date).toLocaleDateString('pt-BR')}
                </div>
              )}
            </div>
            {project.description && (
              <p className="text-lg text-gray-700 mt-6 max-w-3xl mx-auto">
                {project.description}
              </p>
            )}
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.project_images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => openLightbox(index)}
                className="group relative overflow-hidden rounded-lg bg-gray-200 aspect-square hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={image.image_url}
                  alt={image.alt_text || `${project.client_names} - Foto ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20 bg-gray-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Gostou do nosso trabalho?</h2>
            <p className="text-gray-600 text-lg mb-8">
              Entre em contato e vamos criar momentos inesquecíveis juntos
            </p>
            <Link
              to="/contato"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-full transition-colors"
            >
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && project.project_media.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative max-w-7xl max-h-full p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            {project.project_media.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Media Content */}
            {project.project_media[currentImageIndex].media_type === 'image' ? (
              <img
                src={project.project_media[currentImageIndex].media_url}
                alt={project.project_media[currentImageIndex].alt_text || `${project.client_names} - Foto ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="max-w-4xl max-h-full">
                <iframe
                  src={project.project_media[currentImageIndex].media_url}
                  className="w-full h-96 rounded-lg"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
              {currentImageIndex + 1} / {project.project_media.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}