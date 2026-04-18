import { createContext, useContext, useEffect, useState } from 'react'

const DataContext = createContext()
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

function readStoredUser() {
  const storedUser = localStorage.getItem('user')

  if (!storedUser) {
    return null
  }

  try {
    return JSON.parse(storedUser)
  } catch {
    localStorage.removeItem('user')
    return null
  }
}

async function parseJsonSafely(response) {
  try {
    return await response.json()
  } catch {
    return null
  }
}

export function DataProvider({ children }) {
  const [transactions, setTransactions] = useState([])
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [user, setUser] = useState(() => readStoredUser())
  const [role, setRole] = useState(() => localStorage.getItem('role') || 'viewer')
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true')
  const [currency, setCurrency] = useState(() => localStorage.getItem('currency') || 'INR')
  const [exchangeRates, setExchangeRates] = useState({
    INR: 1,
    USD: 0.012,
    EUR: 0.011,
    GBP: 0.0095,
    JPY: 1.78
  })

  const clearSession = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken('')
    setUser(null)
    setTransactions([])
    setRole('viewer')
  }

  const persistSession = (nextToken, nextUser) => {
    localStorage.setItem('token', nextToken)
    localStorage.setItem('user', JSON.stringify(nextUser))
    setToken(nextToken)
    setUser(nextUser)
  }

  const request = async (path, options = {}) => {
    const headers = { ...(options.headers || {}) }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers
    })

    const data = await parseJsonSafely(response)

    if (!response.ok) {
      if (response.status === 401) {
        clearSession()
      }

      const error = new Error(data?.message || data?.error || 'Request failed')
      error.status = response.status
      throw error
    }

    return data
  }

  useEffect(() => {
    const fetchRates = async () => {
      const cached = localStorage.getItem('exchangeRates')
      const cachedTime = localStorage.getItem('exchangeRatesTime')
      const oneHour = 60 * 60 * 1000

      if (cached && cachedTime && Date.now() - Number(cachedTime) < oneHour) {
        try {
          setExchangeRates(JSON.parse(cached))
          return
        } catch {
          localStorage.removeItem('exchangeRates')
          localStorage.removeItem('exchangeRatesTime')
        }
      }

      try {
        const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY

        if (!apiKey) {
          return
        }

        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`)
        const data = await response.json()

        if (data.result === 'success') {
          const rates = {
            INR: 1,
            USD: data.conversion_rates.USD,
            EUR: data.conversion_rates.EUR,
            GBP: data.conversion_rates.GBP,
            JPY: data.conversion_rates.JPY
          }

          setExchangeRates(rates)
          localStorage.setItem('exchangeRates', JSON.stringify(rates))
          localStorage.setItem('exchangeRatesTime', String(Date.now()))
        }
      } catch (error) {
        console.error('Exchange rate fetch failed, using fallback rates', error)
      }
    }

    fetchRates()
  }, [])

  useEffect(() => {
    if (!token) {
      setTransactions([])
      return
    }

    const fetchTransactions = async () => {
      try {
        const data = await request('/api/transactions')
        setTransactions(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error(error)
      }
    }

    fetchTransactions()
  }, [token])

  useEffect(() => {
    if (!token) {
      setUser(null)
      return
    }

    const fetchUser = async () => {
      try {
        const data = await request('/api/auth/me')
        setUser(data)
        localStorage.setItem('user', JSON.stringify(data))
      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()
  }, [token])

  useEffect(() => {
    localStorage.setItem('role', role)
  }, [role])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)

    if (darkMode) {
      document.documentElement.classList.add('dark')
      return
    }

    document.documentElement.classList.remove('dark')
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('currency', currency)
  }, [currency])

  const login = async (email, password) => {
    const data = await request('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    persistSession(data.token, data.user)
    return data.user
  }

  const register = async ({ name, email, password }) => {
    return request('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    })
  }

  const addTransaction = async (transaction) => {
    const data = await request('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transaction)
    })

    setTransactions(prev => [data, ...prev])
    return data
  }

  const updateTransaction = async (id, updates) => {
    const updated = await request(`/api/transactions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    })

    setTransactions(prev => prev.map(transaction => (
      transaction._id === id ? updated : transaction
    )))

    return updated
  }

  const deleteTransaction = async (id) => {
    await request(`/api/transactions/${id}`, {
      method: 'DELETE'
    })

    setTransactions(prev => prev.filter(transaction => transaction._id !== id))
  }

  const toggleRole = () => {
    setRole(currentRole => currentRole === 'viewer' ? 'admin' : 'viewer')
  }

  const setRoleMode = (nextRole) => {
    setRole(nextRole === 'admin' ? 'admin' : 'viewer')
  }

  const toggleDarkMode = () => {
    setDarkMode(current => !current)
  }

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency)
  }

  return (
    <DataContext.Provider value={{
      transactions,
      token,
      role,
      user,
      darkMode,
      currency,
      exchangeRates,
      login,
      register,
      clearSession,
      changeCurrency,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      toggleRole,
      setRoleMode,
      toggleDarkMode
    }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)

  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }

  return context
}
