import { CarCard } from "@/components/CarCard";
import { CarSlider } from "@/components/CarSlider";
import { getSimilarCars } from "@/services/carService";
import { useQuery } from "@tanstack/react-query";

import type { Car } from "@/types/car";

interface SimilarCarsProps {
  car: Car;
}

export function SimilarCars({ car }: SimilarCarsProps) {
  const { data: cars } = useQuery({
    queryKey: ["similar-cars", car._id],
    queryFn: () => getSimilarCars(car),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (!cars || cars.length === 0) {
    return null;
  }

  return (
    <CarSlider title="Вам може сподобатись">
      {cars.map((car) => (
        <div
          key={car._id}
          className="flex-[0_0_85%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] lg:pl-6"
        >
          <div className="h-full">
            <CarCard car={car} showArrow />
          </div>
        </div>
      ))}
    </CarSlider>
  );
}
