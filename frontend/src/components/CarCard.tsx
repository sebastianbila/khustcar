"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { urlFor } from "@/lib/sanity";
import { cn, formatMileage, getTransmissionLabel } from "@/lib/utils";
import { useFavoritesStore } from "@/stores/favoritesStore";
import type { Car } from "@/types/car";
import { ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CarCardProps {
    car: Car;
    isNew?: boolean;
}
export function CarCard({ car, isNew }: CarCardProps) {
    const { toggleFavorite, isFavorite } = useFavoritesStore();
    const isCarFavorite = isFavorite(car._id);

    const imageUrl = car.images?.[0]
        ? urlFor(car.images[0])
              .ignoreImageParams()
              .width(600)
              .auto("format")
              .url()
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
                    className={cn(
                        "absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md z-10 group/heart cursor-pointer transition-colors",
                           isCarFavorite
                            ? "text-rose-500"
                            : "text-gray-400 hover:text-rose-500",
                    )}
                    onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(car._id);
                    }}
                >
                    <Heart className={cn(
                        "h-4 w-4 duration-500",
                        isCarFavorite ? "fill-rose-500" : "group-hover/heart:text-rose-500"
                    )} />
                </button>

                {!car.inStock && (
                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                        <Badge className="bg-gray-900 text-white">
                            {"Продано"}
                        </Badge>
                    </div>
                )}

                {car.inStock && (
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-y-2 items-start">
                        {isNew && (
                            <Badge variant="dark">
                                Новинка
                            </Badge>
                        )}
                        {car.discountPrice && (
                            <Badge className="bg-emerald-600 text-white border-none font-bold px-2 py-1 rounded shadow-sm">
                                -{Math.abs(Math.round(((car.price - car.discountPrice) / car.price) * 100))}%
                            </Badge>
                        )}
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
                    <Badge variant="secondary">
                        {String(car.year)}
                    </Badge>
                </div>

                <div className="text-xs text-gray-500 mb-4 font-medium">
                    {car.brand} {car.model} •{" "}
                    {getTransmissionLabel(car.transmission)}{" "}
                    • {formatMileage(car.mileage)} км
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
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
                        className="rounded-full flex items-center justify-center text-text mr-2"
                    >
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
