import StepForm from "@/components/StepForm"
import Link from "next/link"

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← На главную
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Калькулятор ремонта</h1>
          <p className="text-gray-500 mt-1">Ответьте на 4 вопроса — получите смету</p>
        </div>
        <StepForm />
      </div>
    </main>
  )
}
