import { useState } from 'react'
import { Phone, Mail, Instagram, MapPin, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useBusinessInfo } from '../../hooks/useBusinessInfo'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { businessInfo } = useBusinessInfo()

  const logoUrl = '' // Logo será configurado separadamente
  const siteTitle = businessInfo.name
  const contactEmail = businessInfo.email
  const contactPhone = businessInfo.whatsapp
  const contactAddress = `${businessInfo.address}, ${businessInfo.city} - ${businessInfo.state}, ${businessInfo.zip_code}`
  const instagramUrl = businessInfo.instagram

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt={siteTitle}
                  className="h-10 w-auto max-w-[200px] object-contain brightness-0 invert"
                />
              ) : (
                <span className="text-2xl font-bold">{siteTitle}</span>
              )}
            </Link>
            <p className="text-gray-400 dark:text-gray-500 mb-6 max-w-md">
              {settings.site_description}
            </p>
            <div className="flex space-x-4">
              <a 
                href={instagramUrl}
                target="_blank"
                className="bg-gray-800 dark:bg-gray-900 p-2 rounded-full hover:bg-amber-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href={`https://wa.me/${contactPhone.replace(/\D/g, '')}`}
                target="_blank"
                className="bg-gray-800 dark:bg-gray-900 p-2 rounded-full hover:bg-amber-600 transition-colors"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a 
                href={`mailto:${contactEmail}`}
                className="bg-gray-800 dark:bg-gray-900 p-2 rounded-full hover:bg-amber-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <nav className="space-y-2">
              <Link to="/" className="block text-gray-400 dark:text-gray-500 hover:text-white transition-colors">
                Início
              </Link>
              <Link to="/portfolio" className="block text-gray-400 dark:text-gray-500 hover:text-white transition-colors">
                Portfólio
              </Link>
              <Link to="/portfolio/casamento" className="block text-gray-400 dark:text-gray-500 hover:text-white transition-colors">
                Casamentos
              </Link>
              <Link to="/portfolio/pre-wedding" className="block text-gray-400 dark:text-gray-500 hover:text-white transition-colors">
                Pré Wedding
              </Link>
              <Link to="/sobre" className="block text-gray-400 dark:text-gray-500 hover:text-white transition-colors">
                Sobre
              </Link>
              <Link to="/contato" className="block text-gray-400 dark:text-gray-500 hover:text-white transition-colors">
                Contato
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-500">
                <Phone className="h-4 w-4" />
                <span>{contactPhone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-500">
                <Mail className="h-4 w-4" />
                <span>{contactEmail}</span>
              </div>
              <div className="flex items-start space-x-2 text-gray-400 dark:text-gray-500">
                <MapPin className="h-4 w-4 mt-0.5" />
                <div>
                  <div>{contactAddress}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 dark:border-gray-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} {siteTitle}. Todos os direitos reservados.
          </p>
          <p className="flex items-center text-gray-400 dark:text-gray-500 text-sm">
            Feito com <Heart className="h-4 w-4 text-red-500 mx-1" /> para eternizar momentos únicos
          </p>
        </div>
      </div>
    </footer>
  )
}