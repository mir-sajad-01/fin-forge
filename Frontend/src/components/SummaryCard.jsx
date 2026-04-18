import { useCurrency } from '../hooks/useCurrency'

export default function SummaryCard({ title, value, icon, color, trend }) {
  const { format } = useCurrency()
  return (
    <div className={`bg-gradient-to-br ${color} rounded-lg p-6 text-white shadow-md`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{format(value)}</h3>
        </div>
        <div className="opacity-80">{icon}</div>
      </div>
      {trend && (
        <div className={`text-xs font-medium ${trend.positive ? 'text-green-100' : 'text-red-100'}`}>
          {trend.positive ? '↑' : '↓'} {trend.value}
        </div>
      )}
    </div>
  )
}
