import { SITE_CONFIG } from '@/lib/constants'
import { Mail, MapPin, Phone } from 'lucide-react'
import { SocialIcon } from 'react-social-icons'

export function ContactUsView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Information */}
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Наші контакти
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Ми завжди раді відповісти на ваші запитання. Завітайте до нашого
            автосалону або зв'яжіться з нами телефоном чи електронною поштою.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-900 mb-1">
                Адреса
              </h3>
              <p className="text-slate-600">{SITE_CONFIG.contact.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-900 mb-1">
                Телефон
              </h3>
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="text-slate-600 hover:text-primary transition-colors"
              >
                {SITE_CONFIG.contact.phone}
              </a>
              <p className="text-sm text-slate-500 mt-1">
                Пн-Пт 09:00 - 18:00
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-900 mb-1">
                Email
              </h3>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="text-slate-600 hover:text-primary transition-colors"
              >
                {SITE_CONFIG.contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <h3 className="font-semibold text-lg text-slate-900 mb-4">
            Соціальні мережі
          </h3>
          <div className="flex gap-4">
            <SocialIcon
              url={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{ height: 48, width: 48 }}
              fgColor="#fff"
              className="hover:scale-105 transition-transform duration-200"
            />
            <SocialIcon
              url={SITE_CONFIG.social.telegram}
              target="_blank"
              rel="noopener noreferrer"
              style={{ height: 48, width: 48 }}
              fgColor="#fff"
              className="hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="h-100 lg:h-full min-h-100 rounded-2xl overflow-hidden shadow-lg border border-border">
        <iframe
          src={SITE_CONFIG.map.embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Наше Розташування"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  )
}
