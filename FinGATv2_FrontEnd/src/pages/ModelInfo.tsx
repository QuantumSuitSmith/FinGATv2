import { useEffect, useState } from 'react'
import { Brain, Activity, RefreshCw, Zap, Cpu, Network, Layers, TrendingUp, Shield, Clock, Database, Code } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { apiClient } from '@/lib/api'
import type { ModelInfo, ModelStatus } from '@/types'
import { formatDateTime, formatPercent } from '@/lib/utils'

export default function ModelInfo() {
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null)
  const [modelStatus, setModelStatus] = useState<ModelStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [retraining, setRetraining] = useState(false)
  const [reloadingFeatures, setReloadingFeatures] = useState(false)
  const { theme } = useTheme()

  const loadData = async () => {
    try {
      setLoading(true)
      const [info, status] = await Promise.all([
        apiClient.getModelInfo(),
        apiClient.getModelStatus(),
      ])
      setModelInfo(info)
      setModelStatus(status)
    } catch (error) {
      console.error('Failed to load model info:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRetrain = async () => {
    try {
      setRetraining(true)
      await apiClient.retrain()
      await loadData()
    } catch (error) {
      console.error('Failed to retrain model:', error)
    } finally {
      setRetraining(false)
    }
  }

  const handleReloadFeatures = async () => {
    try {
      setReloadingFeatures(true)
      await apiClient.reloadFeatures()
      await loadData()
    } catch (error) {
      console.error('Failed to reload features:', error)
    } finally {
      setReloadingFeatures(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="min-h-screen pb-12">
      {/* Unique Hero Header */}
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-teal-600/10 blur-3xl" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 blur-xl opacity-50 animate-pulse" />
                <div className="relative p-5 rounded-3xl bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 shadow-2xl">
                  <Brain className="h-12 w-12 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-6xl font-display font-black bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                  Model Intelligence
                </h1>
                <p className={`text-lg mt-2 flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Network className="h-5 w-5" />
                  GATv2 Graph Neural Network • 147+ Stocks
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={handleReloadFeatures} 
                disabled={reloadingFeatures}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-6 text-base"
              >
                <Zap className={`mr-2 h-5 w-5 ${reloadingFeatures ? 'animate-spin' : ''}`} />
                Reload Features
              </Button>
              <Button 
                onClick={handleRetrain} 
                disabled={retraining}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-6 text-base"
              >
                <RefreshCw className={`mr-2 h-5 w-5 ${retraining ? 'animate-spin' : ''}`} />
                Retrain Model
              </Button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Loading model information...</div>
      ) : (
        <>
          {/* Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Model Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Current Status</div>
                  <div className="mt-2">
                    {modelStatus?.status === 'ready' ? (
                      <Badge variant="success" className="text-base px-4 py-1">Ready</Badge>
                    ) : modelStatus?.status === 'training' ? (
                      <Badge variant="warning" className="text-base px-4 py-1">Training</Badge>
                    ) : (
                      <Badge variant="destructive" className="text-base px-4 py-1">Error</Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Last Prediction</div>
                  <div className="text-lg font-semibold mt-2">
                    {modelStatus?.last_prediction ? formatDateTime(modelStatus.last_prediction) : 'N/A'}
                  </div>
                </div>
              </div>
              {modelStatus?.message && (
                <div className="mt-4 p-3 rounded-md bg-muted">
                  <p className="text-sm">{modelStatus.message}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Model Details */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Model Configuration
                </CardTitle>
                <CardDescription>Core model parameters and architecture</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground">Model Name</span>
                  <span className="font-medium">{modelInfo?.model_name || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground">Version</span>
                  <span className="font-medium">{modelInfo?.version || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground">Architecture</span>
                  <span className="font-medium">{modelInfo?.architecture || 'GATv2'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground">Features Count</span>
                  <span className="font-medium">{modelInfo?.features_count || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Total Stocks</span>
                  <span className="font-medium">{modelInfo?.total_stocks || '147+'}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Model accuracy and training information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground">Accuracy</span>
                  <span className="font-medium text-lg">
                    {modelInfo?.accuracy ? formatPercent(modelInfo.accuracy) : '52-60%'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground">Last Trained</span>
                  <span className="font-medium">
                    {modelInfo?.last_trained ? formatDateTime(modelInfo.last_trained) : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground">Training Method</span>
                  <span className="font-medium">RL-Optimized</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Data Engineering</span>
                  <Badge variant="success">Leak-Free</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Architecture</CardTitle>
              <CardDescription>Detailed information about the model architecture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Data Pipeline</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Leak-free data engineering</li>
                    <li>• 147+ Indian stocks (NSE/BSE)</li>
                    <li>• OHLC data with technical indicators</li>
                    <li>• Daily data updates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Model Architecture</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Graph Attention Networks v2 (GATv2)</li>
                    <li>• Sector-aware hierarchical structure</li>
                    <li>• Multi-head attention mechanism</li>
                    <li>• PyTorch Lightning implementation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Training Details</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• RL-based feature selection</li>
                    <li>• Hybrid training approach</li>
                    <li>• Automated daily retraining</li>
                    <li>• Cross-validation for robustness</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">API Performance</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• FastAPI backend</li>
                    <li>• Real-time predictions</li>
                    <li>• RESTful API endpoints</li>
                    <li>• Automatic documentation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
