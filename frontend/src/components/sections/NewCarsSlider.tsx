"use client";

import { CarPreviewCard } from "@/components/CarPreviewCard";
import type { Car } from "@/types/car";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface NewCarsSliderProps {
    cars: Car[];
}



export function NewCarsSlider({ cars }: NewCarsSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsPerView, setCardsPerView] = useState(3);

    useEffect(() => {
        const updateCardsPerView = () => {
            if (window.innerWidth < 768) {
                setCardsPerView(1);
            } else if (window.innerWidth < 1024) {
                setCardsPerView(2);
            } else {
                setCardsPerView(3);
            }
        };

        updateCardsPerView();
        window.addEventListener("resize", updateCardsPerView);
        return () => window.removeEventListener("resize", updateCardsPerView);
    }, []);

    const maxIndex = Math.max(0, cars.length - cardsPerView);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    if (cars.length === 0) return null;

    return (
        <section className="py-16 bg-white">
            <div className="container-custom">
                {/* Header */}
                <div className="flex items-start justify-between mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                            Нові Надходження
                        </h2>
                        <p className="text-gray-500">
                            Ознайомтесь з нашою колекцією преміум автомобілів
                        </p>
                    </div>

                    {cars.length > cardsPerView && (
                        <div className="flex gap-2">
                            <button
                                onClick={prevSlide}
                                className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Slider */}
                <div className="overflow-hidden">
                    <div
                        className="flex gap-6 transition-transform duration-500 ease-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                        }}
                    >
                        {cars.map((car) => (
                            <div
                                key={car._id}
                                className="shrink-0"
                                style={{
                                    width: `calc(${100 / cardsPerView}% - ${((cardsPerView - 1) * 24) / cardsPerView}px)`,
                                }}
                            >
                                <CarPreviewCard car={car} isNew={true} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
