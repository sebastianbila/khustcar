'use client'

import {CarCard} from '@/components/CarCard'
import {CarFilters as CarFiltersComponent} from '@/components/CarFilters'
import {ErrorMessage} from '@/components/ErrorMessage'
import {LoadingSpinner} from '@/components/LoadingSpinner'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from '@/components/ui/sheet'
import {NativeSelect, NativeSelectOption} from '@/components/ui/native-select'
import {Label} from '@/components/ui/label'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import {getBrands, getCars, getColors} from '@/services/carService'
import type {CarFilters} from '@/types/car'
import {useQuery} from '@tanstack/react-query'
import {X, Filter} from 'lucide-react'
import {useSearchParams} from 'next/navigation'
import {Suspense, useEffect, useState, useCallback, useMemo} from 'react'

type SortOption = 'price-asc' | 'price-desc' | 'year-asc' | 'year-desc' | 'mileage-asc' | 'mileage-desc' | ''

const ITEMS_PER_PAGE = 12

function CatalogContent() {
    const searchParams = useSearchParams()
    const [showFilters, setShowFilters] = useState(false)
    const [sortBy, setSortBy] = useState<SortOption>('')
    const [currentPage, setCurrentPage] = useState(1)

    const [filters, setFilters] = useState<CarFilters>({
        search: searchParams.get('search') || undefined,
        brand: searchParams.get('brand') || undefined,
        minYear: searchParams.get('minYear') ? parseInt(searchParams.get('minYear')!) : undefined,
        maxYear: searchParams.get('maxYear') ? parseInt(searchParams.get('maxYear')!) : undefined,
        minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined,
        maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
        minMileage: searchParams.get('minMileage') ? parseInt(searchParams.get('minMileage')!) : undefined,
        maxMileage: searchParams.get('maxMileage') ? parseInt(searchParams.get('maxMileage')!) : undefined,
        fuelType: (searchParams.get('fuelType') as any) || undefined,
        transmission: (searchParams.get('transmission') as any) || undefined,
        color: searchParams.get('color') || undefined,
        inStock: searchParams.get('inStock') === 'true' ? true : searchParams.get('inStock') === 'false' ? false : undefined,
    })

    const [localSearch, setLocalSearch] = useState(filters.search || '')
    const [localBrand, setLocalBrand] = useState(filters.brand || '')
    const [localMinYear, setLocalMinYear] = useState(filters.minYear?.toString() || '')
    const [localMaxYear, setLocalMaxYear] = useState(filters.maxYear?.toString() || '')
    const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice?.toString() || '')
    const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice?.toString() || '')
    const [localMinMileage, setLocalMinMileage] = useState(filters.minMileage?.toString() || '')
    const [localMaxMileage, setLocalMaxMileage] = useState(filters.maxMileage?.toString() || '')
    const [localFuelType, setLocalFuelType] = useState(filters.fuelType || '')
    const [localTransmission, setLocalTransmission] = useState(filters.transmission || '')
    const [localColor, setLocalColor] = useState(filters.color || '')
    const [localInStock, setLocalInStock] = useState<string>(filters.inStock === true ? 'true' : filters.inStock === false ? 'false' : '')

    const {data: brands = [], isLoading: brandsLoading} = useQuery({
        queryKey: ['brands'],
        queryFn: getBrands,
    })

    const {data: colors = []} = useQuery({
        queryKey: ['colors'],
        queryFn: getColors,
    })

    const {
        data: cars = [],
        isLoading: carsLoading,
        error,
    } = useQuery({
        queryKey: ['cars', filters],
        queryFn: () => getCars(filters),
    })

    useEffect(() => {
        const params: CarFilters = {
            search: searchParams.get('search') || undefined,
            brand: searchParams.get('brand') || undefined,
            minYear: searchParams.get('minYear') ? parseInt(searchParams.get('minYear')!) : undefined,
            maxYear: searchParams.get('maxYear') ? parseInt(searchParams.get('maxYear')!) : undefined,
            minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined,
            maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
            minMileage: searchParams.get('minMileage') ? parseInt(searchParams.get('minMileage')!) : undefined,
            maxMileage: searchParams.get('maxMileage') ? parseInt(searchParams.get('maxMileage')!) : undefined,
            fuelType: (searchParams.get('fuelType') as any) || undefined,
            transmission: (searchParams.get('transmission') as any) || undefined,
            color: searchParams.get('color') || undefined,
            inStock: searchParams.get('inStock') === 'true' ? true : searchParams.get('inStock') === 'false' ? false : undefined,
        }
        setFilters(params)
        setLocalSearch(params.search || '')
        setLocalBrand(params.brand || '')
        setLocalMinYear(params.minYear?.toString() || '')
        setLocalMaxYear(params.maxYear?.toString() || '')
        setLocalMinPrice(params.minPrice?.toString() || '')
        setLocalMaxPrice(params.maxPrice?.toString() || '')
        setLocalMinMileage(params.minMileage?.toString() || '')
        setLocalMaxMileage(params.maxMileage?.toString() || '')
        setLocalFuelType(params.fuelType || '')
        setLocalTransmission(params.transmission || '')
        setLocalColor(params.color || '')
        setLocalInStock(params.inStock === true ? 'true' : params.inStock === false ? 'false' : '')
    }, [searchParams])

    const updateFilters = useCallback((newFilters: CarFilters) => {
        const params = new URLSearchParams()
        if (newFilters.search) params.set('search', newFilters.search)
        if (newFilters.brand) params.set('brand', newFilters.brand)
        if (newFilters.minYear) params.set('minYear', newFilters.minYear.toString())
        if (newFilters.maxYear) params.set('maxYear', newFilters.maxYear.toString())
        if (newFilters.minPrice) params.set('minPrice', newFilters.minPrice.toString())
        if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice.toString())
        if (newFilters.minMileage) params.set('minMileage', newFilters.minMileage.toString())
        if (newFilters.maxMileage) params.set('maxMileage', newFilters.maxMileage.toString())
        if (newFilters.fuelType) params.set('fuelType', newFilters.fuelType)
        if (newFilters.transmission) params.set('transmission', newFilters.transmission)
        if (newFilters.color) params.set('color', newFilters.color)
        if (newFilters.inStock !== undefined) params.set('inStock', newFilters.inStock.toString())

        const queryString = params.toString()
        window.history.pushState(null, '', queryString ? `/catalog?${queryString}` : '/catalog')

        setFilters(newFilters)
    }, [])

    // Debounce timer for text inputs
    useEffect(() => {
        const timer = setTimeout(() => {
            const newFilters: CarFilters = {
                search: localSearch || undefined,
                brand: localBrand || undefined,
                minYear: localMinYear ? parseInt(localMinYear) : undefined,
                maxYear: localMaxYear ? parseInt(localMaxYear) : undefined,
                minPrice: localMinPrice ? parseInt(localMinPrice) : undefined,
                maxPrice: localMaxPrice ? parseInt(localMaxPrice) : undefined,
                minMileage: localMinMileage ? parseInt(localMinMileage) : undefined,
                maxMileage: localMaxMileage ? parseInt(localMaxMileage) : undefined,
                fuelType: localFuelType as any || undefined,
                transmission: localTransmission as any || undefined,
                color: localColor || undefined,
                inStock: localInStock === 'true' ? true : localInStock === 'false' ? false : undefined,
            }
            updateFilters(newFilters)
        }, 500) // 500ms debounce

        return () => clearTimeout(timer)
    }, [localSearch, localBrand, localMinYear, localMaxYear, localMinPrice, localMaxPrice, localMinMileage, localMaxMileage, localFuelType, localTransmission, localColor, localInStock, updateFilters])

    const handleResetFilters = () => {
        setLocalSearch('')
        setLocalBrand('')
        setLocalMinYear('')
        setLocalMaxYear('')
        setLocalMinPrice('')
        setLocalMaxPrice('')
        setLocalMinMileage('')
        setLocalMaxMileage('')
        setLocalFuelType('')
        setLocalTransmission('')
        setLocalColor('')
        setLocalInStock('')
        setFilters({})
        window.history.pushState(null, '', '/catalog')
    }

    const hasActiveFilters = Object.values(filters).some(v => v !== undefined)

    // Lock body scroll when sheet is open
    useEffect(() => {
        if (showFilters) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [showFilters])

    // Reset to page 1 when filters or sort changes
    useEffect(() => {
        setCurrentPage(1)
    }, [filters, sortBy])

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [currentPage])

    // Sort cars based on selected option
    const sortedCars = useMemo(() => {
        if (!sortBy || cars.length === 0) return cars

        const sorted = [...cars]
        switch (sortBy) {
            case 'price-asc':
                return sorted.sort((a, b) => a.price - b.price)
            case 'price-desc':
                return sorted.sort((a, b) => b.price - a.price)
            case 'year-asc':
                return sorted.sort((a, b) => a.year - b.year)
            case 'year-desc':
                return sorted.sort((a, b) => b.year - a.year)
            case 'mileage-asc':
                return sorted.sort((a, b) => a.mileage - b.mileage)
            case 'mileage-desc':
                return sorted.sort((a, b) => b.mileage - a.mileage)
            default:
                return sorted
        }
    }, [cars, sortBy])

    // Pagination calculations
    const totalPages = Math.ceil(sortedCars.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const paginatedCars = sortedCars.slice(startIndex, endIndex)

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages: (number | 'ellipsis')[] = []
        const showEllipsis = totalPages > 7

        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i)
                pages.push('ellipsis')
                pages.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1)
                pages.push('ellipsis')
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
            } else {
                pages.push(1)
                pages.push('ellipsis')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
                pages.push('ellipsis')
                pages.push(totalPages)
            }
        }

        return pages
    }

    if (brandsLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <LoadingSpinner/>
            </div>
        )
    }

    return (
        <div>
            {/* Filters and Results */}
            <section className="py-12">
                <div className="container-custom">
                    {/* Mobile Filter & Sort */}
                    <div className="md:hidden mb-4 flex items-center gap-3">
                        <Sheet open={showFilters} onOpenChange={setShowFilters}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="default"
                                    size="sm"
                                    className="cursor-pointer relative"
                                >
                                    <Filter className="h-4 w-4"/>
                                    {hasActiveFilters && (
                                        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white rounded-full text-xs min-w-[18px] h-[18px] flex items-center justify-center">
                                            {Object.values(filters).filter(v => v !== undefined).length}
                                        </span>
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-full">
                                <SheetHeader>
                                    <SheetTitle>Фільтри</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6">
                                    <CarFiltersComponent
                                        hideTitle
                                        brands={brands}
                                        colors={colors}
                                        localSearch={localSearch}
                                        setLocalSearch={setLocalSearch}
                                        localBrand={localBrand}
                                        setLocalBrand={setLocalBrand}
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
                                    />
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Mobile Sort */}
                        <div className="flex-1">
                            <NativeSelect
                                id="sort-by-mobile"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                size="sm"
                                className="w-full"
                            >
                                <NativeSelectOption value="">Сортувати</NativeSelectOption>
                                <NativeSelectOption value="price-asc">Ціна: від низької</NativeSelectOption>
                                <NativeSelectOption value="price-desc">Ціна: від високої</NativeSelectOption>
                                <NativeSelectOption value="year-desc">Рік: новіші</NativeSelectOption>
                                <NativeSelectOption value="year-asc">Рік: старіші</NativeSelectOption>
                                <NativeSelectOption value="mileage-asc">Пробіг: менший</NativeSelectOption>
                                <NativeSelectOption value="mileage-desc">Пробіг: більший</NativeSelectOption>
                            </NativeSelect>
                        </div>
                    </div>

                    {/* Desktop Filters */}
                    <Card className="mb-8 border-none shadow-sm bg-white hidden md:block">
                        <CardContent className="p-6">
                            <CarFiltersComponent
                                brands={brands}
                                colors={colors}
                                localSearch={localSearch}
                                setLocalSearch={setLocalSearch}
                                localBrand={localBrand}
                                setLocalBrand={setLocalBrand}
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
                            />
                        </CardContent>
                    </Card>

                    {/* Results */}
                    <div>
                        {/* Results Header */}
                        <div className="mb-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {carsLoading ? 'Завантаження...' : `Знайдено ${sortedCars.length} автомобілів`}
                                    </h2>
                                    {!carsLoading && sortedCars.length > 0 && totalPages > 1 && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            Показано {startIndex + 1}-{Math.min(endIndex, sortedCars.length)} з {sortedCars.length}
                                        </p>
                                    )}
                                </div>
                                {/* Desktop Sorting */}
                                <div className="hidden md:flex items-center gap-2">
                                    <Label htmlFor="sort-by" className="text-gray-800 whitespace-nowrap">Сортувати:</Label>
                                    <NativeSelect
                                        id="sort-by"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                                        size="sm"
                                        className="w-auto min-w-[200px]"
                                    >
                                        <NativeSelectOption value="">За замовчуванням</NativeSelectOption>
                                        <NativeSelectOption value="price-asc">Ціна: від низької</NativeSelectOption>
                                        <NativeSelectOption value="price-desc">Ціна: від високої</NativeSelectOption>
                                        <NativeSelectOption value="year-desc">Рік: новіші</NativeSelectOption>
                                        <NativeSelectOption value="year-asc">Рік: старіші</NativeSelectOption>
                                        <NativeSelectOption value="mileage-asc">Пробіг: менший</NativeSelectOption>
                                        <NativeSelectOption value="mileage-desc">Пробіг: більший</NativeSelectOption>
                                    </NativeSelect>
                                </div>
                            </div>
                            {hasActiveFilters && (
                                <div
                                    className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(min-content,max-content))] md:flex md:flex-wrap gap-2">
                                    {filters.search && (
                                        <span
                                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1.5">
                        Пошук: {filters.search}
                                            <button
                                                onClick={() => {
                                                    setLocalSearch('')
                                                    updateFilters({...filters, search: undefined})
                                                }}
                                                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                                                aria-label="Очистити пошук"
                                            >
                          <X className="h-3 w-3"/>
                        </button>
                      </span>
                                    )}
                                    {filters.brand && (
                                        <span
                                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1.5">
                        Марка: {filters.brand}
                                            <button
                                                onClick={() => {
                                                    setLocalBrand('')
                                                    updateFilters({...filters, brand: undefined})
                                                }}
                                                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                                                aria-label="Очистити марку"
                                            >
                          <X className="h-3 w-3"/>
                        </button>
                      </span>
                                    )}
                                    {(filters.minYear || filters.maxYear) && (
                                        <span
                                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1.5">
                        Рік: {filters.minYear || '...'} - {filters.maxYear || '...'}
                                            <button
                                                onClick={() => {
                                                    setLocalMinYear('')
                                                    setLocalMaxYear('')
                                                    updateFilters({...filters, minYear: undefined, maxYear: undefined})
                                                }}
                                                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                                                aria-label="Очистити рік"
                                            >
                          <X className="h-3 w-3"/>
                        </button>
                      </span>
                                    )}
                                    {(filters.minPrice || filters.maxPrice) && (
                                        <span
                                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-1.5">
                        Ціна: ${filters.minPrice || '...'} - ${filters.maxPrice || '...'}
                                            <button
                                                onClick={() => {
                                                    setLocalMinPrice('')
                                                    setLocalMaxPrice('')
                                                    updateFilters({
                                                        ...filters,
                                                        minPrice: undefined,
                                                        maxPrice: undefined
                                                    })
                                                }}
                                                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                                                aria-label="Очистити ціну"
                                            >
                          <X className="h-3 w-3"/>
                        </button>
                      </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Loading State */}
                        {carsLoading && (
                            <div className="flex items-center justify-center py-15">
                                <LoadingSpinner/>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="flex items-center justify-center py-15">
                                <ErrorMessage
                                    message="Не вдалося завантажити автомобілі. Будь ласка, спробуйте пізніше."/>
                            </div>
                        )}

                        {/* Empty State */}
                        {!carsLoading && !error && cars.length === 0 && (
                            <div className="text-center py-15">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Автомобілі не знайдено
                                </h3>
                                <p className="text-gray-700 mb-6">
                                    Спробуйте змінити параметри пошуку або скинути фільтри
                                </p>
                                {hasActiveFilters && (
                                    <Button onClick={handleResetFilters} variant="outline">
                                        Скинути Фільтри
                                    </Button>
                                )}
                            </div>
                        )}

                        {/* Cars Grid */}
                        {!carsLoading && !error && sortedCars.length > 0 && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {paginatedCars.map((car) => (
                                        <CarCard key={car._id} car={car}/>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-12">
                                        <Pagination>
                                            <PaginationContent>
                                                <PaginationItem>
                                                    <PaginationPrevious
                                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                                    />
                                                </PaginationItem>

                                                {getPageNumbers().map((page, index) => (
                                                    <PaginationItem key={index}>
                                                        {page === 'ellipsis' ? (
                                                            <PaginationEllipsis/>
                                                        ) : (
                                                            <PaginationLink
                                                                onClick={() => setCurrentPage(page)}
                                                                isActive={currentPage === page}
                                                                className="cursor-pointer"
                                                            >
                                                                {page}
                                                            </PaginationLink>
                                                        )}
                                                    </PaginationItem>
                                                ))}

                                                <PaginationItem>
                                                    <PaginationNext
                                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                                    />
                                                </PaginationItem>
                                            </PaginationContent>
                                        </Pagination>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default function CatalogPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center py-20">
                <LoadingSpinner/>
            </div>
        }>
            <CatalogContent/>
        </Suspense>
    )
}
