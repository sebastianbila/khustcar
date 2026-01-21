"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { urlFor } from "@/lib/sanity";
import { cn, formatMileage, getTransmissionLabel } from "@/lib/utils";
import type { Car } from "@/types/car";
import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CarCardProps {
    car: Car;
}

export function CarCard({ car }: CarCardProps) {
    const imageUrl = car.images?.[0]
        ? urlFor(car.images[0]).width(500).height(400).url()
        : "/placeholder-car.jpg";

    return (
        <Card
            className={cn(
                "overflow-hidden hover:shadow-md transition-all duration-300 group shadow-xs h-full flex flex-col",
                "relative pt-0 pb-2 bg-background gap-y-0",
                !car.inStock && "opacity-70",
            )}
        >
            <Link
                href={`/cars/${car._id}`}
                className="relative block aspect-3/2 overflow-hidden bg-gray-50 p-0"
            >
                <Image
                    src={imageUrl}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className={cn(
                        "object-cover transition-transform duration-500 group-hover:scale-105",
                        !car.inStock && "grayscale-70",
                    )}
                />

                {/* Heart Icon Overlay */}
                <button
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:text-rose-500 z-10 group/heart cursor-pointer text-text-light transition-colors"
                    onClick={(e) => {
                        e.preventDefault();
                        // Save functionality
                    }}
                >
                    <Heart className="h-4 w-4 group-hover/heart:text-rose-500 duration-500" />
                </button>

                {!car.inStock && (
                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                        <Badge className="bg-gray-900 text-white">
                            {"Продано"}
                        </Badge>
                    </div>
                )}

                {car.inStock && car.discountPrice && (
                    <div className="absolute top-3 left-3 z-10">
                        <Badge className="bg-emerald-600 text-white border-none font-bold px-2 py-1 rounded shadow-sm">
                            -{Math.abs(Math.round(((car.price - car.discountPrice) / car.price) * 100))}%
                        </Badge>
                    </div>
                )}
            </Link>
            <CardContent className="p-4 grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        <Link
                            href={`/cars/${car._id}`}
                            className="hover:text-gray-700 transition-colors"
                        >
                            {car.brand} {car.model}
                        </Link>
                    </h3>
                    <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded text-[10px] uppercase"
                    >
                        {String(car.year)}
                    </Badge>
                </div>

                <div className="text-xs text-gray-500 mb-4 font-medium">
                    {car.brand} {car.model} •{" "}
                    {getTransmissionLabel(car.transmission)}{" "}
                    • {formatMileage(car.mileage)} км
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                    <div>
                        {car.discountPrice && (
                            <div className="text-sm text-gray-400 font-medium line-through">
                                ${car.price.toLocaleString()}
                            </div>
                        )}
                        <div className="text-xl font-extrabold text-gray-900">
                            ${(car.discountPrice || car.price).toLocaleString()}
                        </div>
                    </div>

                    <Link
                        href={`/cars/${car._id}`}
                        className="rounded-full flex items-center justify-center text-text-light"
                    >
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
