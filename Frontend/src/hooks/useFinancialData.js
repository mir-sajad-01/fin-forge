import { useMemo } from 'react'
import { useData } from '../context/DataContext'

function getAmount(transaction) {
  const amount = Number(transaction.amount)
  return Number.isFinite(amount) ? amount : 0
}

function getMonthKey(dateValue) {
  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function useFinancialData() {
  const { transactions } = useData()

  const summary = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + getAmount(t), 0)
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + getAmount(t), 0)

    return {
      income,
      expenses,
      balance: income - expenses
    }
  }, [transactions])

  const categoryBreakdown = useMemo(() => {
    const breakdown = {}
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const category = t.category || 'Uncategorized'
        breakdown[category] = (breakdown[category] || 0) + getAmount(t)
      })
    
    return Object.entries(breakdown)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
  }, [transactions])

  const monthlyTrend = useMemo(() => {
    const monthlyData = {}
    
    transactions.forEach(t => {
      const month = getMonthKey(t.date)

      if (!month) {
        return
      }
      
      if (!monthlyData[month]) {
        monthlyData[month] = { month, income: 0, expenses: 0 }
      }
      
      if (t.type === 'income') {
        monthlyData[month].income += getAmount(t)
      } else {
        monthlyData[month].expenses += getAmount(t)
      }
    })

    return Object.values(monthlyData)
      .sort((a, b) => a.month.localeCompare(b.month))
      .map(d => ({
        ...d,
        balance: d.income - d.expenses,
        month: new Date(d.month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      }))
  }, [transactions])

  const topSpendingCategory = useMemo(() => {
    return categoryBreakdown[0] || { category: 'N/A', amount: 0 }
  }, [categoryBreakdown])

  const monthlyComparison = useMemo(() => {
    if (monthlyTrend.length < 2) return { current: 0, previous: 0, change: 0 }
    
    const current = monthlyTrend[monthlyTrend.length - 1].expenses
    const previous = monthlyTrend[monthlyTrend.length - 2].expenses
    const change = previous > 0 ? ((current - previous) / previous) * 100 : 0

    return { current, previous, change }
  }, [monthlyTrend])

  return {
    summary,
    categoryBreakdown,
    monthlyTrend,
    topSpendingCategory,
    monthlyComparison
  }
}
