"use client";

import { SearchOverlay } from "@/components/SearchOverlay";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { Heart, Menu, Phone, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";

export function Header() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);
    const favoriteCount = useFavoritesStore(
        (state) => state.favoriteIds.length,
    );

    return (
        <>
            <header className="sticky top-0 z-20 w-full bg-header shadow-sm font-medium">
                <nav className="border-b border-gray-100 bg-background/80 backdrop-blur-md">
                    <div className="container-custom">
                        <div className="flex h-20 items-center">
                            {/* Logo */}
                            <Link
                                href="/"
                                className="flex items-center gap-2 mr-12 shrink-0"
                            >
                                <img
                                    src="/khustcar_logo.png"
                                    alt={SITE_CONFIG.name}
                                    className="h-10 w-auto object-contain"
                                />
                                <span className="text-xl font-bold text-slate-800">
                                    Khust Car
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center gap-8">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-[15px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Right Actions */}
                            <div className="ml-auto flex items-center gap-6">
                                {/* Phone */}
                                <a
                                    href={`tel:${SITE_CONFIG.contact.phone}`}
                                    className="hidden items-center gap-3 text-slate-700 transition-colors hover:text-slate-900 sm:flex"
                                >
                                    <Phone className="size-5" />
                                    <span className="text-[15px] font-semibold">
                                        {SITE_CONFIG.contact.phone}
                                    </span>
                                </a>

                                {/* Search */}
                                <button
                                    onClick={() => setSearchOpen(true)}
                                    className="flex size-7 items-center justify-center text-slate-500 transition-colors hover:text-slate-900"
                                >
                                    <Search className="size-6" />
                                </button>

                                {/* Favorites */}
                                <Link
                                    href="/favorites"
                                    className="relative flex size-7 items-center justify-center text-slate-500 transition-colors hover:text-rose-500"
                                >
                                    <Heart className="size-6" />
                                    {favoriteCount > 0 && (
                                        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-xs font-medium text-white">
                                            {favoriteCount > 9
                                                ? "9+"
                                                : favoriteCount}
                                        </span>
                                    )}
                                </Link>

                                {/* Social Icons */}
                                <div className="hidden items-center gap-4 border-l border-gray-200 pl-6 lg:flex">
                                    <a
                                        href={SITE_CONFIG.social.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 size-7 flex items-center justify-center  transition-colors hover:text-[#E4405F]"
                                    >
                                        <FaInstagram className="size-6" />
                                    </a>
                                    <a
                                        href={SITE_CONFIG.social.telegram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 size-7 flex items-center justify-center transition-colors hover:text-[#0088cc]"
                                    >
                                        <FaTelegramPlane className="size-6" />
                                    </a>
                                </div>

                                {/* Mobile Menu Button */}
                                <Sheet
                                    open={sheetOpen}
                                    onOpenChange={setSheetOpen}
                                >
                                    <SheetTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="size-7 p-0 text-slate-700 hover:text-slate-900 lg:hidden"
                                        >
                                            <Menu className="size-6!" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent
                                        side="right"
                                        className="w-10/12 sm:w-100"
                                    >
                                        <nav className="flex flex-col gap-4 mt-8">
                                            {NAV_LINKS.map((link) => (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    className="text-lg font-medium text-slate-800 hover:text-primary transition-colors py-2"
                                                    onClick={() =>
                                                        setSheetOpen(false)
                                                    }
                                                >
                                                    {link.label}
                                                </Link>
                                            ))}

                                            {/* Favorites */}
                                            <Link
                                                href="/favorites"
                                                className="flex items-center gap-3 text-lg font-medium text-slate-800 hover:text-rose-500 transition-colors py-2"
                                                onClick={() =>
                                                    setSheetOpen(false)
                                                }
                                            >
                                                <Heart className="size-6" />
                                                Обране
                                                {favoriteCount > 0 && (
                                                    <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                                                        {favoriteCount}
                                                    </span>
                                                )}
                                            </Link>

                                            {/* Phone */}
                                            <a
                                                href={`tel:${SITE_CONFIG.contact.phone}`}
                                                className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors py-2"
                                            >
                                                <Phone className="h-5 w-5" />
                                                <span className="text-lg font-semibold">
                                                    {SITE_CONFIG.contact.phone}
                                                </span>
                                            </a>

                                            {/* Social Icons */}
                                            <div className="flex items-center gap-2 pt-4 border-t border-border">
                                                <a
                                                    href={
                                                        SITE_CONFIG.social
                                                            .instagram
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center size-10 rounded-full bg-slate-50 text-slate-600 hover:text-[#E4405F] transition-colors"
                                                >
                                                    <FaInstagram className="size-7" />
                                                </a>
                                                <a
                                                    href={
                                                        SITE_CONFIG.social
                                                            .telegram
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center size-10 rounded-full bg-slate-50 text-slate-600 hover:text-[#0088cc] transition-colors"
                                                >
                                                    <FaTelegramPlane className="size-7" />
                                                </a>
                                            </div>
                                        </nav>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Search Overlay */}
            <SearchOverlay
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
            />
        </>
    );
}
