"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function HeroSection() {
    const [offset, setOffset] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const { top, height } = sectionRef.current.getBoundingClientRect();
            // Only animate when in view (or close to it)
            if (top < window.innerHeight && top + height > 0) {
                setOffset(window.scrollY * 0.4); // Adjust speed here (0.4 = 40% of scroll speed)
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-[90vh] md:h-[85vh] min-h-[600px] flex items-center overflow-hidden"
        >
            {/* Parallax Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url('/images/hero-car-background.png')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    transform: `translateY(${offset * 0.3}px)`, // Apply parallax translation
                    willChange: "transform",
                }}
            />

            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

            {/* Content */}
            <div className="container-custom relative z-20">
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                        Знайдіть свій ідеальний автомобіль сьогодні
                    </h1>

                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl">
                        Відкрийте для себе автомобілі преміум-класу з гнучкими
                        варіантами фінансування та надійним сервісом
                    </p>

                    <div className="flex pt-4">
                        <Link href={"/catalog"}>
                            <Button
                                size="lg"
                                className="bg-white text-zinc-900 hover:bg-gray-100 font-semibold px-8 h-12 text-base"
                            >
                                Переглянути каталог
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
