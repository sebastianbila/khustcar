"use client";

import { CarCard } from "@/components/CarCard";
import { CarFilters as CarFiltersComponent } from "@/components/CarFilters";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    getBrands,
    getCars,
    getColors,
    getModels,
} from "@/services/carService";
import type { CarFilters } from "@/types/car";
import { useQuery } from "@tanstack/react-query";
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

const ITEMS_PER_PAGE = 12;

function CatalogContent() {
    const searchParams = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);
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
    const [localColor, setLocalColor] = useState(filters.color || "");
    const [localInStock, setLocalInStock] = useState<string>(
        filters.inStock === true
            ? "true"
            : filters.inStock === false
              ? "false"
              : "",
    );

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
        setLocalColor("");
        setLocalInStock("");
        setFilters({});
        window.history.pushState(null, "", "/catalog");
    };

    const hasActiveFilters = Object.values(filters).some(
        (v) => v !== undefined,
    );

    // Lock body scroll when sheet is open
    useEffect(() => {
        if (showFilters) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showFilters]);

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
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedCars = sortedCars.slice(startIndex, endIndex);

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages: (number | "ellipsis")[] = [];
        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push("ellipsis");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push("ellipsis");
                for (let i = totalPages - 3; i <= totalPages; i++)
                    pages.push(i);
            } else {
                pages.push(1);
                pages.push("ellipsis");
                for (let i = currentPage - 1; i <= currentPage + 1; i++)
                    pages.push(i);
                pages.push("ellipsis");
                pages.push(totalPages);
            }
        }

        return pages;
    };

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
                <div className="bg-background-muted py-8 border-b border-b-border">
                    <div className="container-custom">
                        <CarFiltersComponent
                            brands={brands}
                            models={models}
                            colors={colors}
                            localSearch={localSearch}
                            setLocalSearch={setLocalSearch}
                            localBrand={localBrand}
                            setLocalBrand={(value) => {
                                setLocalBrand(value);
                                // Reset model when brand changes
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
                            localColor={localColor}
                            setLocalColor={setLocalColor}
                            localInStock={localInStock}
                            setLocalInStock={setLocalInStock}
                            hasActiveFilters={hasActiveFilters}
                            onResetFilters={handleResetFilters}
                            hideTitle
                        />
                    </div>
                </div>
                <div className=" py-8 mb-8 border-b border-b-border">
                    <div className="container-custom flex flex-col md:flex-row md:items-end justify-between gap-4 ">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                Available Cars
                            </h2>
                            <p className="text-sm text-gray-500 font-medium">
                                Showing{" "}
                                <span className="text-gray-900 font-bold">
                                    {sortedCars.length} results
                                </span>{" "}
                                for your search
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
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
                                    Recommended
                                </NativeSelectOption>
                                <NativeSelectOption value="price-asc">
                                    Price: Low to High
                                </NativeSelectOption>
                                <NativeSelectOption value="price-desc">
                                    Price: High to Low
                                </NativeSelectOption>
                                <NativeSelectOption value="year-desc">
                                    Year: Newest First
                                </NativeSelectOption>
                                <NativeSelectOption value="year-asc">
                                    Year: Oldest First
                                </NativeSelectOption>
                            </NativeSelect>
                        </div>
                    </div>
                </div>
                <div className="container-custom">
                    {/* Empty State */}
                    {!carsLoading && !error && cars.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                No cars found
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Try adjusting your filters or search terms
                            </p>
                            {hasActiveFilters && (
                                <Button
                                    onClick={handleResetFilters}
                                    variant="outline"
                                    className="rounded-full px-6"
                                >
                                    Clear All Filters
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
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <PaginationPrevious
                                                    onClick={() =>
                                                        setCurrentPage(
                                                            (prev: number) =>
                                                                Math.max(
                                                                    1,
                                                                    prev - 1,
                                                                ),
                                                        )
                                                    }
                                                    className={
                                                        currentPage === 1
                                                            ? "pointer-events-none opacity-50"
                                                            : "cursor-pointer"
                                                    }
                                                />
                                            </PaginationItem>
                                            {getPageNumbers().map(
                                                (page, index) => (
                                                    <PaginationItem key={index}>
                                                        {page === "ellipsis" ? (
                                                            <PaginationEllipsis />
                                                        ) : (
                                                            <PaginationLink
                                                                onClick={() =>
                                                                    setCurrentPage(
                                                                        page,
                                                                    )
                                                                }
                                                                isActive={
                                                                    currentPage ===
                                                                    page
                                                                }
                                                                className="cursor-pointer"
                                                            >
                                                                {page}
                                                            </PaginationLink>
                                                        )}
                                                    </PaginationItem>
                                                ),
                                            )}
                                            <PaginationItem>
                                                <PaginationNext
                                                    onClick={() =>
                                                        setCurrentPage(
                                                            (prev: number) =>
                                                                Math.min(
                                                                    totalPages,
                                                                    prev + 1,
                                                                ),
                                                        )
                                                    }
                                                    className={
                                                        currentPage ===
                                                        totalPages
                                                            ? "pointer-events-none opacity-50"
                                                            : "cursor-pointer"
                                                    }
                                                />
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                )}

                                <Button
                                    variant="default"
                                    className="bg-gray-900 hover:bg-gray-800 text-white font-bold h-12 px-8 rounded-lg shadow-sm"
                                    onClick={() => {
                                        if (currentPage < totalPages)
                                            setCurrentPage(
                                                (p: number) => p + 1,
                                            );
                                    }}
                                    disabled={currentPage === totalPages}
                                >
                                    Load More Results
                                </Button>
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
