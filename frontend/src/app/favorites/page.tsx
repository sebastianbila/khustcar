"use client";

import { CarCard } from "@/components/CarCard";
import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { getCarById } from "@/services/carService";
import { useFavoritesStore } from "@/stores/favoritesStore";
import type { Car } from "@/types/car";
import { useQuery } from "@tanstack/react-query";
import { Heart, Trash2 } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
    const { favoriteIds, clearFavorites } = useFavoritesStore();

    const {
        data: cars = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["favorites", favoriteIds],
        queryFn: async () => {
            if (favoriteIds.length === 0) return [];
            const carPromises = favoriteIds.map((id) =>
                getCarById(id).catch(() => null),
            );
            const results = await Promise.all(carPromises);
            return results.filter((car): car is Car => car !== null);
        },
        enabled: favoriteIds.length > 0,
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="bg-gray-50">
            <PageHeader
                title="Обране"
                subtitle={
                    favoriteIds.length > 0 ? (
                        <>
                            У вас{" "}
                            <span className="text-gray-900 font-bold">
                                {favoriteIds.length}{" "}
                                {favoriteIds.length === 1
                                    ? "автомобіль"
                                    : favoriteIds.length < 5
                                      ? "автомобілі"
                                      : "автомобілів"}
                            </span>{" "}
                            в обраному
                        </>
                    ) : (
                        "Ваш список обраного порожній"
                    )
                }
                actions={
                    favoriteIds.length > 0 && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={clearFavorites}
                            className="gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200"
                        >
                            <Trash2 className="h-4 w-4" />
                            Очистити все
                        </Button>
                    )
                }
            />

            <section className="py-8 container-custom">
                {/* Empty State */}
                {favoriteIds.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Heart className="h-8 w-8 text-rose-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Список обраного порожній
                        </h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            Додавайте автомобілі до обраного, натискаючи на
                            іконку серця, щоб зберегти їх тут
                        </p>
                        <Link href="/catalog">
                            <Button className="rounded-full px-6">
                                Перейти до каталогу
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="py-20">
                        <ErrorMessage message="Не вдалося завантажити обрані автомобілі" />
                    </div>
                )}

                {/* Grid */}
                {!error && cars.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cars.map((car) => (
                            <CarCard key={car._id} car={car} />
                        ))}
                    </div>
                )}

                {/* Some cars not found */}
                {!error &&
                    favoriteIds.length > 0 &&
                    cars.length < favoriteIds.length && (
                        <p className="text-center text-sm text-gray-500 mt-8">
                            Деякі автомобілі з вашого списку більше не доступні
                        </p>
                    )}
            </section>
        </div>
    );
}
