"use client";

import { CarPreviewCard } from "@/components/CarPreviewCard";
import { cn } from "@/lib/utils";
import type { Car } from "@/types/car";

interface NewCarsSliderProps extends React.HTMLAttributes<HTMLDivElement> {
    cars: Car[];
}

export function NewCarsSlider({ cars, className, ...props }: Readonly<NewCarsSliderProps>) {
    if (cars?.length === 0) return null;

    // Show only first 4 cars for the homepage arrival section, or all if preferred.
    // Given it's a "New Arrivals" section, showing a fixed amount makes sense for a grid.
    const displayCars = cars.slice(0, 4);
    const count = displayCars.length;

    // Determine desktop columns based on item count (max 4)
    const lgColsMap: Record<number, string> = {
        1: "lg:grid-cols-2",
        2: "lg:grid-cols-2",
        3: "lg:grid-cols-3",
        4: "lg:grid-cols-4",
    };
    const lgColsClass = lgColsMap[count] || "lg:grid-cols-4";

    return (
        <section className={cn("py-16 bg-background", className)} {...props}>
            <div className="container-custom">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Новинки
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Ознайомтесь з нашою колекцією останніх надходжень
                        преміум автомобілів
                    </p>
                </div>

                {/* Grid */}
                <div
                    className={cn(
                        "grid grid-cols-1 sm:grid-cols-2 gap-6",
                        lgColsClass,
                    )}
                >
                    {displayCars.map((car) => (
                        <CarPreviewCard key={car._id} car={car} isNew={true} />
                    ))}
                </div>
            </div>
        </section>
    );
}
