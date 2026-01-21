'use client'

import { ErrorMessage } from '@/components/ErrorMessage'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/constants'
import { urlFor } from '@/lib/sanity'
import { getCarById } from '@/services/carService'
import { PortableText } from '@portabletext/react'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Gauge, Palette, Phone, Wrench } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { use, useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import 'yet-another-react-lightbox/plugins/thumbnails.css'
import 'yet-another-react-lightbox/styles.css'

interface CarDetailPageProps {
    params: Promise<{ id: string }>
}

export default function CarDetailPage({ params }: CarDetailPageProps) {
    const { id } = use(params)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)

    const { data: car, isLoading, error } = useQuery({
        queryKey: ['car', id],
        queryFn: () => getCarById(id),
    })

    // Unified media array
    const media = useMemo(() => {
        const items = []
        if (car?.videoUrl) {
            items.push({
                type: 'video',
                src: `${car.videoUrl}#t=0.001`,
                poster: undefined
            })
        }
        if (car?.images) {
            car.images.forEach(img => {
                items.push({ type: 'image', ...img })
            })
        }
        return items
    }, [car])

    // Prepare slides for lightbox
    const slides = useMemo(() => {
        return media
            .filter((item) => item.type === 'image')
            .map((item) => ({
                type: 'image' as const,
                src: urlFor(item).width(1920).height(1080).url(),
                alt: `${car?.brand} ${car?.model}`,
            }))
    }, [media, car])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
            </div>
        )
    }

    if (error || !car) {
        return (
            <div className="flex items-center justify-center py-20">
                <ErrorMessage message="Не вдалося завантажити деталі автомобіля. Будь ласка, спробуйте пізніше." />
            </div>
        )
    }

    return (
        <div className="bg-background">
            {/* Breadcrumb */}
            <div className="pt-4">
                <div className="container-custom">
                    <Link href="/catalog">
                        <Button variant="ghost" className="gap-2 -ml-4">
                            <ArrowLeft className="h-4 w-4" />
                            Назад до Каталогу
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="container-custom py-4">
                <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Images */}
                    <div className="lg:col-span-2 order-1 lg:order-none">
                        {media.length > 0 ? (
                            <>
                                <div
                                    className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg group">
                                    {media[selectedImageIndex].type === 'video' ? (
                                        <video
                                            src={media[selectedImageIndex].src}
                                            controls
                                            className="w-full h-full object-contain"
                                            poster={media[selectedImageIndex].poster}
                                            playsInline
                                            onClick={(e) => e.stopPropagation()}
                                            preload="metadata"
                                        />
                                    ) : (
                                        <button
                                            onClick={() => setIsLightboxOpen(true)}
                                            className="w-full h-full relative cursor-pointer"
                                        >
                                            <Image
                                                src={urlFor(media[selectedImageIndex]).width(1200).height(800).url()}
                                                alt={`${car.brand} ${car.model}`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                priority
                                            />
                                            <div
                                                className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                                                <div
                                                    className="bg-white/70 px-4 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                    Клікніть для повноекранного перегляду
                                                </div>
                                            </div>
                                        </button>
                                    )}
                                </div>

                                {media.length > 1 && (
                                    <div className="grid grid-cols-4 gap-3 mt-3">
                                        {media.map((item, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedImageIndex(idx)}
                                                className={`relative aspect-video overflow-hidden rounded-lg transition-all hover:scale-105 ${idx === selectedImageIndex
                                                    ? 'ring-2 ring-primary shadow-md'
                                                    : 'opacity-70 hover:opacity-100'
                                                    }`}
                                            >
                                                {item.type === 'video' ? (
                                                    <div className="w-full h-full relative bg-black">
                                                        <video
                                                            src={item.src}
                                                            className="w-full h-full object-contain opacity-80"
                                                            preload="metadata"
                                                            muted
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <span className="text-2xl drop-shadow-lg">▶️</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Image
                                                        src={urlFor(item).width(300).height(200).url()}
                                                        alt={`${car.brand} ${car.model} - Image ${idx + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Lightbox */}
                                <Lightbox
                                    open={isLightboxOpen}
                                    close={() => setIsLightboxOpen(false)}
                                    slides={slides}
                                    index={selectedImageIndex - (media[0]?.type === 'video' ? 1 : 0)}
                                    plugins={[Slideshow, Thumbnails]}
                                    slideshow={{ autoplay: false }}
                                    carousel={{ finite: true }}
                                    thumbnails={{
                                        position: 'bottom',
                                        width: 140,
                                        border: 0,
                                        gap: 0,
                                    }}
                                    on={{
                                        view: ({ index }) => setSelectedImageIndex(index + (media[0]?.type === 'video' ? 1 : 0)),
                                    }}
                                />
                            </>
                        ) : (
                            <div
                                className="relative aspect-video w-full bg-gray-100 rounded-xl flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">🚗</div>
                                    <p className="text-gray-700">Зображення відсутні</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6 order-2 lg:order-none">
                        {/* Title & Basic Info */}
                        <div>
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <h1 className="text-4xl font-bold text-gray-900">
                                    {car.brand} {car.model}
                                </h1>
                                {!car.inStock && (
                                    <Badge
                                        className="bg-gray-800 text-white hover:bg-gray-800 text-base px-4 py-2 shadow-lg whitespace-nowrap">
                                        Продано
                                    </Badge>
                                )}
                            </div>
                            <div>
                                {car.discountPrice ? (
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <p className="text-2xl font-semibold text-zinc-400 line-through">
                                                ${car.price.toLocaleString()}
                                            </p>
                                            <p className="text-4xl font-bold text-rose-800">
                                                ${car.discountPrice.toLocaleString()}
                                            </p>
                                        </div>
                                        <p className="text-sm text-green-600 font-medium">
                                            Знижка ${(car.price - car.discountPrice).toLocaleString()}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-4xl font-bold text-rose-800">
                                        ${car.price.toLocaleString()}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Specifications Card */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Характеристики</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between py-3 border-b border-b-border">
                                        <span className="text-gray-700">Марка</span>
                                        <span className="font-semibold text-gray-900">{car.brand}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-b-border">
                                        <span className="text-gray-700">Модель</span>
                                        <span className="font-semibold text-gray-900">{car.model}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-b-border">
                                        <span className="text-gray-700">Рік</span>
                                        <span className="font-semibold text-gray-900">{car.year}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-b-border">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Wrench className="h-4 w-4" />
                                            <span>Двигун</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{car.engineSize}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-b-border">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Gauge className="h-4 w-4" />
                                            <span>Пробіг</span>
                                        </div>
                                        <span
                                            className="font-semibold text-gray-900">{car.mileage.toLocaleString()} км</span>
                                    </div>
                                    <div className="flex justify-between py-3">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Palette className="h-4 w-4" />
                                            <span>Колір</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{car.color}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Card */}
                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold text-text mb-4">
                                    Зацікавлені в цьому авто?
                                </h3>
                                <div className="space-y-3 mb-4">
                                    <a
                                        href={`tel:${SITE_CONFIG.contact.phone}`}
                                        className="flex items-center gap-3 text-gray-800 hover:text-primary transition-colors"
                                    >
                                        <Phone className="h-5 w-5" />
                                        <span>{SITE_CONFIG.contact.phone}</span>
                                    </a>
                                </div>
                                <a href={`tel:${SITE_CONFIG.contact.phone}`}>
                                    <Button className="w-full" size="lg">
                                        Зателефонувати
                                    </Button>
                                </a>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Description Card */}
                    {car.description && car.description.length > 0 && (
                        <div className="lg:col-span-2 order-3 lg:order-none">
                            <Card>
                                <CardContent className="p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Опис</h2>
                                    <div className="prose prose-gray max-w-none text-gray-800 leading-relaxed">
                                        <PortableText value={car.description} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
