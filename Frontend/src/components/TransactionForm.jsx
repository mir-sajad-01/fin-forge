import { useState } from 'react'
import { X } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useCurrency } from '../hooks/useCurrency'

const CATEGORIES = [
  'Salary', 'Freelance', 'Groceries', 'Utilities', 'Rent',
  'Entertainment', 'Healthcare', 'Transport'
]

export default function TransactionForm({ editingId, onClose }) {
  const { transactions, addTransaction, updateTransaction, exchangeRates } = useData()
  const { currency } = useCurrency()
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState(() => {
    if (editingId) {
      const transaction = transactions.find(item => item._id === editingId)

      if (transaction) {
        const rate = exchangeRates[currency] || 1

        return {
          date: transaction.date,
          amount: parseFloat((transaction.amount * rate).toFixed(2)),
          category: transaction.category,
          type: transaction.type,
          description: transaction.description
        }
      }
    }

    return {
      date: new Date().toISOString().split('T')[0],
      amount: '',
      category: 'Groceries',
      type: 'expense',
      description: ''
    }
  })

  const validateForm = () => {
    const nextErrors = {}

    if (!formData.date) {
      nextErrors.date = 'Date is required'
    }

    if (!formData.amount || Number.isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      nextErrors.amount = 'Amount must be greater than 0'
    }

    if (!formData.description || !formData.description.trim()) {
      nextErrors.description = 'Description is required'
    }

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validateForm()

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setSubmitError('')
    setIsSubmitting(true)

    const rate = exchangeRates[currency] || 1
    const amountInInr = Number(formData.amount) / rate
    const payload = {
      ...formData,
      description: formData.description.trim(),
      amount: Number(amountInInr.toFixed(2))
    }

    try {
      if (editingId) {
        await updateTransaction(editingId, payload)
      } else {
        await addTransaction(payload)
      }

      onClose()
    } catch (requestError) {
      setSubmitError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData(prev => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors(prev => {
        const nextErrors = { ...prev }
        delete nextErrors[name]
        return nextErrors
      })
    }

    if (submitError) {
      setSubmitError('')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {editingId ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === 'income'}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Income</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === 'expense'}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Expense</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Amount ({currency})
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
            />
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:text-white"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {submitError && (
            <p className="text-sm text-red-600">{submitError}</p>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-60"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : `${editingId ? 'Update' : 'Add'} Transaction`}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-medium py-2 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
