import {Card, CardContent} from '@/components/ui/card'
import {Award, Car, CheckCircle, CreditCard, Shield, Users} from 'lucide-react'

export function WhyChooseUsSection() {
    const advantages = [
        {
            icon: Award,
            title: '7+ Років Досвіду',
            description: 'Довірена репутація та експертиза в автомобільній індустрії',
        },
        {
            icon: Car,
            title: 'Великий Вибір',
            description: '100+ автомобілів завжди в наявності',
        },
        {
            icon: CreditCard,
            title: 'Гнучке Фінансування',
            description: 'Зручні плани оплати та кредитування',
        },
        {
            icon: Shield,
            title: 'Гарантія Якості',
            description: 'Всі автомобілі перевірені та сертифіковані',
        },
        {
            icon: Users,
            title: 'Професійна Команда',
            description: 'Досвідчені консультанти завжди готові допомогти',
        },
        {
            icon: CheckCircle,
            title: 'Прозорість',
            description: 'Чесні ціни та повна історія кожного автомобіля',
        },
    ]

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background Image & Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('/images/why-choose-us-bg.png')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            />
            <div className="absolute inset-0 z-10 bg-black/85"/>

            <div className="container-custom relative z-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Чому Обирають <span className="text-zinc-600">Khust Car</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Ми пропонуємо не просто автомобілі, а повний спектр послуг для вашого комфорту та впевненості у
                        кожному кілометрі.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {advantages.map((advantage, index) => {
                        const Icon = advantage.icon
                        return (
                            <Card
                                key={index}
                                className="group border-white/5 bg-white/5 backdrop-blur-sm shadow-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                            >
                                <CardContent className="p-8">
                                    <div className="flex flex-col items-center text-center">
                                        <div
                                            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                            <Icon className="h-8 w-8 text-zinc-400"/>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3">
                                            {advantage.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                            {advantage.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
