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
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single()

      if (!error && data) {
        const mappedSettings: SiteSettings = {
          site_title: data.site_title || data.studio_name || defaultSettings.site_title,
          site_description: data.site_description || defaultSettings.site_description,
          contact_email: data.contact_email || defaultSettings.contact_email,
          contact_phone: data.studio_phone || defaultSettings.contact_phone,
          contact_address: data.studio_address || defaultSettings.contact_address,
          instagram_url: data.instagram_url || defaultSettings.instagram_url,
          logo_url: data.studio_logo_url || '',
          hero_images: data.hero_images ? (Array.isArray(data.hero_images) ? data.hero_images : JSON.parse(data.hero_images)) : defaultSettings.hero_images,
          seo_keywords: data.seo_keywords || defaultSettings.seo_keywords,
          google_reviews_enabled: data.google_reviews_enabled || false,
          google_places_api_key: data.google_places_api_key || '',
          google_place_id: data.google_place_id || ''
        }
        setSettings(mappedSettings)
        
        // Atualizar SEO dinamicamente
        if (typeof window !== 'undefined' && window.updateSEO) {
          window.updateSEO(mappedSettings)
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
    setLoading(false)
  }

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    try {
      const dbSettings = {
        site_title: newSettings.site_title,
        site_description: newSettings.site_description,
        contact_email: newSettings.contact_email,
        instagram_url: newSettings.instagram_url,
        seo_keywords: newSettings.seo_keywords,
        hero_images: newSettings.hero_images ? JSON.stringify(newSettings.hero_images) : undefined,
        studio_name: newSettings.site_title, // Manter compatibilidade
        studio_phone: newSettings.contact_phone,
        studio_address: newSettings.contact_address,
        studio_logo_url: newSettings.logo_url,
        google_reviews_enabled: newSettings.google_reviews_enabled,
        google_places_api_key: newSettings.google_places_api_key,
        google_place_id: newSettings.google_place_id
      }

      // Remover campos undefined
      Object.keys(dbSettings).forEach(key => {
        if (dbSettings[key] === undefined) {
          delete dbSettings[key]
        }
      })
      const { error } = await supabase
        .from('settings')
        .upsert(dbSettings)

      if (!error) {
        setSettings(prev => ({ ...prev, ...newSettings }))
        return true
      }
    } catch (error) {
      console.error('Error updating settings:', error)
    }
    return false
  }

  return {
    settings,
    loading,
    updateSettings,
    refetch: fetchSettings
  }
}