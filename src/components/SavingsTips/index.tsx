import { RenovationType } from "@/types"

interface Props {
  renovationType: RenovationType
}

const TIPS: Record<RenovationType, { diy: string[]; noSave: string[]; rookie: string[] }> = {
  cosmetic: {
    diy: ["Покраска стен и потолков", "Поклейка обоев", "Укладка ламината"],
    noSave: ["Электрика — безопасность важнее экономии"],
    rookie: ["Покупать обои с запасом менее 15%", "Игнорировать подготовку стен перед покраской"],
  },
  standard: {
    diy: ["Покраска стен", "Сборка мебели", "Монтаж карнизов и плинтусов"],
    noSave: ["Электрика и распределительный щиток", "Гидроизоляция в ванной"],
    rookie: ["Экономить на затирке для плитки — она трескается", "Не делать схему электрики до начала работ"],
  },
  capital: {
    diy: ["Финальная уборка", "Сборка мебели", "Мелкие декоративные работы"],
    noSave: ["Электрика — нужен сертифицированный электрик", "Сантехника — некачественные трубы = потоп", "Гидроизоляция"],
    rookie: ["Начинать чистовую отделку до высыхания стяжки (21+ дней)", "Не проверять уровень полов перед укладкой плитки"],
  },
  premium: {
    diy: ["Авторский надзор за работами — можно делегировать"],
    noSave: ["Всё, что скрыто за стенами: электрика, трубы, изоляция", "Гидроизоляция ванной и кухни"],
    rookie: ["Согласовывать перепланировку задним числом", "Заказывать материалы без учёта боя (10–15% запаса)"],
  },
}

export default function SavingsTips({ renovationType }: Props) {
  const tips = TIPS[renovationType]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <TipCard
        icon="🔧"
        title="Можно сделать самостоятельно"
        items={tips.diy}
        color="bg-green-50 border-green-100"
        textColor="text-green-800"
      />
      <TipCard
        icon="⚡"
        title="Нельзя экономить"
        items={tips.noSave}
        color="bg-red-50 border-red-100"
        textColor="text-red-800"
      />
      <TipCard
        icon="💡"
        title="Ошибки новичков"
        items={tips.rookie}
        color="bg-yellow-50 border-yellow-100"
        textColor="text-yellow-800"
      />
    </div>
  )
}

function TipCard({ icon, title, items, color, textColor }: {
  icon: string; title: string; items: string[]; color: string; textColor: string
}) {
  return (
    <div className={`rounded-xl border p-4 ${color}`}>
      <div className="text-2xl mb-2">{icon}</div>
      <h4 className={`font-semibold text-sm mb-3 ${textColor}`}>{title}</h4>
      <ul className="space-y-1.5">
        {items.map(item => (
          <li key={item} className="text-sm text-gray-700 flex gap-2">
            <span className="shrink-0 mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
