"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { urlFor } from "@/lib/sanity";
import { formatMileage, getFuelTypeLabel, getTransmissionLabel } from "@/lib/utils";
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
                src: urlFor(item)
                    .ignoreImageParams()
                    .width(1920)
                    .auto("format")
                    .url(),
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
                <ErrorMessage message="Не вдалося завантажити дані автомобіля. Будь ласка, спробуйте пізніше." />
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
        <div className="bg-gray-50 min-h-screen pb-2">
            {/* Navigation Section */}
            <div className="container-custom py-4 lg:py-6">
                <Link
                    href="/catalog"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Назад до каталогу
                </Link>
            </div>

            {/* Main Layout Grid */}
            <div className="container-custom p-6 pt-0">
                <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-x-8  items-start">

                    {/* 1. Image Gallery - Full width on mobile, 2/3 on desktop */}
                    <div className="lg:col-span-2 w-full lg:mb-6">
                        <div className="lg:bg-white lg:rounded-2xl lg:shadow-sm overflow-hidden">
                            <div className="relative aspect-16/11 sm:aspect-16/10 bg-gray-100 group">
                                {media.length > 0 ? (
                                    <>
                                        {media[selectedImageIndex].type === "video" ? (
                                            <video
                                                src={media[selectedImageIndex].src}
                                                controls
                                                className="w-full h-full object-contain"
                                                poster={media[selectedImageIndex].poster}
                                                playsInline
                                            >
                                                <track kind="captions" />
                                            </video>
                                        ) : (
                                            <button
                                                className="w-full h-full relative cursor-zoom-in"
                                                onClick={() => setIsLightboxOpen(true)}
                                            >
                                                <Image
                                                    src={urlFor(media[selectedImageIndex])
                                                        .ignoreImageParams()
                                                        .width(1200)
                                                        .auto("format")
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
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 lg:bg-white/80 hover:lg:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 lg:group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm lg:flex hidden"
                                                >
                                                    <ChevronLeft className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 lg:bg-white/80 hover:lg:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 lg:group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm lg:flex hidden"
                                                >
                                                    <ChevronRight className="h-5 w-5" />
                                                </button>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        Зображення відсутні
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {media.length > 1 && (
                                <div className="flex gap-3 py-3 lg:p-4 overflow-x-auto no-scrollbar lg:grid lg:grid-cols-6 lg:overflow-visible">
                                    {media.map((item, idx) => (
                                        <button
                                            key={(item as any).asset?._ref || (item as any).src || idx}
                                            onClick={() => setSelectedImageIndex(idx)}
                                            className={`relative shrink-0 w-20 lg:w-auto aspect-4/3 rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                                                idx === selectedImageIndex
                                                    ? "border-gray-400 opacity-100"
                                                    : "border-gray-100 opacity-60 hover:opacity-100"
                                            }`}
                                        >
                                            {item.type === "video" ? (
                                                <div className="w-full h-full bg-black flex items-center justify-center">
                                                    <span className="text-white text-[10px] font-bold uppercase">Відео</span>
                                                </div>
                                            ) : (
                                                <Image
                                                    src={urlFor(item)
                                                        .ignoreImageParams()
                                                        .width(400)
                                                        .auto("format")
                                                        .url()}
                                                    alt="Мініатюра"
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 2. Price Section (Sidebar Position on Desktop) - Full width on mobile */}
                    <div className="lg:row-start-1 lg:col-start-3 lg:sticky lg:top-5 w-full lg:mb-8 mt-5 lg:mt-0">
                        <div className="lg:bg-white lg:rounded-2xl p-0 lg:p-6 lg:shadow-sm border-b lg:border-none border-gray-100">
                            <div className="mb-6">
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                                    {car.brand} {car.model}
                                </h1>
                                <div className="flex items-center gap-2 text-gray-500 font-medium">
                                    <span>{car.year} рік</span>
                                    <span className="text-gray-300">•</span>
                                    <span>{formatMileage(car.mileage)} км</span>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                                    $
                                    {(car.discountPrice || car.price).toLocaleString()}
                                </div>
                                {car.discountPrice && (
                                    <div className="text-xl text-gray-400 font-medium line-through mt-1">
                                        ${car.price.toLocaleString()}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-3 py-2 lg:py-6 border-t border-gray-100 mb-6 font-medium">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Стан</span>
                                    <span className="text-gray-900">З пробігом</span>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <span className="text-gray-500">Адреса</span>
                                    <span className="text-gray-900 text-right">{SITE_CONFIG.contact.address}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <a href={`tel:${SITE_CONFIG.contact.phone}`} className="block w-full">
                                    <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white h-14 text-lg font-bold">
                                        Зателефонувати
                                    </Button>
                                </a>
                                <div className="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-3 pt-2">
                                    <Button variant="outline" className="w-full h-12 text-zinc-600 border-zinc-200">
                                        <Heart className="h-4 w-4 mr-2" />
                                        Зберегти
                                    </Button>
                                    <Button variant="outline" className="w-full h-12 text-zinc-600 border-zinc-200">
                                        <Share2 className="h-4 w-4 mr-2" />
                                        Поділитись
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Specifications - Full width on mobile, 2/3 on desktop */}
                    <div className="lg:col-span-2 w-full lg:mb-4 lg:mb-8">
                        <div className="lg:bg-white lg:rounded-2xl py-6 lg:p-6 lg:shadow-sm border-b lg:border-none border-gray-100">
                            <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-wider">
                                Характеристики
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 lg:gap-y-8 gap-x-12">
                                <SpecItem icon={Calendar} label="Рік випуску" value={car.year} />
                                <SpecItem icon={Gauge} label="Пробіг" value={`${formatMileage(car.mileage)} км`} />
                                <SpecItem icon={Wrench} label="Двигун" value={car.engineSize} />
                                <SpecItem icon={Settings} label="Коробка передач" value={getTransmissionLabel(car.transmission)} />
                                <SpecItem icon={Fuel} label="Тип палива" value={getFuelTypeLabel(car.fuelType)} />
                                <SpecItem icon={Palette} label="Колір" value={car.color || "н/д"} />
                                <SpecItem
                                    icon={Car}
                                    label="Привід"
                                    value={
                                        (() => {
                                            if (car.drivetrain === "fwd") return "Передній";
                                            if (car.drivetrain === "rwd") return "Задній";
                                            return "Повний";
                                        })()
                                    }
                                />
                                <SpecItem icon={FileText} label="VIN" value="WBSJF0C50NCE12345" />
                            </div>
                        </div>
                    </div>

                    {/* 4. Description - Full width on mobile, 2/3 on desktop */}
                    {car.description && (
                        <div className="lg:col-span-2 w-full mb-12 lg:mb-0">
                            <div className="lg:bg-white lg:rounded-2xl py-6 lg:p-6 lg:shadow-sm">
                                <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-wider">
                                    Опис автомобіля
                                </h3>
                                <div className="prose prose-zinc max-w-none text-gray-600 leading-relaxed text-lg">
                                    <PortableText value={car.description} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Lightbox
                open={isLightboxOpen}
                close={() => setIsLightboxOpen(false)}
                slides={slides}
                index={selectedImageIndex - (media[0]?.type === "video" ? 1 : 0)}
                plugins={[Slideshow, Thumbnails]}
                thumbnails={{ position: "bottom", width: 120, height: 80, borderColor: '#262626' }}
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
        <div className="flex items-center gap-5">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 text-zinc-700 shrink-0">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="text-xs font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">{label}</p>
                <p className="text-base font-bold text-gray-900 leading-tight">
                    {value}
                </p>
            </div>
        </div>
    );
}
