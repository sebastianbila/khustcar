'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import type { CarFilters as Filters } from '@/types/car'

interface CarFiltersProps {
  brands: string[]
  onFilterChange: (filters: Filters) => void
}

export function CarFilters({ brands, onFilterChange }: CarFiltersProps) {
  const [search, setSearch] = useState('')
  const [brand, setBrand] = useState('')
  const [minYear, setMinYear] = useState('')
  const [maxYear, setMaxYear] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleApplyFilters = () => {
    onFilterChange({
      search: search || undefined,
      brand: brand || undefined,
      minYear: minYear ? parseInt(minYear) : undefined,
      maxYear: maxYear ? parseInt(maxYear) : undefined,
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
    })
  }

  const handleReset = () => {
    setSearch('')
    setBrand('')
    setMinYear('')
    setMaxYear('')
    setMinPrice('')
    setMaxPrice('')
    onFilterChange({})
  }

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-gray-900">Фільтрувати Автомобілі</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="search" className="text-gray-800">Пошук</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Марка або модель..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand" className="text-gray-800">Марка</Label>
            <Select id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">Всі Марки</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="minYear" className="text-gray-800">Мін. Рік</Label>
            <Input
              id="minYear"
              type="number"
              placeholder="2020"
              value={minYear}
              onChange={(e) => setMinYear(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxYear" className="text-gray-800">Макс. Рік</Label>
            <Input
              id="maxYear"
              type="number"
              placeholder="2024"
              value={maxYear}
              onChange={(e) => setMaxYear(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minPrice" className="text-gray-800">Мін. Ціна ($)</Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="20000"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxPrice" className="text-gray-800">Макс. Ціна ($)</Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="50000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
          <Button onClick={handleApplyFilters} className="flex-1 gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Застосувати Фільтри
          </Button>
          <Button onClick={handleReset} variant="outline" className="gap-2">
            <X className="h-4 w-4" />
            Скинути
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
