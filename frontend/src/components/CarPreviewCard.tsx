"use client";

import { Badge } from "@/components/ui/badge";
import { urlFor } from "@/lib/sanity";
import { getFuelTypeLabel, getTransmissionLabel } from "@/lib/utils";
import type { Car } from "@/types/car";
import Image from "next/image";
import Link from "next/link";

interface CarPreviewCardProps {
    car: Car;
    isNew?: boolean;
}

export function CarPreviewCard({ car, isNew }: CarPreviewCardProps) {
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
                            ? urlFor(car.images[0])
                                  .ignoreImageParams()
                                  .width(600)
                                  .auto("format")
                                  .url()
                            : "/placeholder-car.jpg"
                    }
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover"
                />

                {car.inStock && car.discountPrice && (
                    <div className="absolute top-3 left-3 z-10">
                        <Badge className="bg-emerald-600 text-white border-none font-bold px-2 py-1 rounded shadow-sm">
                            -{Math.abs(Math.round(((car.price - car.discountPrice) / car.price) * 100))}%
                        </Badge>
                    </div>
                )}

                {isNew && (
                    <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
                        Новинка
                    </div>
                )}
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

                <div className="flex items-center gap-2">
                    {car.discountPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            ${car.price.toLocaleString()}
                        </span>
                    )}
                    <div className="text-2xl font-bold text-gray-900">
                        ${(car.discountPrice || car.price).toLocaleString()}
                    </div>
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
