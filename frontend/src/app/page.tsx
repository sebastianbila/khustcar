"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CatalogPreviewSection } from "@/components/sections/CatalogPreviewSection";
import { ContactUsSection } from "@/components/sections/ContactUsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { NewCarsSlider } from "@/components/sections/NewCarsSlider";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { getCars, getFeaturedCars } from "@/services/carService";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
    const {
        data: cars = [],
        isLoading: carsLoading,
        error,
    } = useQuery({
        queryKey: ["cars"],
        queryFn: () => getCars(),
    });

    const { data: featuredCars = [] } = useQuery({
        queryKey: ["featured-cars"],
        queryFn: getFeaturedCars,
    });

    if (carsLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-20">
                <ErrorMessage message="Не вдалося завантажити автомобілі. Будь ласка, спробуйте пізніше." />
            </div>
        );
    }

    // Get newest cars (last 6 cars added)
    const newestCars = [...cars].slice(0, 6);

    return (
        <div>
            {/* 1. Header - Already in layout */}

            {/* 2. Hero / Main Banner */}
            <HeroSection />

            {/* 3. New Cars Slider */}
            {featuredCars?.length > 0 && <NewCarsSlider cars={featuredCars} />}

            {/* 4. Catalog Preview */}
            <CatalogPreviewSection cars={cars} />

            {/* 6. Why Choose Us / Advantages */}
            <WhyChooseUsSection />

            {/* 5. About Us */}
            {/* <AboutUsSection/> */}

            {/* 7. Contact Us */}
            <ContactUsSection />

            {/* 9. Footer - Already in layout */}
        </div>
    );
}
