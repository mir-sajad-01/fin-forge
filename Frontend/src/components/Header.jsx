import { useEffect, useRef, useState } from 'react'
import { ChevronDown, LogOut, Moon, Sun, User } from 'lucide-react'
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

// ✅ FIXED useEffect (no error now)
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

const handleLogout = () => {
clearSession()
navigate('/login', { replace: true })
}

return ( <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm"> <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


    <div className="flex flex-wrap items-center justify-between gap-2 py-2">

      {/* LOGO */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <img src={logo} alt="logo" className="w-10 h-10 rounded-xl" />
        <div className="hidden sm:block">
          <h1 className="text-lg font-bold">Fin Forge</h1>
          <p className="text-xs text-slate-500">Track your finances</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">

        {/* Currency */}
        <select
          value={currency}
          onChange={(e) => changeCurrency(e.target.value)}
          className="hidden sm:block px-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 rounded-lg"
        >
          {CURRENCIES.map(c => (
            <option key={c.code} value={c.code}>
              {c.symbol} {c.label}
            </option>
          ))}
        </select>

        {/* Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Role */}
        <div className="hidden sm:flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setRoleMode('viewer')}
            className={`px-2 py-1 text-sm ${role === 'viewer' ? 'bg-white dark:bg-slate-700 rounded' : ''}`}
          >
            Viewer
          </button>
          <button
            onClick={() => setRoleMode('admin')}
            className={`px-2 py-1 text-sm ${role === 'admin' ? 'bg-white dark:bg-slate-700 rounded' : ''}`}
          >
            Admin
          </button>
        </div>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
              {user?.name?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}
            </div>
            <ChevronDown className={`w-4 h-4 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border rounded-lg shadow-lg">

              <div className="p-3 border-b">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>

              <div className="p-3 text-sm">
                Role: {role}
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50"
              >
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
