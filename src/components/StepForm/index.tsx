"use client"

import { useState } from "react"
import { CalculatorParams, HouseType, RenovationType, Region } from "@/types"
import { useRouter } from "next/navigation"

const HOUSE_TYPES: { value: HouseType; label: string; desc: string }[] = [
  { value: "new_rough",    label: "Новостройка черновая",  desc: "Голые стены, нет стяжки и штукатурки" },
  { value: "new_fine",     label: "Новостройка чистовая",  desc: "Стяжка, штукатурка уже сделаны" },
  { value: "khrushchevka", label: "Хрущёвка",              desc: "Старый фонд, нужен капитальный ремонт" },
  { value: "panel",        label: "Панельный дом",          desc: "Типовая планировка, панельные стены" },
  { value: "monolith",     label: "Монолит",                desc: "Современный монолитный дом" },
  { value: "private",      label: "Частный дом",            desc: "Отдельностоящий дом" },
]

const RENOVATION_TYPES: { value: RenovationType; label: string; desc: string; color: string }[] = [
  { value: "cosmetic",  label: "Косметический", desc: "Обои, покраска, замена напольного покрытия",   color: "bg-green-50 border-green-300 text-green-800" },
  { value: "standard",  label: "Стандартный",   desc: "Полная отделка без перепланировки",             color: "bg-blue-50 border-blue-300 text-blue-800" },
  { value: "capital",   label: "Капитальный",   desc: "Перепланировка, замена всех коммуникаций",      color: "bg-orange-50 border-orange-300 text-orange-800" },
  { value: "premium",   label: "Премиум",        desc: "Дизайнерский ремонт под ключ",                  color: "bg-purple-50 border-purple-300 text-purple-800" },
]

const REGIONS: { value: Region; label: string }[] = [
  { value: "almaty", label: "Алматы" },
  { value: "astana", label: "Астана" },
  { value: "other",  label: "Другой город" },
]

const STEPS = ["Тип жилья", "Параметры", "Тип ремонта", "Регион"]

interface FormState {
  houseType: HouseType | ""
  area: string
  rooms: string
  bathrooms: string
  bathroomType: "combined" | "separate"
  renovationType: RenovationType | ""
  region: Region | ""
  budget: string
}

const EMPTY: FormState = {
  houseType: "", area: "", rooms: "2", bathrooms: "1",
  bathroomType: "combined", renovationType: "", region: "", budget: "",
}

export default function StepForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(EMPTY)
  const [error, setError] = useState("")

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(f => ({ ...f, [key]: value }))
    setError("")
  }

  function validate(): boolean {
    if (step === 0 && !form.houseType) { setError("Выберите тип жилья"); return false }
    if (step === 1) {
      if (!form.area || isNaN(Number(form.area)) || Number(form.area) < 10) {
        setError("Укажите площадь (не менее 10 м²)"); return false
      }
    }
    if (step === 2 && !form.renovationType) { setError("Выберите тип ремонта"); return false }
    if (step === 3 && !form.region) { setError("Выберите регион"); return false }
    return true
  }

  function next() {
    if (!validate()) return
    if (step < STEPS.length - 1) { setStep(s => s + 1) }
    else { submit() }
  }

  function submit() {
    if (!validate()) return
    const params: CalculatorParams = {
      houseType: form.houseType as HouseType,
      area: Number(form.area),
      rooms: Number(form.rooms),
      bathrooms: Number(form.bathrooms),
      bathroomType: form.bathroomType,
      renovationType: form.renovationType as RenovationType,
      region: form.region as Region,
      budget: form.budget ? Number(form.budget) : undefined,
    }
    const encoded = encodeURIComponent(JSON.stringify(params))
    router.push(`/result?params=${encoded}`)
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Прогресс */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((label, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0
              ${i < step ? "bg-blue-600 text-white" : i === step ? "bg-blue-600 text-white ring-4 ring-blue-100" : "bg-gray-100 text-gray-400"}`}>
              {i < step ? "✓" : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-1 flex-1 rounded ${i < step ? "bg-blue-600" : "bg-gray-100"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">{STEPS[step]}</h2>
        <p className="text-sm text-gray-500 mb-6">Шаг {step + 1} из {STEPS.length}</p>

        {/* ШАГ 0: Тип жилья */}
        {step === 0 && (
          <div className="grid grid-cols-1 gap-3">
            {HOUSE_TYPES.map(h => (
              <button key={h.value}
                onClick={() => set("houseType", h.value)}
                className={`text-left p-4 rounded-xl border-2 transition-all
                  ${form.houseType === h.value ? "border-blue-500 bg-blue-50" : "border-gray-100 hover:border-blue-200"}`}>
                <div className="font-medium text-gray-900">{h.label}</div>
                <div className="text-sm text-gray-500 mt-0.5">{h.desc}</div>
              </button>
            ))}
          </div>
        )}

        {/* ШАГ 1: Параметры квартиры */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Общая площадь (м²)</label>
              <input type="number" min="10" max="1000" placeholder="50"
                value={form.area}
                onChange={e => set("area", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Количество комнат</label>
              <div className="flex gap-2">
                {["1","2","3","4+"].map(r => (
                  <button key={r} onClick={() => set("rooms", r === "4+" ? "4" : r)}
                    className={`flex-1 py-3 rounded-xl border-2 font-semibold transition-all
                      ${form.rooms === (r === "4+" ? "4" : r) ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-100 text-gray-600 hover:border-blue-200"}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Санузел</label>
              <div className="flex gap-2">
                {([["combined","Совмещённый"],["separate","Раздельный"]] as const).map(([val, lbl]) => (
                  <button key={val} onClick={() => set("bathroomType", val)}
                    className={`flex-1 py-3 rounded-xl border-2 font-medium transition-all text-sm
                      ${form.bathroomType === val ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-100 text-gray-600 hover:border-blue-200"}`}>
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Бюджет (необязательно)</label>
              <input type="number" placeholder="Например: 5 000 000"
                value={form.budget}
                onChange={e => set("budget", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <p className="text-xs text-gray-400 mt-1">Укажите, если хотите подобрать оптимальный сценарий</p>
            </div>
          </div>
        )}

        {/* ШАГ 2: Тип ремонта */}
        {step === 2 && (
          <div className="grid grid-cols-1 gap-3">
            {RENOVATION_TYPES.map(r => (
              <button key={r.value}
                onClick={() => set("renovationType", r.value)}
                className={`text-left p-4 rounded-xl border-2 transition-all
                  ${form.renovationType === r.value ? `border-blue-500 ${r.color}` : "border-gray-100 hover:border-blue-200"}`}>
                <div className="font-semibold">{r.label}</div>
                <div className="text-sm opacity-80 mt-0.5">{r.desc}</div>
              </button>
            ))}
          </div>
        )}

        {/* ШАГ 3: Регион */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              {REGIONS.map(r => (
                <button key={r.value}
                  onClick={() => set("region", r.value)}
                  className={`py-4 rounded-xl border-2 font-medium transition-all
                    ${form.region === r.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-100 text-gray-700 hover:border-blue-200"}`}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
              Назад
            </button>
          )}
          <button onClick={next}
            className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">
            {step === STEPS.length - 1 ? "Рассчитать смету" : "Далее"}
          </button>
        </div>
      </div>
    </div>
  )
}
