"use client";

import { Badge } from "@/components/ui/badge";
import { getDrivetrainLabel, getFuelTypeLabel, getTransmissionLabel } from "@/lib/utils";
import { useFiltersStore } from "@/stores/filtersStore";
import { X } from "lucide-react";

export function ActiveFilters() {
    const {
        filters,
        localSearch,
        setLocalSearch,
        localBrand,
        setLocalBrand,
        localModel,
        setLocalModel,
        localMinYear,
        setLocalMinYear,
        localMaxYear,
        setLocalMaxYear,
        localMinPrice,
        setLocalMinPrice,
        localMaxPrice,
        setLocalMaxPrice,
        localMinMileage,
        setLocalMinMileage,
        localMaxMileage,
        setLocalMaxMileage,
        localFuelType,
        setLocalFuelType,
        localTransmission,
        setLocalTransmission,
        localDrivetrain,
        setLocalDrivetrain,
        localColor,
        setLocalColor,
        localInStock,
        setLocalInStock,
    } = useFiltersStore();

    const hasActiveFilters = Object.values(filters).some(
        (v) => v !== undefined,
    );

    if (!hasActiveFilters) return null;

    return (
        <div className="flex flex-wrap gap-2">
            {localSearch && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Пошук: {localSearch}
                    <button
                        onClick={() => setLocalSearch("")}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {localBrand && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Марка: {localBrand}
                    <button
                        onClick={() => setLocalBrand("")}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {localModel && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Модель: {localModel}
                    <button
                        onClick={() => setLocalModel("")}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {(localMinYear || localMaxYear) && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Рік: {localMinYear || "0"} - {localMaxYear || "2026"}
                    <button
                        onClick={() => {
                            setLocalMinYear("");
                            setLocalMaxYear("");
                        }}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {(localMinPrice || localMaxPrice) && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Ціна: {localMinPrice || "0"}$ - {localMaxPrice || "∞"}$
                    <button
                        onClick={() => {
                            setLocalMinPrice("");
                            setLocalMaxPrice("");
                        }}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {(localMinMileage || localMaxMileage) && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Пробіг: {localMinMileage || "0"} - {localMaxMileage || "∞"} тис.
                    <button
                        onClick={() => {
                            setLocalMinMileage("");
                            setLocalMaxMileage("");
                        }}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {localFuelType && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Паливо: {getFuelTypeLabel(localFuelType)}
                    <button
                        onClick={() => setLocalFuelType("")}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {localTransmission && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    КПП: {getTransmissionLabel(localTransmission)}
                    <button
                        onClick={() => setLocalTransmission("")}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {localDrivetrain && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Привід: {getDrivetrainLabel(localDrivetrain)}
                    <button
                        onClick={() => setLocalDrivetrain("")}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {localColor && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    Колір: {localColor}
                    <button
                        onClick={() => setLocalColor("")}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
            {localInStock !== "" && (
                <Badge variant="dark" className="gap-1 pl-2 pr-1 py-1">
                    {localInStock === "true" ? "В наявності" : "Продано"}
                    <button
                        onClick={() => setLocalInStock("")}
                        className="ml-1 hover:bg-zinc-700 rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}
        </div>
    );
}
