import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import Ask from './pages/Ask'
import Display from './pages/Display'
import Admin from './pages/Admin'

function Navigation() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-center items-center">
        <h1 className="text-xl font-bold">HG3 - JAM 11 - TANYA JAWAB</h1>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main>
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
