import { Camera, Award, Users, Heart, Star, MapPin } from 'lucide-react'

export function About() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-8">
            <img
              src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop"
              alt="Valdigley - Fotógrafo de Casamentos"
              className="w-40 h-40 rounded-full object-cover border-4 border-amber-600 shadow-xl"
            />
            <Camera className="absolute -bottom-2 -right-2 h-10 w-10 bg-amber-600 text-white p-2 rounded-full shadow-lg" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Olá, eu sou o <span className="text-amber-600">Valdigley</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Há mais de 10 anos capturando os momentos mais especiais e únicos da vida. 
            Especialista em casamentos e pré-weddings nas belas paisagens do Ceará.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="order-2 lg:order-1">
            <img
              src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
              alt="Valdigley trabalhando"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold mb-6">Minha História</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Tudo começou com uma paixão pela fotografia e o desejo de eternizar momentos únicos. 
                Desde criança, sempre fui fascinado pela capacidade das imagens de contar histórias 
                e despertar emoções.
              </p>
              <p>
                Em 2013, decidi transformar essa paixão em profissão. Comecei fotografando amigos 
                e família, mas logo percebi que minha verdadeira vocação estava em capturar o amor 
                em sua forma mais pura: os casamentos.
              </p>
              <p>
                Hoje, depois de mais de 500 casamentos fotografados, posso dizer que cada cerimônia 
                ainda me emociona como se fosse a primeira. Não é apenas sobre tirar fotos, é sobre 
                preservar memórias que durarão para sempre.
              </p>
            </div>
          </div>
        </div>

        {/* Numbers */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Alguns Números</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">500+</div>
              <div className="text-gray-600">Casamentos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">200+</div>
              <div className="text-gray-600">Pré Weddings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">10+</div>
              <div className="text-gray-600">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">100%</div>
              <div className="text-gray-600">Satisfação</div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Meus Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <Heart className="h-12 w-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Autenticidade</h3>
              <p className="text-gray-600">
                Acredito que os melhores momentos são os espontâneos. 
                Busco capturar a essência real de cada casal.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <Star className="h-12 w-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Excelência</h3>
              <p className="text-gray-600">
                Cada projeto recebe minha dedicação total. 
                Não aceito nada menos que a perfeição.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <Users className="h-12 w-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Relacionamento</h3>
              <p className="text-gray-600">
                Construo uma relação de confiança com cada casal. 
                Vocês não são apenas clientes, são amigos.
              </p>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Onde Atuo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/4439444/pexels-photo-4439444.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop"
                alt="Jericoacoara"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Jericoacoara</h3>
              <p className="text-gray-600">
                O paraíso das dunas e do pôr do sol mais famoso do Brasil
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop"
                alt="Fortaleza"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Fortaleza</h3>
              <p className="text-gray-600">
                A capital cearense com suas belas praias urbanas
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop"
                alt="Sobral"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Sobral</h3>
              <p className="text-gray-600">
                Cidade histórica com arquitetura colonial encantadora
              </p>
            </div>
          </div>
        </div>

        {/* Awards */}
        <div className="bg-amber-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-center mb-12">Reconhecimentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center space-x-4">
              <Award className="h-8 w-8 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold">Top 10 Fotógrafos do Ceará</h4>
                <p className="text-gray-600">Revista Casamento Perfeito - 2023</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Award className="h-8 w-8 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold">Melhor Fotógrafo de Jericoacoara</h4>
                <p className="text-gray-600">Wedding Awards Ceará - 2022</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Award className="h-8 w-8 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold">Destaque em Pré Wedding</h4>
                <p className="text-gray-600">Concurso Nacional de Fotografia - 2021</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Award className="h-8 w-8 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="font-bold">Fotógrafo Referência</h4>
                <p className="text-gray-600">Associação de Fotógrafos do Nordeste - 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}