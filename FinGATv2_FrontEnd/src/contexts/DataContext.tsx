import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient } from '@/lib/api'
import type { Stock, Sector, Prediction } from '@/types'

interface DataContextType {
  stocks: Stock[]
  sectors: Sector[]
  predictions: Prediction[]
  isLoading: boolean
  lastUpdated: Date | null
  refreshData: () => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [stocks, setStocks] = useState<Stock[]>(() => {
    // Load from sessionStorage immediately
    const cached = sessionStorage.getItem('stocks')
    return cached ? JSON.parse(cached) : []
  })
  
  const [sectors, setSectors] = useState<Sector[]>(() => {
    const cached = sessionStorage.getItem('sectors')
    return cached ? JSON.parse(cached) : []
  })
  
  const [predictions, setPredictions] = useState<Prediction[]>(() => {
    const cached = sessionStorage.getItem('predictions')
    return cached ? JSON.parse(cached) : []
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(() => {
    const cached = sessionStorage.getItem('dataLastUpdated')
    return cached ? new Date(cached) : null
  })

  const refreshData = async () => {
    try {
      setIsLoading(true)
      console.log('[DataContext] Loading data...')
      
      // Load all data in parallel for maximum speed
      const [stocksData, sectorsData, predictionsData] = await Promise.all([
        apiClient.getStocks(500),
        apiClient.getSectors(),
        apiClient.getTopKPredictions(20)  // Load 20 predictions (fast!)
      ])
      
      console.log('[DataContext] Loaded:', {
        stocks: stocksData.length,
        sectors: sectorsData.length,
        predictions: predictionsData.length
      })
      
      // Update state
      setStocks(stocksData)
      setSectors(sectorsData)
      setPredictions(predictionsData)
      setLastUpdated(new Date())
      
      // Cache in sessionStorage for instant loading
      sessionStorage.setItem('stocks', JSON.stringify(stocksData))
      sessionStorage.setItem('sectors', JSON.stringify(sectorsData))
      sessionStorage.setItem('predictions', JSON.stringify(predictionsData))
      sessionStorage.setItem('dataLastUpdated', new Date().toISOString())
      
      console.log('[DataContext] Data cached successfully')
      
    } catch (error) {
      console.error('[DataContext] Failed to refresh data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Load data on mount only if not cached or cache is old (> 5 minutes)
  useEffect(() => {
    const loadInitialData = async () => {
      const lastUpdatedStr = sessionStorage.getItem('dataLastUpdated')
      const now = new Date()
      
      console.log('[DataContext] Mount check:', {
        stocksCount: stocks.length,
        predictionsCount: predictions.length,
        lastUpdated: lastUpdatedStr
      })
      
      // Always load if no stocks
      if (stocks.length === 0) {
        console.log('[DataContext] No stocks, loading data...')
        await refreshData()
        return
      }
      
      // Check if cache is old
      if (lastUpdatedStr) {
        const lastUpdatedDate = new Date(lastUpdatedStr)
        const timeSinceUpdate = now.getTime() - lastUpdatedDate.getTime()
        
        // Only refresh if more than 5 minutes old
        if (timeSinceUpdate > 5 * 60 * 1000) {
          console.log('[DataContext] Cache expired, refreshing...')
          await refreshData()
        } else {
          console.log('[DataContext] Using cached data')
        }
      }
    }
    
    loadInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DataContext.Provider value={{ 
      stocks, 
      sectors, 
      predictions, 
      isLoading, 
      lastUpdated, 
      refreshData 
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
