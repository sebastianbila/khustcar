"use client";

import { urlFor } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

interface MediaItem {
    type: "video" | "image";
    src?: string;
    poster?: string;
    asset?: { _ref: string };
}

interface ImageGallerySimpleProps {
    media: MediaItem[];
    alt: string;
}

export function ImageGallerySimple({ media, alt }: Readonly<ImageGallerySimpleProps>) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const thumbnailsRef = useRef<HTMLDivElement>(null);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        skipSnaps: false,
    });

    // Sync embla with selected index
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    // Pause all videos when window loses focus
    useEffect(() => {
        const handleBlur = () => {
            const videos = document.querySelectorAll("video");
            videos.forEach((video) => {
                if (!video.paused) {
                    video.pause();
                }
            });
        };

        window.addEventListener("blur", handleBlur);
        return () => {
            window.removeEventListener("blur", handleBlur);
        };
    }, []);

    // Scroll selected thumbnail into view
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

    // Filter only images for the lightbox
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

    // Get the lightbox index for the current media item
    const getLightboxIndexForMedia = (mediaIndex: number): number | null => {
        const item = media[mediaIndex];
        if (item.type !== "image") return null;

        let imageCount = 0;
        for (let i = 0; i < mediaIndex; i++) {
            if (media[i].type === "image") {
                imageCount++;
            }
        }
        return imageCount;
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Skip if lightbox is open - it handles its own keyboard events
            if (lightboxIndex !== null) return;

            if (e.key === "ArrowLeft") {
                scrollPrev();
            } else if (e.key === "ArrowRight") {
                scrollNext();
            }
        };

        globalThis.addEventListener("keydown", handleKeyDown);
        return () => globalThis.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex, scrollPrev, scrollNext]);

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
            <div className="lg:bg-white lg:rounded-2xl lg:shadow-sm overflow-hidden">
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
                                            className="w-full h-full object-contain pointer-events-auto"
                                            poster={item.poster}
                                            playsInline
                                            preload="metadata"
                                            onTouchStart={(e) => e.stopPropagation()}
                                            onMouseDown={(e) => e.stopPropagation()}
                                        >
                                            <track kind="captions" />
                                        </video>
                                    ) : (
                                        <button
                                            className="w-full h-full relative cursor-zoom-in"
                                            onClick={() => {
                                                const lightboxIdx =
                                                    getLightboxIndexForMedia(
                                                        idx,
                                                    );
                                                if (lightboxIdx !== null) {
                                                    setLightboxIndex(
                                                        lightboxIdx,
                                                    );
                                                }
                                            }}
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
                    {media.length > 1 && media[selectedIndex]?.type !== "video" && (
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
                        className="flex gap-3 py-3 overflow-x-auto no-scrollbar"
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

            {/* Lightbox */}
            <Lightbox
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
                plugins={[Counter, Thumbnails]}
                carousel={{ finite: false }}
                controller={{ closeOnBackdropClick: true }}
                styles={{
                    container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
                    root: { zIndex: 100 },
                }}
                thumbnails={{
                    position: "bottom",
                    width: 120,
                    height: 80,
                    borderColor: "#262626",
                }}
            />
        </>
    );
}
