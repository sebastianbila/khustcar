import { ContactUsView } from '@/components/ContactUsView';
import { cn } from "@/lib/utils";

interface ContactUsSectionProps {
    className?: string;
}

export function ContactUsSection({ className }: Readonly<ContactUsSectionProps>) {
    return (
        <section id="contact" className={cn("py-16 bg-background", className)}>
            <div className="container-custom">
                <ContactUsView />
            </div>
        </section>
    );
}
