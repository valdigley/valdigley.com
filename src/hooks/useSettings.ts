import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface SiteSettings {
  site_title: string
  site_description: string
  contact_email: string
  contact_phone: string
  contact_address: string
  instagram_url: string
  logo_url: string
  hero_images: string[]
  seo_keywords: string
  google_reviews_enabled: boolean
  google_places_api_key: string
  google_place_id: string
}

const defaultSettings: SiteSettings = {
  site_title: 'Valdigley Fotografia',
  site_description: 'Fotógrafo especializado em casamentos e pré-weddings em Jericoacoara, Sobral e Fortaleza',
  contact_email: 'contato@valdigley.com',
  contact_phone: '+55 85 99999-9999',
  contact_address: 'Fortaleza, Ceará - Atendemos Jericoacoara, Sobral e região',
  instagram_url: 'https://instagram.com/valdigleyfoto',
  logo_url: '',
  hero_images: [
    'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg',
    'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg',
    'https://images.pexels.com/photos/265885/pexels-photo-265885.jpeg'
  ],
  seo_keywords: 'fotografia casamento, Jericoacoara, Sobral, Fortaleza, pré wedding, ensaio casal',
  google_reviews_enabled: false,
  google_places_api_key: '',
  google_place_id: ''
}

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      // Buscar dados da tabela business_info primeiro
      const { data: businessData, error: businessError } = await supabase
        .from('business_info')
        .select('*')
        .single()

      // Buscar dados da tabela settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('settings')
        .select('*')
        .single()

      if (!businessError && businessData) {
        const mappedSettings: SiteSettings = {
          // Dados da business_info
          site_title: businessData.name || defaultSettings.site_title,
          contact_email: businessData.email || defaultSettings.contact_email,
          contact_phone: businessData.whatsapp || defaultSettings.contact_phone,
          contact_address: businessData.address ? 
            `${businessData.address}, ${businessData.city} - ${businessData.state}, ${businessData.zip_code}` : 
            defaultSettings.contact_address,
          instagram_url: businessData.instagram || defaultSettings.instagram_url,
          
          // Dados da settings (se existir)
          site_description: settingsData?.site_description || defaultSettings.site_description,
          logo_url: settingsData?.studio_logo_url || '',
          hero_images: settingsData?.hero_images ? 
            (Array.isArray(settingsData.hero_images) ? settingsData.hero_images : JSON.parse(settingsData.hero_images)) : 
            defaultSettings.hero_images,
          seo_keywords: settingsData?.seo_keywords || defaultSettings.seo_keywords,
          google_reviews_enabled: settingsData?.google_reviews_enabled || false,
          google_places_api_key: settingsData?.google_places_api_key || '',
          google_place_id: settingsData?.google_place_id || ''
        }
        setSettings(mappedSettings)
        
        // Atualizar SEO dinamicamente
        if (typeof window !== 'undefined' && window.updateSEO) {
          window.updateSEO(mappedSettings)
        }
      } else {
        // Se não houver dados na business_info, usar dados padrão
        setSettings(defaultSettings)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      setSettings(defaultSettings)
    }
    setLoading(false)
  }

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    try {
      // Atualizar business_info
      if (newSettings.site_title || newSettings.contact_email || newSettings.contact_phone || newSettings.instagram_url) {
        const businessUpdate = {
          name: newSettings.site_title,
          email: newSettings.contact_email,
          whatsapp: newSettings.contact_phone,
          instagram: newSettings.instagram_url
        }

        // Remover campos undefined
        Object.keys(businessUpdate).forEach(key => {
          if (businessUpdate[key] === undefined) {
            delete businessUpdate[key]
          }
        })

        if (Object.keys(businessUpdate).length > 0) {
          const { error: businessError } = await supabase
            .from('business_info')
            .upsert(businessUpdate)

          if (businessError) {
            throw businessError
          }
        }
      }

      // Atualizar settings
      if (newSettings.site_description || newSettings.logo_url || newSettings.hero_images || 
          newSettings.seo_keywords || newSettings.google_reviews_enabled !== undefined ||
          newSettings.google_places_api_key || newSettings.google_place_id) {
        
        const settingsUpdate = {
          site_description: newSettings.site_description,
          studio_logo_url: newSettings.logo_url,
          hero_images: newSettings.hero_images ? JSON.stringify(newSettings.hero_images) : undefined,
          seo_keywords: newSettings.seo_keywords,
          google_reviews_enabled: newSettings.google_reviews_enabled,
          google_places_api_key: newSettings.google_places_api_key,
          google_place_id: newSettings.google_place_id
        }

        // Remover campos undefined
        Object.keys(settingsUpdate).forEach(key => {
          if (settingsUpdate[key] === undefined) {
            delete settingsUpdate[key]
          }
        })

        if (Object.keys(settingsUpdate).length > 0) {
          const { error: settingsError } = await supabase
            .from('settings')
            .upsert(settingsUpdate)

          if (settingsError) {
            throw settingsError
          }
        }
      }

      setSettings(prev => ({ ...prev, ...newSettings }))
      return true
    } catch (error) {
      console.error('Error updating settings:', error)
      return false
    }
  }

  return {
    settings,
    loading,
    updateSettings,
    refetch: fetchSettings
  }
}