import { useState } from 'react'
import { useData } from '../context/DataContext'
import { getSortedTransactions, filterTransactions } from '../utils/helpers'
import { Plus, Search } from 'lucide-react'
import TransactionForm from './TransactionForm'
import TransactionTable from './TransactionTable'

export default function TransactionsSection({ openForm = false, setOpenForm }) {
  const { transactions, deleteTransaction, role } = useData()
  const [internalShowForm, setInternalShowForm] = useState(false)

const showForm = typeof setOpenForm === 'function' ? openForm : internalShowForm
const setShowForm = typeof setOpenForm === 'function' ? setOpenForm : setInternalShowForm

  const [editingId, setEditingId] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date'
  })

  const allCategories = [...new Set(transactions.map(t => t.category))]

  let filtered = filterTransactions(transactions, filters)
  filtered = getSortedTransactions(filtered, filters.sortBy)

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id)
    }
  }

  const handleEditClick = (transaction) => {
    setEditingId(transaction._id)
    setShowForm(true)
  }

  return (
    <div className="space-y-6">
      {/* Form Section */}
      {showForm && (
        <TransactionForm
          editingId={editingId}
          onClose={() => {
            setShowForm(false)
            setEditingId(null)
          }}
        />
      )}

      {/* Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Type Filter */}
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
          >
            <option value="all">All Categories</option>
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
          >
            <option value="date">Newest First</option>
            <option value="amount-high">Highest Amount</option>
            <option value="amount-low">Lowest Amount</option>
          </select>

          {/* Add Button */}
          {role === 'admin' && (
            <button
              onClick={() => {
                setEditingId(null)
                setShowForm(!showForm)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Transactions Table */}
      <TransactionTable
        transactions={filtered}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

    
      {filtered.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-16 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <Plus className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
              No transactions found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {transactions.length === 0
                ? 'Add your first transaction using the button above'
                : 'Try adjusting your filters'}
            </p>
          </div>
        </div>
      )}


    </div>
  )
}

