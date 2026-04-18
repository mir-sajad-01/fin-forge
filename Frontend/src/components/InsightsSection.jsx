import { AlertCircle, Target, TrendingDown } from 'lucide-react'
import { useCurrency } from '../hooks/useCurrency'
import { useFinancialData } from '../hooks/useFinancialData'

export default function InsightsSection() {
  const { topSpendingCategory, monthlyComparison, summary, monthlyTrend } = useFinancialData()
  const { format } = useCurrency()

  if (monthlyTrend.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
          No insights available
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm text-center max-w-sm">
          Start adding transactions to see spending insights, category breakdown and monthly comparisons.
        </p>
      </div>
    )
  }

  const incomeToExpenseRatio = summary.income > 0
    ? Number(((summary.expenses / summary.income) * 100).toFixed(1))
    : 0
  const avgMonthlyExpense = monthlyTrend.reduce((sum, month) => sum + month.expenses, 0) / monthlyTrend.length
  const comparisonTotal = monthlyComparison.current + monthlyComparison.previous
  const currentWidth = comparisonTotal > 0
    ? (monthlyComparison.current / comparisonTotal) * 100
    : 0
  const previousWidth = comparisonTotal > 0
    ? (monthlyComparison.previous / comparisonTotal) * 100
    : 0

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Highest Spending Category</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{topSpendingCategory.category}</h3>
            </div>
            <Target className="w-8 h-8 text-amber-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {format(topSpendingCategory.amount)}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {topSpendingCategory.amount > 0
              ? `You spend most in ${topSpendingCategory.category.toLowerCase()}`
              : 'No expenses recorded'}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Expense Ratio</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{incomeToExpenseRatio}%</h3>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              incomeToExpenseRatio < 50
                ? 'bg-green-100 dark:bg-green-900/30'
                : incomeToExpenseRatio < 75
                ? 'bg-yellow-100 dark:bg-yellow-900/30'
                : 'bg-red-100 dark:bg-red-900/30'
            }`}
            >
              {incomeToExpenseRatio < 50 ? (
                <TrendingDown className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            {incomeToExpenseRatio < 50
              ? 'Great! You are spending less than 50% of income'
              : incomeToExpenseRatio < 75
              ? 'Moderate spending. Consider reducing expenses'
              : 'High spending ratio. Review your expenses'}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="mb-4">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Month-over-Month Comparison</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            {monthlyComparison.change > 0 ? '+' : ''}{monthlyComparison.change.toFixed(1)}%
          </h3>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-slate-600 dark:text-slate-400">Current Month</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {format(monthlyComparison.current)}
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${Math.min(currentWidth, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-slate-600 dark:text-slate-400">Previous Month</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {format(monthlyComparison.previous)}
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
              <div
                className="bg-slate-400 h-2 rounded-full"
                style={{ width: `${Math.min(previousWidth, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
          {monthlyComparison.change > 0
            ? `Expenses increased by ${monthlyComparison.change.toFixed(1)}% compared to last month`
            : monthlyComparison.change < 0
            ? `Expenses decreased by ${Math.abs(monthlyComparison.change).toFixed(1)}% compared to last month`
            : 'No change in expenses from last month'}
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 dark:from-blue-950 to-blue-100 dark:to-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Key Insights
        </h3>
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li>Your current balance is {format(summary.balance)}</li>
          <li>Average monthly expense is {format(avgMonthlyExpense)}</li>
          <li>{topSpendingCategory.category} is your largest expense category</li>
          <li>You have {monthlyTrend.length} months of transaction history</li>
        </ul>
      </div>
    </div>
  )
}
