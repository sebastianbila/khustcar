import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Award, BadgeDollarSign, ShieldCheck, Truck } from "lucide-react";

interface WhyChooseUsSectionProps {
    className?: string;
}

export function WhyChooseUsSection({ className }: WhyChooseUsSectionProps) {
    const advantages = [
        {
            icon: Award,
            title: "7+ Років Досвіду",
            description: "Довірена експертиза в автомобільних продажах та обслуговуванні",
        },
        {
            icon: BadgeDollarSign,
            title: "Гнучке Фінансування",
            description: "Конкурентні ставки та індивідуальні плани оплати",
        },
        {
            icon: ShieldCheck,
            title: "Сертифіковані Авто",
            description: "Кожен автомобіль ретельно перевірений та сертифікований",
        },
        {
            icon: Truck,
            title: "Підтримка Доставки",
            description: "Зручні варіанти доставки прямо до вашого порогу",
        },
    ];

    return (
        <section className={cn("py-20 bg-background", className)}>
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Чому Обирають {SITE_CONFIG.name}
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Відчуйте різницю з нашими преміум послугами
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {advantages.map((advantage, index) => {
                        const Icon = advantage.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-xl border border-gray-100 p-8 text-center hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex justify-center mb-6">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                        <Icon className="h-7 w-7 text-gray-800" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {advantage.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {advantage.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
