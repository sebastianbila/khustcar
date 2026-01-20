import { Card, CardContent } from '@/components/ui/card'

export function AboutUsSection() {
  return (
    <section id="about" className="py-15 bg-c-bg">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ваш надійний партнер в світі автомобілів
          </h2>

          <Card className="shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6 text-left">
                <p className="text-lg text-gray-800 leading-relaxed">
                  Ми - провідна компанія з продажу автомобілів з понад <strong>15-річним досвідом</strong> роботи
                  на українському ринку. Наша місія - допомогти кожному клієнту знайти ідеальний автомобіль,
                  який відповідає його потребам та бюджету.
                </p>

                <p className="text-lg text-gray-800 leading-relaxed">
                  У нашому розпорядженні <strong>більше 500 автомобілів</strong> різних марок та моделей.
                  Ми пропонуємо як нові, так і перевірені автомобілі з пробігом, кожен з яких проходить
                  ретельну діагностику та підготовку.
                </p>

                <p className="text-lg text-gray-800 leading-relaxed">
                  Наша команда професіоналів завжди готова надати експертну консультацію, допомогти
                  з оформленням документів та запропонувати вигідні умови фінансування. Ми цінуємо
                  кожного клієнта і прагнемо побудувати довгострокові відносини, засновані на довірі
                  та якості обслуговування.
                </p>

                <div className="grid grid-cols-3 gap-6 pt-8 border-t mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-gray-700">Автомобілів</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">2000+</div>
                    <div className="text-sm text-gray-700">Клієнтів</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">15+</div>
                    <div className="text-sm text-gray-700">Років</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
