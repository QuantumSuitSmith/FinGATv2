export interface Prediction {
  rank: number
  ticker: string
  company_name: string
  predicted_movement: 'up' | 'down'
  ranking_score: number
  sector: string
  confidence?: number
}

export interface Stock {
  ticker: string
  company_name: string
  sector: string
  current_price?: number
  change_percent?: number
}

export interface Sector {
  name: string
  stock_count: number
  stocks: string[]
}

export interface ModelInfo {
  model_name: string
  version: string
  accuracy: number
  last_trained: string
  total_stocks: number
  features_count: number
  architecture: string
}

export interface ModelStatus {
  status: 'ready' | 'training' | 'error'
  message: string
  last_prediction: string
}

export interface ApiResponse<T> {
  status: 'success' | 'error'
  data?: T
  message?: string
}
