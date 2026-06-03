import { Suspense } from "react"
import ResultContent from "./ResultContent"

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Считаем смету...</div>}>
      <ResultContent />
    </Suspense>
  )
}
