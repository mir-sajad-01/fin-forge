import { Bar, CartesianGrid, BarChart, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowRight, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { useFinancialData } from '../hooks/useFinancialData'
import { getCategoryColor } from '../utils/helpers'
import { useCurrency } from '../hooks/useCurrency'
import SummaryCard from './SummaryCard'


export default function OverviewSection({ onAddFirstTransaction }) {
  const { summary, monthlyTrend, categoryBreakdown, monthlyComparison } = useFinancialData()
  const { format } = useCurrency()

  const currentMonthIncome = monthlyTrend.length > 0
    ? monthlyTrend[monthlyTrend.length - 1]?.income || 0
    : 0

  const previousMonthIncome = monthlyTrend.length > 1
    ? monthlyTrend[monthlyTrend.length - 2]?.income || 0
    : 0

  const incomeChange = previousMonthIncome > 0
    ? (((currentMonthIncome - previousMonthIncome) / previousMonthIncome) * 100).toFixed(1)
    : null

  const expenseChange = monthlyComparison.previous > 0
    ? monthlyComparison.change.toFixed(1)
    : null

  if (monthlyTrend.length === 0) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard
            title="Total Balance"
            value={0}
            icon={<Wallet className="w-8 h-8" />}
            color="from-blue-500 to-blue-600"
            trend={null}
          />
          <SummaryCard
            title="Total Income"
            value={0}
            icon={<TrendingUp className="w-8 h-8" />}
            color="from-green-500 to-green-600"
            trend={null}
          />
          <SummaryCard
            title="Total Expenses"
            value={0}
            icon={<TrendingDown className="w-8 h-8" />}
            color="from-red-500 to-red-600"
            trend={null}
          />
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-8 md:p-10 shadow-sm">
          <div className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-blue-200/50 dark:bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-10 left-0 h-40 w-40 rounded-full bg-emerald-200/50 dark:bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
                <Wallet className="h-8 w-8" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Start building your financial overview
              </h2>

              <p className="mt-3 max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-300">
                Add your first income or expense to unlock balance tracking,
                category insights, and monthly trend analysis.
              </p>

              <button
                onClick={onAddFirstTransaction}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
              >
                Add First Transaction
                <ArrowRight className="h-4 w-4" />
              </button>




              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                Your dashboard will automatically update as soon as you add a transaction.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 p-5 backdrop-blur-sm shadow-sm">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Balance Overview
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Track your total balance with income and expense summaries in one place.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 p-5 backdrop-blur-sm shadow-sm">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Spending Insights
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Understand where your money goes with category-wise breakdowns.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/60 p-5 backdrop-blur-sm shadow-sm">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Monthly Trends
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Visualize income and expenses over time through interactive charts.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/40 p-6">
              <div className="flex items-end justify-between gap-3 h-40">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 rounded-t-xl bg-blue-200 dark:bg-blue-500/30 h-16" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Jan</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 rounded-t-xl bg-blue-300 dark:bg-blue-500/40 h-24" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Feb</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 rounded-t-xl bg-blue-400 dark:bg-blue-500/50 h-20" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Mar</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 rounded-t-xl bg-blue-500 dark:bg-blue-500/60 h-32" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Apr</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 rounded-t-xl bg-blue-300 dark:bg-blue-500/40 h-24" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">May</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 rounded-t-xl bg-blue-600 dark:bg-blue-500/70 h-36" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">Jun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          title="Total Balance"
          value={summary.balance}
          icon={<Wallet className="w-8 h-8" />}
          color="from-blue-500 to-blue-600"
          trend={null}
        />
        <SummaryCard
          title="Total Income"
          value={summary.income}
          icon={<TrendingUp className="w-8 h-8" />}
          color="from-green-500 to-green-600"
          trend={incomeChange !== null ? {
            value: `${incomeChange > 0 ? '+' : ''}${incomeChange}%`,
            positive: incomeChange >= 0
          } : null}
        />
        <SummaryCard
          title="Total Expenses"
          value={summary.expenses}
          icon={<TrendingDown className="w-8 h-8" />}
          color="from-red-500 to-red-600"
          trend={expenseChange !== null ? {
            value: `${expenseChange > 0 ? '+' : ''}${expenseChange}%`,
            positive: expenseChange <= 0
          } : null}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Balance Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '6px',
                  color: '#f1f5f9'
                }}
                formatter={(value) => format(value)}
              />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} />
              <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Spending by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryBreakdown}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {categoryBreakdown.map((entry, index) => (
                  <Cell key={`category-cell-${index}`} fill={getCategoryColor(entry.category)} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => format(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Monthly Income vs Expenses</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '6px',
                color: '#f1f5f9'
              }}
              formatter={(value) => format(value)}
            />
            <Legend />
            <Bar dataKey="income" fill="#10b981" name="Income" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
