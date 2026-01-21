import { ContactUsView } from '@/components/ContactUsView'
import { PageHeader } from '@/components/PageHeader'

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        title="Контакти"
        subtitle="Зв'яжіться з нами будь-яким зручним способом"
        backLink={{ href: '/', label: 'На Головну' }}
      />

      <div className="container-custom py-12 md:py-16">
        <ContactUsView />
      </div>
    </main>
  )
}
