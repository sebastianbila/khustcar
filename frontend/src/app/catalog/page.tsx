'use client'

import { CarCard } from '@/components/CarCard'
import { ErrorMessage } from '@/components/ErrorMessage'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { getBrands, getCars } from '@/services/carService'
import type { CarFilters } from '@/types/car'
import { useQuery } from '@tanstack/react-query'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState, useCallback } from 'react'

function CatalogContent() {
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState<CarFilters>({
    search: searchParams.get('search') || undefined,
    brand: searchParams.get('brand') || undefined,
    minYear: searchParams.get('minYear') ? parseInt(searchParams.get('minYear')!) : undefined,
    maxYear: searchParams.get('maxYear') ? parseInt(searchParams.get('maxYear')!) : undefined,
    minPrice: searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined,
    maxPrice: searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined,
  })

  const [localSearch, setLocalSearch] = useState(filters.search || '')
  const [localBrand, setLocalBrand] = useState(filters.brand || '')
  const [localMinYear, setLocalMinYear] = useState(filters.minYear?.toString() || '')
  const [localMaxYear, setLocalMaxYear] = useState(filters.maxYear?.toString() || '')
  const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice?.toString() || '')
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice?.toString() || '')

  const { data: brands = [], isLoading: brandsLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
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
    }
    setFilters(params)
    setLocalSearch(params.search || '')
    setLocalBrand(params.brand || '')
    setLocalMinYear(params.minYear?.toString() || '')
    setLocalMaxYear(params.maxYear?.toString() || '')
    setLocalMinPrice(params.minPrice?.toString() || '')
    setLocalMaxPrice(params.maxPrice?.toString() || '')
  }, [searchParams])

  const updateFilters = useCallback((newFilters: CarFilters) => {
    const params = new URLSearchParams()
    if (newFilters.search) params.set('search', newFilters.search)
    if (newFilters.brand) params.set('brand', newFilters.brand)
    if (newFilters.minYear) params.set('minYear', newFilters.minYear.toString())
    if (newFilters.maxYear) params.set('maxYear', newFilters.maxYear.toString())
    if (newFilters.minPrice) params.set('minPrice', newFilters.minPrice.toString())
    if (newFilters.maxPrice) params.set('maxPrice', newFilters.maxPrice.toString())

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
      }
      updateFilters(newFilters)
    }, 500) // 500ms debounce

    return () => clearTimeout(timer)
  }, [localSearch, localBrand, localMinYear, localMaxYear, localMinPrice, localMaxPrice, updateFilters])

  const handleResetFilters = () => {
    setLocalSearch('')
    setLocalBrand('')
    setLocalMinYear('')
    setLocalMaxYear('')
    setLocalMinPrice('')
    setLocalMaxPrice('')
    setFilters({})
    window.history.pushState(null, '', '/catalog')
  }

  const hasActiveFilters = Object.values(filters).some(v => v !== undefined)

  if (brandsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen ">
      {/* Page Header */}
      <section className="bg-zinc-200/50 shadow-xs py-8">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Каталог
            </h1>
            <p className="text-sm text-gray-700 max-w-2xl mx-auto">
              Головна
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-12">
        <div className="container-custom">
          {/* Filters Bar - Top */}
          <Card className="mb-8 border-none shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Фільтри</h3>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetFilters}
                    className="text-xs cursor-pointer"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Очистити
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div className="space-y-2">
                  <Label htmlFor="filter-search" className="text-gray-800">Пошук</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="filter-brand" className="text-gray-800">Марка</Label>
                  <Select
                    id="filter-brand"
                    value={localBrand}
                    onChange={(e) => setLocalBrand(e.target.value)}
                  >
                    <option value="">Всі Марки</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Year Range */}
                <div className="space-y-2">
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
                <div className="space-y-2">
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
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div>
              {/* Results Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {carsLoading ? 'Завантаження...' : `Знайдено ${cars.length} автомобілів`}
                  </h2>
                </div>
                {hasActiveFilters && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {filters.search && (
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        Пошук: {filters.search}
                      </span>
                    )}
                    {filters.brand && (
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        Марка: {filters.brand}
                      </span>
                    )}
                    {(filters.minYear || filters.maxYear) && (
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        Рік: {filters.minYear || '...'} - {filters.maxYear || '...'}
                      </span>
                    )}
                    {(filters.minPrice || filters.maxPrice) && (
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        Ціна: ${filters.minPrice || '...'} - ${filters.maxPrice || '...'}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Loading State */}
              {carsLoading && (
                <div className="flex items-center justify-center py-15">
                  <LoadingSpinner />
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="flex items-center justify-center py-15">
                  <ErrorMessage message="Не вдалося завантажити автомобілі. Будь ласка, спробуйте пізніше." />
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
              {!carsLoading && !error && cars.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {cars.map((car) => (
                    <CarCard key={car._id} car={car} />
                  ))}
                </div>
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
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    }>
      <CatalogContent />
    </Suspense>
  )
}
