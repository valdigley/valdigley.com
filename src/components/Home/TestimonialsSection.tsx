import { useEffect, useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface Testimonial {
  id: string
  client_name: string
  content: string
  rating: number
}

// Mock testimonials for demo
const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    client_name: 'Ana & João',
    content: 'Valdigley conseguiu capturar cada momento do nosso casamento com uma sensibilidade única. As fotos ficaram simplesmente perfeitas e emocionantes!',
    rating: 5
  },
  {
    id: '2',
    client_name: 'Maria & Pedro',
    content: 'Profissional incrível! Nos deixou super à vontade durante todo o ensaio. O resultado superou todas as nossas expectativas.',
    rating: 5
  },
  {
    id: '3',
    client_name: 'Clara & Lucas',
    content: 'A qualidade das fotos é impressionante. Valdigley tem um olhar artístico excepcional e entrega um trabalho impecável.',
    rating: 5
  }
]

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .order('created_at', { ascending: false })

        if (!error && data && data.length > 0) {
          setTestimonials(data)
        } else {
          setTestimonials(mockTestimonials)
        }
      } catch (error) {
        setTestimonials(mockTestimonials)
      }
    }

    fetchTestimonials()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (testimonials.length === 0) return null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Depoimentos</h2>
        <p className="text-gray-600 text-center mb-16">O que nossos clientes dizem</p>

        <div className="relative">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="flex justify-center mb-6">
              {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                <Star key={i} className="h-6 w-6 text-amber-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-lg md:text-xl text-gray-700 text-center mb-6 leading-relaxed">
              "{testimonials[currentIndex].content}"
            </blockquote>
            
            <cite className="text-center block font-semibold text-gray-900">
              {testimonials[currentIndex].client_name}
            </cite>
          </div>

          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-shadow"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-shadow"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {testimonials.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-amber-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}