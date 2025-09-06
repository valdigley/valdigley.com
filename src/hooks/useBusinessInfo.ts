import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface BusinessInfo {
  id: string
  name: string
  address: string
  whatsapp: string
  email: string
  city: string
  state: string
  instagram: string
  document: string
  zip_code: string
  created_at: string | null
  updated_at: string | null
}

const defaultBusinessInfo: BusinessInfo = {
  id: '',
  name: 'Valdigley Fotografia',
  address: 'Rua das Flores, 123 - Centro',
  whatsapp: '+55 85 99999-9999',
  email: 'contato@valdigley.com',
  city: 'Fortaleza',
  state: 'CE',
  instagram: 'https://instagram.com/valdigleyfoto',
  document: '123.456.789-00',
  zip_code: '60000-000',
  created_at: null,
  updated_at: null
}

export function useBusinessInfo() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(defaultBusinessInfo)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBusinessInfo()
  }, [])

  const fetchBusinessInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('business_info')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (!error && data) {
        setBusinessInfo(data)
      }
    } catch (error) {
      console.error('Error fetching business info:', error)
    }
    setLoading(false)
  }

  const updateBusinessInfo = async (newInfo: Partial<BusinessInfo>) => {
    try {
      if (businessInfo.id && businessInfo.id !== '') {
        // Update existing record
        const { error } = await supabase
          .from('business_info')
          .update({
            ...newInfo,
            updated_at: new Date().toISOString()
          })
          .eq('id', businessInfo.id)

        if (!error) {
          setBusinessInfo(prev => ({ ...prev, ...newInfo }))
          return true
        }
      } else {
        // Insert new record
        const { data, error } = await supabase
          .from('business_info')
          .insert({
            ...businessInfo,
            ...newInfo,
            updated_at: new Date().toISOString()
          })
          .select()
          .single()

        if (!error && data) {
          setBusinessInfo(data)
          return true
        }
      }
    } catch (error) {
      console.error('Error updating business info:', error)
    }
    return false
  }

  return {
    businessInfo,
    loading,
    updateBusinessInfo,
    refetch: fetchBusinessInfo
  }
}