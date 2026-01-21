import { PageHeader } from "@/components/PageHeader";
import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";

export default function AboutPage() {
    return (
        <main>
            <PageHeader
                title="Про Нас"
                subtitle="Дізнайтеся більше про нашу компанію та цінності"
                backLink={{ href: "/", label: "На Головну" }}
            />
            <AboutUsSection />
            <WhyChooseUsSection />
        </main>
    );
}
