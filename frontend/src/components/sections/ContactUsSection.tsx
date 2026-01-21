import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/constants'
import { Clock, Mail, Phone } from 'lucide-react'

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

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
          {/* Left Column: Contact Info */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {/* Phone Card */}
              <Card className="border-none shadow-sm bg-white">
                <CardContent className="p-6 flex items-center gap-4 text-left">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Телефон</h3>
                    <a
                      href={`tel:${SITE_CONFIG.contact.phone}`}
                      className="text-gray-700 hover:text-primary transition-colors font-medium block"
                    >
                      {SITE_CONFIG.contact.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Email Card */}
              <Card className="border-none shadow-sm bg-white">
                <CardContent className="p-6 flex items-center gap-4 text-left">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="text-gray-700 hover:text-primary transition-colors block break-all"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Hours Card */}
              <Card className="border-none shadow-sm bg-white sm:col-span-2 lg:col-span-1">
                <CardContent className="p-6 flex items-center gap-4 text-left">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Години Роботи</h3>
                    <div className="text-gray-700 text-sm space-y-0.5">
                      <p>Пн-Пт: 9:00 - 18:00</p>
                      <p>Сб: 10:00 - 16:00</p>
                      <p>Нд: Вихідний</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="h-full min-h-[400px] lg:min-h-full">
            <Card className="border-none shadow-sm bg-white overflow-hidden h-full min-h-[400px]">
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
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
