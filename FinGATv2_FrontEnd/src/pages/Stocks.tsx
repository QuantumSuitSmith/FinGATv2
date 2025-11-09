import { useState } from 'react'
import { Database, Search, Layers, TrendingUp, Building2, BarChart3 } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useData } from '@/contexts/DataContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Stocks() {
  const { stocks = [], sectors = [], isLoading: loading = false } = useData() || {}
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSector, setSelectedSector] = useState<string>('all')
  const { theme } = useTheme()
  
  // Debug: Log data
  console.log('[Stocks] Data:', { 
    stocksCount: stocks?.length || 0, 
    sectorsCount: sectors?.length || 0, 
    loading 
  })

  const filteredStocks = (stocks || []).filter(stock => {
    // Sector filter
    if (selectedSector !== 'all') {
      if (stock.sector !== selectedSector) {
        return false
      }
    }
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesTicker = stock.ticker.toLowerCase().includes(query)
      const matchesCompany = stock.company_name.toLowerCase().includes(query)
      if (!matchesTicker && !matchesCompany) {
        return false
      }
    }
    return true
  })

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 glass-effect animate-fade-in">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse-slow" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg animate-float">
              <Database className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Stocks Database
              </h1>
              <p className={`text-lg mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Browse and filter all {stocks.length} stocks tracked by FinGAT
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 animate-slide-up">
        <Card className="glass-effect border-white/40 hover-lift overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Total Stocks</CardTitle>
            <div className="p-2 rounded-lg bg-blue-100">
              <Database className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              {stocks.length}
            </div>
            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>NSE/BSE stocks</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/40 hover-lift overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Sectors</CardTitle>
            <div className="p-2 rounded-lg bg-purple-100">
              <Layers className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              {(sectors || []).filter(s => s.name?.toLowerCase() !== 'all').length}
            </div>
            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Industry sectors</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/40 hover-lift overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Filtered</CardTitle>
            <div className="p-2 rounded-lg bg-green-100">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-display bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {filteredStocks.length}
            </div>
            <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Showing now</p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-white/40 hover-lift overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Selected Sector</CardTitle>
            <div className="p-2 rounded-lg bg-orange-100">
              <Building2 className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-lg font-semibold mt-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              {selectedSector === 'all' ? 'All Sectors' : selectedSector}
            </div>
            <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Current filter</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Sector Filter */}
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Sectors ({stocks?.length || 0})</option>
              {(sectors || []).filter(s => s.name?.toLowerCase() !== 'all').map((sector) => (
                <option key={sector.name} value={sector.name}>
                  {sector.name} ({sector.stock_count || 0})
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Stocks List */}
      <Card className="glass-effect border-white/40">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3 text-2xl font-display bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600">
                  <Database className="h-6 w-6 text-white" />
                </div>
                {filteredStocks.length} Stocks
              </CardTitle>
              <CardDescription className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedSector === 'all' ? 'Showing all sectors' : `Filtered by ${selectedSector} sector`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Loading stocks from backend...</p>
              <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>This may take a few seconds</p>
            </div>
          ) : stocks.length === 0 ? (
            <div className={`text-center py-16 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <Database className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-semibold">No stocks loaded from backend</p>
              <p className="text-sm mt-2">Make sure backend is running at http://localhost:8000</p>
              <p className="text-sm mt-1">Check browser console (F12) for errors</p>
            </div>
          ) : filteredStocks.length === 0 ? (
            <div className={`text-center py-16 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <Database className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No stocks match your filters</p>
              <p className="text-sm mt-2">Try adjusting your filters or search query</p>
              <p className="text-sm mt-1">Total stocks available: {stocks.length}</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredStocks.map((stock, index) => (
                <div
                  key={stock.ticker}
                  className={`p-5 rounded-2xl border transition-all duration-200 hover-lift group ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-700/50' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                  style={{ animationDelay: `${(index % 12) * 50}ms` }}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className={`font-bold text-xl font-display ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                          {stock.ticker}
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <BarChart3 className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className={`text-sm mb-4 line-clamp-2 flex-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stock.company_name}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}">
                      <Badge className={`${theme === 'dark' ? 'bg-blue-900/50 text-blue-300 border-blue-700/50' : 'bg-blue-100 text-blue-700 border-blue-300'}`}>
                        {stock.sector}
                      </Badge>
                      {stock.current_price && stock.current_price > 0 && (
                        <div className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          ₹{stock.current_price.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
