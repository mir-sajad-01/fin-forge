// ✅ Fixed
const CURRENCY_LOCALES = {
  INR: 'en-IN',
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
  JPY: 'ja-JP'
}

export function formatCurrency(amount, currency = 'INR') {
  return new Intl.NumberFormat(CURRENCY_LOCALES[currency] || 'en-IN', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function formatDateShort(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
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
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
    case 'amount-high':
      return sorted.sort((a, b) => b.amount - a.amount)
    case 'amount-low':
      return sorted.sort((a, b) => a.amount - b.amount)
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
      t.description.toLowerCase().includes(search) ||
      t.category.toLowerCase().includes(search)
    )
  }

  if (filters.startDate) {
    filtered = filtered.filter(t => new Date(t.date) >= new Date(filters.startDate))
  }

  if (filters.endDate) {
    filtered = filtered.filter(t => new Date(t.date) <= new Date(filters.endDate))
  }

  return filtered
}
