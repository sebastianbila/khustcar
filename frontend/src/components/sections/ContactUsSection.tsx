import { ContactUsView } from '@/components/ContactUsView';
import { cn } from "@/lib/utils";

interface ContactUsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export function ContactUsSection({ className, ...props }: Readonly<ContactUsSectionProps>) {
    return (
        <section id="contact" className={cn("py-16 bg-background", className)} {...props}>
            <div className="container-custom">
                <ContactUsView />
            </div>
        </section>
    );
}
