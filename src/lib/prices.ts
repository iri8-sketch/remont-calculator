import { HouseType, RenovationType, Region } from "@/types"

// Цены в тенге за м² (работы + материалы)
// Источник: рыночные ставки Алматы/Астаны, 2025–2026

export interface PriceRecord {
  stageNumber: number
  stageName: string
  workMin: number   // тг/м²
  workMax: number
  materialMin: number
  materialMax: number
  durationPerSqm: number  // дней на 10 м²
  minDays: number
}

type PriceKey = `${Region}_${RenovationType}`

const BASE_PRICES: Record<string, PriceRecord[]> = {
  // ─── АЛМАТЫ ───────────────────────────────────────────
  almaty_cosmetic: [
    { stageNumber: 1, stageName: "Демонтаж",                      workMin: 800,   workMax: 1500,  materialMin: 0,    materialMax: 500,   durationPerSqm: 0.3, minDays: 2 },
    { stageNumber: 2, stageName: "Черновые работы",                workMin: 0,    workMax: 0,    materialMin: 0,    materialMax: 0,     durationPerSqm: 0,   minDays: 0 },
    { stageNumber: 3, stageName: "Электрика (частичная)",          workMin: 1000,  workMax: 2000,  materialMin: 500,  materialMax: 1500,  durationPerSqm: 0.5, minDays: 3 },
    { stageNumber: 4, stageName: "Сантехника (частичная)",         workMin: 500,   workMax: 1000,  materialMin: 300,  materialMax: 1000,  durationPerSqm: 0.3, minDays: 2 },
    { stageNumber: 5, stageName: "Выравнивание стен и потолков",   workMin: 1500,  workMax: 3000,  materialMin: 800,  materialMax: 1500,  durationPerSqm: 0.8, minDays: 5 },
    { stageNumber: 6, stageName: "Укладка плитки",                 workMin: 2000,  workMax: 4000,  materialMin: 3000, materialMax: 8000,  durationPerSqm: 1.0, minDays: 3 },
    { stageNumber: 7, stageName: "Чистовая отделка",               workMin: 2500,  workMax: 5000,  materialMin: 2000, materialMax: 5000,  durationPerSqm: 1.2, minDays: 5 },
    { stageNumber: 8, stageName: "Двери, окна, финальная отделка", workMin: 500,   workMax: 1500,  materialMin: 1000, materialMax: 5000,  durationPerSqm: 0.3, minDays: 3 },
  ],
  almaty_standard: [
    { stageNumber: 1, stageName: "Демонтаж",                      workMin: 1000,  workMax: 2500,  materialMin: 0,    materialMax: 500,   durationPerSqm: 0.4, minDays: 2 },
    { stageNumber: 2, stageName: "Черновые работы",                workMin: 3000,  workMax: 6000,  materialMin: 2000, materialMax: 5000,  durationPerSqm: 2.0, minDays: 10 },
    { stageNumber: 3, stageName: "Электрика",                      workMin: 2000,  workMax: 4000,  materialMin: 1500, materialMax: 3000,  durationPerSqm: 0.8, minDays: 7 },
    { stageNumber: 4, stageName: "Сантехника",                     workMin: 1500,  workMax: 3000,  materialMin: 2000, materialMax: 5000,  durationPerSqm: 0.6, minDays: 5 },
    { stageNumber: 5, stageName: "Выравнивание стен и потолков",   workMin: 2500,  workMax: 5000,  materialMin: 1500, materialMax: 3000,  durationPerSqm: 1.5, minDays: 7 },
    { stageNumber: 6, stageName: "Укладка плитки",                 workMin: 3000,  workMax: 6000,  materialMin: 5000, materialMax: 12000, durationPerSqm: 1.2, minDays: 5 },
    { stageNumber: 7, stageName: "Чистовая отделка",               workMin: 3500,  workMax: 7000,  materialMin: 3000, materialMax: 8000,  durationPerSqm: 1.5, minDays: 7 },
    { stageNumber: 8, stageName: "Двери, окна, финальная отделка", workMin: 1000,  workMax: 3000,  materialMin: 3000, materialMax: 10000, durationPerSqm: 0.5, minDays: 4 },
  ],
  almaty_capital: [
    { stageNumber: 1, stageName: "Демонтаж",                      workMin: 1500,  workMax: 3000,  materialMin: 0,    materialMax: 500,   durationPerSqm: 0.5, minDays: 3 },
    { stageNumber: 2, stageName: "Черновые работы",                workMin: 5000,  workMax: 10000, materialMin: 4000, materialMax: 8000,  durationPerSqm: 2.5, minDays: 14 },
    { stageNumber: 3, stageName: "Электрика",                      workMin: 3000,  workMax: 6000,  materialMin: 2500, materialMax: 5000,  durationPerSqm: 1.0, minDays: 7 },
    { stageNumber: 4, stageName: "Сантехника",                     workMin: 2500,  workMax: 5000,  materialMin: 3000, materialMax: 8000,  durationPerSqm: 0.8, minDays: 7 },
    { stageNumber: 5, stageName: "Выравнивание стен и потолков",   workMin: 4000,  workMax: 8000,  materialMin: 2500, materialMax: 5000,  durationPerSqm: 2.0, minDays: 10 },
    { stageNumber: 6, stageName: "Укладка плитки",                 workMin: 5000,  workMax: 10000, materialMin: 8000, materialMax: 20000, durationPerSqm: 1.5, minDays: 7 },
    { stageNumber: 7, stageName: "Чистовая отделка",               workMin: 5000,  workMax: 10000, materialMin: 5000, materialMax: 12000, durationPerSqm: 2.0, minDays: 10 },
    { stageNumber: 8, stageName: "Двери, окна, финальная отделка", workMin: 2000,  workMax: 5000,  materialMin: 5000, materialMax: 15000, durationPerSqm: 0.6, minDays: 5 },
  ],
  almaty_premium: [
    { stageNumber: 1, stageName: "Демонтаж",                      workMin: 2000,  workMax: 5000,  materialMin: 0,    materialMax: 1000,  durationPerSqm: 0.5, minDays: 3 },
    { stageNumber: 2, stageName: "Черновые работы",                workMin: 8000,  workMax: 15000, materialMin: 6000, materialMax: 12000, durationPerSqm: 3.0, minDays: 14 },
    { stageNumber: 3, stageName: "Электрика (умный дом)",          workMin: 6000,  workMax: 12000, materialMin: 5000, materialMax: 12000, durationPerSqm: 1.5, minDays: 10 },
    { stageNumber: 4, stageName: "Сантехника (премиум)",           workMin: 5000,  workMax: 10000, materialMin: 8000, materialMax: 25000, durationPerSqm: 1.0, minDays: 10 },
    { stageNumber: 5, stageName: "Выравнивание стен и потолков",   workMin: 7000,  workMax: 14000, materialMin: 4000, materialMax: 8000,  durationPerSqm: 2.5, minDays: 14 },
    { stageNumber: 6, stageName: "Укладка плитки (премиум)",       workMin: 8000,  workMax: 16000, materialMin: 15000,materialMax: 40000, durationPerSqm: 2.0, minDays: 10 },
    { stageNumber: 7, stageName: "Чистовая отделка (премиум)",     workMin: 8000,  workMax: 16000, materialMin: 10000,materialMax: 25000, durationPerSqm: 2.5, minDays: 14 },
    { stageNumber: 8, stageName: "Двери, окна, финальная отделка", workMin: 4000,  workMax: 8000,  materialMin: 10000,materialMax: 30000, durationPerSqm: 0.8, minDays: 7 },
  ],
}

