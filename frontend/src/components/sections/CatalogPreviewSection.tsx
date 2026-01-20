'use client'

import { CarCard } from '@/components/CarCard'
import { Button } from '@/components/ui/button'
import type { Car } from '@/types/car'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface CatalogPreviewSectionProps {
  cars: Car[]
  brands: string[]
  onFilterChange: (filters: any) => void
}

export function CatalogPreviewSection({ cars, brands, onFilterChange }: CatalogPreviewSectionProps) {
  const [search, setSearch] = useState('')
  const [brand, setBrand] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleApplyFilters = () => {
    onFilterChange({
      search: search || undefined,
      brand: brand || undefined,
      minPrice: minPrice ? parseInt(minPrice) : undefined,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
    })
  }

  // Show only first 6 cars in preview
  const previewCars = cars.slice(0, 6)

  return (
    <section id="catalog" className="py-10">
      <div className="container-custom">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Каталог
          </h2>
        </div>

        {/* Car Preview Grid */}
        {previewCars.length === 0 ? (
          <div className="text-center py-15">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Автомобілі не знайдено</h3>
            <p className="text-gray-700">
              Спробуйте налаштувати фільтри
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {previewCars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link href="/catalog">
                <Button size="lg" variant="outline" className="gap-2 cursor-pointer">
                  Переглянути Всі Автомобілі ({cars.length})
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
