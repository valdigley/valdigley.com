import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ContactSubmission {
  name: string
  email?: string
  phone: string
  event_type?: string
  event_date?: string
  location?: string
  message?: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { submission }: { submission: ContactSubmission } = await req.json()

    // Formatear mensagem para WhatsApp
    const whatsappMessage = `🎉 *NOVA OPORTUNIDADE DE NEGÓCIO!*

👤 *Cliente:* ${submission.name}
📧 *Email:* ${submission.email || 'Não informado'}
📱 *WhatsApp:* ${submission.phone}

📅 *Tipo de Evento:* ${submission.event_type || 'Não especificado'}
📍 *Local:* ${submission.location || 'Não informado'}
🗓️ *Data do Evento:* ${submission.event_date ? new Date(submission.event_date).toLocaleDateString('pt-BR') : 'Não informada'}

💬 *Mensagem:*
${submission.message || 'Nenhuma mensagem adicional'}

---
⏰ Recebido em: ${new Date().toLocaleString('pt-BR')}

*Responda rapidamente para não perder esta oportunidade!* 🚀`

    // Número do WhatsApp do fotógrafo (substitua pelo seu número)
    const photographerWhatsApp = '5585999999999' // Formato: código do país + DDD + número
    
    // URL para enviar mensagem via WhatsApp Web API
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${photographerWhatsApp}&text=${encodeURIComponent(whatsappMessage)}`

    // Em um cenário real, você poderia usar uma API do WhatsApp Business
    // Por enquanto, retornamos a URL para que o sistema possa redirecionar
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        whatsappUrl,
        message: 'Notificação preparada com sucesso' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Erro ao processar notificação:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Erro interno do servidor' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})