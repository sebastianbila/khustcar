"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";
import { useFiltersStore } from "@/stores/filtersStore";
import { Search } from "lucide-react";
import { Switch } from "./ui/switch";

interface CarFiltersProps {
    brands: string[];
    models: string[];
    colors: string[];
    onResetFilters: () => void;
    onApply?: () => void;
    hideTitle?: boolean;
}

export function CarFilters({
    brands,
    models,
    colors,
    onResetFilters,
    onApply,
    hideTitle,
}: Readonly<CarFiltersProps>) {
    const { filters, setFilter } = useFiltersStore();

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                {!hideTitle && (
                    <h3 className="text-lg font-bold text-gray-900">Фільтри</h3>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="filter-search" className="text-gray-800">
                        Пошук
                    </Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            id="filter-search"
                            placeholder="Марка або модель..."
                            value={filters.search || ""}
                            onChange={(e) => setFilter("search", e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Brand */}
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="filter-brand" className="text-gray-800">
                        Марка
                    </Label>
                    <NativeSelect
                        id="filter-brand"
                        value={filters.brand || ""}
                        onChange={(e) => {
                            setFilter("brand", e.target.value);
                            if (e.target.value !== filters.brand) {
                                setFilter("model", undefined);
                            }
                        }}
                    >
                        <NativeSelectOption value="">
                            Всі Марки
                        </NativeSelectOption>
                        {brands.map((brand) => (
                            <NativeSelectOption key={brand} value={brand}>
                                {brand}
                            </NativeSelectOption>
                        ))}
                    </NativeSelect>
                </div>

                {/* Model */}
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="filter-model" className="text-gray-800">
                        Модель
                    </Label>
                    <NativeSelect
                        id="filter-model"
                        value={filters.model || ""}
                        onChange={(e) => setFilter("model", e.target.value)}
                        disabled={!filters.brand}
                    >
                        <NativeSelectOption value="">
                            Всі Моделі
                        </NativeSelectOption>
                        {models.map((model) => (
                            <NativeSelectOption key={model} value={model}>
                                {model}
                            </NativeSelectOption>
                        ))}
                    </NativeSelect>
                </div>

                {/* Fuel Type */}
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="filter-fuelType" className="text-gray-800">
                        Тип Палива
                    </Label>
                    <NativeSelect
                        id="filter-fuelType"
                        value={filters.fuelType || ""}
                        onChange={(e) => setFilter("fuelType", e.target.value)}
                    >
                        <NativeSelectOption value="">
                            Всі Типи
                        </NativeSelectOption>
                        <NativeSelectOption value="diesel">
                            Дизель
                        </NativeSelectOption>
                        <NativeSelectOption value="petrol">
                            Бензин
                        </NativeSelectOption>
                        <NativeSelectOption value="electric">
                            Електро
                        </NativeSelectOption>
                    </NativeSelect>
                </div>

                {/* Drivetrain */}
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="filter-drivetrain" className="text-gray-800">
                        Привід
                    </Label>
                    <NativeSelect
                        id="filter-drivetrain"
                        value={filters.drivetrain || ""}
                        onChange={(e) => setFilter("drivetrain", e.target.value)}
                    >
                        <NativeSelectOption value="">
                            Всі Типи
                        </NativeSelectOption>
                        <NativeSelectOption value="fwd">
                            Передній
                        </NativeSelectOption>
                        <NativeSelectOption value="rwd">
                            Задній
                        </NativeSelectOption>
                        <NativeSelectOption value="awd">
                            Повний
                        </NativeSelectOption>
                    </NativeSelect>
                </div>

                {/* Transmission */}
                <div className="flex flex-col space-y-2">
                    <Label
                        htmlFor="filter-transmission"
                        className="text-gray-800"
                    >
                        Коробка Передач
                    </Label>
                    <NativeSelect
                        id="filter-transmission"
                        value={filters.transmission || ""}
                        onChange={(e) => setFilter("transmission", e.target.value)}
                    >
                        <NativeSelectOption value="">
                            Всі Типи
                        </NativeSelectOption>
                        <NativeSelectOption value="manual">
                            Механіка
                        </NativeSelectOption>
                        <NativeSelectOption value="automatic">
                            Автомат
                        </NativeSelectOption>
                    </NativeSelect>
                </div>

                {/* Color */}
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="filter-color" className="text-gray-800">
                        Колір
                    </Label>
                    <NativeSelect
                        id="filter-color"
                        value={filters.color || ""}
                        onChange={(e) => setFilter("color", e.target.value)}
                    >
                        <NativeSelectOption value="">
                            Всі Кольори
                        </NativeSelectOption>
                        {colors.map((color) => (
                            <NativeSelectOption key={color} value={color}>
                                {color}
                            </NativeSelectOption>
                        ))}
                    </NativeSelect>
                </div>

                {/* In Stock */}
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="filter-inStock" className="text-gray-800">
                        Наявність
                    </Label>
                    <NativeSelect
                        id="filter-inStock"
                        value={filters.inStock === undefined ? "" : filters.inStock.toString()}
                        onChange={(e) => setFilter("inStock", e.target.value === "true" ? true : e.target.value === "false" ? false : undefined)}
                    >
                        <NativeSelectOption value="">Всі</NativeSelectOption>
                        <NativeSelectOption value="true">
                            В Наявності
                        </NativeSelectOption>
                        <NativeSelectOption value="false">
                            Продано
                        </NativeSelectOption>
                    </NativeSelect>
                </div>

                {/* Year Range */}
                <div className="flex flex-col space-y-2">
                    <Label className="text-gray-800">Рік Випуску</Label>
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            type="number"
                            placeholder="Від"
                            value={filters.minYear?.toString() || ""}
                            onChange={(e) => setFilter("minYear", e.target.value ? Number(e.target.value) : undefined)}
                        />
                        <Input
                            type="number"
                            placeholder="До"
                            value={filters.maxYear?.toString() || ""}
                            onChange={(e) => setFilter("maxYear", e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </div>
                </div>

                {/* Price Range */}
                <div className="flex flex-col space-y-2">
                    <Label className="text-gray-800">Ціна ($)</Label>
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            type="number"
                            placeholder="Мін"
                            value={filters.minPrice?.toString() || ""}
                            onChange={(e) => setFilter("minPrice", e.target.value ? Number(e.target.value) : undefined)}
                        />
                        <Input
                            type="number"
                            placeholder="Макс"
                            value={filters.maxPrice?.toString() || ""}
                            onChange={(e) => setFilter("maxPrice", e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </div>
                </div>

                {/* Mileage Range */}
                <div className="flex flex-col space-y-2">
                    <Label className="text-gray-800">Пробіг (тис. км)</Label>
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            type="number"
                            placeholder="Мін"
                            value={filters.minMileage?.toString() || ""}
                            onChange={(e) => setFilter("minMileage", e.target.value ? Number(e.target.value) : undefined)}
                        />
                        <Input
                            type="number"
                            placeholder="Макс"
                            value={filters.maxMileage?.toString() || ""}
                            onChange={(e) => setFilter("maxMileage", e.target.value ? Number(e.target.value) : undefined)}
                        />
                    </div>
                </div>

                 {/* Has Video */}
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="filter-hasVideo" className="text-gray-800">
                        Мультимедіа
                    </Label>
                    <div className="flex items-center space-x-2 h-10">
                        <Switch
                            id="filter-hasVideo"
                            checked={filters.hasVideo || false}
                            onCheckedChange={(checked) => setFilter("hasVideo", checked ? true : undefined)}
                        />
                        <Label htmlFor="filter-hasVideo" className="cursor-pointer font-normal">
                            З відео
                        </Label>
                    </div>
                </div>
            </div>

            {onApply && (
                <div className="mt-8 md:hidden">
                    <Button onClick={onApply} className="w-full py-6">
                        Застосувати фільтри
                    </Button>
                </div>
            )}
        </>
    );
}
