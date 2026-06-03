import { StageEstimate } from "@/types"
import { formatMoney } from "@/lib/calculate"

interface Props {
  stages: StageEstimate[]
}

export default function EstimateTable({ stages }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-left">
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">Этап</th>
            <th className="px-4 py-3 font-medium text-right">Работы</th>
            <th className="px-4 py-3 font-medium text-right">Материалы</th>
            <th className="px-4 py-3 font-medium text-right">Срок</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {stages.map(s => (
            <tr key={s.stageNumber} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3.5 text-gray-400 font-mono">{s.stageNumber}</td>
              <td className="px-4 py-3.5 font-medium text-gray-900">{s.stageName}</td>
              <td className="px-4 py-3.5 text-right text-gray-600 whitespace-nowrap">
                {formatMoney(s.workMin)} — {formatMoney(s.workMax)}
              </td>
              <td className="px-4 py-3.5 text-right text-gray-600 whitespace-nowrap">
                {s.materialMin > 0 ? `${formatMoney(s.materialMin)} — ${formatMoney(s.materialMax)}` : "—"}
              </td>
              <td className="px-4 py-3.5 text-right text-gray-500 whitespace-nowrap">
                {s.durationMin}–{s.durationMax} дн.
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
