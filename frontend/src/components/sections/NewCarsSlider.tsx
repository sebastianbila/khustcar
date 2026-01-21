"use client";

import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity";
import type { Car } from "@/types/car";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface NewCarsSliderProps {
    cars: Car[];
}

const getFuelTypeLabel = (fuelType: string) => {
    switch (fuelType) {
        case "diesel":
            return "Дизель";
        case "electric":
            return "Електро";
        case "hybrid":
            return "Гібрид";
        default:
            return "Бензин";
    }
};

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
                                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                    {/* Image */}
                                    <div className="relative aspect-4/3 bg-gray-50 overflow-hidden">
                                        <Image
                                            src={
                                                car.images?.[0]
                                                    ? urlFor(car.images[0])
                                                          .width(600)
                                                          .height(450)
                                                          .url()
                                                    : "/placeholder-car.jpg"
                                            }
                                            alt={`${car.brand} ${car.model}`}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium">
                                            Новинка
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                                            {car.brand} {car.model}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4">
                                            {car.year} •{" "}
                                            {car.transmission === "automatic"
                                                ? "Автомат"
                                                : "Механіка"}{" "}
                                            • {getFuelTypeLabel(car.fuelType)}
                                        </p>

                                        <div className="flex items-end justify-between">
                                            <div>
                                                <div className="text-2xl font-bold text-gray-900">
                                                    $
                                                    {(car.discountPrice || car.price).toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    Від $
                                                    {Math.round(
                                                        (car.discountPrice || car.price) / 60
                                                    ).toLocaleString()}
                                                    /міс
                                                </div>
                                            </div>
                                            <Link href={`/cars/${car._id}`}>
                                                <Button
                                                    size="sm"
                                                    className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg px-4"
                                                >
                                                    Деталі
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
