"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { urlFor } from "@/lib/sanity";
import { getCarById } from "@/services/carService";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import {
    ArrowLeft,
    Calendar,
    Car,
    ChevronLeft,
    ChevronRight,
    FileText,
    Fuel,
    Gauge,
    Heart,
    Palette,
    Settings,
    Share2,
    Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

interface CarDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function CarDetailPage({ params }: CarDetailPageProps) {
    const { id } = use(params);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const {
        data: car,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["car", id],
        queryFn: () => getCarById(id),
    });

    // Unified media array
    const media = useMemo(() => {
        const items = [];
        if (car?.videoUrl) {
            items.push({
                type: "video",
                src: `${car.videoUrl}#t=0.001`,
                poster: undefined,
            });
        }
        if (car?.images) {
            car.images.forEach((img) => {
                items.push({ type: "image", ...img });
            });
        }
        return items;
    }, [car]);

    // Prepare slides for lightbox
    const slides = useMemo(() => {
        return media
            .filter((item) => item.type === "image")
            .map((item) => ({
                type: "image" as const,
                src: urlFor(item).width(1920).height(1080).url(),
                alt: `${car?.brand} ${car?.model}`,
            }));
    }, [media, car]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20 min-h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    if (error || !car) {
        return (
            <div className="flex items-center justify-center py-20 min-h-screen">
                <ErrorMessage message="Could not load car details. Please try again later." />
            </div>
        );
    }

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedImageIndex((prev: number) => (prev + 1) % media.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedImageIndex(
            (prev: number) => (prev - 1 + media.length) % media.length,
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-custom py-4">
                    <Link
                        href="/catalog"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to catalog
                    </Link>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column - Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <div className="bg-white rounded-2xl shadow-sm">
                            <div className="relative aspect-16/10 bg-gray-100 rounded-xl overflow-hidden group">
                                {media.length > 0 ? (
                                    <>
                                        {media[selectedImageIndex].type ===
                                        "video" ? (
                                            <video
                                                src={
                                                    media[selectedImageIndex]
                                                        .src
                                                }
                                                controls
                                                className="w-full h-full object-contain"
                                                poster={
                                                    media[selectedImageIndex]
                                                        .poster
                                                }
                                                playsInline
                                            />
                                        ) : (
                                            <button
                                                className="w-full h-full relative"
                                                onClick={() =>
                                                    setIsLightboxOpen(true)
                                                }
                                            >
                                                <Image
                                                    src={urlFor(
                                                        media[
                                                            selectedImageIndex
                                                        ],
                                                    )
                                                        .width(1200)
                                                        .height(800)
                                                        .url()}
                                                    alt={`${car.brand} ${car.model}`}
                                                    fill
                                                    className="object-cover"
                                                    priority
                                                />
                                            </button>
                                        )}

                                        {/* Navigation Arrows */}
                                        {media.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                                                >
                                                    <ChevronLeft className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                                                >
                                                    <ChevronRight className="h-5 w-5" />
                                                </button>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No Images Available
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {media.length > 1 && (
                                <div className="grid grid-cols-5 sm:grid-cols-6 gap-3 mt-4">
                                    {media.map((item, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() =>
                                                setSelectedImageIndex(idx)
                                            }
                                            className={`relative aspect-4/3 rounded-lg overflow-hidden transition-all duration-200 ${
                                                idx === selectedImageIndex
                                                    ? "ring-2 ring-gray-900 ring-offset-2 opacity-100"
                                                    : "opacity-60 hover:opacity-100"
                                            }`}
                                        >
                                            {item.type === "video" ? (
                                                <div className="w-full h-full bg-black flex items-center justify-center">
                                                    <span className="text-white text-xs">
                                                        Video
                                                    </span>
                                                </div>
                                            ) : (
                                                <Image
                                                    src={urlFor(item)
                                                        .width(200)
                                                        .height(150)
                                                        .url()}
                                                    alt="Thumbnail"
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Specifications Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-8">
                                Specifications
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                <SpecItem
                                    icon={Calendar}
                                    label="Year"
                                    value={car.year}
                                />
                                <SpecItem
                                    icon={Gauge}
                                    label="Mileage"
                                    value={`${car.mileage.toLocaleString()} miles`}
                                />
                                <SpecItem
                                    icon={Wrench}
                                    label="Engine"
                                    value={car.engineSize}
                                />
                                <SpecItem
                                    icon={Settings}
                                    label="Transmission"
                                    value={
                                        car.transmission === "automatic"
                                            ? "8-Speed Automatic"
                                            : "Manual"
                                    }
                                />
                                <SpecItem
                                    icon={Fuel}
                                    label="Fuel Type"
                                    value={
                                        car.fuelType === "petrol"
                                            ? "Premium Gasoline"
                                            : car.fuelType === "diesel"
                                              ? "Diesel"
                                              : "Electric"
                                    }
                                />
                                <SpecItem
                                    icon={Palette}
                                    label="Exterior Color"
                                    value={car.color || "N/A"}
                                />
                                <SpecItem
                                    icon={Car}
                                    label="Drivetrain"
                                    value="All-Wheel Drive"
                                />
                                <SpecItem
                                    icon={FileText}
                                    label="VIN"
                                    value="WBSJF0C50NCE12345"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        {car.description && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Description
                                </h3>
                                <div className="prose prose-gray max-w-none text-gray-600">
                                    <PortableText value={car.description} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="relative lg:sticky lg:top-24 space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {car.brand} {car.model}
                                </h1>
                                <p className="text-gray-500 font-medium">
                                    {car.year} Model
                                </p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-4xl font-bold text-gray-900">
                                        $
                                        {(
                                            car.discountPrice || car.price
                                        ).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 gap-1">
                                    <span className="text-gray-400">
                                        Est. $
                                        {Math.round(
                                            (car.discountPrice || car.price) /
                                                60,
                                        ).toLocaleString()}
                                        /mo with financing
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-sm border-t border-b border-gray-100 py-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Condition
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                        Pre-Owned
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Warranty
                                    </span>
                                    <span className="font-semibold text-gray-900">
                                        1 Year
                                    </span>
                                </div>
                                <div className="flex justify-between col-span-2">
                                    <span className="text-gray-500">
                                        Location
                                    </span>
                                    <span className="font-semibold text-gray-900 text-right">
                                        Khust, Ukraine
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <a
                                    href={`tel:${SITE_CONFIG.contact.phone}`}
                                    className="block w-full"
                                >
                                    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 text-base">
                                        Contact Dealer
                                    </Button>
                                </a>
                                <Button
                                    variant="outline"
                                    className="w-full h-12 text-base border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    Schedule Test Drive
                                </Button>
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <Button
                                        variant="ghost"
                                        className="w-full border border-gray-200 text-gray-600"
                                    >
                                        <Heart className="h-4 w-4 mr-2" />
                                        Save
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full border border-gray-200 text-gray-600"
                                    >
                                        <Share2 className="h-4 w-4 mr-2" />
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Lightbox
                open={isLightboxOpen}
                close={() => setIsLightboxOpen(false)}
                slides={slides}
                index={
                    selectedImageIndex - (media[0]?.type === "video" ? 1 : 0)
                }
                plugins={[Slideshow, Thumbnails]}
                thumbnails={{ position: "bottom", width: 120, height: 80 }}
            />
        </div>
    );
}

function SpecItem({
    icon: Icon,
    label,
    value,
}: {
    icon: any;
    label: string;
    value: string | number;
}) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 text-slate-700">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm text-gray-500 mb-1">{label}</p>
                <p className="text-base font-bold text-gray-900 leading-none">
                    {value}
                </p>
            </div>
        </div>
    );
}
