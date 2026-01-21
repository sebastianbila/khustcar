import Image from 'next/image'

export function AboutUsSection() {
  return (
    <section className="py-16 bg-background" id="about">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Про Khust Car
            </h2>

            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                Маючи понад 15 років досвіду в автомобільній індустрії, Khust Car
                стало довіреним ім&apos;ям завдяки якісним автомобілям та
                винятковому обслуговуванню клієнтів. Ми пишаємося тим, що
                пропонуємо ретельно підібраний вибір преміальних автомобілів,
                які відповідають найвищим стандартам.
              </p>
              <p>
                Наша команда автомобільних експертів невтомно працює, щоб
                гарантувати, що кожен транспортний засіб у нашому інвентарі
                ретельно перевірений та сертифікований. Ми віримо в прозорість,
                чесність та побудову довгострокових відносин з нашими клієнтами.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
                  500+
                </div>
                <div className="text-sm md:text-base text-slate-600 font-medium">
                  Проданих Авто
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
                  15+
                </div>
                <div className="text-sm md:text-base text-slate-600 font-medium">
                  Років Досвіду
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
                  98%
                </div>
                <div className="text-sm md:text-base text-slate-600 font-medium">
                  Задоволених Клієнтів
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
                  24/7
                </div>
                <div className="text-sm md:text-base text-slate-600 font-medium">
                  Підтримка
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/about-audi-front.png"
              alt="Audi RS7 в автосалоні"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