// Астана: коэффициент 0.95 от Алматы
// Другой город: коэффициент 0.8
const REGION_MULTIPLIERS: Record<Region, number> = {
  almaty: 1.0,
  astana: 0.95,
  other: 0.80,
}

// Хрущёвки и панельки требуют больше черновых работ (+20%)
const HOUSE_TYPE_MULTIPLIERS: Record<HouseType, number> = {
  new_rough:    1.0,
  new_fine:     0.7,  // чистовая новостройка — меньше работ
  khrushchevka: 1.3,
  panel:        1.2,
  monolith:     1.05,
  private:      1.15,
}

export function getPrices(region: Region, renovationType: RenovationType, houseType: HouseType): PriceRecord[] {
  // Для Астаны и других городов используем базу Алматы с коэффициентом
  const key: PriceKey = `almaty_${renovationType}`
  const base = BASE_PRICES[key] ?? BASE_PRICES["almaty_standard"]

  const regionMult = REGION_MULTIPLIERS[region]
  const houseMult = HOUSE_TYPE_MULTIPLIERS[houseType]
  const mult = regionMult * houseMult

  return base.map(p => ({
    ...p,
    workMin: Math.round(p.workMin * mult),
    workMax: Math.round(p.workMax * mult),
    materialMin: Math.round(p.materialMin * mult),
    materialMax: Math.round(p.materialMax * mult),
  }))
}
