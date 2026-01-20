'use client'

import { ErrorMessage } from '@/components/ErrorMessage'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { CatalogPreviewSection } from '@/components/sections/CatalogPreviewSection'
import { ContactUsSection } from '@/components/sections/ContactUsSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection'
import { getBrands, getCars } from '@/services/carService'
import type { CarFilters as Filters } from '@/types/car'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function HomePage() {
    const [filters, setFilters] = useState<Filters>({})

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

    if (brandsLoading || carsLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-20">
                <ErrorMessage message="Не вдалося завантажити автомобілі. Будь ласка, спробуйте пізніше." />
            </div>
        )
    }

    // Get newest cars (last 6 cars added)
    const newestCars = [...cars].slice(0, 6)

    return (
        <div>
            {/* 1. Header - Already in layout */}

            {/* 2. Hero / Main Banner */}
            <HeroSection />

            {/* 3. New Cars Slider */}
            {/*{newestCars.length > 0 && <NewCarsSlider cars={newestCars} />}*/}

            {/* 4. Catalog Preview with Filters */}
            <CatalogPreviewSection
                cars={cars}
                brands={brands}
                onFilterChange={setFilters}
            />

            {/* 6. Why Choose Us / Advantages */}
            <WhyChooseUsSection />

            {/* 5. About Us */}
            {/* <AboutUsSection/> */}

            {/* 7. Contact Us */}
            <ContactUsSection />

            {/* 9. Footer - Already in layout */}
        </div>
    )
}
