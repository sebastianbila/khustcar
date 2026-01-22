import { cn, formatMileage, getTransmissionLabel } from "@/lib/utils";
import type { Car } from "@/types/car";

interface CarSpecsProps {
    car: Car;
    size?: "xs" | "sm";
}

export function CarSpecs({ car, size = "xs" }: Readonly<CarSpecsProps>) {
    const specs = [
        car.engineSize,
        getTransmissionLabel(car.transmission),
        `${formatMileage(car.mileage)} км`,
    ].filter(Boolean);

    return (
        <div
            className={cn("text-gray-500 mb-4 font-medium", {
                "text-xs": size === "xs",
                "text-base": size === "sm",
            })}
        >
            {specs.join(" • ")}
        </div>
    );
}
