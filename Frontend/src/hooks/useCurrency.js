import { useData } from '../context/DataContext'
import { formatCurrency } from '../utils/helpers'

export function useCurrency() {
  const { currency, changeCurrency, exchangeRates } = useData()

  const format = (amount) => {
    const rate = exchangeRates[currency] || 1
    const converted = amount * rate
    return formatCurrency(converted, currency)
  }

  return { currency, changeCurrency, format }
}