import { TrendingUp, TrendingDown, Activity, Database, Brain, RefreshCw, Sparkles, BarChart3, Target, Zap, Award, Clock } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useModel } from '@/contexts/ModelContext'
import { useData } from '@/contexts/DataContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatScore } from '@/lib/utils'

export default function Dashboard() {
  const { predictions, isLoading: loading, refreshData } = useData()
  const { theme } = useTheme()
  const { isModelLoaded, isChecking } = useModel()
  
  // Get top 5 predictions for dashboard
  const topPredictions = predictions.slice(0, 5)

  const handleRefresh = async () => {
    await refreshData()
  }

  const upMovements = predictions.filter(p => p.predicted_movement === 'up').length
  const downMovements = predictions.filter(p => p.predicted_movement === 'down').length

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 glass-effect animate-fade-in">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse-slow" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg animate-float">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                FinGAT Dashboard
              </h1>
            </div>
            <p className={`text-lg max-w-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              🚀 AI-powered stock predictions for Indian markets using Graph Attention Networks
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Badge className="bg-green-100 text-green-700 border-green-300 px-3 py-1">
                <Activity className="h-3 w-3 mr-1" />
                Live Predictions
              </Badge>
              <Badge className="bg-blue-100 text-blue-700 border-blue-300 px-3 py-1">
                <Brain className="h-3 w-3 mr-1" />
                GATv2 Model
              </Badge>
            </div>
          </div>
          <Button 
            onClick={handleRefresh} 
            disabled={loading} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover-lift"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-slide-up">
        <Card className="glass-effect border-white/40 hover-lift overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Model Status</CardTitle>
            <div className="p-2 rounded-lg bg-green-100">
              <Activity className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {isModelLoaded ? (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-1.5 text-base">✓ Ready</Badge>
              ) : isChecking ? (
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-0 px-4 py-1.5 text-base">⏳ Checking...</Badge>
              ) : (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 px-4 py-1.5 text-base">✗ Not Ready</Badge>
              )}
            </div>
            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              {isModelLoaded ? 'Model loaded and cached' : isChecking ? 'Checking model status...' : 'Model not available'}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/40 hover-lift overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Bullish Signals</CardTitle>
            <div className="p-2 rounded-lg bg-green-100">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 bg-clip-text text-transparent">
              {upMovements}
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Stocks predicted to rise
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/40 hover-lift overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Bearish Signals</CardTitle>
            <div className="p-2 rounded-lg bg-red-100">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display bg-gradient-to-r from-rose-500 via-red-600 to-orange-600 bg-clip-text text-transparent">
              {downMovements}
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <Target className="h-3 w-3" />
              Stocks predicted to fall
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/40 hover-lift overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Stocks</CardTitle>
            <div className="p-2 rounded-lg bg-blue-100">
              <Database className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              147+
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              NSE/BSE markets
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Predictions */}
      <Card className="glass-effect border-white/40 animate-scale-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3 text-2xl font-display bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                  <Award className="h-6 w-6 text-white" />
                </div>
                Top 5 AI Predictions
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Highest confidence predictions from the GATv2 model
              </CardDescription>
            </div>
            <Badge className="bg-purple-100 text-purple-700 border-purple-300 px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              Updated Now
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
              <p className="text-gray-600 mt-4">Loading predictions...</p>
            </div>
          ) : predictions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No predictions available</div>
          ) : (
            <div className="space-y-3">
              {topPredictions.map((pred, index) => (
                <div
                  key={pred.ticker}
                  className="flex items-center justify-between p-5 rounded-2xl glass-effect border-white/40 hover-lift group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg shadow-lg">
                        {pred.rank}
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white animate-pulse" />
                    </div>
                    <div>
                      <div className={`font-bold text-xl ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>{pred.ticker}</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{pred.company_name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Badge className={theme === 'dark' ? 'bg-blue-900/50 text-blue-300 border-blue-700/50 px-3 py-1.5' : 'bg-blue-100 text-blue-700 border-blue-300 px-3 py-1.5'}>{pred.sector}</Badge>
                    <div className="text-right">
                      <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Confidence Score</div>
                      <div className="text-2xl font-display bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {formatScore(pred.ranking_score)}
                      </div>
                      <Badge
                        className={pred.predicted_movement === 'up' 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 mt-2' 
                          : 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 mt-2'}
                      >
                        {pred.predicted_movement === 'up' ? (
                          <><TrendingUp className="h-3 w-3 mr-1" /> Bullish</>
                        ) : (
                          <><TrendingDown className="h-3 w-3 mr-1" /> Bearish</>
                        )}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glass-effect border-white/40 hover-lift">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <CardTitle className={`text-lg ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                About FinGAT
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className={`font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>End-to-end AI stock prediction system:</p>
            <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Analyzes 147+ Indian stocks from NSE/BSE</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Graph Neural Networks (GATv2)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Sector-aware architecture</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>RL-based feature selection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>52-60% accuracy with leak-free pipeline</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/40 hover-lift">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <CardTitle className={`text-lg ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                Model Architecture
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className={`flex justify-between items-center p-2 rounded-lg ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Architecture:</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>GATv2 + Hierarchy</span>
            </div>
            <div className={`flex justify-between items-center p-2 rounded-lg ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Training:</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>RL-Optimized</span>
            </div>
            <div className={`flex justify-between items-center p-2 rounded-lg ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Pipeline:</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Leak-Free</span>
            </div>
            <div className={`flex justify-between items-center p-2 rounded-lg ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Updates:</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Daily</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/40 hover-lift">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-600">
                <Target className="h-5 w-5 text-white" />
              </div>
              <CardTitle className={`text-lg ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
                Key Features
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-700/50' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'}`}>
              <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>Real-time Predictions</div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Live market analysis</div>
            </div>
            <div className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-700/50' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'}`}>
              <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>Sector Analysis</div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Industry-specific insights</div>
            </div>
            <div className={`p-3 rounded-lg border ${theme === 'dark' ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-700/50' : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'}`}>
              <div className={`font-semibold mb-1 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>Confidence Scores</div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Probability-based ranking</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
