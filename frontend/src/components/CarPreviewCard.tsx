"use client";

import { urlFor } from "@/lib/sanity";
import type { Car } from "@/types/car";
import Image from "next/image";
import Link from "next/link";

interface CarPreviewCardProps {
    car: Car;
}

const getTransmissionLabel = (transmission: string) => {
    return transmission === "automatic" ? "Автомат" : "Механіка";
};

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

export function CarPreviewCard({ car }: CarPreviewCardProps) {
    return (
        <div className="bg-background rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Image */}
            <Link
                href={`/cars/${car._id}`}
                className="relative block aspect-4/3 bg-gray-50 overflow-hidden"
            >
                <Image
                    src={
                        car.images?.[0]
                            ? urlFor(car.images[0]).width(500).height(375).url()
                            : "/placeholder-car.jpg"
                    }
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover"
                />
            </Link>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                    <Link
                        href={`/cars/${car._id}`}
                        className="hover:text-gray-700 transition-colors"
                    >
                        {car.brand} {car.model}
                    </Link>
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                    {car.year} •{" "}
                    {car.fuelType === "electric"
                        ? getFuelTypeLabel(car.fuelType)
                        : getTransmissionLabel(car.transmission)}
                </p>

                <div className="text-2xl font-bold text-gray-900">
                    ${(car.discountPrice || car.price).toLocaleString()}
                </div>

                {/* <Link href={`/cars/${car._id}`} className="block">
                    <Button
                        variant="outline"
                        className="w-full rounded-lg bg-background-muted border-0 shadow-md"
                    >
                        Деталі
                    </Button>
                </Link> */}
            </div>
        </div>
    );
}
