import { CalculatorParams, EstimateResult, StageEstimate, MonthlyPayment } from "@/types"
import { getPrices } from "./prices"

// Этапы, которые пропускаются для чистовой новостройки
const SKIP_FOR_FINE: number[] = [1, 2] // демонтаж и черновые

export function calculateEstimate(params: CalculatorParams): EstimateResult {
  const { houseType, area, renovationType, region } = params
  const priceRecords = getPrices(region, renovationType, houseType)

  const stages: StageEstimate[] = priceRecords
    .filter(p => {
      if (houseType === "new_fine" && SKIP_FOR_FINE.includes(p.stageNumber)) return false
      if (renovationType === "cosmetic" && p.stageNumber === 2) return false
      return true
    })
    .map(p => {
      const workMin = Math.round(p.workMin * area)
      const workMax = Math.round(p.workMax * area)
      const materialMin = Math.round(p.materialMin * area)
      const materialMax = Math.round(p.materialMax * area)

      const rawDays = p.durationPerSqm * area
      const durationMin = Math.max(p.minDays, Math.round(rawDays * 0.8))
      const durationMax = Math.max(p.minDays + 2, Math.round(rawDays * 1.3))

      return { stageNumber: p.stageNumber, stageName: p.stageName, workMin, workMax, materialMin, materialMax, durationMin, durationMax }
    })

  const totalWorkMin = stages.reduce((s, x) => s + x.workMin, 0)
  const totalWorkMax = stages.reduce((s, x) => s + x.workMax, 0)
  const totalMaterialMin = stages.reduce((s, x) => s + x.materialMin, 0)
  const totalMaterialMax = stages.reduce((s, x) => s + x.materialMax, 0)
  const totalMin = totalWorkMin + totalMaterialMin
  const totalMax = totalWorkMax + totalMaterialMax
  const reserveMin = Math.round(totalMin * 0.10)
  const reserveMax = Math.round(totalMax * 0.15)
  const grandTotalMin = totalMin + reserveMin
  const grandTotalMax = totalMax + reserveMax

  const financeCalendar = buildCalendar(stages)

  return {
    params,
    stages,
    totalWorkMin,
    totalWorkMax,
    totalMaterialMin,
    totalMaterialMax,
    totalMin,
    totalMax,
    reserveMin,
    reserveMax,
    grandTotalMin,
    grandTotalMax,
    financeCalendar,
    updatedAt: "2026-06-01",
  }
}

function buildCalendar(stages: StageEstimate[]): MonthlyPayment[] {
  // Группируем этапы по месяцам по порядку
  const MONTH_NAMES = ["Месяц 1", "Месяц 2", "Месяц 3", "Месяц 4", "Месяц 5", "Месяц 6"]
  const calendar: MonthlyPayment[] = []

  let daysCursor = 0
  let monthIdx = 0
  const monthDays = 30

  const monthBuckets: { [m: number]: StageEstimate[] } = {}

  for (const stage of stages) {
    const stageMonth = Math.floor(daysCursor / monthDays)
    if (!monthBuckets[stageMonth]) monthBuckets[stageMonth] = []
    monthBuckets[stageMonth].push(stage)
    daysCursor += stage.durationMax
  }

  for (const [m, stgs] of Object.entries(monthBuckets)) {
    const idx = parseInt(m)
    calendar.push({
      month: idx + 1,
      label: MONTH_NAMES[idx] ?? `Месяц ${idx + 1}`,
      amountMin: stgs.reduce((s, x) => s + x.workMin + x.materialMin, 0),
      amountMax: stgs.reduce((s, x) => s + x.workMax + x.materialMax, 0),
      stages: stgs.map(s => s.stageName),
    })
  }

  return calendar
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("ru-KZ", { maximumFractionDigits: 0 }).format(amount) + " ₸"
}
