"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";
import { useFiltersStore } from "@/stores/filtersStore";
import { Search, X } from "lucide-react";

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

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                {!hideTitle && (
                    <h3 className="text-lg font-bold text-gray-900">Фільтри</h3>
                )}
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onResetFilters}
                        className="text-xs cursor-pointer"
                    >
                        <X className="h-4 w-4 mr-1" />
                        Очистити
                    </Button>
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
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
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
                        value={localBrand}
                        onChange={(e) => {
                            setLocalBrand(e.target.value);
                            if (e.target.value !== localBrand) {
                                setLocalModel("");
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
                        value={localModel}
                        onChange={(e) => setLocalModel(e.target.value)}
                        disabled={!localBrand}
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
                        value={localFuelType}
                        onChange={(e) => setLocalFuelType(e.target.value)}
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
                        value={localDrivetrain}
                        onChange={(e) => setLocalDrivetrain(e.target.value)}
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
                        value={localTransmission}
                        onChange={(e) => setLocalTransmission(e.target.value)}
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
                        value={localColor}
                        onChange={(e) => setLocalColor(e.target.value)}
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
                        value={localInStock}
                        onChange={(e) => setLocalInStock(e.target.value)}
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
                            value={localMinYear}
                            onChange={(e) => setLocalMinYear(e.target.value)}
                        />
                        <Input
                            type="number"
                            placeholder="До"
                            value={localMaxYear}
                            onChange={(e) => setLocalMaxYear(e.target.value)}
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
                            value={localMinPrice}
                            onChange={(e) => setLocalMinPrice(e.target.value)}
                        />
                        <Input
                            type="number"
                            placeholder="Макс"
                            value={localMaxPrice}
                            onChange={(e) => setLocalMaxPrice(e.target.value)}
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
                            value={localMinMileage}
                            onChange={(e) => setLocalMinMileage(e.target.value)}
                        />
                        <Input
                            type="number"
                            placeholder="Макс"
                            value={localMaxMileage}
                            onChange={(e) => setLocalMaxMileage(e.target.value)}
                        />
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
