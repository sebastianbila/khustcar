"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
} from "@/components/ui/dialog";
import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Phone, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import "yet-another-react-lightbox/styles.css";

interface MediaItem {
    type: "video" | "image";
    src?: string;
    poster?: string;
    asset?: { _ref: string };
}

interface CarInfo {
    brand: string;
    model: string;
    year: number;
    price: number;
    discountPrice?: number;
    phone: string;
}

interface ImageGalleryProps {
    media: MediaItem[];
    alt: string;
    carInfo?: CarInfo;
}

export function ImageGallery({ media, alt, carInfo }: ImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const thumbnailsRef = useRef<HTMLDivElement>(null);
    const modalThumbnailsRef = useRef<HTMLDivElement>(null);
    const mainImageRef = useRef<HTMLDivElement>(null);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        skipSnaps: false,
    });

    // Sync embla with selected index
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());

        // Pause all videos when slide changes
        const rootNode = emblaApi.rootNode();
        const videos = rootNode.querySelectorAll("video");
        videos.forEach((video) => {
            if (!video.paused) {
                video.pause();
            }
        });
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    // Scroll selected thumbnail into view (main gallery)
    useEffect(() => {
        if (thumbnailsRef.current) {
            const selectedThumbnail = thumbnailsRef.current.children[
                selectedIndex
            ] as HTMLElement;
            if (selectedThumbnail) {
                selectedThumbnail.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                });
            }
        }
    }, [selectedIndex]);

    // Scroll selected thumbnail into view (modal)
    useEffect(() => {
        if (modalThumbnailsRef.current && isModalOpen) {
            const selectedThumbnail = modalThumbnailsRef.current.children[
                selectedIndex
            ] as HTMLElement;
            if (selectedThumbnail) {
                selectedThumbnail.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "nearest",
                });
            }
        }
    }, [selectedIndex, isModalOpen]);

    // Filter only images for the modal view
    const imageMedia = media.filter((item) => item.type === "image");

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi],
    );

    const goToImageInModal = (index: number) => {
        // Find the actual index in media array for an image
        let imageCount = 0;
        for (let i = 0; i < media.length; i++) {
            if (media[i].type === "image") {
                if (imageCount === index) {
                    setSelectedIndex(i);
                    scrollTo(i);
                    break;
                }
                imageCount++;
            }
        }

        // Scroll to the image in the modal content area
        // Use setTimeout to ensure the DOM has updated
        setTimeout(() => {
            const imageElement = document.getElementById(
                `modal-image-${index}`,
            );
            if (imageElement && mainImageRef.current) {
                const container = mainImageRef.current;
                const elementTop = imageElement.offsetTop;
                const containerHeight = container.clientHeight;
                const elementHeight = imageElement.clientHeight;

                container.scrollTo({
                    top: elementTop - containerHeight / 2 + elementHeight / 2,
                    behavior: "smooth",
                });
            }
        }, 0);
    };

    // Get current image index in imageMedia array
    const currentImageIndex = imageMedia.findIndex((_, idx) => {
        let count = 0;
        for (let i = 0; i < media.length; i++) {
            if (media[i].type === "image") {
                if (count === idx) {
                    return i === selectedIndex;
                }
                count++;
            }
        }
        return false;
    });

    const modalPrevImage = () => {
        const newIndex =
            (currentImageIndex - 1 + imageMedia.length) % imageMedia.length;
        goToImageInModal(newIndex);
    };

    const modalNextImage = () => {
        const newIndex = (currentImageIndex + 1) % imageMedia.length;
        goToImageInModal(newIndex);
    };

    // Keyboard navigation (lightbox handles its own keyboard events)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Skip if lightbox is open - it handles its own keyboard events
            if (lightboxIndex !== null) return;

            if (isModalOpen) {
                if (e.key === "ArrowLeft") {
                    modalPrevImage();
                } else if (e.key === "ArrowRight") {
                    modalNextImage();
                } else if (e.key === "Escape") {
                    setIsModalOpen(false);
                }
            } else {
                if (e.key === "ArrowLeft") {
                    scrollPrev();
                } else if (e.key === "ArrowRight") {
                    scrollNext();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isModalOpen, lightboxIndex, scrollPrev, scrollNext, currentImageIndex]);

    if (media.length === 0) {
        return (
            <div className="relative aspect-16/11 sm:aspect-16/10 bg-gray-100">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Зображення відсутні
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="lg:bg-white lg:rounded-t-2xl lg:shadow-sm overflow-hidden">
                {/* Main Carousel */}
                <div className="relative group">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {media.map((item, idx) => (
                                <div
                                    key={
                                        (item as any).asset?._ref ||
                                        (item as any).src ||
                                        idx
                                    }
                                    className="relative flex-[0_0_100%] min-w-0 aspect-16/11 sm:aspect-16/10 bg-gray-100"
                                >
                                    {item.type === "video" ? (
                                        <video
                                            src={item.src}
                                            controls
                                            className="w-full h-full object-contain"
                                            poster={item.poster}
                                            playsInline
                                        >
                                            <track kind="captions" />
                                        </video>
                                    ) : (
                                        <button
                                            className="w-full h-full relative cursor-zoom-in"
                                            onClick={() => setIsModalOpen(true)}
                                        >
                                            <Image
                                                src={urlFor(item)
                                                    .ignoreImageParams()
                                                    .width(1200)
                                                    .auto("format")
                                                    .url()}
                                                alt={alt}
                                                fill
                                                className="object-cover"
                                                priority={idx === 0}
                                                draggable={false}
                                            />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    {media.length > 1 && (
                        <>
                            <button
                                onClick={scrollPrev}
                                className="absolute z-50 left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm flex transition-all duration-300 opacity-100"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={scrollNext}
                                className="absolute z-50 right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg backdrop-blur-sm flex transition-all duration-300 opacity-100"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </>
                    )}

                    {/* Slide Indicators (dots) for mobile */}
                    {media.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden">
                            {media.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => scrollTo(idx)}
                                    className={cn(
                                        "w-2 h-2 rounded-full transition-all",
                                        idx === selectedIndex
                                            ? "bg-white w-4"
                                            : "bg-white/50",
                                    )}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Thumbnails */}
                {media.length > 1 && (
                    <div
                        ref={thumbnailsRef}
                        className="flex gap-3 pt-1 pb-3 overflow-x-auto no-scrollbar"
                    >
                        {media.map((item, idx) => (
                            <button
                                key={
                                    (item as any).asset?._ref ||
                                    (item as any).src ||
                                    idx
                                }
                                onClick={() => scrollTo(idx)}
                                className={cn(
                                    "relative shrink-0 w-25 lg:w-20 aspect-4/3 overflow-hidden transition-all duration-200 border-2",
                                    idx === selectedIndex
                                        ? "border-gray-400 opacity-100"
                                        : "border-gray-100 opacity-60 hover:opacity-100",
                                )}
                            >
                                {item.type === "video" ? (
                                    <div className="w-full h-full bg-black flex items-center justify-center">
                                        <span className="text-white text-[10px] font-bold uppercase">
                                            Відео
                                        </span>
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

            {/* Fullscreen Modal */}
            <Dialog
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            >
                <DialogPortal>
                    <DialogOverlay className="bg-white" />
                    <DialogPrimitive.Content
                        className={cn(
                            "fixed inset-0 z-50 bg-white data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                        )}
                    >
                        <VisuallyHidden>
                            <DialogTitle>Галерея зображень</DialogTitle>
                        </VisuallyHidden>

                        {/* Close button */}
                        <DialogClose
                            className={cn("absolute right-4 top-4 z-50 rounded-full bg-gray-100 hover:bg-gray-200 p-2 transition-colors",)}
                        >
                            <X className="h-5 w-5 text-gray-700" />
                            <span className="sr-only">Закрити</span>
                        </DialogClose>

                        <div className="h-full flex flex-col lg:flex-row">
                            {/* Left side - Thumbnails (desktop) */}
                            <div className="hidden lg:flex flex-col w-24 xl:w-28 bg-gray-50 border-r border-gray-200 p-3 overflow-y-auto">
                                <div
                                    ref={modalThumbnailsRef}
                                    className="flex flex-col gap-2"
                                >
                                    {imageMedia.map((item, idx) => (
                                        <button
                                            key={
                                                (item as any).asset?._ref || idx
                                            }
                                            className={cn(
                                                "relative shrink-0 aspect-4/3 overflow-hidden transition-all duration-200 rounded-md border-2",
                                                idx === currentImageIndex
                                                    ? "border-zinc-900 opacity-100 ring-2 ring-zinc-900 ring-offset-2"
                                                    : "border-transparent opacity-60 hover:opacity-100",
                                            )}
                                        >
                                            <Image
                                                src={urlFor(item)
                                                    .ignoreImageParams()
                                                    .width(200)
                                                    .auto("format")
                                                    .url()}
                                                alt="Мініатюра"
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Center - Main content area with scrollable images */}
                            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                                {/* Images area */}
                                <div
                                    ref={mainImageRef}
                                    className="flex-1 overflow-y-auto p-4 lg:p-8"
                                >
                                    <div className="max-w-5xl mx-auto space-y-4">
                                        {imageMedia.map((item, idx) => (
                                            <button
                                                key={
                                                    (item as any).asset?._ref ||
                                                    idx
                                                }
                                                id={`modal-image-${idx}`}
                                                onClick={() =>
                                                    setLightboxIndex(idx)
                                                }
                                                className={cn(
                                                    "relative w-full rounded-lg overflow-hidden bg-gray-100 cursor-zoom-in block",
                                                )}
                                            >
                                                <Image
                                                    src={urlFor(item)
                                                        .ignoreImageParams()
                                                        .width(1920)
                                                        .auto("format")
                                                        .url()}
                                                    alt={`${alt} - фото ${idx + 1}`}
                                                    width={1920}
                                                    height={1280}
                                                    className="w-full h-auto object-contain"
                                                    priority={idx === 0}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Right side - Car info (desktop) */}
                                {carInfo && (
                                    <div className="hidden lg:flex flex-col w-72 xl:w-80 bg-gray-50 border-l border-gray-200 p-6">
                                        <div className="sticky top-6">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                                {carInfo.brand} {carInfo.model}
                                            </h2>
                                            <p className="text-gray-500 font-medium mb-6">
                                                {carInfo.year} рік
                                            </p>

                                            <div className="mb-8">
                                                <div className="text-3xl xl:text-4xl font-black text-gray-900 tracking-tight">
                                                    $
                                                    {(
                                                        carInfo.discountPrice ||
                                                        carInfo.price
                                                    ).toLocaleString()}
                                                </div>
                                                {carInfo.discountPrice && (
                                                    <div className="text-lg text-gray-400 font-medium line-through mt-1">
                                                        $
                                                        {carInfo.price.toLocaleString()}
                                                    </div>
                                                )}
                                            </div>

                                            <a
                                                href={`tel:${carInfo.phone}`}
                                                className="block w-full"
                                            >
                                                <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white h-14 text-lg font-bold">
                                                    <Phone className="h-5 w-5 mr-2" />
                                                    Зателефонувати
                                                </Button>
                                            </a>

                                            <p className="text-sm text-gray-500 mt-4 text-center">
                                                {imageMedia.length} фото
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Mobile bottom bar with car info */}
                            {carInfo && (
                                <div className="lg:hidden flex items-center justify-between gap-4 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)]">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">
                                            {carInfo.brand} {carInfo.model}
                                        </h2>
                                        <div className="text-xl font-black text-gray-900">
                                            $
                                            {(
                                                carInfo.discountPrice ||
                                                carInfo.price
                                            ).toLocaleString()}
                                        </div>
                                    </div>
                                    <a href={`tel:${carInfo.phone}`}>
                                        <Button className="bg-zinc-900 hover:bg-zinc-800 text-white h-12 px-6 font-bold">
                                            <Phone className="h-4 w-4 mr-2" />
                                            Зателефонувати
                                        </Button>
                                    </a>
                                </div>
                            )}
                        </div>
                    </DialogPrimitive.Content>
                </DialogPortal>
            </Dialog>

            {/* Lightbox for individual image */}
            {/* <Lightbox
                open={lightboxIndex !== null}
                close={() => setLightboxIndex(null)}
                index={lightboxIndex ?? 0}
                slides={imageMedia.map((item) => ({
                    src: urlFor(item)
                        .ignoreImageParams()
                        .width(1920)
                        .auto("format")
                        .url(),
                    alt,
                }))}
                on={{
                    view: ({ index }) => setLightboxIndex(index),
                }}
                controller={{
                    closeOnPullUp: true,
                    closeOnPullDown: true,
                    closeOnBackdropClick: true,
                }}
                carousel={{ finite: false }}
                styles={{
                    container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
                    root: { zIndex: 100 },
                }}
            /> */}
        </>
    );
}
