"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate mouse position relative to center of screen
            // Value between -1 and 1
            const x = (e.clientX / globalThis.innerWidth) * 2 - 1;
            const y = (e.clientY / globalThis.innerHeight) * 2 - 1;
            setMousePosition({ x, y });
        };

        globalThis.addEventListener("mousemove", handleMouseMove);
        return () => globalThis.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-zinc-950 text-white">
            {/* Parallax Background */}
            <div
                className="absolute inset-[-5%] w-[110%] h-[110%] z-0 transition-transform duration-100 ease-out"
                style={{
                    transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
                }}
            >
                <Image
                    src="/images/audi_404_bg.png"
                    alt="Audi R8 Background"
                    fill
                    priority
                    className="object-cover opacity-60"
                    quality={100}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 container-custom flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="space-y-2">
                    <h1 className="text-9xl font-black tracking-tighter text-white">
                        404
                    </h1>
                    <div className="h-2 w-32 bg-red-600 rounded-full mx-auto shadow-[0_0_20px_rgba(220,38,38,0.7)]" />
                </div>

                <div className="space-y-4 max-w-lg mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-lg">
                        Заїхали не туди?
                    </h2>
                    <p className="text-lg text-zinc-300 drop-shadow">
                        Сторінка, яку ви шукаєте, можливо була переміщена,
                        видалена або ніколи не існувала. Схоже, ми збилися з
                        маршруту.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-8">
                    <Link href="/">
                        <Button
                            size="lg"
                            className="bg-red-600 hover:bg-red-700 text-white border-none shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.7)] transition-all duration-300 font-bold px-8 h-14"
                        >
                            <Home className="mr-2 h-5 w-5" />
                            На головну
                        </Button>
                    </Link>
                    <Link href="/catalog">
                        <Button
                            variant="outline"
                            size="lg"
                            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/40 h-14 px-8"
                        >
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            В каталог
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Footer overlay elements for added depth */}
            <div className="absolute bottom-10 left-0 right-0 text-center text-zinc-500 text-sm z-10 pointer-events-none">
                <span className="opacity-50">KHUST CAR</span>
            </div>
        </div>
    );
}
