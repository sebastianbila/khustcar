import { CarCard } from "@/components/CarCard";
import { CarSlider } from "@/components/CarSlider";
import { cn } from "@/lib/utils";
import type { Car } from "@/types/car";

interface NewCarsSliderProps extends React.HTMLAttributes<HTMLDivElement> {
    cars: Car[];
}

export function NewCarsSlider({ cars, className, ...props }: Readonly<NewCarsSliderProps>) {
    if (cars?.length < 1) return null;

    // Show only first 8 cars for the homepage arrival section
    const displayCars = cars.slice(0, 8);

    return (
        <CarSlider
            title="Новинки"
            description="Ознайомтесь з нашою колекцією останніх надходжень преміум автомобілів"
            className={cn("py-16", className)}
            headerAlignment="center"
            {...props}
        >
            {displayCars.map((car) => (
                <div key={car._id}>
                    <div className="h-full">
                        <CarCard car={car} isNew showArrow />
                    </div>
                </div>
            ))}
        </CarSlider>
    );
}
