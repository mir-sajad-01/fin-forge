import { useEffect, useRef, useState } from 'react'
import { ChevronDown, LogOut, Moon, Settings, Sun, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
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
    logout
  } = useData()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-2 py-2">
          <Link
            to="/dashboard"
            className="flex shrink-0 items-center gap-2 rounded-lg transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 sm:gap-3"
          >
            <img src={logo} alt="Fin Forge logo" className="h-10 w-10 rounded-lg" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-950 dark:text-white">Fin Forge</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Track your finances</p>
            </div>
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
            <select
              value={currency}
              onChange={(event) => changeCurrency(event.target.value)}
              className="hidden rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white sm:block"
              aria-label="Select display currency"
            >
              {CURRENCIES.map(item => (
                <option key={item.code} value={item.code}>
                  {item.symbol} {item.label}
                </option>
              ))}
            </select>

            <button
              onClick={toggleDarkMode}
              className="rounded-lg p-2 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-slate-800"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5" />}
            </button>

            <div className="hidden rounded-lg bg-slate-100 p-1 dark:bg-slate-800 sm:flex">
              <button
                onClick={() => setRoleMode('viewer')}
                className={`rounded-md px-2 py-1 text-sm transition ${
                  role === 'viewer'
                    ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-300'
                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                Viewer
              </button>
              <button
                onClick={() => setRoleMode('admin')}
                className={`rounded-md px-2 py-1 text-sm transition ${
                  role === 'admin'
                    ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-300'
                    : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(current => !current)}
                className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:bg-slate-800"
                aria-expanded={dropdownOpen}
                aria-haspopup="menu"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || <User className="h-4 w-4" />}
                </span>
                <ChevronDown className={`h-4 w-4 transition ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <div className="border-b border-slate-200 p-4 dark:border-slate-800">
                    <p className="truncate font-semibold text-slate-950 dark:text-white">
                      {user?.name || 'Fin Forge User'}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Settings className="h-4 w-4" />
                    Profile settings
                  </Link>

                  <div className="border-t border-slate-200 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
                    Mode: <span className="font-semibold capitalize">{role}</span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/30"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
