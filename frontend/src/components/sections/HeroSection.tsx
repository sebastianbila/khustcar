'use client'

import {Button} from '@/components/ui/button'
import {ArrowRight} from 'lucide-react'
import {useEffect, useRef, useState} from 'react'
import Link from "next/link";
import {SITE_CONFIG} from "@/lib/constants";

export function HeroSection() {
    const [offset, setOffset] = useState(0)
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return
            const {top, height} = sectionRef.current.getBoundingClientRect()
            // Only animate when in view (or close to it)
            if (top < window.innerHeight && top + height > 0) {
                setOffset(window.scrollY * 0.4) // Adjust speed here (0.4 = 40% of scroll speed)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden"
        >
            {/* Parallax Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('/images/hero-car-bg.png')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    transform: `translateY(${offset * 0.3}px)`, // Apply parallax translation
                    willChange: 'transform',
                }}
            />

            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/50 to-transparent"/>

            {/* Content */}
            <div className="container-custom relative z-20">
                <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div
                        className="inline-flex px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm text-sm font-medium mb-4">
                        <span className="flex items-center gap-2">
                          Новинки 2026
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                        Відчуйте <span className="text-zinc-700">Драйв</span> <br/>
                        Справжньої Емоції
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl">
                        Ексклюзивний вибір автомобілів преміум-класу.
                        Ми не просто продаємо авто — ми здійснюємо мрії про ідеальну подорож.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a href={`tel:${SITE_CONFIG.contact.phone}`}>
                            <Button variant="ghost" size="lg" className="text-zinc-300">
                                Зв'язатися з Нами
                            </Button>
                        </a>
                        <Link href={'/catalog'}>
                            <Button size="lg" className="text-c-white">
                                Переглянути каталог
                                <ArrowRight className="ml-2 h-5 w-5"/>
                            </Button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white">100+</div>
                            <div className="text-sm text-gray-300 mt-1">Авто в Наявності</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white">2k+</div>
                            <div className="text-sm text-gray-300 mt-1">Щасливих Клієнтів</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white">7+</div>
                            <div className="text-sm text-gray-300 mt-1">Років Досвіду</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
