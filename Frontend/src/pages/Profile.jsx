import {
  BadgeCheck,
  BarChart3,
  CreditCard,
  DollarSign,
  LogOut,
  Mail,
  Moon,
  ShieldCheck,
  Sun,
  User,
  Wallet
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { useCurrency } from '../hooks/useCurrency'
import { useFinancialData } from '../hooks/useFinancialData'

const CURRENCIES = [
  { code: 'INR', label: 'Indian Rupee', symbol: '\u20B9' },
  { code: 'USD', label: 'US Dollar', symbol: '$' },
  { code: 'EUR', label: 'Euro', symbol: '\u20AC' },
  { code: 'GBP', label: 'British Pound', symbol: '\u00A3' },
  { code: 'JPY', label: 'Japanese Yen', symbol: '\u00A5' }
]

function StatTile({ icon, label, value, tone = 'blue' }) {
  const tones = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300',
    green: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300',
    red: 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300',
    slate: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${tones[tone]}`}>
        {icon}
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">{value}</p>
    </div>
  )
}

export default function Profile() {
  const navigate = useNavigate()
  const {
    user,
    role,
    setRoleMode,
    darkMode,
    toggleDarkMode,
    currency,
    changeCurrency,
    transactions,
    logout
  } = useData()
  const { format } = useCurrency()
  const { summary, topSpendingCategory, monthlyTrend } = useFinancialData()

  const totalTransactions = transactions.length
  const incomeCount = transactions.filter(transaction => transaction.type === 'income').length
  const expenseCount = transactions.filter(transaction => transaction.type === 'expense').length
  const latestTransaction = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0]

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50 py-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
              Profile
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
              Account settings
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Manage your account view, dashboard preferences, and session.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900/60 dark:bg-slate-900 dark:text-red-300 dark:hover:bg-red-950/30"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.35fr]">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600 text-2xl font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || <User className="h-7 w-7" />}
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold text-slate-950 dark:text-white">
                  {user?.name || 'Fin Forge User'}
                </h2>
                <p className="mt-1 flex items-center gap-2 truncate text-sm text-slate-500 dark:text-slate-400">
                  <Mail className="h-4 w-4 shrink-0" />
                  {user?.email || 'No email available'}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 dark:border-slate-800">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-500 dark:text-slate-400">Account role</span>
                <span className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                  <BadgeCheck className="h-4 w-4" />
                  {user?.role || 'user'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-500 dark:text-slate-400">Workspace mode</span>
                <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-semibold capitalize text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {role}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-500 dark:text-slate-400">Transactions</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {totalTransactions}
                </span>
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatTile
              icon={<Wallet className="h-5 w-5" />}
              label="Balance"
              value={format(summary.balance)}
              tone={summary.balance >= 0 ? 'blue' : 'red'}
            />
            <StatTile
              icon={<DollarSign className="h-5 w-5" />}
              label="Income"
              value={format(summary.income)}
              tone="green"
            />
            <StatTile
              icon={<CreditCard className="h-5 w-5" />}
              label="Expenses"
              value={format(summary.expenses)}
              tone="red"
            />
            <StatTile
              icon={<BarChart3 className="h-5 w-5" />}
              label="Active months"
              value={monthlyTrend.length}
              tone="slate"
            />
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">Preferences</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Display settings for your dashboard.</p>
              </div>
            </div>

            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Display currency
                </span>
                <select
                  value={currency}
                  onChange={(event) => changeCurrency(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  {CURRENCIES.map(item => (
                    <option key={item.code} value={item.code}>
                      {item.symbol} {item.code} - {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-800">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Theme</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {darkMode ? 'Dark mode is active' : 'Light mode is active'}
                  </p>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                >
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  Switch
                </button>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Workspace access</p>
                <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
                  <button
                    onClick={() => setRoleMode('viewer')}
                    className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                      role === 'viewer'
                        ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-950 dark:text-blue-300'
                        : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                    }`}
                  >
                    Viewer
                  </button>
                  <button
                    onClick={() => setRoleMode('admin')}
                    className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                      role === 'admin'
                        ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-950 dark:text-blue-300'
                        : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-950 dark:text-white">Security</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Session status and account protection.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-800">
                <p className="text-sm font-medium text-slate-900 dark:text-white">Refresh-token session</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Your session uses a short-lived access token and an httpOnly refresh cookie.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 px-4 py-3 dark:border-slate-800">
                <p className="text-sm font-medium text-slate-900 dark:text-white">Latest activity</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {latestTransaction
                    ? `${latestTransaction.description} - ${format(latestTransaction.amount)}`
                    : 'No transactions recorded yet'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <LogOut className="h-4 w-4" />
                End current session
              </button>
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">Financial activity</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">A quick read on your account data.</p>
            </div>
            <span className="rounded-lg bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {currency}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">Income entries</p>
              <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{incomeCount}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">Expense entries</p>
              <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{expenseCount}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
              <p className="text-sm text-slate-500 dark:text-slate-400">Top spending category</p>
              <p className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
                {topSpendingCategory.category}
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {format(topSpendingCategory.amount)}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
