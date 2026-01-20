'use client'

import {ErrorMessage} from '@/components/ErrorMessage'
import {LoadingSpinner} from '@/components/LoadingSpinner'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {SITE_CONFIG} from '@/lib/constants'
import {urlFor} from '@/lib/sanity'
import {getCarById} from '@/services/carService'
import {PortableText} from '@portabletext/react'
import {useQuery} from '@tanstack/react-query'
import {ArrowLeft, Calendar, DollarSign, Gauge, Palette, Wrench} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {use, useState} from 'react'

interface CarDetailPageProps {
    params: Promise<{ id: string }>
}

export default function CarDetailPage({params}: CarDetailPageProps) {
    const {id} = use(params)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    const {data: car, isLoading, error} = useQuery({
        queryKey: ['car', id],
        queryFn: () => getCarById(id),
    })

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner/>
            </div>
        )
    }

    if (error || !car) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <ErrorMessage message="Не вдалося завантажити деталі автомобіля. Будь ласка, спробуйте пізніше."/>
            </div>
        )
    }

    return (
        <div className="bg-c-bg">
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b">
                <div className="container-custom py-6">
                    <Link href="/catalog">
                        <Button variant="ghost" className="gap-2 -ml-4">
                            <ArrowLeft className="h-4 w-4"/>
                            Назад до Каталогу
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Images */}
                    <div className="lg:col-span-2 space-y-4">
                        {car.images && car.images.length > 0 ? (
                            <>
                                <div
                                    className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 shadow-lg">
                                    <Image
                                        src={urlFor(car.images[selectedImageIndex]).width(1200).height(800).url()}
                                        alt={`${car.brand} ${car.model}`}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                {car.images.length > 1 && (
                                    <div className="grid grid-cols-4 gap-3">
                                        {car.images.map((image, idx) => (
                                            <button
                                                key={image._key}
                                                onClick={() => setSelectedImageIndex(idx)}
                                                className={`relative aspect-video overflow-hidden rounded-lg transition-all ${idx === selectedImageIndex
                                                    ? 'ring-2 ring-primary shadow-md'
                                                    : 'opacity-70 hover:opacity-100'
                                                }`}
                                            >
                                                <Image
                                                    src={urlFor(image).width(300).height(200).url()}
                                                    alt={`${car.brand} ${car.model} - Image ${idx + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
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

                        {/* Description Card */}
                        {car.description && car.description.length > 0 && (
                            <Card>
                                <CardContent className="p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Опис</h2>
                                    <div className="prose prose-gray max-w-none text-gray-800 leading-relaxed">
                                        <PortableText value={car.description}/>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-6">
                        {/* Title & Basic Info */}
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-3">
                                {car.brand} {car.model}
                            </h1>
                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5"/>
                                    <span className="font-medium">{car.year}</span>
                                </div>
                            </div>
                        </div>

                        {/* Price Card */}
                        <Card className="border-2 border-primary/20 bg-primary/5">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2 text-gray-700 mb-2">
                                    <DollarSign className="h-5 w-5"/>
                                    <span className="text-sm font-medium">Ціна</span>
                                </div>
                                {car.discountPrice ? (
                                    <div>
                                        <p className="text-2xl font-semibold text-gray-400 line-through mb-1">
                                            ${car.price.toLocaleString()}
                                        </p>
                                        <p className="text-4xl font-bold text-primary">
                                            ${car.discountPrice.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-green-600 font-medium mt-2">
                                            Знижка ${(car.price - car.discountPrice).toLocaleString()}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-4xl font-bold text-primary">
                                        ${car.price.toLocaleString()}
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Specifications Card */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Характеристики</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between py-3 border-b">
                                        <span className="text-gray-700">Марка</span>
                                        <span className="font-semibold text-gray-900">{car.brand}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b">
                                        <span className="text-gray-700">Модель</span>
                                        <span className="font-semibold text-gray-900">{car.model}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b">
                                        <span className="text-gray-700">Рік</span>
                                        <span className="font-semibold text-gray-900">{car.year}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Wrench className="h-4 w-4"/>
                                            <span>Двигун</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{car.engineSize}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Gauge className="h-4 w-4"/>
                                            <span>Пробіг</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{car.mileage.toLocaleString()} км</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Palette className="h-4 w-4"/>
                                            <span>Колір</span>
                                        </div>
                                        <span className="font-semibold text-gray-900">{car.color}</span>
                                    </div>
                                    <div className="flex justify-between py-3">
                                        <span className="text-gray-700">Ціна</span>
                                        <span className="font-semibold text-primary">
                      ${(car.discountPrice || car.price).toLocaleString()}
                    </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Card */}
                        <Card className="bg-gray-50">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">
                                    Зацікавлені в цьому авто?
                                </h3>
                                <div className="space-y-3 mb-4">
                                    <a
                                        href={`tel:${SITE_CONFIG.contact.phone}`}
                                        className="flex items-center gap-3 text-gray-800 hover:text-primary transition-colors"
                                    >
                                        <Phone className="h-5 w-5"/>
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
                </div>
            </div>
        </div>
    )
}
