export type HouseType =
  | "new_rough"      // новостройка черновая
  | "new_fine"       // новостройка чистовая
  | "khrushchevka"   // хрущёвка
  | "panel"          // панельный
  | "monolith"       // монолит
  | "private"        // частный дом

export type RenovationType =
  | "cosmetic"       // косметический
  | "standard"       // стандартный
  | "capital"        // капитальный
  | "premium"        // под ключ премиум

export type Region = "almaty" | "astana" | "other"

export interface CalculatorParams {
  houseType: HouseType
  area: number
  rooms: number
  bathrooms: number
  bathroomType: "combined" | "separate"
  renovationType: RenovationType
  region: Region
  budget?: number
}

export interface StageEstimate {
  stageNumber: number
  stageName: string
  workMin: number
  workMax: number
  materialMin: number
  materialMax: number
  durationMin: number
  durationMax: number
}

export interface EstimateResult {
  params: CalculatorParams
  stages: StageEstimate[]
  totalWorkMin: number
  totalWorkMax: number
  totalMaterialMin: number
  totalMaterialMax: number
  totalMin: number
  totalMax: number
  reserveMin: number
  reserveMax: number
  grandTotalMin: number
  grandTotalMax: number
  financeCalendar: MonthlyPayment[]
  updatedAt: string
}

export interface MonthlyPayment {
  month: number
  label: string
  amountMin: number
  amountMax: number
  stages: string[]
}
