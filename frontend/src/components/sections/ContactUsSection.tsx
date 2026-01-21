import { SITE_CONFIG } from '@/lib/constants'

export function ContactUsSection() {
  return (
    <section id="contact" className="py-15 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Контакти & Розташування
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Зв'яжіться з нами або завітайте до нашого автосалону
          </p>
        </div>

        <div className="gap-8 max-w-6xl mx-auto items-start">

          {/* Right Column: Map */}
          <div className="h-full min-h-[400px] lg:min-h-full">
              <iframe
                src={SITE_CONFIG.map.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Наше Розташування"
                className="w-full h-full"
              ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
