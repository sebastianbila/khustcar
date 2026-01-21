"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { CatalogPreviewSection } from "@/components/sections/CatalogPreviewSection";
import { ContactUsSection } from "@/components/sections/ContactUsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { NewCarsSlider } from "@/components/sections/NewCarsSlider";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { getSectionBg } from "@/lib/utils";
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

    return (
        <div>
            {/* Hero / Main Banner */}
            <HeroSection />

            {/* New Cars Slider */}
            {featuredCars?.length > 0 && (
                <NewCarsSlider
                    cars={featuredCars}
                    className={getSectionBg(0)}
                />
            )}

            {/* Catalog Preview */}
            <CatalogPreviewSection
                cars={cars}
                className={getSectionBg(1)}
            />

            {/* Why Choose Us / Advantages */}
            <WhyChooseUsSection className={getSectionBg(2)} />

            {/* About Us */}
            <AboutUsSection className={getSectionBg(3)} />

            {/* Contact Us */}
            <ContactUsSection className={getSectionBg(4)} />
        </div>
    );
}
