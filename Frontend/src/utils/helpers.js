const CURRENCY_LOCALES = {
  INR: 'en-IN',
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
  JPY: 'ja-JP'
}

function toFiniteNumber(value) {
  const number = Number(value)
  return Number.isFinite(number) ? number : 0
}

function toValidDate(dateString) {
  const date = new Date(dateString)
  return Number.isNaN(date.getTime()) ? null : date
}

export function formatCurrency(amount, currency = 'INR') {
  const supportedCurrency = CURRENCY_LOCALES[currency] ? currency : 'INR'

  return new Intl.NumberFormat(CURRENCY_LOCALES[supportedCurrency], {
    style: 'currency',
    currency: supportedCurrency
  }).format(toFiniteNumber(amount))
}

export function formatDate(dateString) {
  const date = toValidDate(dateString)

  if (!date) {
    return 'Unknown date'
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function formatDateShort(dateString) {
  const date = toValidDate(dateString)

  if (!date) {
    return '--'
  }

  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit'
  })
}

export function getCategoryColor(category) {
  const colors = {
    'Salary': '#10b981',
    'Freelance': '#8b5cf6',
    'Groceries': '#f59e0b',
    'Utilities': '#3b82f6',
    'Rent': '#ef4444',
    'Entertainment': '#ec4899',
    'Healthcare': '#06b6d4',
    'Transport': '#f97316'
  }
  return colors[category] || '#6b7280'
}

export function getSortedTransactions(transactions, sortBy = 'date') {
  const sorted = [...transactions]
  switch (sortBy) {
    case 'date':
      return sorted.sort((a, b) => {
        const dateA = toValidDate(a.date)?.getTime() || 0
        const dateB = toValidDate(b.date)?.getTime() || 0
        return dateB - dateA
      })
    case 'amount-high':
      return sorted.sort((a, b) => toFiniteNumber(b.amount) - toFiniteNumber(a.amount))
    case 'amount-low':
      return sorted.sort((a, b) => toFiniteNumber(a.amount) - toFiniteNumber(b.amount))
    default:
      return sorted
  }
}

export function filterTransactions(transactions, filters) {
  let filtered = transactions

  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(t => t.type === filters.type)
  }

  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(t => t.category === filters.category)
  }

  if (filters.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(t =>
      String(t.description || '').toLowerCase().includes(search) ||
      String(t.category || '').toLowerCase().includes(search)
    )
  }

  if (filters.startDate) {
    const startDate = toValidDate(filters.startDate)
    filtered = filtered.filter(t => {
      const transactionDate = toValidDate(t.date)
      return startDate && transactionDate && transactionDate >= startDate
    })
  }

  if (filters.endDate) {
    const endDate = toValidDate(filters.endDate)
    filtered = filtered.filter(t => {
      const transactionDate = toValidDate(t.date)
      return endDate && transactionDate && transactionDate <= endDate
    })
  }

  return filtered
}
