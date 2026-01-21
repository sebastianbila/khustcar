"use client";

import { Badge } from "@/components/ui/badge";
import { getDrivetrainLabel, getFuelTypeLabel, getTransmissionLabel } from "@/lib/utils";
import { useFiltersStore } from "@/stores/filtersStore";
import { X } from "lucide-react";

export function ActiveFilters() {
    const { filters, setFilter } = useFiltersStore();

    const hasActiveFilters = Object.values(filters).some(
        (v) => v !== undefined,
    );

    if (!hasActiveFilters) return null;

    return (
        <div className="flex flex-wrap gap-2">
            {filters.search && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Пошук: {filters.search}
                    <button
                        onClick={() => setFilter("search", undefined)}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {filters.brand && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Марка: {filters.brand}
                    <button
                        onClick={() => setFilter("brand", undefined)}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {filters.model && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Модель: {filters.model}
                    <button
                        onClick={() => setFilter("model", undefined)}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {(filters.minYear || filters.maxYear) && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Рік: {filters.minYear || "0"} - {filters.maxYear || "2026"}
                    <button
                        onClick={() => {
                            setFilter("minYear", undefined);
                            setFilter("maxYear", undefined);
                        }}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {(filters.minPrice || filters.maxPrice) && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Ціна: {filters.minPrice || "0"}$ - {filters.maxPrice || "∞"}$
                    <button
                        onClick={() => {
                            setFilter("minPrice", undefined);
                            setFilter("maxPrice", undefined);
                        }}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {(filters.minMileage || filters.maxMileage) && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Пробіг: {filters.minMileage || "0"} - {filters.maxMileage || "∞"} тис.
                    <button
                        onClick={() => {
                            setFilter("minMileage", undefined);
                            setFilter("maxMileage", undefined);
                        }}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {filters.fuelType && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Паливо: {getFuelTypeLabel(filters.fuelType)}
                    <button
                        onClick={() => setFilter("fuelType", undefined)}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {filters.transmission && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    КПП: {getTransmissionLabel(filters.transmission)}
                    <button
                        onClick={() => setFilter("transmission", undefined)}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {filters.drivetrain && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Привід: {getDrivetrainLabel(filters.drivetrain)}
                    <button
                        onClick={() => setFilter("drivetrain", undefined)}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {filters.color && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Колір: {filters.color}
                    <button
                        onClick={() => setFilter("color", undefined)}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {filters.inStock !== undefined && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    {filters.inStock ? "В наявності" : "Продано"}
                    <button
                        onClick={() => setFilter("inStock", undefined)}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
        </div>
    );
}
