"use client";

// @ts-ignore
import "aos/dist/aos.css";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AboutUsSection } from "@/components/sections/AboutUsSection";
import { CatalogPreviewSection } from "@/components/sections/CatalogPreviewSection";
import { ContactUsSection } from "@/components/sections/ContactUsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { NewCarsSlider } from "@/components/sections/NewCarsSlider";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { getSectionBg } from "@/lib/utils";
import { getCatalogFeaturedCars, getFeaturedCars } from "@/services/carService";
import { useQuery } from "@tanstack/react-query";
import AOS from "aos";
import { useEffect } from "react";

export default function HomePage() {
    const {
        data: catalogFeaturedCars = [],
        isLoading: catalogLoading,
    } = useQuery({
        queryKey: ["catalog-featured-cars"],
        queryFn: getCatalogFeaturedCars,
    });

    const { data: featuredCars = [] } = useQuery({
        queryKey: ["featured-cars"],
        queryFn: getFeaturedCars,
    });

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: "ease-out-cubic",
        });
    }, []);

    if (catalogLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
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
                    data-aos="fade-up"
                />
            )}

            {/* Catalog Preview */}
            <CatalogPreviewSection
                cars={catalogFeaturedCars}
                className={getSectionBg(1)}
                data-aos="fade-up"
            />

            {/* Why Choose Us / Advantages */}
            <WhyChooseUsSection
                className={getSectionBg(2)}
                data-aos="fade-up"
            />

            {/* About Us */}
            <AboutUsSection className={getSectionBg(3)} data-aos="fade-up" />

            {/* Contact Us */}
            <ContactUsSection className={getSectionBg(4)} data-aos="fade-up" />
        </div>
    );
}
