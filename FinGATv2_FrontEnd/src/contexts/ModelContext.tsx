import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient } from '@/lib/api'

interface ModelContextType {
  isModelLoaded: boolean
  isChecking: boolean
  lastChecked: Date | null
  checkModelStatus: () => Promise<void>
}

const ModelContext = createContext<ModelContextType | undefined>(undefined)

export function ModelProvider({ children }: { children: ReactNode }) {
  const [isModelLoaded, setIsModelLoaded] = useState<boolean>(() => {
    // Try to get from sessionStorage (persists during browser session)
    const cached = sessionStorage.getItem('modelLoaded')
    // Default to true if no cache (optimistic)
    return cached === null ? true : cached === 'true'
  })
  const [isChecking, setIsChecking] = useState(false)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const checkModelStatus = async () => {
    try {
      setIsChecking(true)
      const health = await apiClient.getHealth()
      const loaded = health.status === 'healthy'
      setIsModelLoaded(loaded)
      setLastChecked(new Date())
      
      // Cache in sessionStorage (cleared when browser closes)
      sessionStorage.setItem('modelLoaded', loaded.toString())
      sessionStorage.setItem('modelLastChecked', new Date().toISOString())
    } catch (error) {
      console.error('Failed to check model status:', error)
      // Don't set to false on error - keep previous state
      // This prevents showing "not loaded" when there's just a network hiccup
    } finally {
      setIsChecking(false)
    }
  }

  // Check model status on mount (only if not recently checked)
  useEffect(() => {
    const lastCheckedStr = sessionStorage.getItem('modelLastChecked')
    const cachedStatus = sessionStorage.getItem('modelLoaded')
    const now = new Date()
    
    // If we have a cached status, use it immediately
    if (cachedStatus === 'true') {
      setIsModelLoaded(true)
      
      // Only re-check if more than 30 minutes since last check
      if (lastCheckedStr) {
        const lastCheckedDate = new Date(lastCheckedStr)
        const timeSinceCheck = now.getTime() - lastCheckedDate.getTime()
        
        if (timeSinceCheck > 30 * 60 * 1000) {
          checkModelStatus()
        } else {
          setLastChecked(lastCheckedDate)
        }
      }
    } else {
      // No cached status - check immediately
      checkModelStatus()
    }
  }, [])

  return (
    <ModelContext.Provider value={{ isModelLoaded, isChecking, lastChecked, checkModelStatus }}>
      {children}
    </ModelContext.Provider>
  )
}

export function useModel() {
  const context = useContext(ModelContext)
  if (context === undefined) {
    throw new Error('useModel must be used within a ModelProvider')
  }
  return context
}
