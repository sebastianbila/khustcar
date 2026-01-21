import { ContactUsView } from '@/components/ContactUsView';

export function ContactUsSection() {
    return (
        <section id="contact" className="py-16 bg-background">
            <div className="container-custom">
                <ContactUsView />
            </div>
        </section>
    );
}
