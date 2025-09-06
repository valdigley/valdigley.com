import { HeroSection } from '../components/Home/HeroSection'
import { FeaturedProjects } from '../components/Home/FeaturedProjects'
import { TestimonialsSection } from '../components/Home/TestimonialsSection'
import { CTASection } from '../components/Home/CTASection'

export function Home() {
  return (
    <div className="pt-20">
      <HeroSection />
      <FeaturedProjects />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}