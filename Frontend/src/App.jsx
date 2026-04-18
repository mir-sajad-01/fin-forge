import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { DataProvider, useData } from './context/DataContext'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import LandingPage from './pages/LandingPage'

function AppContent() {
  const { darkMode } = useData()
  const location = useLocation()
  const hideHeaderRoutes = ["/", "/login", "/register"]
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname)
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        {shouldShowHeader && <Header />}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
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



