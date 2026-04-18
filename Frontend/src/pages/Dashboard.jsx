import { useState, useEffect } from 'react'
import OverviewSection from '../components/OverviewSection'
import TransactionsSection from '../components/TransactionsSection'
import InsightsSection from '../components/InsightsSection'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
export default function Dashboard() {
  const navigate = useNavigate()
  const { setRoleMode } = useData()
  const [activeTab, setActiveTab] = useState('overview')
  const [openTransactionForm, setOpenTransactionForm] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
  }, [navigate])

  const handleAddFirstTransaction = () => {
  setRoleMode('admin')
  setActiveTab('transactions')
  setOpenTransactionForm(true)
}



  return (
    <main className="flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-1 mb-8 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 -mb-px ${
              activeTab === 'overview'
                ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => {
              setActiveTab('transactions')
              setOpenTransactionForm(false)
            }}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 -mb-px ${
              activeTab === 'transactions'
                ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Transactions
          </button>

          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 -mb-px ${
              activeTab === 'insights'
                ? 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400'
                : 'text-slate-600 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Insights
          </button>
        </div>

        {activeTab === 'overview' && (
          <OverviewSection onAddFirstTransaction={handleAddFirstTransaction} />
        )}

        {activeTab === 'transactions' && (
          <TransactionsSection
            openForm={openTransactionForm}
            setOpenForm={setOpenTransactionForm}
          />
        )}

        {activeTab === 'insights' && <InsightsSection />}
      </div>
    </main>
  )
}
