import { formatMileage, getTransmissionLabel } from "@/lib/utils";
import type { Car } from "@/types/car";

interface CarSpecsProps {
    car: Car;
}

export function CarSpecs({ car }: Readonly<CarSpecsProps>) {
    const specs = [
        car.engineSize,
        getTransmissionLabel(car.transmission),
        `${formatMileage(car.mileage)} км`,
    ].filter(Boolean);

    return (
        <div className="text-xs text-gray-500 mb-4 font-medium">
            {specs.join(" • ")}
        </div>
    );
}
