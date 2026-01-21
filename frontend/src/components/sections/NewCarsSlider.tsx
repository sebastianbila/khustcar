"use client";

import { CarPreviewCard } from "@/components/CarPreviewCard";
import type { Car } from "@/types/car";

interface NewCarsSliderProps {
    cars: Car[];
}



export function NewCarsSlider({ cars }: NewCarsSliderProps) {
    if (cars.length === 0) return null;

    // Show only first 4 cars for the homepage arrival section, or all if preferred.
    // Given it's a "New Arrivals" section, showing a fixed amount makes sense for a grid.
    const displayCars = cars.slice(0, 4);

    return (
        <section className="py-16 bg-white">
            <div className="container-custom">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Нові Надходження
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Ознайомтесь з нашою колекцією останніх надходжень преміум автомобілів
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displayCars.map((car) => (
                        <CarPreviewCard key={car._id} car={car} isNew={true} />
                    ))}
                </div>
            </div>
        </section>
    );
}
