import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import Ask from './pages/Ask'
import Display from './pages/Display'
import Admin from './pages/Admin'

function Navigation() {
  return (
    <nav className="p-4 text-white bg-gray-800">
      <div className="container flex items-center justify-center mx-auto">
        <h1 className="text-xl font-bold">* SUARA & SOLUSI *</h1>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="h-screen bg-gray-50">
          <main>
            <Navigation />
            <Routes>
              <Route path="/" element={<Ask />} />
              <Route path="/display" element={<Display />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
