import { useState, useEffect } from 'react'

export function useResponsive() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)

    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  return { isMobile, isTablet }
}