import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}

interface GoogleReview {
  author_name: string
  author_url?: string
  language: string
  profile_photo_url?: string
  rating: number
  relative_time_description: string
  text: string
  time: number
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Buscar configurações do Google
    const { data: settings, error: settingsError } = await supabaseClient
      .from('settings')
      .select('google_places_api_key, google_place_id')
      .single()

    if (settingsError || !settings?.google_places_api_key || !settings?.google_place_id) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Configurações do Google não encontradas' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Buscar reviews do Google Places API
    const googleApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${settings.google_place_id}&fields=reviews&key=${settings.google_places_api_key}`
    
    const googleResponse = await fetch(googleApiUrl)
    const googleData = await googleResponse.json()

    if (googleData.status !== 'OK') {
      throw new Error(`Google API Error: ${googleData.status}`)
    }

    const reviews: GoogleReview[] = googleData.result?.reviews || []

    // Processar e salvar reviews no Supabase
    const processedReviews = reviews
      .filter(review => review.rating >= 4) // Apenas reviews 4+ estrelas
      .map(review => ({
        client_name: review.author_name,
        content: review.text,
        rating: review.rating,
        is_featured: review.rating === 5, // 5 estrelas são featured
        google_review_id: `${review.author_name}_${review.time}`,
        google_data: {
          author_url: review.author_url,
          profile_photo_url: review.profile_photo_url,
          relative_time: review.relative_time_description,
          language: review.language,
          timestamp: review.time
        }
      }))

    // Inserir/atualizar reviews no banco
    for (const review of processedReviews) {
      const { error } = await supabaseClient
        .from('testimonials')
        .upsert(
          review,
          { 
            onConflict: 'google_review_id',
            ignoreDuplicates: false 
          }
        )

      if (error) {
        console.error('Erro ao salvar review:', error)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        imported: processedReviews.length,
        message: `${processedReviews.length} depoimentos importados com sucesso` 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Erro ao buscar reviews:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Erro interno do servidor' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})