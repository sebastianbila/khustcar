"use client";

import { CarPreviewCard } from "@/components/CarPreviewCard";
import { Button } from "@/components/ui/button";
import type { Car } from "@/types/car";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CatalogPreviewSectionProps {
    cars: Car[];
}

export function CatalogPreviewSection({ cars }: CatalogPreviewSectionProps) {
    // Show only first 4 cars in preview
    const previewCars = cars.slice(0, 4);

    return (
        <section id="catalog" className="py-20 bg-background">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Досліджуйте Наш Каталог
                    </h2>
                    <p className="text-gray-500">
                        Переглядайте нашу обширну колекцію якісних автомобілів
                    </p>
                </div>

                {/* Car Preview Grid */}
                {previewCars.length === 0 ? (
                    <div className="text-center py-15">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Автомобілі не знайдено
                        </h3>
                        <p className="text-gray-700">
                            Спробуйте налаштувати фільтри
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {previewCars.map((car) => (
                                <CarPreviewCard key={car._id} car={car} />
                            ))}
                        </div>

                        {/* View All Button */}
                        <div className="text-center">
                            <Link href="/catalog">
                                <Button size="lg">
                                    Переглянути Всі Авто
                                    <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
