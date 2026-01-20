'use client'

import { Card, CardContent } from '@/components/ui/card'
import { urlFor } from '@/lib/sanity'
import type { Car } from '@/types/car'
import { Calendar, DollarSign, Gauge, Palette } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface CarCardProps {
  car: Car
}

export function CarCard({ car }: CarCardProps) {
  const imageUrl = car.images?.[0]
    ? urlFor(car.images[0]).width(500).height(400).url()
    : '/placeholder-car.jpg'

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-none shadow-md bg-white">
      <Link href={`/cars/${car._id}`} className="relative block aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
      <CardContent className="p-5">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-1">
            <Link href={`/cars/${car._id}`}>
              {car.brand} {car.model}
            </Link>
          </h3>
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge className="h-4 w-4" />
              <span>{car.mileage.toLocaleString()} км</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Palette className="h-4 w-4" />
            <span>{car.color}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex flex-col">
            {car.discountPrice ? (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ${car.price.toLocaleString()}
                </span>
                <div className="flex items-center gap-1 text-primary">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-2xl font-bold">
                    {car.discountPrice.toLocaleString()}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-1 text-gray-900">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">
                  {car.price.toLocaleString()}
                </span>
              </div>
            )}
          </div>
          {car.discountPrice && (
            <div className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-semibold">
              -{Math.round(((car.price - car.discountPrice) / car.price) * 100)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
