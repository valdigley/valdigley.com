import { useState, useEffect } from 'react'
import { Mail, Phone, Calendar, MapPin, MessageSquare, Eye, Trash2, CheckCircle, Clock } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  event_type: string
  event_date: string
  location: string
  message: string
  status: 'new' | 'contacted' | 'converted' | 'lost'
  created_at: string
  updated_at: string
}

export function ContactSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setSubmissions(data)
      } else {
        // Mock data para demonstração
        setSubmissions([
          {
            id: '1',
            name: 'Ana Silva',
            email: 'ana@email.com',
            phone: '85999999999',
            event_type: 'casamento',
            event_date: '2024-06-15',
            location: 'Jericoacoara, CE',
            message: 'Gostaria de um orçamento para casamento na praia',
            status: 'new',
            created_at: '2024-01-15T10:30:00Z',
            updated_at: '2024-01-15T10:30:00Z'
          }
        ])
      }
    } catch (error) {
      console.error('Erro ao buscar submissões:', error)
      setSubmissions([])
    }
    setLoading(false)
  }

  const updateStatus = async (id: string, newStatus: ContactSubmission['status']) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (!error) {
        setSubmissions(prev => 
          prev.map(sub => 
            sub.id === id ? { ...sub, status: newStatus } : sub
          )
        )
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
    }
  }

  const deleteSubmission = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta submissão?')) {
      try {
        const { error } = await supabase
          .from('contact_submissions')
          .delete()
          .eq('id', id)

        if (!error) {
          setSubmissions(prev => prev.filter(sub => sub.id !== id))
        }
      } catch (error) {
        console.error('Erro ao excluir submissão:', error)
      }
    }
  }

  const openWhatsApp = (phone: string, name: string) => {
    const message = `Olá ${name}! Recebi sua mensagem através do site e gostaria de conversar sobre seu evento. Quando podemos falar?`
    const whatsappUrl = `https://wa.me/55${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const filteredSubmissions = submissions.filter(sub => 
    !statusFilter || sub.status === statusFilter
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'contacted': return 'bg-yellow-100 text-yellow-800'
      case 'converted': return 'bg-green-100 text-green-800'
      case 'lost': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Novo'
      case 'contacted': return 'Contatado'
      case 'converted': return 'Convertido'
      case 'lost': return 'Perdido'
      default: return status
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Oportunidades de Contato</h1>
        <p className="text-gray-600">Gerencie os contatos recebidos através do formulário</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-2xl font-bold text-blue-600">
            {submissions.filter(s => s.status === 'new').length}
          </div>
          <div className="text-sm text-gray-600">Novos</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-2xl font-bold text-yellow-600">
            {submissions.filter(s => s.status === 'contacted').length}
          </div>
          <div className="text-sm text-gray-600">Contatados</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-2xl font-bold text-green-600">
            {submissions.filter(s => s.status === 'converted').length}
          </div>
          <div className="text-sm text-gray-600">Convertidos</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-2xl font-bold text-gray-600">
            {submissions.length}
          </div>
          <div className="text-sm text-gray-600">Total</div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent"
        >
          <option value="">Todos os status</option>
          <option value="new">Novos</option>
          <option value="contacted">Contatados</option>
          <option value="converted">Convertidos</option>
          <option value="lost">Perdidos</option>
        </select>
      </div>

      {/* Submissions List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSubmissions.map((submission) => (
          <div key={submission.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{submission.name}</h3>
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.status)}`}>
                  {getStatusLabel(submission.status)}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(submission.created_at).toLocaleDateString('pt-BR')}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {submission.email && (
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href={`mailto:${submission.email}`} className="hover:text-amber-600">
                    {submission.email}
                  </a>
                </div>
              )}
              
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <button 
                  onClick={() => openWhatsApp(submission.phone, submission.name)}
                  className="hover:text-amber-600"
                >
                  {submission.phone}
                </button>
              </div>

              {submission.event_type && (
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {submission.event_type}
                </div>
              )}

              {submission.location && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {submission.location}
                </div>
              )}

              {submission.event_date && (
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(submission.event_date).toLocaleDateString('pt-BR')}
                </div>
              )}
            </div>

            {submission.message && (
              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Mensagem:
                </div>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {submission.message}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <select
                  value={submission.status}
                  onChange={(e) => updateStatus(submission.id, e.target.value as ContactSubmission['status'])}
                  className="text-xs px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                >
                  <option value="new">Novo</option>
                  <option value="contacted">Contatado</option>
                  <option value="converted">Convertido</option>
                  <option value="lost">Perdido</option>
                </select>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => openWhatsApp(submission.phone, submission.name)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => deleteSubmission(submission.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma submissão encontrada
          </h3>
          <p className="text-gray-600">
            {statusFilter 
              ? 'Nenhuma submissão com este status.'
              : 'Aguardando primeiros contatos através do formulário.'
            }
          </p>
        </div>
      )}
    </div>
  )
}