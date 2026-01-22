"use client";

import { CarSpecs } from "@/components/CarSpecs";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ImageGallery } from "@/components/ImageGallery";
import { ImageGallerySimple } from "@/components/ImageGallerySimple";

// Toggle between gallery versions: true = new modal gallery, false = simple lightbox
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/PageHeader";
import { SimilarCars } from "@/components/SimilarCars";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import {
    cn,
    formatMileage,
    getConditionLabel,
    getDrivetrainLabel,
    getFuelTypeLabel,
    getTransmissionLabel
} from "@/lib/utils";
import { getCarById } from "@/services/carService";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import {
    Activity,
    Calendar,
    Car,
    FileText,
    Fuel,
    Gauge,
    Heart,
    Palette,
    Settings,
    Share2,
    Wrench,
} from "lucide-react";
import { use, useMemo } from "react";
import { toast } from "sonner";

interface CarDetailsProps {
    params: Promise<{ id: string }>;
}

const USE_NEW_GALLERY = true;

export function CarDetails({ params }: CarDetailsProps) {
    const { id } = use(params);
    const { toggleFavorite, isFavorite } = useFavoritesStore();

    const {
        data: car,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["car", id],
        queryFn: () => getCarById(id),
    });

    // Use car._id for favorites if car is loaded, otherwise false (will update when car loads)
    const isCarFavorite = car ? isFavorite(car._id) : false;

    // Unified media array
    const media = useMemo(() => {
        const items: Array<{
            type: "video" | "image";
            src?: string;
            poster?: string;
            asset?: { _ref: string };
        }> = [];
        if (car?.videoUrl) {
            items.push({
                type: "video",
                src: car.videoUrl,
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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
            </div>
        );
    }

    if (error || !car) {
        return (
            <div className="flex items-center justify-center py-20">
                <ErrorMessage message="Не вдалося завантажити дані автомобіля. Будь ласка, спробуйте пізніше." />
            </div>
        );
    }

    return (
        <div className="bg-background pb-2">
            <PageHeader
                backLink={{ href: "/catalog", label: "Назад до каталогу" }}
            />

            {/* Main Layout Grid */}
            <div className="container-custom p-6 mt-2">
                <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-x-8 items-start gap-y-6 lg:gap-y-0">
                    {/* 1. Image Gallery - Full width on mobile, 2/3 on desktop */}
                    <div className="lg:col-span-2 w-full">
                        {USE_NEW_GALLERY ? (
                            <ImageGallery
                                media={media}
                                alt={`${car.brand} ${car.model}`}
                                carInfo={{
                                    brand: car.brand,
                                    model: car.model,
                                    year: car.year,
                                    price: car.price,
                                    discountPrice: car.discountPrice,
                                    phone: SITE_CONFIG.contact.phone,
                                }}
                            />
                        ) : (
                            <ImageGallerySimple
                                media={media}
                                alt={`${car.brand} ${car.model}`}
                            />
                        )}
                    </div>

                    {/* 2. Price Section (Sidebar Position on Desktop) - Full width on mobile */}
                    <div className="lg:row-start-1 lg:col-start-3 lg:sticky lg:top-5 w-full">
                        <div className="lg:bg-white lg:rounded-2xl p-0 lg:p-6 lg:shadow-sm">
                            <div className="">
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
                                    {car.brand} {car.model}
                                </h1>
                                <CarSpecs car={car} size="sm" />
                            </div>

                            <div className="my-4">
                                <div className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                                    $
                                    {(
                                        car.discountPrice || car.price
                                    ).toLocaleString()}
                                </div>
                                {car.discountPrice && (
                                    <div className="text-xl text-gray-400 font-medium line-through mt-1">
                                        ${car.price.toLocaleString()}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 py-4 lg:py-6 border-t border-border font-medium">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Стан</span>
                                    <span className="text-gray-900 font-bold">
                                        {getConditionLabel(car.condition)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <span className="text-gray-500">
                                        Адреса
                                    </span>
                                    <span className="text-gray-900 text-right">
                                        {SITE_CONFIG.contact.address}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <a
                                    href={`tel:${SITE_CONFIG.contact.phone}`}
                                    className="block w-full"
                                >
                                    <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white h-14 text-lg font-bold">
                                        Зателефонувати
                                    </Button>
                                </a>
                                <div className="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-3 pt-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => toggleFavorite(car._id)}
                                        className={cn(
                                            "w-full h-12 border-zinc-200",
                                            isCarFavorite
                                                ? "text-rose-500 border-rose-200 hover:bg-rose-50"
                                                : "text-zinc-600",
                                        )}
                                    >
                                        <Heart
                                            className={cn(
                                                "h-4 w-4 mr-2",
                                                isCarFavorite &&
                                                    "fill-rose-500",
                                            )}
                                        />
                                        {isCarFavorite
                                            ? "В обраному"
                                            : "Зберегти"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full h-12 text-zinc-600 border-zinc-200"
                                        onClick={async () => {
                                            const url = window.location.href;
                                            const title = `${car.brand} ${car.model} ${car.year}`;

                                            if (navigator.share) {
                                                try {
                                                    await navigator.share({
                                                        title,
                                                        url,
                                                    });
                                                } catch (err) {
                                                    // User cancelled or error
                                                }
                                            } else {
                                                await navigator.clipboard.writeText(
                                                    url,
                                                );
                                                toast.success(
                                                    "Посилання скопійовано",
                                                );
                                            }
                                        }}
                                    >
                                        <Share2 className="h-4 w-4 mr-2" />
                                        Поділитись
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Specifications - Full width on mobile, 2/3 on desktop */}
                    <div className="lg:col-span-2 w-full">
                        <div className="lg:bg-white pt-6 lg:p-6 lg:shadow-sm border-t lg:border-none border-border">
                            <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-wider">
                                Характеристики
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
                                <SpecItem
                                    icon={Calendar}
                                    label="Рік випуску"
                                    value={car.year}
                                />
                                <SpecItem
                                    icon={Gauge}
                                    label="Пробіг"
                                    value={`${formatMileage(car.mileage)} км`}
                                />
                                <SpecItem
                                    icon={Wrench}
                                    label="Двигун"
                                    value={car.engineSize}
                                />
                                <SpecItem
                                    icon={Settings}
                                    label="Коробка передач"
                                    value={getTransmissionLabel(
                                        car.transmission,
                                    )}
                                />
                                <SpecItem
                                    icon={Fuel}
                                    label="Тип палива"
                                    value={getFuelTypeLabel(car.fuelType)}
                                />
                                <SpecItem
                                    icon={Palette}
                                    label="Колір"
                                    value={car.color || "н/д"}
                                />
                                <SpecItem
                                    icon={Car}
                                    label="Привід"
                                    value={getDrivetrainLabel(car.drivetrain)}
                                />
                                {car.vin && (
                                    <SpecItem
                                        icon={FileText}
                                        label="VIN"
                                        value={car.vin}
                                    />
                                )}
                                {car.condition && (
                                    <SpecItem
                                        icon={Activity}
                                        label="Технічний стан"
                                        value={getConditionLabel(car.condition)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 4. Description - Full width on mobile, 2/3 on desktop */}
                    {car.description && (
                        <div className="lg:col-span-2 w-full mb-12 pt-6 lg:pt-0 border-t lg:border-none border-border">
                            <div className="lg:bg-white lg:rounded-b-2xl lg:p-6 lg:shadow-sm">
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

            <SimilarCars currentCarId={car._id} brand={car.brand} />
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
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-background-elevated text-zinc-700 shrink-0">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="text-xs font-semibold text-gray-400 mb-0.5 uppercase tracking-wide">
                    {label}
                </p>
                <p className="text-base font-bold text-gray-900 leading-tight">
                    {value}
                </p>
            </div>
        </div>
    );
}
