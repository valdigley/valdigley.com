import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Clock, User, Calendar, TrendingUp } from 'lucide-react'

// Mock blog data for demo
const mockCategories = [
  { id: '1', name: 'Dicas de Casamento', slug: 'dicas-casamento', color: '#EC4899' },
  { id: '2', name: 'Tendências', slug: 'tendencias', color: '#8B5CF6' },
  { id: '3', name: 'Locais', slug: 'locais', color: '#10B981' },
  { id: '4', name: 'Bastidores', slug: 'bastidores', color: '#F59E0B' },
]

const mockPosts = [
  {
    id: '1',
    title: '10 Dicas Essenciais para o Seu Casamento em Jericoacoara',
    slug: '10-dicas-casamento-jericoacoara',
    excerpt: 'Descubra as melhores dicas para ter um casamento perfeito nas dunas de Jericoacoara, desde a escolha do horário até os cuidados com o vento.',
    featured_image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author_name: 'Valdigley',
    read_time: 8,
    published_at: '2024-01-15',
    is_featured: true,
    blog_categories: [{ blog_categories: { id: '1', name: 'Dicas de Casamento', slug: 'dicas-casamento', color: '#EC4899' } }]
  },
  {
    id: '2',
    title: 'Tendências de Fotografia de Casamento em 2024',
    slug: 'tendencias-fotografia-casamento-2024',
    excerpt: 'Conheça as principais tendências que estão dominando a fotografia de casamento este ano, desde poses espontâneas até novos estilos de edição.',
    featured_image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author_name: 'Valdigley',
    read_time: 6,
    published_at: '2024-01-20',
    is_featured: true,
    blog_categories: [{ blog_categories: { id: '2', name: 'Tendências', slug: 'tendencias', color: '#8B5CF6' } }]
  },
  {
    id: '3',
    title: 'Os Melhores Locais para Pré Wedding no Ceará',
    slug: 'melhores-locais-pre-wedding-ceara',
    excerpt: 'Uma seleção cuidadosa dos locais mais românticos e fotogênicos para realizar seu ensaio pré-casamento no estado do Ceará.',
    featured_image: 'https://images.pexels.com/photos/265885/pexels-photo-265885.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author_name: 'Valdigley',
    read_time: 10,
    published_at: '2024-02-01',
    is_featured: true,
    blog_categories: [{ blog_categories: { id: '3', name: 'Locais', slug: 'locais', color: '#10B981' } }]
  },
  {
    id: '4',
    title: 'Bastidores: O Casamento dos Sonhos de Ana e João',
    slug: 'bastidores-casamento-ana-joao',
    excerpt: 'Acompanhe os bastidores de um dos casamentos mais emocionantes que já fotografei, com todos os detalhes que fizeram esse dia ser único.',
    featured_image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author_name: 'Valdigley',
    read_time: 12,
    published_at: '2024-02-10',
    is_featured: false,
    blog_categories: [{ blog_categories: { id: '4', name: 'Bastidores', slug: 'bastidores', color: '#F59E0B' } }]
  },
  {
    id: '5',
    title: 'Como Escolher o Fotógrafo Ideal para Seu Casamento',
    slug: 'como-escolher-fotografo-casamento',
    excerpt: 'Um guia completo com tudo que você precisa saber antes de escolher o profissional que vai eternizar os momentos do seu grande dia.',
    featured_image: 'https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author_name: 'Valdigley',
    read_time: 7,
    published_at: '2024-02-15',
    is_featured: false,
    blog_categories: [{ blog_categories: { id: '1', name: 'Dicas de Casamento', slug: 'dicas-casamento', color: '#EC4899' } }]
  },
  {
    id: '6',
    title: 'A Magia do Golden Hour em Fortaleza',
    slug: 'golden-hour-fortaleza',
    excerpt: 'Descubra por que o golden hour é o momento perfeito para suas fotos em Fortaleza e como aproveitar ao máximo essa luz dourada única.',
    featured_image: 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    author_name: 'Valdigley',
    read_time: 5,
    published_at: '2024-02-20',
    is_featured: false,
    blog_categories: [{ blog_categories: { id: '3', name: 'Locais', slug: 'locais', color: '#10B981' } }]
  }
]

export function Blog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const featuredPosts = mockPosts.filter(post => post.is_featured)
  const regularPosts = mockPosts.filter(post => !post.is_featured)

  const filteredPosts = regularPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || 
                           post.blog_categories.some(cat => cat.blog_categories.slug === selectedCategory)
    return matchesSearch && matchesCategory
  })

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug)
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dicas, inspirações e histórias sobre o mundo da fotografia de casamentos
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                !selectedCategory
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas
            </button>
            {mockCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.slug)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.slug
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: selectedCategory === category.slug ? category.color : undefined
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && !selectedCategory && !searchTerm && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <TrendingUp className="h-6 w-6 text-amber-600 mr-2" />
              <h2 className="text-2xl font-bold">Em Destaque</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className={`group ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                >
                  <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <div className={`relative overflow-hidden ${index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Destaque
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.blog_categories.slice(0, 2).map((cat) => (
                          <span
                            key={cat.blog_categories.id}
                            className="px-2 py-1 text-xs rounded-full text-white"
                            style={{ backgroundColor: cat.blog_categories.color }}
                          >
                            {cat.blog_categories.name}
                          </span>
                        ))}
                      </div>
                      <h3 className={`font-bold mb-3 group-hover:text-amber-600 transition-colors line-clamp-2 ${
                        index === 0 ? 'text-2xl' : 'text-xl'
                      }`}>
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {post.author_name}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.read_time} min
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.published_at).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div>
          {filteredPosts.length > 0 && (
            <h2 className="text-2xl font-bold mb-8">
              {selectedCategory ? `Posts em ${mockCategories.find(c => c.slug === selectedCategory)?.name}` : 'Últimos Artigos'}
            </h2>
          )}

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum artigo encontrado
              </h3>
              <p className="text-gray-600">
                {searchTerm || selectedCategory 
                  ? 'Tente ajustar sua busca ou filtros.'
                  : 'Nenhum artigo foi publicado ainda.'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.blog_categories.slice(0, 2).map((cat) => (
                          <span
                            key={cat.blog_categories.id}
                            className="px-2 py-1 text-xs rounded-full text-white"
                            style={{ backgroundColor: cat.blog_categories.color }}
                          >
                            {cat.blog_categories.name}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {post.author_name}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.read_time} min
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.published_at).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}