import { Link, useLocation } from 'react-router-dom'
import { BarChart3, TrendingUp, Database, Settings, Activity, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/ThemeContext'

interface LayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Predictions', href: '/predictions', icon: TrendingUp },
  { name: 'Stocks', href: '/stocks', icon: Database },
  { name: 'Model Info', href: '/model', icon: Settings },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 -left-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-blob ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 opacity-20' 
            : 'bg-gradient-to-br from-purple-200 to-pink-200 opacity-30'
        }`}></div>
        <div className={`absolute top-40 right-10 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-pink-500 to-red-600 opacity-20'
            : 'bg-gradient-to-br from-blue-200 to-cyan-200 opacity-30'
        }`}></div>
        <div className={`absolute -bottom-8 left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-yellow-500 to-orange-600 opacity-20'
            : 'bg-gradient-to-br from-pink-200 to-orange-200 opacity-30'
        }`}></div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 w-full glass-effect shadow-lg ${
        theme === 'dark' ? 'border-b border-slate-700/50' : 'border-b border-white/30'
      }`}>
        <div className="container flex h-18 items-center px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg animate-float">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-display bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                FinGAT
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-sm">
                  ✨ AI Powered
                </span>
                <span className="text-xs text-gray-500">v2.0</span>
              </div>
            </div>
          </div>
          <nav className="ml-auto flex items-center gap-3">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover-lift',
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : theme === 'dark' 
                        ? 'text-gray-300 hover:text-white bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600'
                        : 'text-gray-700 hover:text-gray-900 bg-white/50 hover:bg-white/80 border border-gray-200'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={cn(
                'p-3 rounded-xl transition-all duration-300 hover-lift',
                theme === 'dark'
                  ? 'bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 text-yellow-400'
                  : 'bg-white/50 hover:bg-white/80 border border-gray-200 text-gray-700'
              )}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className={`relative z-10 glass-effect mt-auto ${
        theme === 'dark' ? 'border-t border-slate-700/50' : 'border-t border-white/30'
      }`}>
        <div className="container flex h-16 items-center justify-between px-6 text-sm">
          <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
            &copy; 2025 <span className="font-display bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">FinGAT</span>. AI-Powered Stock Prediction System.
          </p>
          <p className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse shadow-lg"></span>
            <span className="font-medium">Live:</span> Analyzing 147+ Indian stocks with Graph Neural Networks
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
