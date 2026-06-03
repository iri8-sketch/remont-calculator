"use client"

import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import Link from "next/link"
import { CalculatorParams } from "@/types"
import { calculateEstimate, formatMoney } from "@/lib/calculate"
import EstimateTable from "@/components/EstimateTable"
import FinanceCalendar from "@/components/FinanceCalendar"
import SavingsTips from "@/components/SavingsTips"

const HOUSE_LABELS: Record<string, string> = {
  new_rough: "Новостройка черновая", new_fine: "Новостройка чистовая",
  khrushchevka: "Хрущёвка", panel: "Панельный дом", monolith: "Монолит", private: "Частный дом",
}
const RENO_LABELS: Record<string, string> = {
  cosmetic: "Косметический", standard: "Стандартный", capital: "Капитальный", premium: "Премиум",
}
const REGION_LABELS: Record<string, string> = {
  almaty: "Алматы", astana: "Астана", other: "Другой город",
}

export default function ResultContent() {
  const searchParams = useSearchParams()
  const raw = searchParams.get("params")

  const params: CalculatorParams | null = useMemo(() => {
    if (!raw) return null
    try { return JSON.parse(decodeURIComponent(raw)) } catch { return null }
  }, [raw])

  const estimate = useMemo(() => params ? calculateEstimate(params) : null, [params])

  if (!params || !estimate) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Параметры не найдены.</p>
        <Link href="/calculator" className="text-blue-600 hover:underline">Заполнить форму заново</Link>
      </div>
    )
  }

  const handlePrint = () => window.print()

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 print:bg-white print:py-4">
      <div className="max-w-3xl mx-auto">
        {/* Шапка */}
        <div className="flex items-start justify-between mb-8 print:hidden">
          <div>
            <Link href="/calculator" className="text-sm text-gray-400 hover:text-gray-600">← Изменить параметры</Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-3">Ваша смета на ремонт</h1>
            <p className="text-gray-500 text-sm mt-1">
              {HOUSE_LABELS[params.houseType]} · {params.area} м² · {params.rooms} комн. ·{" "}
              {RENO_LABELS[params.renovationType]} · {REGION_LABELS[params.region]}
            </p>
          </div>
          <button onClick={handlePrint}
            className="hidden md:flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
            📄 Скачать PDF
          </button>
        </div>

        {/* Итоговая сумма */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6">
          <p className="text-blue-200 text-sm mb-1">Общая стоимость ремонта</p>
          <p className="text-3xl font-bold mb-4">
            {formatMoney(estimate.grandTotalMin)} — {formatMoney(estimate.grandTotalMax)}
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-blue-200">Работы</p>
              <p className="font-semibold">{formatMoney(estimate.totalWorkMin)} — {formatMoney(estimate.totalWorkMax)}</p>
            </div>
            <div>
              <p className="text-blue-200">Материалы</p>
              <p className="font-semibold">{formatMoney(estimate.totalMaterialMin)} — {formatMoney(estimate.totalMaterialMax)}</p>
            </div>
            <div>
              <p className="text-blue-200">Резерв 10–15%</p>
              <p className="font-semibold">{formatMoney(estimate.reserveMin)} — {formatMoney(estimate.reserveMax)}</p>
            </div>
          </div>
        </div>

        {/* Разбивка по этапам */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Разбивка по этапам</h2>
          <EstimateTable stages={estimate.stages} />
        </section>

        {/* Финансовый календарь */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Финансовый календарь</h2>
          <FinanceCalendar calendar={estimate.financeCalendar} grandTotalMax={estimate.grandTotalMax} />
        </section>

        {/* Советы */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Советы по экономии</h2>
          <SavingsTips renovationType={params.renovationType} />
        </section>

        {/* CTA */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center print:hidden">
          <p className="text-gray-500 text-sm mb-4">
            Смета актуальна на {estimate.updatedAt}. Цены могут меняться в зависимости от объёма работ и конкретного мастера.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={handlePrint}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              📄 Скачать PDF
            </button>
            <Link href="/calculator"
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-center">
              Пересчитать
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
