import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Predictions from './pages/Predictions'
import Stocks from './pages/Stocks'
import ModelInfo from './pages/ModelInfo'
import { ModelProvider } from './contexts/ModelContext'
import { DataProvider } from './contexts/DataContext'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <ModelProvider>
        <DataProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/predictions" element={<Predictions />} />
                <Route path="/stocks" element={<Stocks />} />
                <Route path="/model" element={<ModelInfo />} />
              </Routes>
            </Layout>
          </Router>
        </DataProvider>
      </ModelProvider>
    </ErrorBoundary>
  )
}

export default App
