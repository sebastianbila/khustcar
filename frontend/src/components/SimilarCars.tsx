"use client";

import { CarCard } from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { getSimilarCars } from "@/services/carService";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

interface SimilarCarsProps {
  currentCarId: string;
  brand: string;
}

export function SimilarCars({ currentCarId, brand }: SimilarCarsProps) {
  const { data: cars } = useQuery({
    queryKey: ["similar-cars", currentCarId, brand],
    queryFn: () => getSimilarCars(currentCarId, brand),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!cars || cars.length === 0) {
    return null;
  }

  return (
    <div className="container-custom py-12 border-t border-border">
      <div className="flex items-center justify-between mb-8 px-6 lg:px-0">
        <h2 className="text-2xl lg:text-3xl font-black text-gray-900 uppercase tracking-wider">
          Вам може сподобатись
        </h2>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 border-border hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 border-border hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={scrollNext}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>

      <div className="overflow-hidden px-6 lg:px-0 -mx-6 lg:mx-0" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4 lg:-ml-6">
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
        </div>
        <div className="flex justify-center mt-6 p-4">
             {/* Pagination dots could go here if needed, but arrows are cleaner */}
        </div>
      </div>
    </div>
  );
}
