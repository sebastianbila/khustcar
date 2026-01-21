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
import { cn } from "@/lib/utils";
import {
    getBrands,
    getCars,
    getColors,
    getModels,
} from "@/services/carService";
import type { CarFilters } from "@/types/car";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

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

    const [filters, setFilters] = useState<CarFilters>({
        search: searchParams.get("search") || undefined,
        brand: searchParams.get("brand") || undefined,
        model: searchParams.get("model") || undefined,
        minYear: searchParams.get("minYear")
            ? parseInt(searchParams.get("minYear")!)
            : undefined,
        maxYear: searchParams.get("maxYear")
            ? parseInt(searchParams.get("maxYear")!)
            : undefined,
        minPrice: searchParams.get("minPrice")
            ? parseInt(searchParams.get("minPrice")!)
            : undefined,
        maxPrice: searchParams.get("maxPrice")
            ? parseInt(searchParams.get("maxPrice")!)
            : undefined,
        minMileage: searchParams.get("minMileage")
            ? parseInt(searchParams.get("minMileage")!)
            : undefined,
        maxMileage: searchParams.get("maxMileage")
            ? parseInt(searchParams.get("maxMileage")!)
            : undefined,
        fuelType: (searchParams.get("fuelType") as any) || undefined,
        transmission: (searchParams.get("transmission") as any) || undefined,
        drivetrain: (searchParams.get("drivetrain") as any) || undefined,
        color: searchParams.get("color") || undefined,
        inStock:
            searchParams.get("inStock") === "true"
                ? true
                : searchParams.get("inStock") === "false"
                  ? false
                  : undefined,
    });

    const [localSearch, setLocalSearch] = useState(filters.search || "");
    const [localBrand, setLocalBrand] = useState(filters.brand || "");
    const [localModel, setLocalModel] = useState(filters.model || "");
    const [localMinYear, setLocalMinYear] = useState(
        filters.minYear?.toString() || "",
    );
    const [localMaxYear, setLocalMaxYear] = useState(
        filters.maxYear?.toString() || "",
    );
    const [localMinPrice, setLocalMinPrice] = useState(
        filters.minPrice?.toString() || "",
    );
    const [localMaxPrice, setLocalMaxPrice] = useState(
        filters.maxPrice?.toString() || "",
    );
    const [localMinMileage, setLocalMinMileage] = useState(
        filters.minMileage?.toString() || "",
    );
    const [localMaxMileage, setLocalMaxMileage] = useState(
        filters.maxMileage?.toString() || "",
    );
    const [localFuelType, setLocalFuelType] = useState(filters.fuelType || "");
    const [localTransmission, setLocalTransmission] = useState(
        filters.transmission || "",
    );
    const [localDrivetrain, setLocalDrivetrain] = useState(
        filters.drivetrain || "",
    );
    const [localColor, setLocalColor] = useState(filters.color || "");
    const [localInStock, setLocalInStock] = useState<string>(
        filters.inStock === true
            ? "true"
            : filters.inStock === false
              ? "false"
              : "",
    );
    const [isFiltersSheetOpen, setIsFiltersSheetOpen] = useState(false);

    const { data: brands = [], isLoading: brandsLoading } = useQuery({
        queryKey: ["brands"],
        queryFn: getBrands,
    });

    const { data: colors = [] } = useQuery({
        queryKey: ["colors"],
        queryFn: getColors,
    });

    const { data: models = [] } = useQuery({
        queryKey: ["models", localBrand],
        queryFn: () => getModels(localBrand || undefined),
    });

    const {
        data: cars = [],
        isLoading: carsLoading,
        error,
    } = useQuery({
        queryKey: ["cars", filters],
        queryFn: () => getCars(filters),
    });

    useEffect(() => {
        const params: CarFilters = {
            search: searchParams.get("search") || undefined,
            brand: searchParams.get("brand") || undefined,
            model: searchParams.get("model") || undefined,
            minYear: searchParams.get("minYear")
                ? parseInt(searchParams.get("minYear")!)
                : undefined,
            maxYear: searchParams.get("maxYear")
                ? parseInt(searchParams.get("maxYear")!)
                : undefined,
            minPrice: searchParams.get("minPrice")
                ? parseInt(searchParams.get("minPrice")!)
                : undefined,
            maxPrice: searchParams.get("maxPrice")
                ? parseInt(searchParams.get("maxPrice")!)
                : undefined,
            minMileage: searchParams.get("minMileage")
                ? parseInt(searchParams.get("minMileage")!)
                : undefined,
            maxMileage: searchParams.get("maxMileage")
                ? parseInt(searchParams.get("maxMileage")!)
                : undefined,
            fuelType: (searchParams.get("fuelType") as any) || undefined,
            transmission:
                (searchParams.get("transmission") as any) || undefined,
            drivetrain: (searchParams.get("drivetrain") as any) || undefined,
            color: searchParams.get("color") || undefined,
            inStock:
                searchParams.get("inStock") === "true"
                    ? true
                    : searchParams.get("inStock") === "false"
                      ? false
                      : undefined,
        };
        setFilters(params);
        setLocalSearch(params.search || "");
        setLocalBrand(params.brand || "");
        setLocalModel(params.model || "");
        setLocalMinYear(params.minYear?.toString() || "");
        setLocalMaxYear(params.maxYear?.toString() || "");
        setLocalMinPrice(params.minPrice?.toString() || "");
        setLocalMaxPrice(params.maxPrice?.toString() || "");
        setLocalMinMileage(params.minMileage?.toString() || "");
        setLocalMaxMileage(params.maxMileage?.toString() || "");
        setLocalFuelType(params.fuelType || "");
        setLocalTransmission(params.transmission || "");
        setLocalDrivetrain(params.drivetrain || "");
        setLocalColor(params.color || "");
        setLocalInStock(
            params.inStock === true
                ? "true"
                : params.inStock === false
                  ? "false"
                  : "",
        );
    }, [searchParams]);

    const updateFilters = useCallback((newFilters: CarFilters) => {
        const params = new URLSearchParams();
        if (newFilters.search) params.set("search", newFilters.search);
        if (newFilters.brand) params.set("brand", newFilters.brand);
        if (newFilters.model) params.set("model", newFilters.model);
        if (newFilters.minYear)
            params.set("minYear", newFilters.minYear.toString());
        if (newFilters.maxYear)
            params.set("maxYear", newFilters.maxYear.toString());
        if (newFilters.minPrice)
            params.set("minPrice", newFilters.minPrice.toString());
        if (newFilters.maxPrice)
            params.set("maxPrice", newFilters.maxPrice.toString());
        if (newFilters.minMileage)
            params.set("minMileage", newFilters.minMileage.toString());
        if (newFilters.maxMileage)
            params.set("maxMileage", newFilters.maxMileage.toString());
        if (newFilters.fuelType) params.set("fuelType", newFilters.fuelType);
        if (newFilters.transmission)
            params.set("transmission", newFilters.transmission);
        if (newFilters.drivetrain)
            params.set("drivetrain", newFilters.drivetrain);
        if (newFilters.color) params.set("color", newFilters.color);
        if (newFilters.inStock !== undefined)
            params.set("inStock", newFilters.inStock.toString());

        const queryString = params.toString();
        window.history.pushState(
            null,
            "",
            queryString ? `/catalog?${queryString}` : "/catalog",
        );

        setFilters(newFilters);
    }, []);

    // Debounce timer for text inputs
    useEffect(() => {
        const timer = setTimeout(() => {
            const newFilters: CarFilters = {
                search: localSearch || undefined,
                brand: localBrand || undefined,
                model: localModel || undefined,
                minYear: localMinYear ? parseInt(localMinYear) : undefined,
                maxYear: localMaxYear ? parseInt(localMaxYear) : undefined,
                minPrice: localMinPrice ? parseInt(localMinPrice) : undefined,
                maxPrice: localMaxPrice ? parseInt(localMaxPrice) : undefined,
                minMileage: localMinMileage
                    ? parseInt(localMinMileage)
                    : undefined,
                maxMileage: localMaxMileage
                    ? parseInt(localMaxMileage)
                    : undefined,
                fuelType: (localFuelType as any) || undefined,
                transmission: (localTransmission as any) || undefined,
                drivetrain: (localDrivetrain as any) || undefined,
                color: localColor || undefined,
                inStock:
                    localInStock === "true"
                        ? true
                        : localInStock === "false"
                          ? false
                          : undefined,
            };
            updateFilters(newFilters);
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [
        localSearch,
        localBrand,
        localModel,
        localMinYear,
        localMaxYear,
        localMinPrice,
        localMaxPrice,
        localMinMileage,
        localMaxMileage,
        localFuelType,
        localTransmission,
        localColor,
        localInStock,
        updateFilters,
    ]);

    const handleResetFilters = () => {
        setLocalSearch("");
        setLocalBrand("");
        setLocalModel("");
        setLocalMinYear("");
        setLocalMaxYear("");
        setLocalMinPrice("");
        setLocalMaxPrice("");
        setLocalMinMileage("");
        setLocalMaxMileage("");
        setLocalFuelType("");
        setLocalTransmission("");
        setLocalDrivetrain("");
        setLocalColor("");
        setLocalInStock("");
        setFilters({});
        window.history.pushState(null, "", "/catalog");
    };

    const hasActiveFilters = Object.values(filters).some(
        (v) => v !== undefined,
    );

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
                localSearch={localSearch}
                setLocalSearch={setLocalSearch}
                localBrand={localBrand}
                setLocalBrand={(value) => {
                    setLocalBrand(value);
                    if (value !== localBrand) {
                        setLocalModel("");
                    }
                }}
                localModel={localModel}
                setLocalModel={setLocalModel}
                localMinYear={localMinYear}
                setLocalMinYear={setLocalMinYear}
                localMaxYear={localMaxYear}
                setLocalMaxYear={setLocalMaxYear}
                localMinPrice={localMinPrice}
                setLocalMinPrice={setLocalMinPrice}
                localMaxPrice={localMaxPrice}
                setLocalMaxPrice={setLocalMaxPrice}
                localMinMileage={localMinMileage}
                setLocalMinMileage={setLocalMinMileage}
                localMaxMileage={localMaxMileage}
                setLocalMaxMileage={setLocalMaxMileage}
                localFuelType={localFuelType}
                setLocalFuelType={setLocalFuelType}
                localTransmission={localTransmission}
                setLocalTransmission={setLocalTransmission}
                localDrivetrain={localDrivetrain}
                setLocalDrivetrain={setLocalDrivetrain}
                localColor={localColor}
                setLocalColor={setLocalColor}
                localInStock={localInStock}
                setLocalInStock={setLocalInStock}
                hasActiveFilters={hasActiveFilters}
                onResetFilters={handleResetFilters}
                onApply={() => setIsFiltersSheetOpen(false)}
                hideTitle
            />
        ),
        [
            brands,
            models,
            colors,
            localSearch,
            localBrand,
            localModel,
            localMinYear,
            localMaxYear,
            localMinPrice,
            localMaxPrice,
            localMinMileage,
            localMaxMileage,
            localFuelType,
            localTransmission,
            localDrivetrain,
            localColor,
            localInStock,
            hasActiveFilters,
            handleResetFilters,
            setIsFiltersSheetOpen,
        ],
    );

    const activeFiltersContent = useMemo(
        () => (
            <ActiveFilters
                localSearch={localSearch}
                setLocalSearch={setLocalSearch}
                localBrand={localBrand}
                setLocalBrand={(value) => {
                    setLocalBrand(value);
                    if (value !== localBrand) {
                        setLocalModel("");
                    }
                }}
                localModel={localModel}
                setLocalModel={setLocalModel}
                localMinYear={localMinYear}
                setLocalMinYear={setLocalMinYear}
                localMaxYear={localMaxYear}
                setLocalMaxYear={setLocalMaxYear}
                localMinPrice={localMinPrice}
                setLocalMinPrice={setLocalMinPrice}
                localMaxPrice={localMaxPrice}
                setLocalMaxPrice={setLocalMaxPrice}
                localMinMileage={localMinMileage}
                setLocalMinMileage={setLocalMinMileage}
                localMaxMileage={localMaxMileage}
                setLocalMaxMileage={setLocalMaxMileage}
                localFuelType={localFuelType}
                setLocalFuelType={setLocalFuelType}
                localTransmission={localTransmission}
                setLocalTransmission={setLocalTransmission}
                localDrivetrain={localDrivetrain}
                setLocalDrivetrain={setLocalDrivetrain}
                localColor={localColor}
                setLocalColor={setLocalColor}
                localInStock={localInStock}
                setLocalInStock={setLocalInStock}
                hasActiveFilters={hasActiveFilters}
            />
        ),
        [
            localSearch,
            localBrand,
            localModel,
            localMinYear,
            localMaxYear,
            localMinPrice,
            localMaxPrice,
            localMinMileage,
            localMaxMileage,
            localFuelType,
            localTransmission,
            localDrivetrain,
            localColor,
            localInStock,
            hasActiveFilters,
        ],
    );

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
                        <Sheet open={isFiltersSheetOpen} onOpenChange={setIsFiltersSheetOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" className={cn("gap-2 duration-500 transition-all", hasActiveFilters && "border-2 border-sky-500")}>
                                    <SlidersHorizontal className="h-4 w-4" />
                                    Фільтри
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="w-full sm:w-96"
                            >
                                <SheetHeader>
                                    <SheetTitle>Фільтри</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 pb-20">
                                    {filtersContent}
                                </div>
                            </SheetContent>
                        </Sheet>
                        <div className="mt-4">
                            {activeFiltersContent}
                        </div>
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
