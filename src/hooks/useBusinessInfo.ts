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
  created_at: string
  updated_at: string
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
  created_at: '',
  updated_at: ''
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
        .single()

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
      const { error } = await supabase
        .from('business_info')
        .upsert({
          ...businessInfo,
          ...newInfo,
          updated_at: new Date().toISOString()
        })

      if (!error) {
        setBusinessInfo(prev => ({ ...prev, ...newInfo }))
        return true
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