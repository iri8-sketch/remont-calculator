import { MonthlyPayment } from "@/types"
import { formatMoney } from "@/lib/calculate"

interface Props {
  calendar: MonthlyPayment[]
  grandTotalMax: number
}

export default function FinanceCalendar({ calendar, grandTotalMax }: Props) {
  const maxAmount = Math.max(...calendar.map(c => c.amountMax))

  return (
    <div className="space-y-3">
      {calendar.map(month => {
        const barWidth = grandTotalMax > 0 ? (month.amountMax / grandTotalMax) * 100 : 0
        return (
          <div key={month.month} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">{month.label}</span>
              <span className="text-sm font-medium text-blue-700">
                {formatMoney(month.amountMin)} — {formatMoney(month.amountMax)}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full mb-2">
              <div
                className="h-2 bg-blue-500 rounded-full transition-all"
                style={{ width: `${Math.min(barWidth, 100)}%` }}
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {month.stages.map(s => (
                <span key={s} className="text-xs bg-white text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )
      })}
      <p className="text-xs text-gray-400 mt-2">
        * Суммы указаны ориентировочно. График может меняться в зависимости от хода работ.
      </p>
    </div>
  )
}
