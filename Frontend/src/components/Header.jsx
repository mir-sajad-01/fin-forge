import { useEffect, useRef, useState } from 'react'
import { ChevronDown, LogOut, Moon, Shield, Sun, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import logo from '../assets/finforge-logo.svg'


const CURRENCIES = [
  { code: 'INR', symbol: '\u20B9', label: 'INR' },
  { code: 'USD', symbol: '$', label: 'USD' },
  { code: 'EUR', symbol: '\u20AC', label: 'EUR' },
  { code: 'GBP', symbol: '\u00A3', label: 'GBP' },
  { code: 'JPY', symbol: '\u00A5', label: 'JPY' }
]

export default function Header() {
  const navigate = useNavigate()
  const {
    role,
    setRoleMode,
    darkMode,
    toggleDarkMode,
    user,
    currency,
    changeCurrency,
    clearSession
  } = useData()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen])

  const handleLogout = () => {
    clearSession()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Fin Forge logo"
              className="w-10 h-10 rounded-xl shadow-sm"
            />
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Fin Forge</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Track your finances</p>
            </div>
          </div>


          <div className="flex items-center gap-3">
            <select
              value={currency}
              onChange={(event) => changeCurrency(event.target.value)}
              className="px-3 py-2 text-sm font-medium bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {CURRENCIES.map(item => (
                <option key={item.code} value={item.code}>
                  {item.symbol} {item.label}
                </option>
              ))}
            </select>

            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setRoleMode('viewer')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${role === 'viewer'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                Viewer
              </button>
              <button
                onClick={() => setRoleMode('admin')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${role === 'admin'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                Admin
              </button>
            </div>

            <div className="relative flex-shrink-0" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(current => !current)}
                className="flex items-center gap-2 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm pointer-events-none">
                  {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 pointer-events-none ${dropdownOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl z-[999]">
                  <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-6 h-6" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 dark:text-white truncate">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user?.email || 'No email'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">Role</span>
                      <span className={`ml-auto text-xs font-medium px-2 py-1 rounded-full ${role === 'admin'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="text-base flex-shrink-0">
                        {CURRENCIES.find(item => item.code === currency)?.symbol}
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">Currency</span>
                      <span className="ml-auto text-xs font-medium px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {currency}
                      </span>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
