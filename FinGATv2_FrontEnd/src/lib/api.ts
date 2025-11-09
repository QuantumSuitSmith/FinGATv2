import axios, { AxiosError } from 'axios'
import type { Prediction, Stock, Sector, ModelInfo, ModelStatus } from '@/types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Create axios instance with optimized settings
const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    const startTime = Date.now()
    config.metadata = { startTime }
    console.log(`[API] → ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('[API] Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    const endTime = Date.now()
    const duration = endTime - (response.config.metadata?.startTime || endTime)
    console.log(`[API] ✓ ${response.config.method?.toUpperCase()} ${response.config.url} (${duration}ms)`)
    return response
  },
  async (error: AxiosError) => {
    const duration = Date.now() - (error.config?.metadata?.startTime || Date.now())
    console.error(`[API] ✗ ${error.config?.method?.toUpperCase()} ${error.config?.url} (${duration}ms)`, error.message)
    
    // Retry logic for network errors
    if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
      const config = error.config
      if (config && !config._retry) {
        config._retry = true
        console.log('[API] Retrying request...')
        return api.request(config)
      }
    }
    
    return Promise.reject(error)
  }
)

// Add TypeScript declarations for metadata
declare module 'axios' {
  export interface AxiosRequestConfig {
    metadata?: { startTime: number }
    _retry?: boolean
  }
}

export const apiClient = {
  // Predictions
  async getPredictions(): Promise<Prediction[]> {
    const { data } = await api.get('/predict/now')
    return data.predictions || []
  },

  async getTopKPredictions(k: number = 10): Promise<Prediction[]> {
    const { data } = await api.get(`/predict/top-k?k=${k}`)
    return data.predictions || []
  },

  async getSinglePrediction(ticker: string): Promise<any> {
    const { data } = await api.get(`/predict/single/${ticker}`)
    return data
  },

  // Model Management
  async getModelInfo(): Promise<ModelInfo> {
    const { data } = await api.get('/model/info')
    return data
  },

  async getModelStatus(): Promise<ModelStatus> {
    const { data } = await api.get('/model/status/simple')
    return data
  },

  async retrain(): Promise<{ status: string; message: string }> {
    const { data } = await api.post('/retrain')
    return data
  },

  async reloadFeatures(): Promise<{ status: string; message: string }> {
    const { data } = await api.post('/reload-features')
    return data
  },

  // Data & Sectors
  async getSectors(): Promise<Sector[]> {
    const { data } = await api.get('/sectors')
    return data.sectors || []
  },

  async getStocks(limit: number = 500): Promise<Stock[]> {
    const { data } = await api.get(`/stocks?limit=${limit}`)
    return data.stocks || []
  },

  // Health
  async getHealth(): Promise<{ status: string }> {
    const { data } = await api.get('/health')
    return data
  },
}

export default api
