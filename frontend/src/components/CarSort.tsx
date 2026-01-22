"use client";

import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";

export type SortOption =
    | "price-asc"
    | "price-desc"
    | "year-asc"
    | "year-desc"
    | "mileage-asc"
    | "mileage-desc"
    | "date-asc"
    | "date-desc"
    | "";

interface CarSortProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}

export function CarSort({ value, onChange }: CarSortProps) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap hidden sm:inline-block">
                Сортувати за:
            </span>
            <NativeSelect
                id="sort-by"
                value={value}
                onChange={(e) => onChange(e.target.value as SortOption)}
                size="sm"
                className="w-auto min-w-[180px]"
            >
                <NativeSelectOption value="">
                    Рекомендовані
                </NativeSelectOption>
                <NativeSelectOption value="date-desc">
                    Дата: нові оголошення
                </NativeSelectOption>
                <NativeSelectOption value="date-asc">
                    Дата: старі оголошення
                </NativeSelectOption>
                <NativeSelectOption value="price-asc">
                    Ціна: від дешевих до дорогих
                </NativeSelectOption>
                <NativeSelectOption value="price-desc">
                    Ціна: від дорогих до дешевих
                </NativeSelectOption>
                <NativeSelectOption value="year-desc">
                    Рік: спочатку нові
                </NativeSelectOption>
                <NativeSelectOption value="year-asc">
                    Рік: спочатку старі
                </NativeSelectOption>
                <NativeSelectOption value="mileage-asc">
                    Пробіг: від меншого
                </NativeSelectOption>
                <NativeSelectOption value="mileage-desc">
                    Пробіг: від більшого
                </NativeSelectOption>
            </NativeSelect>
        </div>
    );
}
