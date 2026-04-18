import { useMemo } from 'react'
import { useData } from '../context/DataContext'

export function useFinancialData() {
  const { transactions } = useData()

  const summary = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

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
        breakdown[t.category] = (breakdown[t.category] || 0) + t.amount
      })
    
    return Object.entries(breakdown)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
  }, [transactions])

  const monthlyTrend = useMemo(() => {
    const monthlyData = {}
    
    transactions.forEach(t => {
      const date = new Date(t.date)
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      
      if (!monthlyData[month]) {
        monthlyData[month] = { month, income: 0, expenses: 0 }
      }
      
      if (t.type === 'income') {
        monthlyData[month].income += t.amount
      } else {
        monthlyData[month].expenses += t.amount
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
