"use client";

import { CarCard } from "@/components/CarCard";
import { CarSlider } from "@/components/CarSlider";
import type { Car } from "@/types/car";

interface CatalogPreviewSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    cars: Car[];
}

export function CatalogPreviewSection({ cars, className, ...props }: CatalogPreviewSectionProps) {
    if (cars?.length < 1) return null;

    return (
        <CarSlider
          title="Наш Каталог Автомобілів"
          description="Переглядайте нашу обширну колекцію якісних автомобілів"
          className={className}
          headerAlignment="center"
          {...props}
        >
            {cars.map((car) => (
                <div
                    key={car._id}
                    className="flex-[0_0_85%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_25%] lg:pl-6"
                >
                    <div className="h-full">
                        <CarCard car={car} showArrow />
                    </div>
                </div>
            ))}
        </CarSlider>
    );
}
