import { Link } from 'react-router-dom'
import { MessageCircle, Calendar, Heart } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700">
      <div className="max-w-4xl mx-auto px-4 text-center text-white">
        <Heart className="h-16 w-16 mx-auto mb-6 animate-pulse" />
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Pronto para Eternizar Seu Amor?
        </h2>
        <p className="text-xl mb-12 opacity-90 leading-relaxed">
          Seu grande dia merece ser capturado com todo carinho e profissionalismo. 
          Vamos conversar sobre como posso ajudar a contar sua história de amor.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5585999999999?text=Olá! Gostaria de um orçamento para fotografia de casamento"
            target="_blank"
            className="inline-flex items-center justify-center bg-white text-amber-600 font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors text-lg"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Chamar no WhatsApp
          </a>
          <Link
            to="/contato"
            className="inline-flex items-center justify-center border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-amber-600 transition-colors text-lg"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Solicitar Orçamento
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold mb-2">Resposta Rápida</div>
            <div className="opacity-75">Retornamos em até 24h</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">Orçamento Grátis</div>
            <div className="opacity-75">Sem compromisso</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">Flexibilidade</div>
            <div className="opacity-75">Pacotes personalizados</div>
          </div>
        </div>
      </div>
    </section>
  )
}