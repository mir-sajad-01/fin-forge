import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom'
import { DataProvider, useData } from './context/DataContext'
import Header from './components/Header'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const LandingPage = lazy(() => import('./pages/LandingPage'))

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-sm text-slate-500 dark:text-slate-400">
      Loading...
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { token } = useData()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

function AppContent() {
  const { darkMode } = useData()
  const location = useLocation()
  const hideHeaderRoutes = ["/", "/login", "/register"]
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname)
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        {shouldShowHeader && <Header />}

        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/dashboard"
              element={(
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              )}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </DataProvider>
  )
}


