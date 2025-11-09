import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Search, Award, Target, Zap, Sparkles, DollarSign, AlertCircle, Rocket, Star, RefreshCw } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useData } from '@/contexts/DataContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { apiClient } from '@/lib/api'
import { formatScore } from '@/lib/utils'

export default function Predictions() {
  const { predictions: cachedPredictions, isLoading, refreshData } = useData()
  const [k, setK] = useState(10)
  const [filter, setFilter] = useState<'all' | 'up' | 'down'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [singleTicker, setSingleTicker] = useState('')
  const [singlePrediction, setSinglePrediction] = useState<any>(null)
  const [singleLoading, setSingleLoading] = useState(false)
  const [singleError, setSingleError] = useState('')
  const { theme } = useTheme()
  
  // Use cached predictions, limited by k
  const predictions = cachedPredictions.slice(0, k)
  const loading = isLoading

  const loadPredictions = async () => {
    await refreshData()
  }

  const loadSinglePrediction = async () => {
    const ticker = singleTicker.trim().toUpperCase()
    
    if (!ticker) {
      setSingleError('Please enter a ticker symbol')
      return
    }
    
    try {
      setSingleLoading(true)
      setSingleError('')
      console.log('[SinglePrediction] Loading:', ticker)
      
      const startTime = performance.now()
      const data = await apiClient.getSinglePrediction(ticker)
      const endTime = performance.now()
      
      console.log(`[SinglePrediction] Loaded in ${(endTime - startTime).toFixed(0)}ms`)
      setSinglePrediction(data)
    } catch (error: any) {
      console.error('[SinglePrediction] Error:', error)
      setSingleError(error.response?.data?.detail || 'Failed to load prediction. Check if ticker exists.')
      setSinglePrediction(null)
    } finally {
      setSingleLoading(false)
    }
  }

  useEffect(() => {
    loadPredictions()
  }, [k])

  const filteredPredictions = predictions
    .filter(p => {
      if (filter !== 'all' && p.predicted_movement !== filter) return false
      if (searchQuery && !p.ticker.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.company_name.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })

  const upMovements = predictions.filter(p => p.predicted_movement === 'up').length
  const downMovements = predictions.filter(p => p.predicted_movement === 'down').length
  const avgConfidence = predictions.length > 0 
    ? (predictions.reduce((sum, p) => sum + p.ranking_score, 0) / predictions.length).toFixed(2)
    : '0.00'

  const [activeTab, setActiveTab] = useState<'single' | 'top'>('single')

  return (
    <div className="min-h-screen pb-12">
      {/* Unique Header with Tabs */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-orange-600/10 blur-3xl" />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 shadow-2xl animate-float">
                <Rocket className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-6xl font-display font-black bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                  AI Predictions
                </h1>
                <p className={`text-lg mt-1 flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  Powered by Graph Neural Networks
                </p>
              </div>
            </div>
            
            {/* Tab Switcher */}
            <div className={`flex gap-2 p-2 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/80'} shadow-lg`}>
              <button
                onClick={() => setActiveTab('single')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'single' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Sparkles className="inline h-5 w-5 mr-2" />
                Single Stock
              </button>
              <button
                onClick={() => setActiveTab('top')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'top' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Award className="inline h-5 w-5 mr-2" />
                Top Predictions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-slide-up">
        <Card className="glass-effect border-white/40 hover-lift overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Total Predictions</CardTitle>
            <div className="p-2 rounded-lg bg-purple-100">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              {predictions.length}
            </div>
            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Active predictions</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/40 hover-lift overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Bullish</CardTitle>
            <div className="p-2 rounded-lg bg-green-100">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {upMovements}
            </div>
            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Upward predictions</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/40 hover-lift overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Bearish</CardTitle>
            <div className="p-2 rounded-lg bg-red-100">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 bg-clip-text text-transparent">
              {downMovements}
            </div>
            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Downward predictions</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/40 hover-lift overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Avg Confidence</CardTitle>
            <div className="p-2 rounded-lg bg-blue-100">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              {avgConfidence}
            </div>
            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Mean score</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Content */}
      {activeTab === 'single' ? (
        /* Single Stock Prediction Tab */
        <div className="relative">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-cyan-500/5 to-blue-500/5 rounded-3xl blur-3xl" />
          
          <Card className="glass-effect border-white/40 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
            
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 via-cyan-600 to-blue-600 shadow-2xl animate-float">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-4xl font-display font-black bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      Stock Analyzer
                    </CardTitle>
                    <CardDescription className={`mt-2 text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Enter any ticker for instant AI-powered analysis
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex gap-3 mb-6">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Enter ticker (e.g., INFY, TCS, RELIANCE)"
                    value={singleTicker}
                    onChange={(e) => setSingleTicker(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === 'Enter' && loadSinglePrediction()}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 text-lg font-semibold transition-all ${theme === 'dark' ? 'bg-slate-800/50 border-slate-600 text-gray-100' : 'bg-white border-gray-300 text-gray-900'}`}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Search className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                </div>
                <Button
                  onClick={loadSinglePrediction}
                  disabled={singleLoading}
                  className="bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 hover:from-emerald-700 hover:via-cyan-700 hover:to-blue-700 text-white px-8 py-3 text-base font-bold rounded-xl shadow-lg hover:shadow-emerald-500/50 transition-all"
                >
                  {singleLoading ? (
                    <><RefreshCw className="h-5 w-5 mr-2 animate-spin" /> Analyzing...</>
                  ) : (
                    <><Sparkles className="h-5 w-5 mr-2" /> Predict</>
                  )}
                </Button>
              </div>

          {singleError && (
            <div className={`p-4 rounded-xl border mb-6 ${theme === 'dark' ? 'bg-red-900/20 border-red-700/50 text-red-300' : 'bg-red-50 border-red-200 text-red-700'}`}>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span>{singleError}</span>
              </div>
            </div>
          )}

          {singlePrediction && (
            <div className="space-y-4 animate-fade-in">
              {/* Main Prediction Card - Enhanced */}
              <div className={`p-8 rounded-3xl border-2 shadow-2xl ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-600' : 'bg-gradient-to-br from-white via-blue-50 to-purple-50 border-blue-300'}`}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className={`text-5xl font-display font-black ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      {singlePrediction.ticker}
                    </h3>
                    <p className={`text-base mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {singlePrediction.sector} • Rank #{singlePrediction.prediction.rank} of {singlePrediction.prediction.total_stocks}
                    </p>
                  </div>
                  <Badge className={singlePrediction.prediction.direction === 'UP' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-2 text-lg' 
                    : 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 px-4 py-2 text-lg'}>
                    {singlePrediction.prediction.direction === 'UP' ? (
                      <><TrendingUp className="h-5 w-5 mr-2" /> BULLISH</>
                    ) : (
                      <><TrendingDown className="h-5 w-5 mr-2" /> BEARISH</>
                    )}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-white/80'}`}>
                    <div className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Confidence</div>
                    <div className="text-4xl font-display font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      {singlePrediction.prediction.confidence_percentage}%
                    </div>
                    <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                      {singlePrediction.prediction.confidence_level}
                    </div>
                  </div>

                  <div className={`p-6 rounded-2xl border-2 ${theme === 'dark' ? 'bg-slate-700/50 border-slate-600' : 'bg-white border-blue-200'}`}>
                    <div className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Expected Return</div>
                    <div className={`text-4xl font-display font-black ${singlePrediction.prediction.expected_return_percentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {singlePrediction.prediction.expected_return_percentage > 0 ? '+' : ''}{singlePrediction.prediction.expected_return_percentage}%
                    </div>
                  </div>

                  <div className={`p-6 rounded-2xl border-2 ${theme === 'dark' ? 'bg-slate-700/50 border-slate-600' : 'bg-white border-blue-200'}`}>
                    <div className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Quality</div>
                    <div className={`text-sm font-semibold mt-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      {singlePrediction.prediction.quality}
                    </div>
                  </div>

                  <div className={`p-6 rounded-2xl border-2 ${theme === 'dark' ? 'bg-slate-700/50 border-slate-600' : 'bg-white border-blue-200'}`}>
                    <div className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Up Probability</div>
                    <div className="text-4xl font-display font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {singlePrediction.prediction.up_probability}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Trading Suggestion - Enhanced */}
              <div className={`p-8 rounded-3xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-600' : 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-green-300'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h4 className={`text-2xl font-display font-black ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Trading Recommendation</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Action</div>
                    <div className={`text-xl font-bold ${singlePrediction.trading_suggestion.action.includes('BUY') ? 'text-green-600' : singlePrediction.trading_suggestion.action.includes('SELL') ? 'text-red-600' : 'text-gray-600'}`}>
                      {singlePrediction.trading_suggestion.action}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Suggested Allocation</div>
                    <div className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                      {singlePrediction.trading_suggestion.suggested_allocation}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Risk Level</div>
                    <Badge className={
                      singlePrediction.trading_suggestion.risk_level === 'LOW' ? 'bg-green-100 text-green-700 border-green-300' :
                      singlePrediction.trading_suggestion.risk_level === 'MODERATE' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                      'bg-red-100 text-red-700 border-red-300'
                    }>
                      {singlePrediction.trading_suggestion.risk_level}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Investment Scenarios */}
              {singlePrediction.investment_scenarios && singlePrediction.investment_scenarios.length > 0 && (
                <div className={`p-8 rounded-3xl border-2 shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-600' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 border-purple-300'}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <h4 className={`text-2xl font-display font-black ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Investment Calculator</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {singlePrediction.investment_scenarios.map((scenario: any, index: number) => (
                      <div key={index} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-white/80'}`}>
                        <div className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Investment</div>
                        <div className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                          ₹{scenario.investment.toLocaleString()}
                        </div>
                        <div className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Expected Profit</div>
                        <div className="text-xl font-display text-green-600">
                          +₹{scenario.expected_profit.toLocaleString()}
                        </div>
                        <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          Total: ₹{scenario.expected_value.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
        </div>
      ) : (
        /* Top Predictions Tab */
        <div className="space-y-6">
      {/* Controls */}
      <Card className="glass-effect border-white/40">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by ticker or company name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'up' ? 'default' : 'outline'}
                onClick={() => setFilter('up')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Bullish
              </Button>
              <Button
                variant={filter === 'down' ? 'default' : 'outline'}
                onClick={() => setFilter('down')}
              >
                <TrendingDown className="h-4 w-4 mr-2" />
                Bearish
              </Button>
            </div>

            {/* Top K Selector - Compact Buttons */}
            <div className="flex gap-2">
              {[5, 10, 20].map((value) => (
                <button
                  key={value}
                  onClick={() => setK(value)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    k === value
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : theme === 'dark'
                      ? 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Top {value}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Card className="glass-effect border-white/40">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3 text-2xl font-display bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                  <Award className="h-6 w-6 text-white" />
                </div>
                {filteredPredictions.length} Predictions
              </CardTitle>
              <CardDescription className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing {filter === 'all' ? 'all' : filter === 'up' ? 'bullish' : 'bearish'} predictions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Loading predictions...</p>
            </div>
          ) : filteredPredictions.length === 0 ? (
            <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>No predictions found</div>
          ) : (
            <div className="space-y-4">
              {filteredPredictions.map((pred, index) => (
                <div
                  key={pred.ticker}
                  className={`p-6 rounded-2xl border transition-all duration-200 hover-lift group ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-700/50' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                  style={{ animationDelay: `${(index % 10) * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5 flex-1">
                      <div className="relative">
                        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white font-bold text-lg shadow-lg">
                          #{pred.rank}
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full border-2 border-white animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`font-bold text-2xl font-display ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{pred.ticker}</span>
                          <Badge
                            className={pred.predicted_movement === 'up' 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-3 py-1' 
                              : 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-0 px-3 py-1'}
                          >
                            {pred.predicted_movement === 'up' ? (
                              <><TrendingUp className="h-4 w-4 mr-1" /> Bullish</>
                            ) : (
                              <><TrendingDown className="h-4 w-4 mr-1" /> Bearish</>
                            )}
                          </Badge>
                        </div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{pred.company_name}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Sector</div>
                        <Badge className={`${theme === 'dark' ? 'bg-blue-900/50 text-blue-300 border-blue-700/50' : 'bg-blue-100 text-blue-700 border-blue-300'}`}>
                          {pred.sector}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Confidence Score</div>
                        <div className="text-3xl font-display bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          {formatScore(pred.ranking_score)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
        </div>
      )}
    </div>
  )
}
