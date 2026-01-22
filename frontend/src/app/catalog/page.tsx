"use client";

import { ActiveFilters } from "@/components/ActiveFilters";
import { CarCard } from "@/components/CarCard";
import { CarFilters as CarFiltersComponent } from "@/components/CarFilters";
import { CarPagination } from "@/components/CarPagination";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    getBrands,
    getCars,
    getColors,
    getModels,
} from "@/services/carService";
import { useFiltersStore } from "@/stores/filtersStore";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

type SortOption =
    | "price-asc"
    | "price-desc"
    | "year-asc"
    | "year-desc"
    | "mileage-asc"
    | "mileage-desc"
    | "";

const ITEMS_PER_PAGE = 8;

function CatalogContent() {
    const searchParams = useSearchParams();
    const [sortBy, setSortBy] = useState<SortOption>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isFiltersSheetOpen, setIsFiltersSheetOpen] = useState(false);

    const { filters, resetFilters, initializeFromParams, syncURL } =
        useFiltersStore();

    const { data: brands = [], isLoading: brandsLoading } = useQuery({
        queryKey: ["brands"],
        queryFn: getBrands,
    });

    const { data: colors = [] } = useQuery({
        queryKey: ["colors"],
        queryFn: getColors,
    });

    const { data: models = [] } = useQuery({
        queryKey: ["models", filters.brand],
        queryFn: () => getModels(filters.brand || undefined),
    });

    const {
        data: cars = [],
        isLoading: carsLoading,
        error,
    } = useQuery({
        queryKey: ["cars", filters],
        queryFn: () => getCars(filters),
    });

    // Update URL when filters change (debounced via store)
    useEffect(() => {
        const timer = setTimeout(() => {
            syncURL();
        }, 500);

        return () => clearTimeout(timer);
    }, [filters, syncURL]);

    useEffect(() => {
        initializeFromParams(new URLSearchParams(searchParams.toString()));
    }, [searchParams, initializeFromParams]);

    const handleResetFilters = () => {
        resetFilters();
    };

    const hasActiveFilters = Object.values(filters).some(
        (v) => v !== undefined,
    );

    const activeFiltersCount = Object.values(filters).filter(
        (v) => v !== undefined,
    ).length;

    // Reset to page 1 when filters or sort changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filters, sortBy]);

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    // Sort cars based on selected option
    const sortedCars = useMemo(() => {
        if (!sortBy || cars.length === 0) return cars;

        const sorted = [...cars];
        switch (sortBy) {
            case "price-asc":
                return sorted.sort((a, b) => a.price - b.price);
            case "price-desc":
                return sorted.sort((a, b) => b.price - a.price);
            case "year-asc":
                return sorted.sort((a, b) => a.year - b.year);
            case "year-desc":
                return sorted.sort((a, b) => b.year - a.year);
            case "mileage-asc":
                return sorted.sort((a, b) => a.mileage - b.mileage);
            case "mileage-desc":
                return sorted.sort((a, b) => b.mileage - a.mileage);
            default:
                return sorted;
        }
    }, [cars, sortBy]);

    // Pagination calculations
    const totalPages = Math.ceil(sortedCars.length / ITEMS_PER_PAGE);
    const paginatedCars = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedCars.slice(start, start + ITEMS_PER_PAGE);
    }, [sortedCars, currentPage]);

    const filtersContent = useMemo(
        () => (
            <CarFiltersComponent
                brands={brands}
                models={models}
                colors={colors}
                onResetFilters={handleResetFilters}
                onApply={() => setIsFiltersSheetOpen(false)}
                hideTitle
            />
        ),
        [brands, models, colors, handleResetFilters, setIsFiltersSheetOpen],
    );

    const activeFiltersContent = useMemo(() => <ActiveFilters />, []);

    if (brandsLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div>
            {/* Filters and Results */}
            <section className="bg-gray-50">
                {/* Mobile Filters Button */}
                <div className="md:hidden py-4 border-b border-b-border">
                    <div className="container-custom">
                        <Sheet
                            open={isFiltersSheetOpen}
                            onOpenChange={setIsFiltersSheetOpen}
                        >
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="relative gap-2 duration-500 transition-all"
                                >
                                    <SlidersHorizontal className="h-4 w-4" />
                                    Фільтри
                                    {activeFiltersCount > 0 && (
                                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-sky-700 text-xs font-medium text-white shadow-sm ring-2 ring-white">
                                            {activeFiltersCount}
                                        </span>
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="w-full sm:w-96"
                                onOpenAutoFocus={(e) => e.preventDefault()}
                            >
                                <SheetHeader>
                                    <SheetTitle>Фільтри</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 pb-20">
                                    {filtersContent}
                                </div>
                            </SheetContent>
                        </Sheet>
                        {activeFiltersCount > 0 && <div className="mt-4">{activeFiltersContent}</div>}
                    </div>
                </div>

                {/* Desktop Filters */}
                <div className="hidden md:block bg-background-muted py-8 border-b border-b-border">
                    <div className="container-custom">
                        {filtersContent}
                        <div className="mt-6">{activeFiltersContent}</div>
                    </div>
                </div>
                <PageHeader
                    title="Доступні автомобілі"
                    subtitle={
                        <>
                            Показано{" "}
                            <span className="text-gray-900 font-bold">
                                {sortedCars.length} результатів
                            </span>{" "}
                            для вашого запиту
                        </>
                    }
                    actions={
                        <>
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                Сортувати за:
                            </span>
                            <NativeSelect
                                id="sort-by"
                                value={sortBy}
                                onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>,
                                ) => setSortBy(e.target.value as SortOption)}
                                size="sm"
                                className="w-auto min-w-[180px]"
                            >
                                <NativeSelectOption value="">
                                    Рекомендовані
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
                            </NativeSelect>
                        </>
                    }
                />
                <div className="py-8 container-custom">
                    {/* Empty State */}
                    {!carsLoading && !error && cars.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Автомобілів не знайдено
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Спробуйте змінити фільтри або параметри пошуку
                            </p>
                            {hasActiveFilters && (
                                <Button
                                    onClick={handleResetFilters}
                                    variant="outline"
                                    className="rounded-full px-6"
                                >
                                    Очистити фільтри
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Grid */}
                    {!carsLoading && !error && sortedCars.length > 0 && (
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {paginatedCars.map((car: any) => (
                                    <CarCard key={car._id} car={car} />
                                ))}
                            </div>

                            <div className="flex flex-col items-center gap-6 pt-4">
                                {totalPages > 1 && (
                                    <CarPagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={setCurrentPage}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default function CatalogPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center py-20">
                    <LoadingSpinner />
                </div>
            }
        >
            <CatalogContent />
        </Suspense>
    );
}
