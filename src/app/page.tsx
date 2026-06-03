import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Бесплатный калькулятор ремонта
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Узнайте стоимость ремонта<br />
            <span className="text-blue-600">за 2 минуты</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            Введите параметры квартиры — получите детальную смету с разбивкой по этапам,
            срокам и финансовым календарём. По ценам Алматы и Астаны.
          </p>
          <Link href="/calculator"
            className="inline-block bg-blue-600 text-white text-lg font-semibold px-10 py-4 rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
            Рассчитать смету
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: "📊", title: "Детальная смета", desc: "Разбивка по 8 этапам: работы и материалы отдельно" },
            { icon: "📅", title: "Финансовый график", desc: "Когда и сколько денег нужно по месяцам" },
            { icon: "📄", title: "PDF для мастера", desc: "Скачайте смету и покажите мастеру для сравнения цен" },
          ].map(f => (
            <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Как это работает</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "1", text: "Укажите тип дома" },
              { step: "2", text: "Введите площадь и комнаты" },
              { step: "3", text: "Выберите тип ремонта" },
              { step: "4", text: "Получите смету и PDF" },
            ].map(s => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {s.step}
                </div>
                <p className="text-sm text-gray-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-10">
          Цены актуальны на июнь 2026 г. Смета носит ориентировочный характер.
        </p>
      </div>
    </main>
  )
}
